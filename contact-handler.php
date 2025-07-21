<?php
/**
 * Pro Build Digital - Contact Form Handler
 * Handles contact form submissions with email notification
 */

// Set response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Configuration
$config = [
    'to_email' => 'probuilddigital1@gmail.com',
    'from_email' => 'noreply@probuilddigital.com',
    'subject' => 'New Contact Form Submission - Pro Build Digital',
    'max_message_length' => 2000,
    'required_fields' => ['name', 'email', 'message']
];

// Input validation and sanitization
function validateInput($data) {
    global $config;
    
    $errors = [];
    
    // Check required fields
    foreach ($config['required_fields'] as $field) {
        if (empty($data[$field])) {
            $errors[] = ucfirst($field) . ' is required';
        }
    }
    
    // Validate email
    if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email address';
    }
    
    // Validate name (letters, spaces, hyphens, apostrophes only)
    if (!empty($data['name']) && !preg_match('/^[a-zA-Z\s\'-]+$/', $data['name'])) {
        $errors[] = 'Name contains invalid characters';
    }
    
    // Validate message length
    if (!empty($data['message']) && strlen($data['message']) > $config['max_message_length']) {
        $errors[] = 'Message is too long (max ' . $config['max_message_length'] . ' characters)';
    }
    
    // Validate phone if provided
    if (!empty($data['phone']) && !preg_match('/^[\d\s\-\(\)\+\.]+$/', $data['phone'])) {
        $errors[] = 'Invalid phone number format';
    }
    
    return $errors;
}

// Sanitize input data
function sanitizeInput($data) {
    $sanitized = [];
    
    $sanitized['name'] = htmlspecialchars(trim($data['name'] ?? ''), ENT_QUOTES, 'UTF-8');
    $sanitized['email'] = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $sanitized['phone'] = htmlspecialchars(trim($data['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
    $sanitized['business_type'] = htmlspecialchars(trim($data['businessType'] ?? ''), ENT_QUOTES, 'UTF-8');
    $sanitized['message'] = htmlspecialchars(trim($data['message'] ?? ''), ENT_QUOTES, 'UTF-8');
    
    // Handle services array
    $sanitized['services'] = [];
    if (!empty($data['services']) && is_array($data['services'])) {
        foreach ($data['services'] as $service) {
            $sanitized['services'][] = htmlspecialchars(trim($service), ENT_QUOTES, 'UTF-8');
        }
    }
    
    $sanitized['timestamp'] = date('Y-m-d H:i:s');
    $sanitized['ip_address'] = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $sanitized['user_agent'] = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    
    return $sanitized;
}

// Create email content
function createEmailContent($data) {
    $services = !empty($data['services']) ? implode(', ', $data['services']) : 'None selected';
    
    $content = "
New Contact Form Submission - Pro Build Digital

Contact Information:
Name: {$data['name']}
Email: {$data['email']}
Phone: {$data['phone']}
Business Type: {$data['business_type']}

Services of Interest:
{$services}

Message:
{$data['message']}

Submission Details:
Timestamp: {$data['timestamp']}
IP Address: {$data['ip_address']}
User Agent: {$data['user_agent']}

---
This message was sent from the Pro Build Digital contact form.
";
    
    return $content;
}

// Send email notification
function sendEmailNotification($data) {
    global $config;
    
    $subject = $config['subject'];
    $message = createEmailContent($data);
    $headers = [
        'From: ' . $config['from_email'],
        'Reply-To: ' . $data['email'],
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    return mail($config['to_email'], $subject, $message, implode("\r\n", $headers));
}

// Log submission (optional)
function logSubmission($data) {
    $logFile = 'contact_submissions.log';
    $logEntry = date('Y-m-d H:i:s') . ' - ' . $data['name'] . ' (' . $data['email'] . ') - ' . $data['ip_address'] . "\n";
    
    // Only log if the log file is writable
    if (is_writable(dirname($logFile))) {
        file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
    }
}

// Basic spam protection
function isSpam($data) {
    // Check for obvious spam patterns
    $spamPatterns = [
        '/\b(viagra|cialis|loan|casino|gambling)\b/i',
        '/\b(buy now|click here|act now)\b/i',
        '/https?:\/\/[^\s]+/i' // Contains URLs
    ];
    
    $textToCheck = $data['name'] . ' ' . $data['message'];
    
    foreach ($spamPatterns as $pattern) {
        if (preg_match($pattern, $textToCheck)) {
            return true;
        }
    }
    
    // Check for honeypot field (if implemented in frontend)
    if (!empty($data['honeypot'])) {
        return true;
    }
    
    return false;
}

// Main processing
try {
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Invalid JSON data');
    }
    
    // Validate input
    $errors = validateInput($data);
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
        exit;
    }
    
    // Sanitize input
    $sanitizedData = sanitizeInput($data);
    
    // Basic spam check
    if (isSpam($sanitizedData)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Submission rejected']);
        exit;
    }
    
    // Send email notification
    if (sendEmailNotification($sanitizedData)) {
        // Log successful submission
        logSubmission($sanitizedData);
        
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We\'ll get back to you within 24 hours.'
        ]);
    } else {
        throw new Exception('Failed to send email notification');
    }
    
} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    ]);
}
?>
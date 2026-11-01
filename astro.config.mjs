// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const astroAuditPackages = new Set(['astro > aria-query', 'astro > axobject-query']);

// Astro adds these packages to Vite even when the dev toolbar is disabled. On managed
// Windows workspaces, esbuild can fail while walking above the project to resolve them.
const removeDisabledAuditPackages = {
  name: 'probuild:remove-disabled-astro-audit-packages',
  enforce: 'post',
  configResolved(config) {
    config.optimizeDeps.include = (config.optimizeDeps.include ?? [])
      .filter((dependency) => !astroAuditPackages.has(dependency));
  }
};

// Blog posts open with their own "# Title" line, which repeats the title the page
// already shows as its one H1. Drop that leading line, and start any other
// headings inside a post at H2. The post files themselves stay unchanged.
function postHeadings() {
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'h1') node.tagName = 'h2';
    (node.children || []).forEach(walk);
  };
  return (tree) => {
    const first = (tree.children || []).find((n) => n.type === 'element');
    if (first && first.tagName === 'h1') tree.children.splice(tree.children.indexOf(first), 1);
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://probuilddigital.com',
  output: 'static',
  // The development audit toolbar pulls aria-query into Vite's dependency scan.
  // Disable it so local review does not fail when Windows blocks scans above this workspace.
  devToolbar: {
    enabled: false
  },

  vite: {
    plugins: [tailwindcss(), removeDisabledAuditPackages],
    optimizeDeps: {
      // Astro's optional audit tooling uses these CommonJS packages. Esbuild tries to
      // scan above the workspace while pre-bundling them on managed Windows machines.
      exclude: ['aria-query', 'axobject-query']
    }
  },

  markdown: {
    rehypePlugins: [postHeadings],
  },

  integrations: [sitemap({ filter: (page) => !page.includes('/404') })]
});

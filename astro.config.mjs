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

  integrations: [sitemap()]
});

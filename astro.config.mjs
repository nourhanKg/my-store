// @ts-check
import { defineConfig } from 'astro/config';

// import node from '@astrojs/node';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: netlify(),
  // adapter: node({ // <--- Configure the Node.js adapter
  //   mode: 'standalone', // Or 'middleware' depending on your setup
  // }),
});
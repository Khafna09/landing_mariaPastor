// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react() // Deja que Astro maneje la integración nativa de React primero
  ],
  vite: {
    plugins: [tailwindcss()] // Tailwind v4 corre directamente sobre el motor de Vite
  }
});
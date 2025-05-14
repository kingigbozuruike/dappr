// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; 

export default defineConfig({
    plugins: [react()],
    server: {
      watch: {
        // don’t watch your config files
        ignored: ['vite.config.js', 'postcss.config.js']
      }
    }
  })
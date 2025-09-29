import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: false, // Disable minification for easier debugging
    rollupOptions: {
      input: {
        main: '/index.html',
        manage: '/manage.html',
        analytics: '/analytics.html',
        polaroid: '/polaroid.html',
        enhanced: '/enhanced-polaroid.html',
        gloss: '/enhanced-gloss.html',
        webgl: '/enhanced-webgl.html',
        exact: '/enhanced-polaroid-exact.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: false, // Disable minification for easier debugging
    rollupOptions: {
      input: {
        main: '/index.html',
        manage: '/manage.html',
        analytics: '/analytics.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
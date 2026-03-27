import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJs(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-radix': ['@radix-ui/react-dialog'],
        },
      },
    },
    // Enable source maps for debugging
    sourcemap: false,
    // Minify with esbuild for faster builds
    minify: 'esbuild',
    // Target modern browsers
    target: 'es2022',
  },
})

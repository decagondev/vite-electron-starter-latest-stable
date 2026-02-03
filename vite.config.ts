import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Vite 7 configuration for React + Electron application
 * Supports both web and desktop (Electron) build modes
 * @see https://vite.dev/config/
 */
export default defineConfig(({ mode }) => {
  const isDesktop = mode === 'desktop'
  const isProduction = mode === 'production' || isDesktop
  
  return {
    plugins: [react(), tailwindcss()],
    base: isDesktop ? './' : '/',
    build: {
      target: 'esnext',
      minify: isProduction ? 'esbuild' : false,
      sourcemap: isProduction ? false : true,
      rollupOptions: {
        output: {
          format: 'es',
          manualChunks: isDesktop ? undefined : {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
    },
  }
})

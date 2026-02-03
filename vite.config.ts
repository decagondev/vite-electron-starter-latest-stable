/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Vite 7 configuration for React + Electron application
 * Supports both web and desktop (Electron) build modes
 * Includes Vitest configuration for testing
 * @see https://vite.dev/config/
 */
export default defineConfig(({ mode }) => {
  const isDesktop = mode === 'desktop'
  const isProduction = mode === 'production' || isDesktop
  
  return {
    plugins: [react(), tailwindcss()],
    base: isDesktop ? './' : '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@features': resolve(__dirname, 'src/features'),
        '@shared': resolve(__dirname, 'src/shared'),
      },
    },
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
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/test/',
          '**/*.d.ts',
          'src/main.tsx',
          'src/vite-env.d.ts',
        ],
      },
    },
  }
})

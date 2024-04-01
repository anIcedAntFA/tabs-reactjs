import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    reporters: ['verbose'],
    outputFile: {
      junit: './vitest-report.xml',
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [],
    },
  },
}));

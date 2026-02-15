import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // loadEnv reads .env files (local dev), process.env has Vercel/system env vars
  const fileEnv = loadEnv(mode, process.cwd(), '');
  const aiApiKey = fileEnv.AI_API || process.env.AI_API || '';

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      'process.env.AI_API': JSON.stringify(aiApiKey),
    },
  };
});

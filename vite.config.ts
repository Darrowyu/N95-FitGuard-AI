import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Vite 配置文件
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // 填充 process.env.API_KEY 以便应用可以在浏览器中访问
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});
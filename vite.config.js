// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 设置根路径别名
      '@': path.resolve(__dirname, './src'),
      
      // 设置特定目录别名
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, 'src/context'), // 更新此处
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles.css')
    }
  }
});
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        // Убираем api - эта опция не поддерживается в текущей версии
        charset: false,
        quietDeps: true,
      },
    },
  },
  build: {
    // Собираем все CSS в один файл для надежности
    cssCodeSplit: false,
    // Настройки Rollup для правильной сборки CSS
    rollupOptions: {
      output: {
        // Убираем разделение chunks для CSS
        manualChunks: undefined,
        // Настройки именования файлов
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "assets/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    // Минификация CSS
    cssMinify: true,
  },
});

import { defineConfig, normalizePath } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import autoprefixer from "autoprefixer";
// 引入原子CSS
import UnoCSS from "unocss/vite";
// 将SVG注册为组件
import svgr from "vite-plugin-svgr";

// 这个是做路径归一化处理的，修改路径中的斜线问题。使用的好像是绝对路径。线上的话要怎么办呢？
const variablePath = normalizePath(path.resolve("./src/variable.scss"));

// https://vitejs.dev/config/
export default defineConfig({
  // 手动指定项目根目录位置，因为vite的入口文件为index.html文件
  // root: path.join(__dirname, "src"),
  plugins: [react(), UnoCSS(), svgr()],
  css: {
    preprocessorOptions: {
      // 自动引入scss文件
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"],
        }),
      ],
    },
  },
  // 写一些配置
  resolve: {
    alias: {
      "@assets": path.join(__dirname, "src/assets"),
      "@": path.join(__dirname, "src"),
    },
  },
});

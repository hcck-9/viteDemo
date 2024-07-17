import { defineConfig, normalizePath } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import autoprefixer from "autoprefixer";
// 引入原子CSS
import UnoCSS from "unocss/vite";
// 将SVG注册为组件
import svgr from "vite-plugin-svgr";
// 压缩图片资源
import viteImagemin from "vite-plugin-imagemin";

// 这个是做路径归一化处理的，修改路径中的斜线问题。使用的好像是绝对路径。线上的话要怎么办呢？
const variablePath = normalizePath(path.resolve("./src/variable.scss"));

// 填入项目的 CDN 域名地址
const CDN_URL = "http://127.0.0.1:3000";

// 是否为生产环境，在生产环境一般会注入 NODE_ENV 这个环境变量，见下面的环境变量文件配置
const isProduction = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? CDN_URL : "/",
  // 手动指定项目根目录位置，因为vite的入口文件为index.html文件
  // root: path.join(__dirname, "src"),
  plugins: [
    react(),
    UnoCSS(),
    svgr(),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差，针对png，范围从 0 到 7。优化级别越高，压缩时间越长，但压缩效果也越好。
      optipng: {
        optimizationLevel: 7,
      },
      // pngquant 是一个用于 PNG 图片有损压缩的工具。有损压缩意味着图片质量可能会变差，但压缩效果更好。
      pngquant: {
        quality: [0.8, 0.9],
      },
      // svg 优化，没有使用svgr优化过的会进行这个优化，使用过了之后会将svg渲染成组件，就没渲染了。
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
  ],
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
  build: {
    // 当静态资源超过临界值则提取成为单独的文件。
    assetsInlineLimit: 8 * 1024,
  },
  // 预构建两件事情
  // 1、将非ESM的格式转化为ESM的格式。使其可以在浏览器中通过type=module正常加载。
  // 2、打包第三方库代码，将各个三方库分散文件打包在同一个文件中，减少http的请求。
  optimizeDeps: {
    // 入口文件
    // entries: ["./src/main.tsx"],
    // 强制预构建、或者提前声明需要按需加载的依赖。
    // include: ["react"],
    // 排除的包
    // exclude: ["@loadable/component"],
  },
});

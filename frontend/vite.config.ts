import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import { createHtmlPlugin } from 'vite-plugin-html';
// import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    /* 官方插件 */
    // 提供 Vue 3 单文件组件支持
    vue(),
    // 提供 Vue 3 JSX 支持
    vueJsx(),
    /* 社区插件 */
    // 用于生成 svg 雪碧图
    // [https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md]
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    // eslintPlugin({
    //   emitWarning: false,
    // }),
    // 支持vue script设置name属性
    // [https://github.com/vbenjs/vite-plugin-vue-setup-extend]
    vueSetupExtend(),
    // 自动导入 Vite、Webpack、Rollup 和 esbuild 的 API
    /* 
      import { computed, ref } from 'vue' // 这一行可以被自动导入
      const count = ref(0)
      const doubled = computed(() => count.value * 2)
    */
    // [https://github.com/antfu/unplugin-auto-import]
    AutoImport({
      // 需要自动导入的文件
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // global imports to register
      imports: [
        'vue',
        'pinia',
        'vue-router',
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
      ],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    // 赋予html压缩、模版功能
    // [https://github.com/vbenjs/vite-plugin-html]
    createHtmlPlugin({
      minify: true,
      /**
       * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
       * @default index.html
       */
      template: 'index.html',
      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          title: 'index',
        },
        tags: [
          {
            injectTo: 'body-prepend',
            tag: 'div',
            attrs: {
              id: 'tag',
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 8001,
    cors: true,
  },
  // 预览
  preview: {
    port: 8001,
    host: '0.0.0.0',
    strictPort: true,
  },
  build: {
    minify: 'terser', // 压缩混淆器
    chunkSizeWarningLimit: 5000, // chunk大小超过5000kb警告
    // [https://terser.org/docs/api-reference#minify-options]
    terserOptions: {
      compress: {
        drop_console: false, // 自动移除console
        pure_funcs: ['console.log', 'console.info', 'console.warn'], // 移除以上console
        drop_debugger: true, // 删除debugger语句
      },
    },
    assetsInlineLimit: 4096, // 小于这个的资源将自动base64
    assetsDir: 'statics/assets', // 指定生成静态资源的存放路径
    rollupOptions: {
      // 导出文件名
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), //名字替代
      // remove i18n waring
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
  css: {
    // 如果提供了该内联配置，Vite 将不会搜索其他 PostCSS 配置源
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
    // 指定传递给 CSS 预处理器的选项
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});

import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from 'unplugin-auto-import/vite';
import UniManifest from '@uni-helper/vite-plugin-uni-manifest';
import { wrapperEnv } from './src/utils';
import { configHtmlPlugin } from './build/vite/html';

// https://vitejs.dev/config/
export default async ({ mode, command }: ConfigEnv): Promise<UserConfig> => {
  const { UNI_PLATFORM } = process.env;

  console.log('当前运行平台:', UNI_PLATFORM);

  // unocss从0.59版本开始只支持 ESM, 不再支持commonJs
  const UnoCss = await import('unocss/vite').then((i) => i.default);

  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_PORT, VITE_DELETE_CONSOLE, VITE_SHOW_SOURCEMAP } = env;
  const isBuild = command === 'build';
  const viteEnv = wrapperEnv(env);

  return defineConfig({
    plugins: [
      // 原子化css
      UnoCss(),
      // 自动导入 vue，uni-app
      AutoImport({
        imports: ['vue', 'uni-app'],
        dts: './types/auto-import.d.ts',
        dirs: [], // 自动导入文件夹中的内容
        eslintrc: { enabled: true },
        vueTemplate: true, // default false
      }),
      // 使用 TypeScript 编写 uni-app 的 manifest.json。
      UniManifest(),
      // UniXXX 需要在 Uni 之前引入
      uni(),

      UNI_PLATFORM === 'h5' && configHtmlPlugin(viteEnv, isBuild),
    ],
    define: {
      // 定义 uniapp 运行的平台为常量
      __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM),
    },
    css: {
      postcss: {
        plugins: [],
      },
    },
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
        '/#/': path.join(process.cwd(), './types/'),
      },
    },
    // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
    server: {
      hmr: true,
      host: '0.0.0.0',
      port: parseInt(VITE_APP_PORT, 10),
      // proxy: undefined,
    },
    build: {
      // 方便非h5端调试
      target: 'es6',
      // 开发环境不用压缩
      minify: mode === 'development' ? false : 'terser',
      sourcemap: VITE_SHOW_SOURCEMAP === 'true', // App，小程序端源码调试需要开启 sourcemap
      terserOptions: {
        compress: {
          drop_console: VITE_DELETE_CONSOLE === 'true', // 删除 console
          drop_debugger: true, // 删除 debugger
        },
      },
      rollupOptions: {
        output: {
          // 当前配置貌似只对 H5 生效
          assetFileNames: (assetInfo: any): string => {
            // 下方处理 H5 打包时静态资源的文件位置
            if (assetInfo.name.endsWith('.css')) {
              return `css/[name]-[hash].css`;
            }

            const imgExt = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'];
            if (imgExt.some((ext) => assetInfo.name.endsWith(ext))) {
              return `images/[name]-[hash].[ext]`;
            }

            return `assets/[name]-[hash].[ext]`;
          },
        },
      },
    },
  });
};

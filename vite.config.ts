import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
const pathSrc = path.resolve(__dirname, 'src')

// Auto import
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// Element UI
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

// build singlefile
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      eslintrc: {
        enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false
        filepath: './.eslintrc-auto-import.json', // 指定自动导入函数 eslint 规则的文件
      },
      // 指定自动导入函数TS类型声明文件路径
      dts: path.resolve(
        pathSrc,
        'types',
        'auto-imports.d.ts',
      ),
      resolvers: [
        ElementPlusResolver(), // element func
        IconsResolver({}), // element Icon
      ],
      vueTemplate: true, // 在 vue 模板中自动导入
    }),
    viteSingleFile(),
    Components({
      dts: path.resolve(
        pathSrc,
        'types',
        'components.d.ts',
      ), // 指定自动导入组件TS类型声明文件路径
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // 自动安装图标库
      ],
    }),
    Icons({ autoInstall: true }),
  ],

  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
})

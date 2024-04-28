/*
 * @Author: limingxian 305216313@qq.com
 * @Date: 2024-04-20 14:30:07
 * @LastEditors: limingxian 305216313@qq.com
 * @LastEditTime: 2024-04-28 12:23:40
 * @FilePath: /light-ui/.umirc.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'light-ui',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  resolve: {
      includes: ['docs', 'src'],
  },
  base: '/business/light-ui',
  publicPath: '/business/light-ui/',
  // 配置额外的 babel 插件。
  // https://umijs.org/zh-CN/config#extrababelplugins
  // 按需加载antd和lodash
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', style: true }, 'antd'],
    [
      'import',
      {
        libraryName: '@ant-design/icons',
        customName: name => {
          return `@ant-design/icons/lib/icons/${name}`;
        },
        camel2DashComponentName: false,
      },
      '@ant-design/icons',
    ],
    [
      'import',
      { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false },
      'lodash',
    ],
  ],
});

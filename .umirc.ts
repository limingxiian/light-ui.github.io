/*
 * @Author: limingxian 305216313@qq.com
 * @Date: 2024-04-20 14:30:07
 * @LastEditors: limingxian 305216313@qq.com
 * @LastEditTime: 2024-04-23 16:43:06
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
});

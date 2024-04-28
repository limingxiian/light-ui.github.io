/*
 * @Author: limingxian 305216313@qq.com
 * @Date: 2024-04-28 17:21:59
 * @LastEditors: limingxian 305216313@qq.com
 * @LastEditTime: 2024-04-28 17:25:31
 * @FilePath: /light-ui/src/utils/transform.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export default class Transform {
  /**
   * @description: 判断是否JSON格式
   * @param {string} str 数据
   */
  static isJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
}
---
order: 1
nav:
    title: 组件
    order: 2
---

# FormRender 表单组件

## 代码演示

### 基本用法

<code src="./demo/demo1.jsx"></code>

### Schema

Form-render 中有三种主要的表单元素类型：item，object，list

* item：即最基本的输入框，选择框等
* object：一个包含其他元素的 block，可用于表单项的分类
* list：可动态增减的表单项

```JavaScript {.line-numbers}
// 一个基本的 scheme 结构
const schema = {
  displayType: 'row',
  labelWidth: 130,
  type: 'object', // schema 最顶层的 type 总是 object
  properties: {
    // 一个 item
    url: {
      title: 'url输入框',
      placeholder: '//www.taobao.com',
      type: 'string',
      format: 'url',
      required: true,
    },

    // 一个 object
    contact: {
      type: 'object',
      properties: {
        phone: {
          title: '电话',
          type: 'string',
        },
        email: {
          title: '邮箱',
          type: 'string',
        },
      },
    },

    // 一个 list
    peopleList: {
      title: '人员列表',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            title: '姓名',
            type: 'string',
          },
        },
      },
    },
  },
};
```
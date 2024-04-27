import React from 'react';
import { FormItem } from "light-ui";
import { useForm } from 'form-render';
import { Button } from 'antd';

const Demo = (props) => {
  const form = useForm();
  const formData = {
    "address": "baidua",
    "count": 60,
    "select": 1,
    "remark": "ceshiceshiceshissssss",
    "radio": 1,
    "checkbox": [
        2,
        3
    ]
  };
  const schema = {
    properties: {
      address: {
        title: '网址',
        description: '网页访问地址',
        type: 'string',
        widget: 'input',
        required: true,
        placeholder: '尝试在此输入',
        itemprops: {
          addonBefore: "https://",
          addonAfter: ".com",
        },
        addonBefore: "https://",
        addonAfter: ".com",
        "readOnlyWidget": "input",
      },
      count: {
        title: '数量',
        type: 'number',
        widget: 'number',
      },
      select: {
        title: '单选',
        type: 'number',
        enum: [1, 2, 3],
        enumNames: ['选项1', '选项2', '选项3'],
        required: true,
        width: '100%',
      },
      remark: {
        title: '备注',
        type: 'string',
        widget: 'textArea',
        dependencies: ['rows'],
        default: 'ceshiceshiceshi',
        itemprops: {
          maxLength: 100,
        },
        width: '100%',
      },
      rows: {
        title: '高度',
        type: 'number',
        widget: 'number',
      },
      radio: {
        title: '单选',
        type: 'any',
        widget: 'radio',
        itemprops: {
          options: [
            {
              label: '选项一',
              value: 1,
            },
            {
              label: '选项二',
              value: 2,
            },
            {
              label: '选项三',
              value: 3,
            },
          ]
        }
      },
      checkbox: {
        title: '多选框',
        type: 'any',
        widget: 'checkbox',
        itemprops: {
          options: [
            {
              label: '选项一',
              value: 1,
            },
            {
              label: '选项二',
              value: 2,
            },
            {
              label: '选项三',
              value: 3,
            },
          ]
        }
      }
    },
  }

  const watch = {
    address: val => {
      console.log('address:', val);
    },
    radio: val => {
      console.log('radio:', val);
    },
  }

  const onFinish = (data, errors) => {
    if (errors?.length > 0) return;
    console.log('formData:', data);
    console.log('errors:', errors);
  }
  return (
    <>
      <FormItem form={form} formData={formData} item={schema} onFinish={onFinish} watch={watch} />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </>
  )
}

export default Demo
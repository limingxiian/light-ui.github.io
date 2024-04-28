import React from 'react';
import { FormItem } from "light-ui";
import { useForm } from 'form-render';
import { Button } from 'antd';

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: <b style={{ color: '#08c' }}>leaf3</b>,
          },
        ],
      },
    ],
  },
];

const Demo = (props) => {
  const form = useForm();
  let formData = {
    address: "baidua",
    count: 60,
    remark: "ceshiceshiceshissssss",
    rows: 2,
    radio: 1,
    select: 1,
    checkbox: [
        2,
        3
    ],
    treeSelect: 'leaf1'
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
        readOnlyWidget: "input",
        rules: [
          {
            pattern: '^[A-Za-z0-9]+$',
            message: '只允许填写英文字母和数字',
          },
        ],
      },
      count: {
        title: '数量',
        type: 'number',
        widget: 'number',
      },
      select: {
        title: '单选',
        type: 'number',
        widget: 'select',
        itemprops: {
          allowClear: true,
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
        },
        required: true,
        width: '100%',
      },
      remark: {
        title: '备注',
        type: 'string',
        widget: 'textArea',
        dependencies: ['rows'],
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
        type: 'any',
        title: '多选框',
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
        },
        widget: 'CustomCheckBox'
      },
      treeSelect: {
        type: 'any',
        title: '树下拉',
        itemprops: {
          treeData,
        },
        widget: 'treeSelect'
      },
      cascade: {
        type: 'any',
        title: '级联选择',
        itemprops: {
          options: [
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      label: 'West Lake',
                    },
                  ],
                },
              ],
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men',
                    },
                  ],
                },
              ],
            },
          ],
        },
        widget: 'cascade'
      },
      pic: {
        type: 'any',
        title: '图片选择',
        itemprops: {
          maxLength: 5,
          type: ['png', 'jpg', 'pnz'],
          handlePreview: (data) => {
            console.log('data1:', data);
          },
          handleChange: (data) => {
            console.log('data2:', data);
          },
        },
        widget: 'imgUpload',
      },
      file: {
        type: 'any',
        title: '文件选择',
        itemprops: {
          maxLength: 5,
          type: ['docx', 'doc', 'pdf'],
          handleChange: (data) => {
            console.log('data2:', data);
          },
        },
        widget: 'fileUpload',
      }
    },
  }

  const watch = {
    address: val => {
      console.log('address:', val);
    },
    select: val => {
      form?.validateFields()
    },
    radio: val => {
      console.log('radio:', val);
    },
  }

  const onFinish = (data, errors) => {
    if (errors?.length > 0) return;
    formData = {
      ...formData,
      ...data,
    }
    console.log('formData:', formData);
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
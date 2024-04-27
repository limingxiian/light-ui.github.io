import React from 'react';
import { FormItem } from "light-ui";
import { useForm } from 'form-render';
import { Button } from 'antd';

const Demo = (props) => {
  const form = useForm();
  const schema = {
    properties: {
      address: {
        title: '网址',
        description: '网页访问地址',
        type: 'string',
        widget: 'input',
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
        width: '100%',
      },
    },
  }

  const watch = {
    address: val => {
      console.log('val:', val);
    },
  }

  const onFinish = (formData, errors) => {
    console.log('formData:', formData);
    console.log('errors:', errors);
  }
  return (
    <>
      <FormItem form={form} item={schema} onFinish={onFinish} watch={watch} />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </>
  )
}

export default Demo
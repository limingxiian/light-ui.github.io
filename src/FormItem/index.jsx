import React from 'react';
import { Input, InputNumber } from 'antd';
import Form from 'form-render';

const useRenderInput = (props) => {
  const { readOnly, value, itemprops = {}, ...rest } = props;
  console.log('props:', props);
  return <>
    {
      readOnly ? <div>{value}</div> : <Input
        {...itemprops}
        {...rest}
      />
    }
  </>
}

const useRenderNumber = (props) => {
  const { readOnly, value, ...rest } = props;
  return <>
    {
      readOnly ? <div>{value}</div> : <InputNumber
        {...rest}
      />
    }
  </>
}

const FormRender = props => {
  const { item = {} } = props;
  const schema = {
    type: 'object',
    ...item,
  }
  const widgets = {
    input: useRenderInput, // 输入框
    number: useRenderNumber, // 数值
  };
  return (
    <Form
      widgets={widgets}
      schema={schema}
      {...props}
    />
  );
};

export default FormRender;
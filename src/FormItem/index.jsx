import React from 'react';
import { Checkbox, Input, InputNumber, Radio, Space } from 'antd';
import FormRender from 'form-render';
import { isEmpty } from "lodash";

const { TextArea } = Input;

const useRenderInput = (props) => {
  const { readOnly, value, itemprops = {}, ...rest } = props;
  return <>
    {
      readOnly ? <div>{value}</div> : <Input
        value={value}
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
        value={value}
        {...rest}
      />
    }
  </>
}

const useRenderTextArea = (props) => {
  const { readOnly, value, addons, itemprops = {}, ...rest } = props;
  let rows;
  if (addons && addons.dependValues) {
    rows = addons.dependValues[0] || 2;
  }
  return <>
    {
      readOnly ? <div>{value}</div> : <TextArea
        value={value}
        rows={rows}
        {...itemprops}
        {...rest}
      />
    }
  </>
}

const useRenderRadio = (props) => {
  const { itemprops = {}, ...rest } = props;
  const { options = [], inline = 'inline', direction = 'horizontal', } = itemprops;
  const radioStyle = {
    display: inline,
    height: '30px',
    lineHeight: '30px',
  };
  return <>
      <Radio.Group {...itemprops} {...rest}>
        <Space direction={direction}>
          {options?.length > 0 &&
            options.map((o, i) => (
              <Radio style={{ ...radioStyle }} key={`${i}-${o.value}`} value={o.value}>
                {o.label}
              </Radio>
            ))}
        </Space>
      </Radio.Group>
  </>
}

const useRenderCheckBox = (props) => {
  const { itemprops = {}, ...rest } = props;
  const { options = [], style = { width: '100%' }, direction = 'horizontal', } = itemprops;
  return <>
    <Checkbox.Group {...itemprops} {...rest} defaultValue={rest?.checked || []}>
        <Space direction={direction}>
          {options?.length > 0 &&
            options.map((o, i) => (
              <Checkbox style={{ ...style }} key={`${i}-${o.value}`} value={o.value}>
                {o.label}
              </Checkbox>
            ))}
        </Space>
    </Checkbox.Group>
  </>
}

const Item = props => {
  const { item = {} } = props;

  if (props.formData && !isEmpty(props.formData) && item.properties && !isEmpty(item.properties)) {
    Object.keys(item.properties)?.length && Object.keys(item.properties).map(key => {
      item.properties[key].default = props.formData[key];
    })
  }
  const schema = {
    type: 'object',
    ...item,
  }
  const widgets = {
    input: useRenderInput, // 输入框
    number: useRenderNumber, // 数值
    textArea: useRenderTextArea, // 多行输入
    radio: useRenderRadio, // 单选
    checkbox: useRenderCheckBox, // 多选
  };
  return (
    <FormRender
      widgets={widgets}
      schema={schema}
      {...props}
    />
  );
};

export default Item;
import React from 'react';
import { Cascader, Checkbox, Input, InputNumber, Radio, Select, Space, TreeSelect } from 'antd';
import FormRender from 'form-render';
import { isEmpty } from "lodash";

import './style';

const { TextArea } = Input;

const useRenderInput = (props) => {
  const { readOnly, value, itemprops = {}, ...rest } = props;
  return <>
    {
      readOnly ? <div>{value}</div> : <Input
        defaultValue={value}
        {...itemprops}
        {...rest}
      />
    }
  </>
}

const useRenderNumber = (props) => {
  const { readOnly, value, itemprops = {}, ...rest } = props;
  const { style = {} } = itemprops;
  return <>
    {
      readOnly ? <div>{value}</div> : <InputNumber
        style={{ width: '100%', ...style }}
        defaultValue={value}
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
        defaultValue={value}
        rows={rows}
        {...itemprops}
        {...rest}
      />
    }
  </>
}

const useRenderRadio = (props) => {
  const { itemprops = {}, value, ...rest } = props;
  const { options = [], inline = 'inline', direction = 'horizontal', } = itemprops;
  const radioStyle = {
    display: inline,
    height: '30px',
    lineHeight: '30px',
  };
  return <>
      <Radio.Group {...itemprops} {...rest} defaultValue={value}>
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
  const { itemprops = {}, checked = [], value = [], ...rest } = props;
  const { options = [], style = { width: '100%' }, direction = 'horizontal', } = itemprops;
  return <>
    <Checkbox.Group defaultValue={value || checked || []} {...itemprops} {...rest}>
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

const useRenderSelect = (props) => {
  const { itemprops = {}, value, ...rest } = props;
  const { options = [], style = {} } = itemprops;
  return <>
    <Select
      style={{ width: '100%', ...style }}
      defaultValue={value}
      {...itemprops}
      {...rest}
      options={options}
    />
  </>
}

const useRenderTreeSelect = (props) => {
  const { itemprops = {}, value, ...rest } = props;
  const { treeData = [], style = {} } = itemprops;

  return <>
    <TreeSelect
      style={{ width: '100%', ...style }}
      placeholder="请选择"
      allowClear
      treeDefaultExpandAll
      defaultValue={value}
      {...itemprops}
      {...rest}
      treeData={treeData}
    />
  </>
}

const useRenderCascade = (props) => {
  const { itemprops = {}, value, ...rest } = props;
  const { options = [], style = {} } = itemprops;
  return <>
    <Cascader
      placeholder="请选择"
      style={{ width: '100%', ...style }}
      defaultValue={value}
      {...itemprops}
      {...rest}
      options={options}
    />
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
    CustomCheckBox: useRenderCheckBox, // 多选
    select: useRenderSelect, // 下拉选
    treeSelect: useRenderTreeSelect, // 树下拉
    cascade: useRenderCascade, // 级联下拉
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
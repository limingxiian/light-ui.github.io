import React, { useRef, useState } from 'react';
import { Button, Cascader, Checkbox, Input, InputNumber, Modal, Radio, Select, Space, TreeSelect, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import FormRender from 'form-render';
import { isEmpty } from "lodash";
import classNames from 'classnames';
import FileType from "../utils/fileConfig.json";

import './style';

const { TextArea } = Input;

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function verticalFile(file, vertic) {
  const error = '上传的文件不合格！';
  let { maxSize = null, type: types } = vertic;

  if (file) {
    let fileType = file.name.split('.').reverse()[0];
    // 判断文件格式
    let _types = Array.isArray(types) ? types.flat(Infinity) : types;
    if (_types && (_types.indexOf(fileType) < 0 || _types.indexOf(fileType.toLowerCase()) < 0)) {
      message.error(`${error}请上传${_types}格式文件`);
      return Upload.LIST_IGNORE;
    }
    
    if (maxSize > 0 && file.size > maxSize) {
      message.error(`${error}: 文件大小错误`);
      return Upload.LIST_IGNORE;
    }
  }
}

export const useRenderInput = (props) => {
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

export const useRenderNumber = (props) => {
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

export const useRenderTextArea = (props) => {
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

export const useRenderRadio = (props) => {
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

export const useRenderCheckBox = (props) => {
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

export const useRenderSelect = (props) => {
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

export const useRenderTreeSelect = (props) => {
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

export const useRenderCascade = (props) => {
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

export const useRenderImgUpload = (props) => {
  const { readOnly, itemprops = {}, value, ...rest } = props;
  const { maxLength, maxSize, type = [], handlePreview, handleChange } = itemprops;
  const uploadImg = useRef();
  const [imgList, setImgList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const typeList = new Set();

  let _accept =
    (type &&
      type.map(val => {
        return FileType[val];
      })) ||
    null;

  let vertic = {
    maxSize,
    type,
    accept: _accept,
  };

  const onPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    handlePreview && handlePreview(file);
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const onChange = ({ fileList: newFileList }) => {
    setImgList(newFileList);
    handleChange && handleChange(newFileList);

  };

  const handleCancel = () => {
    setPreviewImage('');
    setPreviewTitle('');
    setPreviewOpen(false);
  };

  if ((maxLength && imgList.length >= maxLength) || readOnly) {
    itemprops.className = classNames('img-upload-disabled');
  } else {
    itemprops.className = '';
  }
  return <div style={{ width: '100%' }}>
    <Upload
      ref={uploadImg}
      listType="picture-card"
      name='image'
      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
      beforeUpload={file => verticalFile(file, vertic)}
      // headers={{}}
      {...rest}
      {...itemprops}
      accept={vertic.accept}
      onPreview={onPreview}
      onChange={onChange}
      fileList={imgList}
    >
      <PlusOutlined />
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </Upload>
  </div>
}

export const useRenderFileUpload = (props) => {
  const { readOnly, itemprops = {}, value, ...rest } = props;
  const { maxLength, maxSize, type = [], handlePreview, handleChange } = itemprops;
  const uploadFile = useRef();
  const [fileList, setFileList] = useState([]);

  let _accept =
    (type &&
      type.map(val => {
        return FileType[val];
      })) ||
    null;

  let vertic = {
    maxSize,
    type,
    accept: _accept,
  };

  const onChange = ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    handleChange && handleChange(newFileList);
  };
  return <div style={{ width: '100%' }}>
    <Upload
      ref={uploadFile}
      name='file'
      listType="text"
      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
      beforeUpload={file => verticalFile(file, vertic)}
      {...rest}
      {...itemprops}
      accept={vertic.accept}
      onChange={onChange}
      fileList={fileList}
    >
      {(maxLength && fileList.length >= maxLength) || readOnly ? null : <Button icon={<UploadOutlined />}>上传</Button>}
    </Upload>
  </div>
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
    imgUpload: useRenderImgUpload, // 图片上传
    fileUpload: useRenderFileUpload, // 文件上传
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
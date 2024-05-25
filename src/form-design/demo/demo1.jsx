import React, { useRef, useState } from 'react';
import { FormDesign, FormItem } from "light-ui";
import { Button, Modal } from 'antd';
import { useForm } from 'form-render';
import { isEmpty } from "lodash";

const Demo = (props) => {
  const formRef = useRef();
  const [formItem, setFormItem] = useState({});
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const form = useForm();

  const defaultJson = {
    type: 'object',
    properties: {
      inputName: {
        title: '简单输入框',
        type: 'string',
      },
    },
  }

  const handleCancel = () => {
    setOpen(false);
  }
  const handleSave = () => {
    let obj = {};
    if (formRef.current?.getValues) {
      console.log('value:', formRef.current.getValues());
      let values = formRef.current.getValues() || {};
      obj = {
        ...values
      };
    }
    setFormItem(obj);
    setOpen(false);
  };

  const onFinish = (data, errors) => {
    if (errors?.length > 0) {
      return message.warn('校验不通过！');
    }
    setFormData({ ...formData, ...data, });
  }
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Button type='primary' onClick={() => {
          setOpen(true);
        }}>编辑设计器</Button>
        <Button style={{ marginLeft: 10 }} onClick={() => setFormItem({})}>清除</Button>
      </div>
      {open ? <Modal
        open={open}
        title="设计器"
        okText="保存"
        onOk={handleSave}
        cancelText="取消"
        onCancel={handleCancel}
        width="100%"
        style={{ height: 600 }}
        bodyStyle={{ overflow: 'scroll', maxHeight: 540 }}
      >
        <FormDesign ref={formRef} defaultJson={formItem} onChange={(val) => {
          console.log('val:', val);
        }} />
      </Modal> : null}

      {!isEmpty(formItem) && <FormItem form={form} formData={formData} item={formItem} onFinish={onFinish} />}
    </>
  )
}

export default Demo
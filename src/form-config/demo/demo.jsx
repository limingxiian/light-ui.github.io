import React, { useRef, useState } from 'react';
import { FormConfig, FormItem } from "light-ui";
import { Button, Modal, message } from 'antd';
import { useForm } from 'form-render';

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
    day: {
      type: 'any',
      title: '日期',
      itemprops: {},
      widget: 'datePicker',
    },
    week: {
      type: 'any',
      title: '周',
      itemprops: {
        picker: 'week',
      },
      widget: 'datePicker',
    },
    month: {
      type: 'any',
      title: '月份',
      itemprops: {
        picker: 'month',
      },
      widget: 'datePicker',
    },
    quarter: {
      type: 'any',
      title: '季度',
      itemprops: {
        picker: 'quarter',
      },
      widget: 'datePicker',
    },
    year: {
      type: 'any',
      title: '年份',
      itemprops: {
        picker: 'year',
      },
      widget: 'datePicker',
    },
    time: {
      type: 'any',
      title: '时间',
      description: '时-分-秒',
      itemprops: {},
      widget: 'timePicker',
    },
    range: {
      type: 'any',
      title: '时间范围',
      description: '开始时间-结束时间',
      itemprops: {
        showTime: true,
      },
      widget: 'rangePicker',
    },
  },
}

const Demo = (props) => {
  const [json, setJson] = useState(schema);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const editorRef = useRef();
  const form = useForm();

  const getEditorInfo = (data) => {
    if (data?.getEditorInfo) {
      editorRef.current = data.getEditorInfo();
    }
  }

  const params = {}

  const handleCancel = () => {
    setOpen(false);
  }
  const handleSave = () => {
    // editorRef.current.validate().then(errors => {
    //   if (!errors?.length) {
    //     const value = editorRef.current.get();
    //     setJson(value);
    //     setOpen(false);
    //   } else {
    //     message.warn('请检查配置信息，校验不通过！');
    //   }
    // })

    const value = editorRef.current.get();
    setJson(value);
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
      <Button onClick={() => {
        setOpen(true);
      }}>表单编辑</Button>
      {open ? <Modal
        open={open}
        title="表单编辑"
        okText="保存"
        onOk={handleSave}
        cancelText="取消"
        onCancel={handleCancel}
      >
        <FormConfig json={json} jsonParams={params} getEditorInfo={getEditorInfo} />
      </Modal> : null}


      <FormItem form={form} formData={formData} item={json} onFinish={onFinish} />
    </>
  )
}

export default Demo
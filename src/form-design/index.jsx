/*
 * @description: 表单设计器
 * @Date: 2024-05-09 11:30:28
 * @LastEditTime: 2024-05-09 17:59:37
 * @FilePath: /light-ui/src/form-design/index.jsx
 */
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Generator from 'fr-generator';

const FormDesign = forwardRef((props, ref) => {
  const { defaultJson } = props;
  const designerRef = useRef();

  useImperativeHandle(ref, () => ({
    getValues: () => {
      return designerRef.current.getValue();
    },
  }));
  return (
    <>
      <Generator ref={designerRef} defaultValue={defaultJson} />
    </>
  )
})

export default FormDesign
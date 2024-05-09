import React, { useEffect, useRef } from 'react';
import JsonEditTool from '../components/JsonEditTool';
import { isEmpty } from "lodash";

const FormConfig = (props) => {
  const { json = {}, jsonParams = {}, getEditorInfo } =  props;
  const editorRef = useRef();

  //  获取编辑器api和方法
  useEffect(() => {
    if (editorRef.current) {
      getEditorInfo && getEditorInfo(editorRef.current);
    }
  }, [editorRef.current])
  return (
    <>
      <JsonEditTool ref={editorRef} jsonData={json} params={{
        onValidate: (json) => {
          let errors = [];
    
          if (json && !json.properties) {
            errors.push({
              path: ['properties'],
              message: 'Required property "properties" missing.'
            });
          }
          if (!isEmpty(json.properties)) {
            Object.keys(json.properties).map(key => {
              if (!json.properties[key]?.type) {
                errors.push({
                  path: [`${key}`],
                  message: 'Required property "type" missing.'
                });
              }
    
              if ((json.properties[key]?.widget && ![
                "input",
                "number",
                "textArea",
                "radio",
                "CustomCheckBox",
                "select",
                "treeSelect",
                "cascade",
                "imgUpload",
                "fileUpload",
                "datePicker",
                "rangePicker",
                "timePicker"
              ].includes(json.properties[key].widget)) || !json.properties[key]?.widget) {
                errors.push({
                  path: [`${key}`],
                  message: 'Required property "widget" missing.'
                });
              }
            });
          }
          console.log('errors:', errors);
    
          return errors;
        },
        ...jsonParams,
      }} />
    </>
  )
}

export default FormConfig
/*
 * @Description: json编辑器
 */
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import { isObject, isEmpty } from "lodash";

const JsonEditTool = forwardRef((props, ref) => {
  const { jsonData = {}, params = {} } = props;
  const jsonEditorRef = useRef();
  let editor;
  const options = {
    mode: 'code',
    mainMenuBar: false,
    ...params,
  }

  const initData = () => {
    editor = new JSONEditor(jsonEditorRef.current, options);
    if (isObject(jsonData) && !isEmpty(jsonData)) {
      // set json
      editor.set(jsonData)
    } else {
      editor.set({})
    }
  }

  const destroyEditor = () => {
    if (editor) {
      editor.destroy();
    }
  }

  useEffect(() => {
    initData();
    return destroyEditor;
  }, [jsonData])

  useImperativeHandle(
    ref,
    () => ({
      getEditorInfo: () => {
        try {
          return editor;
        } catch (error) {
          return '未获取到编辑器';
        }
      },
    }),
    [editor],
  );
  return (
    <div ref={jsonEditorRef} style={{ width: '100%', height: 400 }}></div>
  )
})

export default JsonEditTool
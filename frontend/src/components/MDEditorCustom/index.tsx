import React from 'react';
import MDEditor, { MDEditorProps, codeEdit, codePreview } from '@uiw/react-md-editor';

const MDEditorCustom = (props: MDEditorProps) => {
  return (
    <MDEditor id='settings-about' 
      preview='edit'
      extraCommands={[
        codeEdit,
        codePreview,
      ]}
      {...props}
    />
  );
}

export default MDEditorCustom;
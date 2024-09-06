import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => {
  return (
    <MonacoEditor
      height='80vh'
      language={language}
      value={value}
      onChange={(newValue) => onChange(newValue)}
      options={{
        selectOnLineNumbers: true,
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}

export default CodeEditor;

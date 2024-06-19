import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Function to adjust the size of the textarea
  const adjustTextareaSize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      textAreaRef.current.style.width = 'auto';
      textAreaRef.current.style.width = `${textAreaRef.current.scrollWidth}px`;
    }
  };

  useEffect(() => {
    // Detect variables in the text
    const varRegex = /\{\{\s*(\w+)\s*\}\}/g;
    const detectedVars = [...currText.matchAll(varRegex)].map(match => match[1]);
    setVariables(detectedVars);

    // Adjust textarea size whenever the text changes
    adjustTextareaSize();
  }, [currText]);

  return (
    <div style={{ border: '1px solid black', padding: '10px', position: 'relative', minWidth: '200px' }}>
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: `${(index + 1) * 20}px` }}
        />
      ))}
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Text:
          <textarea
            ref={textAreaRef}
            value={currText}
            onChange={handleTextChange}
            style={{ width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}
          />
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
};

export default TextNode;

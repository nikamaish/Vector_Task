// /src/nodes/BaseNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({ id, data, children, handles }) => {
  return (
    <div style={{ width: 200, height: 80, border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
      <div>{children}</div>
      {handles.map(handle => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </div>
  );
};

export default BaseNode;

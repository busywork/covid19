import React from 'react';

export default ({ options, selected, onChange }) => {
  return (
    <>
      <select value={selected} onChange={onChange}>
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};

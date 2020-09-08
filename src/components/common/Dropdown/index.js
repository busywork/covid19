import React from 'react';

export default ({ options, selected, onChange }) => {
  return (
    <>
      <label htmlFor="filter-select">Map by &nbsp;</label>
      <select id="filter-select" value={selected} onChange={onChange}>
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};

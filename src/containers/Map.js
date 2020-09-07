import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { map } from 'lodash';

import { Dropdown, Legend, Map, Switch } from '../components/common';
import Label from '../components/common/Switch/Label';

// prettier-ignore
const colorRange = ['#ffff00', '#fff300', '#ffe600', '#ffda00', '#ffcd00', '#ffc100', '#ffb400', '#ffa700', '#ff9a00', '#ff8c00'];

export default () => {
  const { current } = useSelector(state => (state.states ? state.states : null));
  const [dataKey, setDataKey] = useState('positiveIncrease');
  const [total, setTotal] = useState(map(current, dataKey));
  const [visible, setVisible] = useState(false);
  const [options] = useState([
    { label: 'Positive Increase', value: 'positiveIncrease' },
    { label: 'Positive Total', value: 'positive' },
    { label: 'Positive Per Capita', value: 'positivePerCapita' },
    { label: 'Tested Total', value: 'total' },
    { label: 'Tested Per Capita', value: 'totalPerCapita' },
    { label: 'Hospitalized Increase', value: 'hospitalizedIncrease' },
    { label: 'Hospitalized Currently', value: 'hospitalizedCurrently' },
    { label: 'Death Increase', value: 'deathIncrease' },
    { label: 'Death Total', value: 'death' },
    { label: 'Death Per Capita', value: 'deathPerCapita' },
  ]);

  useEffect(() => setTotal(map(current, dataKey)), [current, dataKey]);

  if (!current) return null;

  return (
    <div className="container d-flex flex-column">
      <div className="d-flex justify-content-center align-items-center mt-3">
        <Label checked={!visible} onClick={() => setVisible(!visible)} label="STATES" />
        <Switch checked={visible} onColor={'#86D3FF'} onChange={() => setVisible(!visible)} />
        <Label checked={visible} onClick={() => setVisible(!visible)} label="VALUES" />
      </div>

      <div className="d-flex justify-content-center align-items-center mt-3">
        <Dropdown options={options} selected={dataKey} onChange={e => setDataKey(e.target.value)} />
      </div>

      <Legend dataKey={dataKey} colorRange={colorRange} total={total} />
      <Map data={current} dataKey={dataKey} colorRange={colorRange} showValues={visible} />
    </div>
  );
};

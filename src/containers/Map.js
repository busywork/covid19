import React from 'react';
import { useSelector } from 'react-redux';

import Map from '../components/common/Map';

export default () => {
  const { data } = useSelector(state => (state.states ? state.states : null));
  // prettier-ignore
  const colorRange = ['#ffff00', '#fff300', '#ffe600', '#ffda00', '#ffcd00', '#ffc100', '#ffb400', '#ffa700', '#ff9a00', '#ff8c00'];

  if (!data) return null;

  return <Map data={data} colorRange={colorRange} showValues={true} dataKey={'positiveIncrease'} />;
};

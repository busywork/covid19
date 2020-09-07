import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { find } from 'lodash';

import { State } from '../containers';

const list = require('../utils/states-full.json');

export default () => {
  const { id } = useParams();
  const { state } = useSelector(({ states }) => {
    const value = find(list, ['code', id.toUpperCase()]) || find(list, ['slug', id.toLowerCase()]);
    const state = states.historic ? find(states.historic, { state: value.code }) : {};
    return { state };
  });

  if (!Object.keys(state).length) return null;

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <State {...state} />
        </div>
      </div>
    </div>
  );
};

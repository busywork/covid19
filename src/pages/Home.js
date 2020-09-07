import React from 'react';

import Daily from '../containers/Daily';
import Map from '../containers/Map';

export default () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Daily />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Map />
        </div>
      </div>
    </div>
  );
};

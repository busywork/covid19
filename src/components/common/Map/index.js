import React from 'react';
import { ComposableMap, Geographies, Geography, Marker, Annotation } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { scaleQuantile } from 'd3-scale';
import { map, find, round } from 'lodash';

import allStates from '../../../utils/states.json';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

export default ({ data, colorRange, showValues = false, dataKey }) => {
  const colorScale = scaleQuantile().domain(map(data, dataKey)).range(colorRange);

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => {
              const { name } = geo.properties;
              const state = find(data, { name });
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={state ? colorScale(state[dataKey]) : '#000'}
                  style={{ cursor: 'pointer' }}
                />
              );
            })}
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              const state = find(allStates, { name: geo.properties?.name });
              if (!state) return null;
              const stateData = find(data, { name: geo.properties?.name });
              const label = showValues ? round(stateData[dataKey]) : state.abbrev;
              return (
                <g key={geo.rsmKey + '-flag'}>
                  {state &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (!Object.keys(offsets).includes(state.abbrev) ? (
                      <Marker coordinates={centroid}>
                        <text y={2} fontSize={14} textAnchor="middle" fill={'#000'}>
                          {label}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[state.abbrev]?.[0]}
                        dy={offsets[state.abbrev]?.[1]}
                      >
                        <text x={4} fontSize={14} alignmentBaseline="middle" fill={'#000'}>
                          {label}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
      <style>{`
        .rsm-geography {
          cursor: pointer;
        }
        .rsm-geographies text {
          pointer-events: none;
        }
        .rsm-annotation path {
          stroke: #000 !important;
        }
      `}</style>
    </ComposableMap>
  );
};

// import { useMemo } from 'react';
// import { Layer, Source } from 'react-map-gl';
// import { Apparatus } from '../../models/incident';

// type Position = [longitude: number, latitude: number];

// const LINE_COLOR = '#ff5246';

// export function MapLine({
//     apparatus
// }: {
//     apparatus: Apparatus
// }) {
//   const positions = useMemo(() => {
//     const positions: Position[] = [];

//     let lastLocation = startingLocation;

//     for (const task of tasks) {
//       positions.push(
//         [lastLocation.longitude, lastLocation.latitude],
//         [task.location.longitude, task.location.latitude]
//       );
//       lastLocation = task.location;
//     }

//     return positions;
//   }, [tasks, startingLocation]);

//   return (
//     <Source
//       type="geojson"
//       data={{
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'LineString',
//           coordinates: taskPositions,
//         },
//       }}
//     >
//       <Layer
//         id="lineLayer"
//         type="line"
//         layout={{
//           'line-join': 'round',
//           'line-cap': 'round',
//         }}
//         paint={{
//           'line-width': 5,
//           'line-color': LINE_COLOR,
//         }}
//       />
//     </Source>
//   );
// }

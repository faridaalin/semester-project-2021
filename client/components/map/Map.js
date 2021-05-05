import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './map.module.css';

function Map() {
  const mapStyle = {
    width: '100%',
    height: '100%',
  };

  const LAT = 60.3905;
  const LONG = 5.31914;

  const [viewport, setViewport] = useState({
    latitude: LAT,
    longitude: LONG,
    zoom: 15,
    bearing: 0,
    pitch: 0,
  });
  console.log('token', process.env.NEXT_PUBLIC_MAPBOX_TOKEN);

  return (
    <div className={styles.container}>
      <ReactMapGL
        {...viewport}
        {...mapStyle}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={setViewport}
        marker={Marker}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <Marker
          offsetTop={-48}
          offsetLeft={-24}
          latitude={LAT}
          longitude={LONG}
        >
          <img src=' https://img.icons8.com/color/48/000000/marker.png' />
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default Map;

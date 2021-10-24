import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
//import "./App.css";
import React from "react";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWVlcGFuZGEiLCJhIjoiY2t0c2lhbjNlMWdvdjMwbWgzazcwdTgzNyJ9.8Eg5ZF3U0sZDQHVjpiZAAA";
class MapTest01 extends React.Component {
  state = {
    viewport: {
      latitude: 37.7577,
      longitude:  -122.4376,
      zoom: 12
    }
  };
  myMap = React.createRef();

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  render() {
    console.log(this.state.viewport);
    return (
      <div>
        <ReactMapGL
          ref={this.myMap}
          {...this.state.viewport}
          width="600px"
          height="80vh"
          onViewportChange={this.handleViewportChange}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Geocoder
            position="top-left"
            mapRef={this.myMap}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onViewportChange={this.handleViewportChange}
          />
          <GeolocateControl />
          <NavigationControl />
        </ReactMapGL>
      </div>
    );
  }
}

export default MapTest01;
import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Row } from "reactstrap";

import GoogleMapReact from "google-map-react";

class Maps extends React.Component {
  static defaultProps = {
    center: {
      lat: 21.031616,
      lng: 105.803496
    },
    zoom: 14
  };

  getMapOptions = maps => {
    return {
      fullscreenControl: true,
      mapTypeControl: true,
      mapTypeId: maps.MapTypeId.ROADMAP,
      scaleControl: true,
      scrollwheel: false,
      streetViewControl: true
    };
  };

  renderMarkers(map, maps) {
    new maps.Marker(
      {
        position: {
          lat: 40.712784,
          lng: -74.005941
        },
        map,
        title: "Hello World!",
        name: 'Dolores park'
      }
    );
  }
  onMarkerClick(marker) {
    window.location = '/post'
  }
  render() {
    return (
      <Row style={{ width: '100%', height: 250 }} className="mb-2 pl-3">
        <GoogleMapReact
          options={this.getMapOptions}
          bootstrapURLKeys={{
            key: "AIzaSyA-aWrwgr64q4b3TEZwQ0lkHI4lZK-moM4"
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}

          label={"hello"}
        />
      </Row>

    );
  }
}

export default Maps;

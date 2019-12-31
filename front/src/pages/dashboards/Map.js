import React from "react";
import { Card, CardBody } from "reactstrap";

import GoogleMapReact from "google-map-react";

class Map extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      data: data,
      activeTab: '1'
    };
  }
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

  renderMarkers(sub_id, lat, lng, map, maps) {
    new maps.Marker({
      position: {
        lat: lat,
        lng: lng
      },
      map,
      title: sub_id
    });
  }
  render() {
    const location = this.props.data.location;
    const sub_id = this.props.data.sub_id;
    let lat = "asdfghj"
    let lng = "asdadsf"
    return (
      <Card>
        <CardBody>
          <div style={{ height: 478, width: "100%" }}>
            <GoogleMapReact
              options={this.getMapOptions}
              bootstrapURLKeys={{
                key: "AIzaSyA-aWrwgr64q4b3TEZwQ0lkHI4lZK-moM4"
              }}
              defaultCenter={{
                lat: lat,
                lng: lng
              }}
              defaultZoom={9}
              onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(sub_id, lat, lng, map, maps)}
            />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Map;

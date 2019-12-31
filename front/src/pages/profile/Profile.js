import React from "react";
import Notification from "../../components/Notification";
import {
  Col, Container, Row,
} from "reactstrap";
import LoadingSprinner from "../../components/LoadingSprinner"
import ProfDetails from "./ProfDetails.js"
import ProfActivities from "./ProfActivities.js"
const api = require('./api/api');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      countProject: 0,
      countContact: 0,
      id: "",

      checkMainAcc: window.location.search.substring(7, window.location.search.length),
      loadApiGetUser: false,
      loadApigetStats: false,
      notFound : false,
    }
  }

  componentWillMount() {
    api.getUserInfo(this.state.checkMainAcc, (err, result) => {
      if (err) {
        Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
        this.setState({notFound : true, isLoaded : true})
      }
      else {
        console.log(result);
        
        this.setState(
          {
            email: result.email,
            avatar: result.photo,
            fullname: result.full_name,
            phone_number: result.phone_number,
            address: result.address,
            gender: result.gender,
            date_joined: result.date_joined,
            id: result._id,
            farms: result.farms,
            loadApiGetUser: true,
          });
      }
    });
  }

  render() {
    if (window.location.search.substring(7, window.location.search.length) !== this.state.checkMainAcc) window.location.reload();
    return (
      <React.Fragment>
        {((window.location.search.substring(0,7) !== "?email=" && window.location.search !== "") || this.state.notFound)  ?null :
          <React.Fragment>
          { (!this.state.loadApiGetUser) ? <LoadingSprinner/> : 
            <Container fluid className="p-0">
              <React.Fragment>
                <h1 className="h3 mb-3">Tiểu Sử</h1>
                <Row>
                  <Col md="4" xl="3">
                      <ProfDetails countProject={this.state.countProject} countContact={this.state.countContact} avatar={this.state.avatar} fullname={this.state.fullname} email={this.state.email} phone_number={this.state.phone_number} address={this.state.address} gender={this.state.gender} date_joined={this.state.date_joined} farms={this.state.farms}  />
                  </Col>
                  <Col md="8" xl="9">
                    <ProfActivities id={this.state.id} />
                  </Col>
                </Row>
              </React.Fragment>
            </Container>}
          </React.Fragment> }
      </React.Fragment>
    )
  }
}

export default Profile
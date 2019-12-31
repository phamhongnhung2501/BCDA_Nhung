import React from "react";
import { Col, Card, CardBody, CardHeader, Row, Media } from "reactstrap";
import { Slack, TrendingUp, Zap } from "react-feather";
import './Db.css';
import './DomCssTable.css';
import { Droplet, Thermometer, Activity, Square, AlertTriangle } from "react-feather";
class Statistics extends React.Component {
  ConvertHum1() {
    if (this.props.data.H1 >= this.props.info.stage.min_hum && this.props.data.H1 < this.props.info.stage.max_hum) {
      return "medium_sensor";
    }
    else if (this.props.data.H1 < this.props.info.stage.min_hum) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertHum2() {

    if (this.props.data.H2 >= this.props.info.stage.min_hum && this.props.data.H2 < this.props.info.stage.max_hum) {

      return "medium_sensor";
    }
    else if (this.props.data.H2 < this.props.info.stage.min_hum) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }

  }
  ConvertHum3() {

    if (this.props.data.H3 >= this.props.info.stage.min_hum && this.props.data.H3 < this.props.info.stage.max_hum) {

      return "medium_sensor";
    }
    else if (this.props.data.H3 < this.props.info.stage.min_hum) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }

  }
  ConvertHum4() {

    if (this.props.data.H4 >= this.props.info.stage.min_hum && this.props.data.H4 < this.props.info.stage.max_hum) {

      return "medium_sensor";
    }
    else if (this.props.data.H4 < this.props.info.stage.min_hum) {
      return "low_sensor";
    }
    else {
      return "high_sensor";
    }

  }
  ConvertPH1() {

    if (this.props.data.PH1 >= this.props.info.stage.min_PH && this.props.data.PH1 < this.props.info.stage.max_PH) {

      return "medium_sensor";
    }
    else if (this.props.data.PH1 < this.props.info.stage.min_PH) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertPH2() {

    if (this.props.data.PH2 >= this.props.info.stage.min_PH && this.props.data.PH2 < this.props.info.stage.max_PH) {

      return "medium_sensor";
    }
    else if (this.props.data.PH2 < this.props.info.stage.min_PH) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertPH3() {

    if (this.props.data.PH3 >= this.props.info.stage.min_PH && this.props.data.PH3 < this.props.info.stage.max_PH) {

      return "medium_sensor";
    }
    else if (this.props.data.PH3 < this.props.info.stage.min_PH) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertPH4() {

    if (this.props.data.PH4 >= this.props.info.stage.min_PH && this.props.data.PH4 < this.props.info.stage.max_PH) {

      return "medium_sensor";
    }
    else if (this.props.data.PH4 < this.props.info.stage.min_PH) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertL1() {

    if (this.props.data.L1 >= this.props.info.stage.min_light && this.props.data.L1 < this.props.info.stage.max_light) {

      return "medium_sensor";
    }
    else if (this.props.data.L1 < this.props.info.stage.max_light) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertL2() {

    if (this.props.data.L2 >= this.props.info.stage.min_light && this.props.data.L2 < this.props.info.stage.max_light) {

      return "medium_sensor";
    }
    else if (this.props.data.L2 < this.props.info.stage.min_light) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertL3() {

    if (this.props.data.L3 >= this.props.info.stage.min_light && this.props.data.L3 < this.props.info.stage.max_light) {

      return "medium_sensor";
    }
    else if (this.props.data.L3 < this.props.info.stage.min_light) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertL4() {

    if (this.props.data.L4 >= this.props.info.stage.min_light && this.props.data.L4 < this.props.info.stage.max_light) {

      return "medium_sensor";
    }
    else if (this.props.data.L4 < this.props.info.stage.min_light) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertT1() {

    if (this.props.data.T1 >= this.props.info.stage.min_temp && this.props.data.T1 < this.props.info.stage.max_temp) {

      return "medium_sensor";
    }
    else if (this.props.data.T1 < this.props.info.stage.min_temp) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertT2() {

    if (this.props.data.T2 >= this.props.info.stage.min_temp && this.props.data.T2 < this.props.info.stage.max_temp) {

      return "medium_sensor";
    }
    else if (this.props.data.T2 < this.props.info.stage.min_temp) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertT3() {

    if (this.props.data.T3 >= this.props.info.stage.min_temp && this.props.data.T3 < this.props.info.stage.max_temp) {

      return "medium_sensor";
    }
    else if (this.props.data.T3 < this.props.info.stage.min_temp) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertT4() {

    if (this.props.data.T4 >= this.props.info.stage.min_temp && this.props.data.T4 < this.props.info.stage.max_temp) {

      return "medium_sensor";
    }
    else if (this.props.data.T4 < this.props.info.stage.min_temp) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertSM1() {

    if (this.props.data.SM1 >= this.props.info.stage.min_soil_moisture && this.props.data.SM1 < this.props.info.stage.max_soil_moisture) {

      return "medium_sensor";
    }
    else if (this.props.data.SM1 < this.props.info.stage.min_soil_moisture) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertSM2() {

    if (this.props.data.SM2 >= this.props.info.stage.min_soil_moisture && this.props.data.SM2 < this.props.info.stage.max_soil_moisture) {

      return "medium_sensor";
    }
    else if (this.props.data.SM1 < this.props.info.stage.min_soil_moisture) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertSM3() {

    if (this.props.data.SM3 >= this.props.info.stage.min_soil_moisture && this.props.data.SM3 < this.props.info.stage.max_soil_moisture) {

      return "medium_sensor";
    }
    else if (this.props.data.SM3 < this.props.info.stage.min_soil_moisture) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  ConvertSM4() {

    if (this.props.data.SM4 >= this.props.info.stage.min_soil_moisture && this.props.data.SM4 < this.props.info.stage.max_soil_moisture) {

      return "medium_sensor";
    }
    else if (this.props.data.SM4 < this.props.info.stage.min_soil_moisture) {
      return "low_sensor";
    }
    else {
      return "high_sensor ";
    }
  }
  render() {
    const { value_sensor, showT, data, info } = this.props;

    return (
      <div className="w-100">
        {/* ---------------------------- */}
        {/* <p onClick={() => {
          this.setState({ t: this.state.t + 1 })
          showT(this.state.t)

        }
        }>HELLO</p> */}
        {/* ----------------------------- */}
        <Row>
          <Col sm="4">
            <Card className="flex-fill">
              <CardHeader className=" border border-primary ">
                <div className="float-right">
                  <img src="https://image.flaticon.com/icons/svg/167/167745.svg" width={50} height={50} />
                </div>
                <h5 className="card-title mb-0 font-weight-bolder text__head--item">Ánh sáng</h5>
                <div className="badge badge-warning ml-4">%</div>
              </CardHeader>
              <CardBody className=" border border-primary">
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor">
                      <TrendingUp className="feather-md text-primary mb-1 mr-1" color="#7c7c80" />
                      L1
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertL1()}>{this.props.data.L1}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor">
                      <TrendingUp className="feather-md text-primary mb-1 mr-1" color="#7c7c80" />
                      L2
                    </h5>
                  </div>
                  <Media body>

                    <h5 className={this.ConvertL2()} >{this.props.data.L2}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor">
                      <TrendingUp className="feather-md text-primary mb-1 mr-1" color="#7c7c80" />
                      L3
                    </h5>
                  </div>
                  <Media body>

                    <h5 className={this.ConvertL3()} >{this.props.data.L3}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor">
                      <TrendingUp className="feather-md text-primary mb-1 mr-1" color="#7c7c80" />
                      L4
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertL4()} >{this.props.data.L4}</h5>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card className="flex-fill">
              <CardHeader className="border border-primary">

                <div className="float-right">
                  <img src="https://image.flaticon.com/icons/svg/1150/1150447.svg" width={50} height={50} />
                </div>
                <h5 className="card-title mb-0 font-weight-bolder text__head--item">PH </h5>
              </CardHeader>
              <CardBody className="border border-primary" >
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor">
                      <Slack className="feather-md mb-1 mr-1" color="#7c7c80" />PH1
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertPH1()}>{data.PH1}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor">
                      <Slack className="feather-md mb-1 mr-1" color="#7c7c80" />PH2
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertPH2()}>{data.PH2}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor">
                      <Slack className="feather-md mb-1 mr-1" color="#7c7c80" />PH3
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertPH3()}>{data.PH3}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor">
                      <Slack className="feather-md mb-1 mr-1" color="#7c7c80" />PH4
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertPH4()}>{data.PH4}</h5>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>

          <Col sm="4">
            <Card className="flex-fill ">
              <CardHeader className="border border-primary">
                <div className="float-right">
                  <img src="https://www.flaticon.com/premium-icon/icons/svg/2096/2096087.svg" width={50} height={50} />
                </div>
                <h5 className="card-title mb-0 font-weight-bolder text__head--item">Nhiệt độ</h5>
                <div className="badge badge-primary text-center ml-2">℃</div>
              </CardHeader>
              <CardBody className="border border-primary">
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor">
                      <Slack className="feather-md mb-1 mr-1" color="#7c7c80" />
                      T1
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertT1()}>{data.T1}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor">
                      <Slack className="feather-md mb-1 mr-1" color="#7c7c80" />
                      T2
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertT2()}>{data.T2}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor">
                      <Slack className="feather-md mb-1 mr-1" color="#7c7c80" />
                      T3
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertT3()}>{data.T3}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor">
                      <Slack className="feather-md mb-1 mr-1" color="#7c7c80" />
                      T4
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertT4()}>{data.T4}</h5>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <Card className="flex-fill card--border">
              <CardHeader className="border border-primary ">

                <div className="float-right">
                  <img src="https://image.flaticon.com/icons/svg/1779/1779817.svg " width={50} height={50} />
                </div>
                <h5 className="card-title mb-0 font-weight-bolder text__head--item">Độ ẩm không khí</h5>
                <div className="badge badge-success ml-4">%</div>
              </CardHeader>
              <CardBody className="border border-primary">
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor1">
                      <Zap className="feather-md text-primary mb-1 mr-1" color="#7c7c80" />

                      H1
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertL2()}>{data.H1}</h5>
                    {/* <h5 className={this.ConvertL1()}>{data.sensor_3.value}</h5> */}
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor1">
                      <Zap className="feather-md text-primary mb-1 mr-1" color="#7c7c80" />

                        H2
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertL2()}>{data.H2}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor1">
                      <Zap className="feather-md text-primary mb-1 mr-1" color="#7c7c80" />

                      H3
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertL3()}>{data.H3}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor1">
                      <Zap className="feather-md text-primary mb-1 mr-1" color="#7c7c80" />

                      H4
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertL4()}>{data.H4}</h5>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>

          <Col sm="6">
            <Card className="flex-fill ">
              <CardHeader className=" border border-primary">
                <div className="float-right">
                  <img src="http://home.bt.com/images/parrot-h2o-141827376937402601" width={50} height={50} />
                </div>
                <h5 className="card-title mb-0 font-weight-bolder text__head--item">Độ ẩm đất</h5>
                <div className="badge badge-success ml-4">%</div>
              </CardHeader>
              <CardBody className=" border border-primary">
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor1">
                      <Slack className="feather-md  mb-1 mr-1" color="#7c7c80" />
                      SM1
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertSM1()}>{data.SM1}</h5>
                    {/* <h5 className={this.ConvertSM1()}>{data.sensor_2.value}</h5> */}
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor1">
                      <Slack className="feather-md  mb-1 mr-1" color="#7c7c80" />
                      SM2
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertSM2()}>{data.SM2}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor1">
                      <Slack className="feather-md  mb-1 mr-1" color="#7c7c80" />
                      SM3
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertSM3()}>{data.SM3}</h5>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h5 className="font-weight-light text_sensor1">
                      <Slack className="feather-md  mb-1 mr-1" color="#7c7c80" />
                      SM4
                    </h5>
                  </div>
                  <Media body>
                    <h5 className={this.ConvertSM4()}>{data.SM4}</h5>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>

        </Row>

      </div>
    );
  }
}


export default Statistics;

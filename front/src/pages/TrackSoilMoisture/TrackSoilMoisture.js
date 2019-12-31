import React from "react";
import { Container, Row, Col, Table } from "reactstrap";
import socketIOClient from "socket.io-client";
import moment from 'moment';
import Notification from "../../components/Notification";
import TableForSoilMoisture from "./TableForSoilMoisture";
const config_socket = require("../../config/config").config_socket;
const utils = require("../../utils/utils");
const api = require("./api/api");
class TrackSoilMoisture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value_sensor: null,
      data_tables: [],
      data_charts: [],
      dataFault: {
        Fault: "00000000"
      },
      status: true,
      info: [],
      isLoaded: false,
      isLoaderAPI_EvaluationList: false,
      type: null,
      response: false,
      socket: true,
      from_date: "",
      to_date: "",
      endpoint: config_socket.ip,
    
    };
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeSocket = this.handleChangeSocket.bind(this);
  }

  handleChangeType(type) {
    this.setState({ type: type });
  }
  handleSearch(from, to) {
    this.setState({ from_date: from, to_date: to })
    const that = this;
    api.getDataReport(from, to, (err, result) => {
      if (err) {
        Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
      } else {
        console.log(result)
        let element = [];
        let data = [...result];
        data.map((values, index) => {
          let value = { ...values }
          value.time = moment(value.time).format('DD/MM/YYYY h:mm:ss a')
          element.push(value);
        });
        that.setState({ data_tables: element, data_charts: result, isLoaderAPI: true });
      }
    })
  }
  handleChangeSocket(socket) {
    if (socket === true) {
      this.setState({ socket: true });
    } else {
      this.setState({ socket: false });
    }
  }

  UNSAFE_componentWillMount() {
    const that = this;
    api.getData((err, result) => {
      if (err) {
        Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
      } else {
        let element = [];
        let data = [...result];
        data.map((values, index) => {
          let value = { ...values }
          value.time = moment(value.time).format('DD/MM/YYYY h:mm:ss')
          element.push(value);
        });
        if (data.length !== 0)
          that.setState({ data_tables: element, data: result[0], data_charts: result, isLoaderAPI: true, dataFault: result[0] });
      }

    })
  }
  componentDidMount() {
    const that = this;
    const { endpoint } = this.state;
    const sub_id = utils.getStationInfo().sub_id;
    const socket = socketIOClient(endpoint, {
      query: {
        token: utils.getAuthToken(),
        sub_id: sub_id
      }
    });
    socket.on("farm_" + sub_id, function (value) {

      that.setState({ data: value, data_charts: [...that.state.data_charts, value] })
      var length = that.state.data_charts.length;
      if (length >= 11) {
        that.state.data_charts.shift();
      }

      var value_table = Object.assign({}, value);
      var date = moment(value_table.time).format('DD/MM/YYYY h:mm:ss a');
      value_table["time"] = date
      that.setState({ data_tables: [...that.state.data_tables, value_table] })
      var lengtht = that.state.data_tables.length;
      if (lengtht >= 11) {
        that.state.data_tables.shift();
      }
    });
    socket.on('error', function (err) {
    });
    this.setState({ info: utils.getStationInfo(), isLoaded: true });
  }

  render() {
    console.log(this.state.data);
    return (
      !this.state.isLoaded ? <p className="text-center">Loading...</p> :
        <Container fluid className="p-0">
          <Row className="mx-0 mt-2 mb-4 px-0 !important Table--bg border">
            <Col lg="4" className="d-flex mt-4">
              <div className="Note--warning--low"> </div> <h6 className="ml-2 mt-2"> Độ ẩm đang ở mức thấp</h6>
            </Col>
            <Col lg="4" className="d-flex mt-4">
              <div className="Note--warning--high"> </div> <h6 className="ml-2 mt-2"> Độ ẩm đang ở mức cao</h6>
            </Col>
            <Col lg="4" className="d-flex mt-4">
              <div className="Note--warning--medium"> </div> <h6 className="ml-2 mt-2"> Độ ẩm đang ở mức trung bình</h6>
            </Col>
            <TableForSoilMoisture className="mt-5"
              data={this.state.data}
            />
             <h2 className="Table--lable--text text-center text-danger pb-5">Bảng theo dõi độ ẩm đất theo thời gian thực</h2>
          </Row>
          
        </Container>
    );
  }
}


export default TrackSoilMoisture;

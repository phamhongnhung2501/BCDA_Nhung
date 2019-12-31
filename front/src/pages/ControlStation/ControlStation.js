import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
} from "reactstrap";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { CustomImg } from "../../components/CustomTag";
import LightOff from "../../assets/img/photos/light_off.png";
import LightOn from "../../assets/img/photos/light_on.png";
import FantOff from "../../assets/img/photos/fan_off.png";
import FanOn from "../../assets/img/photos/fan_on.png";
import Temp from "../../assets/img/photos/temp.png";
import Soil from "../../assets/img/photos/soil.png";
import Hum from "../../assets/img/photos/hum.png";
import moment from "moment";
import "./ControlStation.css";
import Notification from "../../components/Notification";
import WetherStation from "./WetherStation";

const utils = require("../../utils/utils");
const config_socket = require("../../config/config").config_socket;
const api = require("./api/api");

let socket;
class Controlstation extends Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.state = {
            endpoint: config_socket.ip,
            data: {
                id: JSON.parse(localStorage.getItem("project")).sub_id,
                status: "O",
            },
            sensor1: {
                name: null,
                id: null,
                RF_signal: null,
            },
            sensor2: {
                name: null,
                id: null,
                RF_signal: null,
                battery: null,

            },
            sensor3: {
                name: null,
                id: null,
                RF_signal: null,
            },
        };
        socket = socketIOClient(this.state.endpoint);
    }
    send(name, status) {
        let data = {};
        data.id = name;

        data.status = status;
        console.log(data);

        socket.emit("controller", data);
    }

    componentDidMount() {
        const that = this;
        const { endpoint } = this.state;
        const sub_id = utils.getStationInfo().sub_id;
        const socket = socketIOClient(endpoint, {
            query: {
                token: utils.getAuthToken(),
                sub_id: sub_id,
            },
        });
        socket.on("farm_" + sub_id, function(value) {
            that.setState({
                sensor1: value.sensor_1,
                sensor2: value.sensor_2,
                sensor3: value.sensor_3,
                time: value.time,
            });
        });
        socket.on("controller_" + sub_id, function(value) {
            that.setState({
                RL1: value.RL1_status,
                RL2: value.RL2_status,
                GW_name: value.id,
            });
        });
        socket.on("error", function(err) {});
        api.getData((err, result) => {
            if (err) {
                Notification(
                    "error",
                    "Error",
                    err.data === undefined ? err : err.data._error_message,
                );
            } else {
                if(result.length > 0){
                }
            
            }
        });
    }

    render() {
        let location = JSON.parse(localStorage.getItem("project")).sub_id;
        const { sensor1, sensor2, sensor3, RL1, RL2, GW_name, time } = this.state;
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <div className=' d-inline '>
                            <h3 className='text-center font-weight-bold'>Thời gian cập nhập vào nhà kính {location}:</h3>
                            <h4 className='text-success text-center'>
                                {moment(time).format("DD/MM/YYYY h:mm:ss a")}
                            </h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Row className="mt-4" >
                            <Col xs="8" className="cotrol-station__sensor">
                            <WetherStation/>
                            </Col>
                        </Row>         
                        <Row className="mt-4" >
                            <Col xs='12' md='8' sm='12' className="cotrol-station__sensor">
                                <Card body outline color='primary'>
                                    {/* <h2 className='text-center'>Cảm biến 1</h2> */}
                                    <CardBody>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='success'>
                                                    &ensp;&ensp;Tên&ensp;&ensp;
                                                </Button>
                                            </InputGroupAddon>
                                            <Input
                                                className='font-weight-bold'
                                                value={sensor1.name}
                                                disabled
                                            />
                                        </InputGroup>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='danger'>
                                                    &ensp;&ensp;ID&ensp;&ensp;&ensp;
                                                </Button>
                                            </InputGroupAddon>
                                            <Input
                                                className='font-weight-bold'
                                                value={sensor1.id}
                                                disabled
                                            />
                                        </InputGroup>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='primary'>Tín hiệu</Button>
                                            </InputGroupAddon>
                                            <Input
                                                className='font-weight-bold text-success'
                                                value={sensor1.RF_signal}
                                                disabled
                                            />
                                        </InputGroup>

                                        <Row className='mt-5'>
                                            <Col xs='12' md='6' sm='12'>
                                                <CustomImg
                                                    key={utils.randomString()}
                                                    src={RL1 === "01" ? LightOn : LightOff}
                                                    alt='button'
                                                    width={200}
                                                    height={200}
                                                    className='img-fluid'
                                                />
                                                <div className='d-flex justify-content-center mt-3 d-inline '>
                                                    <Button
                                                        className='mr-3'
                                                        color='danger'
                                                        size='md'
                                                        onClick={() => {
                                                            this.send(GW_name, "00");
                                                        }}>
                                                        Tắt đèn
                                                    </Button>
                                                    <Button
                                                        className=''
                                                        color='success'
                                                        size='md'
                                                        onClick={() => {
                                                            this.send(GW_name, "01");
                                                        }}>
                                                        Bật đèn
                                                    </Button>
                                                </div>
                                            </Col>
                                            <Col xs='12' md='6' sm='12'>
                                                <CustomImg
                                                    key={utils.randomString()}
                                                    src={RL2 === "11" ? FanOn : FantOff}
                                                    alt='button'
                                                    width={200}
                                                    height={200}
                                                    className='img-fluid'
                                                />
                                                <div className='d-flex justify-content-center mt-3 d-inline '>
                                                    <Button
                                                        className='mr-3'
                                                        color='danger'
                                                        size='md'
                                                        onClick={() => {
                                                            this.send(GW_name, "10");
                                                        }}>
                                                        Tắt máy bơm
                                                    </Button>
                                                    <Button
                                                        className=''
                                                        color='success'
                                                        size='md'
                                                        onClick={() => {
                                                            this.send(GW_name, "11");
                                                        }}>
                                                        Bật máy bơm
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default Controlstation;

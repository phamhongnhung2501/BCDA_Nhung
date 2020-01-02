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
import Notification from "../../components/Notification";

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
                    // that.setState({
                    //     sensor1: result[0].sensor_1,
                    //     sensor2: result[0].sensor_2,
                    //     sensor3: result[0].sensor_3,
                    //     time: result[0].time,
                    // });
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
                        <h1 className='text-center font-weight-bold d-inline mt-4'>
                            Nhà kính {location}
                        </h1>
                        <div className='float-right d-inline '>
                            <h4 className='text-center font-weight-bold'>Thời gian cập nhập:</h4>
                            <h4 className='text-success'>
                                {moment(time).format("DD/MM/YYYY h:mm:ss a")}
                            </h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs='12' md='4' sm='12'>
                                <Card body outline color='primary'>
                                    <h2 className='text-center'>Cảm biến 1</h2>
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
                                                <h4 className='text-center'>Đèn 1</h4>
                                                <CustomImg
                                                    key={utils.randomString()}
                                                    src={RL1 === "01" ? LightOn : LightOff}
                                                    alt='button'
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
                                                <h4 className='text-center'>Đèn 2</h4>
                                                <CustomImg
                                                    key={utils.randomString()}
                                                    src={RL2 === "11" ? FanOn : FantOff}
                                                    alt='button'
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
                                                        Tắt máy
                                                    </Button>
                                                    <Button
                                                        className=''
                                                        color='success'
                                                        size='md'
                                                        onClick={() => {
                                                            this.send(GW_name, "11");
                                                        }}>
                                                        Bật máy
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xs='12' md='4' sm='12'>
                                <Card body outline color='primary'>
                                    <h2 className='text-center'>Cảm biến 2</h2>
                                    <CardBody>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='success'>
                                                    &ensp;&ensp;Tên&ensp;&ensp;
                                                </Button>
                                            </InputGroupAddon>
                                            <Input
                                                className='font-weight-bold'
                                                value={sensor2.name}
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
                                                value={sensor2.id}
                                                disabled
                                            />
                                        </InputGroup>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='primary'>Tín hiệu</Button>
                                            </InputGroupAddon>
                                            <Input
                                                className='font-weight-bold text-success'
                                                value={sensor2.RF_signal}
                                                disabled
                                            />
                                        </InputGroup>
                                        <Card>
                                            <Row>
                                                <Col xs='3 ' boder>
                                                    <CustomImg
                                                        key={utils.randomString()}
                                                        src={Temp}
                                                        alt='button'
                                                        className='img-fluid  my-1 ml-2'
                                                    />
                                                </Col>
                                                <Col xs='9 my-auto'>
                                                    <h4 className='text-center text-danger float-left font-weight-bold'>
                                                        Nhiệt độ: {sensor2.EOC} °C
                                                    </h4>
                                                </Col>
                                            </Row>
                                        </Card>
                                        <Card>
                                            <Row>
                                                <Col xs='3 ' boder>
                                                    <CustomImg
                                                        key={utils.randomString()}
                                                        src={Soil}
                                                        alt='button'
                                                        className='img-fluid my-1 ml-2'
                                                        size='1x'
                                                    />
                                                </Col>
                                                <Col xs='9 my-auto'>
                                                    <h4 className='text-center text-primary float-left font-weight-bold'>
                                                        Độ ẩm đất: {sensor2.value} %
                                                    </h4>
                                                </Col>
                                            </Row>
                                        </Card>
                                        <h4 className='font-weight-bold'>Pin</h4>
                                        <Progress
                                            percent={sensor2.battery === null ? 0 : sensor2.battery}
                                        />
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xs='12' md='4' sm='12'>
                                <Card body outline color='primary'>
                                    <h2 className='text-center'>Cảm biến 3</h2>
                                    <CardBody>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='success'>
                                                    &ensp;&ensp;Tên&ensp;&ensp;
                                                </Button>
                                            </InputGroupAddon>
                                            <Input
                                                className='font-weight-bold'
                                                value={sensor3.name}
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
                                                value={sensor3.id}
                                                disabled
                                            />
                                        </InputGroup>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='primary'>Tín hiệu</Button>
                                            </InputGroupAddon>
                                            <Input
                                                className='font-weight-bold text-success'
                                                value={sensor3.RF_signal}
                                                disabled
                                            />
                                        </InputGroup>
                                        <Card>
                                            <Row>
                                                <Col xs='3 ' boder>
                                                    <CustomImg
                                                        key={utils.randomString()}
                                                        src={Temp}
                                                        alt='button'
                                                        className='img-fluid  my-1 ml-2'
                                                    />
                                                </Col>
                                                <Col xs='9 my-auto'>
                                                    <h4 className='text-center text-danger float-left font-weight-bold'>
                                                        Nhiệt độ: {sensor3.EOC} °C
                                                    </h4>
                                                </Col>
                                            </Row>
                                        </Card>
                                        <Card>
                                            <Row>
                                                <Col xs='3 ' boder>
                                                    <CustomImg
                                                        key={utils.randomString()}
                                                        src={Hum}
                                                        alt='button'
                                                        className='img-fluid  my-1 ml-2'
                                                    />
                                                </Col>
                                                <Col xs='9 my-auto'>
                                                    <h4 className='text-center text-primary float-left font-weight-bold'>
                                                        Độ ẩm: {sensor3.value} %
                                                    </h4>
                                                </Col>
                                            </Row>
                                        </Card>
                                        <h4 className='font-weight-bold'>Pin</h4>
                                        <Progress
                                            percent={sensor3.battery === null ? 0 : sensor3.battery}
                                        />
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
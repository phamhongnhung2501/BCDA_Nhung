import React from "react";
import $ from "jquery";
import { 
    FormFeedback, 
    Badge, Button,
    Card, CardBody, CardHeader, CardTitle, 
    Col, 
    FormGroup,
    Input, Label, Row, 
    Modal, ModalHeader, ModalBody, ModalFooter,
    DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown, 
} from "reactstrap";
// import "./General.css";
import {
    Tabs, Tab
  } from "react-bootstrap";
import Notification from "../../components/Notification";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Moment from 'react-moment';
import 'moment-timezone';
const api = require("./api/api");
const utils = require("../../utils/utils");


class Config extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                stage_1: {

                },
                stage_2: {

                },
                stage_3: {

                },
                stage_4: {

                }
            },
            isLoaded: false,
            modal: false,
            modalInputPass: false,
            modalCloseAll: false,
            changeName: null,
            changeDescription: null,
            changeIsPrivate: null,
            changeLogo: null,
            tempLogo: null
        };
        this.handleChange = this.handleChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.toggleInputPass = this.toggleInputPass.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
    }

    handleChangeDate(data){
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                // created_date: data.created_date
                started_plant: data.started_plant
            }
        }))
    }
    handleChange(event) {
        let data  = Object.assign({}, this.state.data, this.state.data.stage_1, this.state.data.stage_2, this.state.data.stage_3, this.state.data.stage_4);
        let obj = event.target.name.split(".")[0]
        let key = event.target.name.split(".")[1]
        console.log(obj)
        console.log(key)
        console.log(data);
        
        if(obj === 'stage_1')
            data.stage_1[key] = event.target.value;
        else if(obj === 'stage_2')
            data.stage_2[key] = event.target.value;
        else if(obj === 'stage_3')
            data.stage_3[key] = event.target.value;
        else if(obj === 'stage_4')
            data.stage_4[key] = event.target.value;
        else
            data[event.target.name] = event.target.value;
        this.setState({ data: data });
    }

    handleChangeType(type) {
        this.setState({
            changeIsPrivate: type === "private"
        });
    }


    handleSaveChange() {
        api.modifyStation(this.state.data.sub_id, this.state.data, (err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.status + ' ' + err.data._error_message)
            } else {
                // --------sau khi thay doi va update ok
                console.log(result);

                localStorage.setItem('project', JSON.stringify(result));
                Notification("success", "Edit Station", "Edit station is successfully");
            }
        })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    toggleInputPass() {
        this.setState({
            modalInputPass: !this.state.modalInputPass,
            modalCloseAll: false
        });
    }
    handleDelProject() {
        api.deleteStation(this.state.data.sub_id, (err, result) => {
            if (err) {
                console.log(err)
                Notification("error", "Error", err.data === undefined ? err : err.status + ' ' + err.data._error_message)
            } else {
                window.location.replace('/stations')
            }
        })
    }
    componentDidMount() {
        const that = this;
        api.getConfig(utils.getStationInfo().sub_id, (err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
            } else {
                console.log(result);
                that.setState({
                    data: result
                })
                localStorage.setItem('project', JSON.stringify(result));
            }
        });
    }

    render() {
        let {manager} = this.state.data;
        console.log("render trong ham render--->created_date");
        
        console.log(this.state.data);
        
        return (
            // !this.state.isLoaded ? null :
            <Card className="admin__general__card">
                <CardBody>
                    <Row>
                        <Col md="2" >
                            <Row>
                                <Col>
                                    <Button type="button" color="warning" onClick={this.handleSaveChange.bind(this)}>Lưu thay đổi</Button>
                                </Col>
                            </Row>
                           
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="mt-3">
                        <Tabs defaultActiveKey="g1" >
                            <Tab eventKey="g1" title="Ươm hạt " >
                                <Card className="flex-fill w-100" style={{ height: 400, width: "100%" }}>
                                <CardBody className="my-0">
                                    <Row>
                                        <Col xs="4" > 
                                            Tổng số ngày : 
                                        </Col>
                                        <Col xs="4" className="text-center station__stage-date"> 
                                            <Input
                                                type="number" name="stage_1.stage_days"
                                                placeholder="Tổng số ngày"
                                                defaultValue={this.state.data.stage_1.stage_days}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Nhiệt độ : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="stage_1.min_temp"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_1.min_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="stage_1.max_temp"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_1.max_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Độ ẩm không khí : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_hum"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_1.min_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                type="number" name="max_hum"                                            
                                                placeholder="lớn nhất"
                                                defaultValue={this.state.data.stage_1.max_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Độ ẩm đât : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                type="number" name="min_soil_moisture"                                            
                                                placeholder="nhỏ nhất"
                                                defaultValue={this.state.data.stage_1.min_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_soil_moisture"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_1.max_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Ánh sáng : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_light"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_1.min_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_light"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_1.max_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            PH : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_PH"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_1.min_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            /> 
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_PH"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_1.max_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                </Card>
                            </Tab>
                            <Tab eventKey="g2" title="Ra hoa">
                                <Card className="flex-fill w-100" style={{ height: 400, width: "100%" }}>
                                <CardBody className="my-0">
                                    <Row>
                                        <Col xs="4" > 
                                            Tổng số ngày : 
                                        </Col>
                                        <Col xs="4" className="text-center station__stage-date"> 
                                            <Input
                                                // type="number" name="stage_days"                                            
                                                placeholder="Nhập tổng số ngày trồng"
                                                // defaultValue={this.state.data.stage_2.stage_days}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Nhiệt độ : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_temp"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_2.min_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_temp"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_2.max_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Độ ẩm không khí : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_hum"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_2.min_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_hum"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_2.max_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Độ ẩm đât : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_soil_moisture"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_2.min_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_soil_moisture"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_2.max_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Ánh sáng : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_light"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_2.min_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_light"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_2.max_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            PH : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_PH"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_2.min_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            /> 
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_PH"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_2.max_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                </Card>
                            </Tab>
                            <Tab eventKey="g3" title="Phát triển">
                                <Card className="flex-fill w-100" style={{ height: 400, width: "100%" }}>
                                <CardBody className="my-0">
                                    <Row>
                                        <Col xs="4" > 
                                            Tổng số ngày : 
                                        </Col>
                                        <Col xs="4" className="text-center station__stage-date"> 
                                            <Input
                                                // type="number" name="stage_days"                                            
                                                placeholder="Nhập tổng số ngày trồng"
                                                // defaultValue={this.state.data.stage_3.stage_days}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Nhiệt độ : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_temp"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_3.min_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_temp"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_3.max_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Độ ẩm không khí : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_hum"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_3.min_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_hum"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_3.max_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Độ ẩm đât : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_soil_moisture"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_3.min_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_soil_moisture"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_3.max_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Ánh sáng : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_light"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_3.min_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_light"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_3.max_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            PH : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_PH"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_3.min_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            /> 
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_PH"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_3.max_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                </Card>
                            </Tab>
                            <Tab eventKey="g4" title="Thu hoạch">
                                <Card className="flex-fill w-100" style={{ height: 400, width: "100%" }}>
                                <CardBody className="my-0">
                                    <Row>
                                        <Col xs="4" > 
                                            Tổng số ngày : 
                                        </Col>
                                        <Col xs="4" className="text-center station__stage-date"> 
                                            <Input
                                                // type="number" name="stage_days"                                            
                                                placeholder="Nhập tổng số ngày trồng"
                                                // defaultValue={this.state.data.stage_4.stage_days}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Nhiệt độ : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_temp"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_4.min_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_temp"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_4.max_temp}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Độ ẩm không khí : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_hum"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_4.min_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_hum"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_4.max_hum}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Độ ẩm đât : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_soil_moisture"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_4.min_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_soil_moisture"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_4.max_soil_moisture}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            Ánh sáng : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_light"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_4.min_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />  
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_light"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_4.max_light}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4" className="mt-4">
                                            PH : 
                                        </Col>
                                        <Col xs="4" className="mt-4">
                                            <Input
                                                // type="number" name="min_PH"                                            
                                                placeholder="nhỏ nhất"
                                                // defaultValue={this.state.data.stage_4.min_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            /> 
                                        </Col>
                                        <Col xs="4" className="mt-4"> 
                                            <Input
                                                // type="number" name="max_PH"                                            
                                                placeholder="lớn nhất"
                                                // defaultValue={this.state.data.stage_4.max_PH}
                                                onChange={this.handleChange}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                </Card>
                            </Tab>
                        </Tabs>
                        </Col>
                    </Row>
                    
                </CardBody>
            </Card>
        )
    }
}

export default Config;

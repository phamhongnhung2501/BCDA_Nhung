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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas, faKey, faTags } from "@fortawesome/free-solid-svg-icons";
import "./General.css";
import {
    Tabs, Tab
  } from "react-bootstrap";
import Notification from "../../components/Notification";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Moment from 'react-moment';
import 'moment-timezone';
const api = require("./api/api");
const utils = require("../../utils/utils");

class DateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
          selectedDay: undefined,
        };
      }
    
      handleDayChange(day) {
        this.setState({ selectedDay: day });
        const data = {
            
            // created_date: day,
            started_plant: day,

        }
        this.props.handleChangeDate(data)
      }
    
      render() {
        const { selectedDay } = this.state;
        const { data } = this.props;
        // console.log(data.created_date);
          console.log(data.started_plant);
        
        return (
          <div>
            {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
            {!selectedDay && <p>Thay đổi ngày bắt đầu</p>}
            <DayPickerInput onDayChange={this.handleDayChange} />
          </div>
        );
      }
}
class General extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            full_name: "",

            data: {
                // created_date: "",
                started_plant: "",
                manager: {
                },
                status: {

                },
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
        // let data = Object.assign({}, this.state.data);
        // data.is_private = type === "private";
        // this.setState({data: data})
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
        api.getInfoProject(utils.getStationInfo().sub_id, (err, result) => {
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
        api.getListSeed((err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.data._error_message);
            } else {
                that.setState({ listSeed: result });
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
                        <Col md="8">
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="inputStationName">Tên trang trại</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Station name"
                                            autoComplete="off"
                                            defaultValue={this.state.data.name}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_manager">Quản lý</Label>
                                        <Input
                                            type="text" name="manager"
                                            placeholder="Name of manager"
                                            defaultValue={this.state.data.manager.full_name}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <Label>Giống cây trồng</Label>
                                    <Input
                                        disabled
                                        type="text" name="seed_name"
                                        placeholder="Giống cây trồng"
                                        defaultValue={
                                            this.state.data.seed_name === "tomato" ? "Cà chua" : ""||
                                            this.state.data.seed_name === "cucumber" ? "Dưa chuột" : ""||
                                            this.state.data.seed_name === "pakchoi" ? "Cải ngọt" : ""||
                                            this.state.data.seed_name === "brassica" ? "Cải chíp" : ""||
                                            this.state.data.seed_name === "cabbage" ? "Bắp cải" : ""
                                        }
                                        onChange={this.handleChange}
                                        autoComplete="off"
                                    />
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_address">Số điện thoại</Label>
                                        <Input
                                            disabled
                                            type="text" name="phone_number"
                                            placeholder="Phone number"
                                            defaultValue={this.state.data.manager.phone_number}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label for="name_of_address">Địa chỉ</Label>
                                        <Input
                                            type="text" name="address"
                                            placeholder="Địa chỉ"
                                            defaultValue={this.state.data.address}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label for="name_of_address">Gateway</Label>
                                        <Input
                                            disabled
                                            type="text" name="sub_id"
                                            placeholder="sub_id"
                                            defaultValue={this.state.data.sub_id}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        {/* <Label>{this.state.data.started_plant}</Label> */}
                                        <DateTimePicker 
                                            className="ml-1"
                                            data = {this.state.data.started_plant}
                                            handleChangeDate = {this.handleChangeDate}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                            <FormGroup>
                            
                        </FormGroup>
                       
                            </Row>
                        </Col>
                        <Col md="4" className="mt-3">
                            <Row>
                            <img
                                className="admin_image mb-3"
                                src= "https://making-the-web.com/sites/default/files/clipart/170069/agriculture-png-transparent-images-170069-7598577.png"
                            />
                            </Row>
                            <Row>
                                <Col md="6" className="admin__button-save">
                                    <Button type="button" color="primary" onClick={this.handleSaveChange.bind(this)}>Lưu thay đổi</Button>
                                </Col>
                                <Col md="6" className="admin__button-save">
                                    <Button type="button" color="danger" onClick={this.toggle}>Xóa vườn ươm</Button>
                                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                        <ModalHeader>Confirm</ModalHeader>
                                        <ModalBody>Bạn có chắc chắn xóa trang trại này không?</ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={this.toggle}>Quay lại</Button>
                                            <Button color="success" onClick={this.handleDelProject.bind(this)}>Đồng ý</Button>
                                        </ModalFooter>
                                    </Modal>
                                </Col>
                            </Row>
                           
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default General;

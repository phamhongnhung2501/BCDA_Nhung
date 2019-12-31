import React, { Component } from 'react';
import Notification from "../../components/Notification";
import LoadingSprinner from "../../components/LoadingSprinner"
import { Button, Card, CardBody, CardHeader, CardTitle, FormGroup, Form, Label, Input, Modal, ModalBody, ModalFooter } from "reactstrap";
import { FileText, Phone, MessageSquare, User, Mail, Camera, MapPin, Users } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { CustomImg } from "../../components/CustomTag"
import "./Profile.css"
import moment from 'moment';
const api = require('./api/api');
class ProfDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkMainAcc: window.location.search.substring(10, window.location.search.length),
            tempAvt: null,
            isLoadedImg: true,      //wait api update avatar
            isLoadedInfo: true,     //wait api update info
            data: this.props.data,  //info user
            submitted: false,  
            fileUpdateAvt: null,
        

            avatar: this.props.avatar,
            email: this.props.email,
            fullname: this.props.fullname,
            gender: this.props.gender,
            phone_number: this.props.phone_number,
            address: this.props.address,
            date_joined: this.props.date_joined,
            farms: this.props.farms,

            changeFullname: this.props.fullname,
            changeGender: this.props.gender,
            changePhone_number: this.props.phone_number,
            changeAddress: this.props.address,

            modal: false,
        }
        this.updateUser = this.updateUser.bind(this)
        this.toggle = this.toggle.bind(this)
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this)
        this.handleChangeValue = this.handleChangeValue.bind(this)
    }
    updateUser(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const formPhoto = new FormData();
        formPhoto.append("avatar", this.state.fileUpdateAvt);
        let { changeFullname, changeBio, changeGender, changePhone_number, changeAddress, data} = this.state

        if (this.state.changeFullname !== this.state.fullname || this.state.changeBio !== this.state.bio || this.state.changeGender !== this.state.gender || this.state.changePhone_number !== this.state.phone_number || this.state.changeAddress !== this.state.address) {
            if (this.state.changeFullname === "") {
                Notification('warning', 'Warning', 'Fullname is requied')
            }
            else
                api.updateUserInfo({ full_name: changeFullname, bio: changeBio, gender: changeGender, phone_number: changePhone_number, address: changeAddress }, (err, result) => {
                    if (err) {
                        Notification("error", "Error", err.data === undefined ? err : err.status + ' ' + err.data._error_message)
                    }
                    else {
                        this.setState({
                            fullname: changeFullname,
                            gender: changeGender,
                            phone_number: changePhone_number,
                            address: changeAddress,
                            bio: changeBio,
                        });
                        var local = JSON.parse(localStorage.getItem('userInfo'))
                        localStorage.setItem('userInfo', JSON.stringify({
                            id: local.id,
                            token: local.token,
                            full_name: result.full_name,
                            photo: local.photo,
                            is_admin: result.is_admin
                        }))
                        Notification('success', 'Update user info successfully', '')
                    }
                });
        }
        if (this.state.fileUpdateAvt !== null) {
            this.setState({ isLoadedImg: false });
            api.updateAvatar(formPhoto, (err, result) => {
                if (err) {
                    this.setState({ isLoadedImg: true });
                    Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
                }
                else {
                    this.setState({ isLoadedImg: true, avatar: result.photo});
                    console.log(result);
                    
                    this.setState(prevState => ({
                        data: {
                            ...prevState.data,
                            photo: result.photo
                        }
                    }))
                    var local = JSON.parse(localStorage.getItem('userInfo'))
                    localStorage.setItem('userInfo', JSON.stringify({
                        id: local.id,
                        token: local.token,
                        full_name: local.full_name,
                        photo: result.photo,
                        is_admin: result.is_admin

                    }))
                    Notification('success', 'Update avatar successfully', '')

                }
            })
        }
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    handleChangeAvatar(event) {
        this.setState({
            fileUpdateAvt: event.target.files[0],
            tempAvt: URL.createObjectURL(event.target.files[0])
        })
    }

    // handleChangeValue(event) {
    //     let value = event.target.value
    //     let name = event.target.name
    //     this.setState({
    //         [name]: value
    //     });
    // }
    handleChangeValue(event) {
        let value = event.target.value
        if (value === "") value = null
        this.setState({
            [event.target.name]: value
        });
    }

    toggle() {
        this.setState(prevState => ({
            changeFullname: this.state.fullname,
            changeGender: this.state.gender,
            changePhone_number: this.state.phone_number,
            changeAddress: this.state.address,
            changeDateCreated: this.state.date_joined,
            modal: !prevState.modal,
            tempAvt: null,
            fileUpdateAvt: null
        }));
    }

    render() {
        const {submitted} = this.state;
        return (
            <Card>
                <CardHeader>
                    <CardTitle tag="h5" className="mb-0 ">
                        Chi tiết tiểu sử
                        {this.state.checkMainAcc === '' && <FontAwesomeIcon icon={faEdit} className="float-right Profile__pointer" onClick={this.toggle} />}
                    </CardTitle>
                </CardHeader>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <Form onSubmit={this.updateUser}>
                    <ModalBody>
                        <div className="Profile__containerImgUpdate">
                            <CustomImg
                                src={this.state.tempAvt || this.state.avatar}
                                className="rounded-circle img-responsive mt-2 Profile__imgUpdate"
                                width="128"
                                height="128"
                            />
                            <Label className="Profile__iconUpdateAvt" for="updateAvt" >
                                <Input type="file" id="updateAvt" hidden onChange={this.handleChangeAvatar} />
                                <Camera size="50%" className="Profile__iconUpdateEffect" />
                                <div className="Profile__iconUpdateEffect">Cập nhật</div>
                            </Label>
                        </div>

                        <FormGroup>
                            <Label for="fullname"><h5><dt>Họ & tên <span className="text-color-red">*</span></dt></h5></Label>
                            <Input type="text" id="fullname" name="changeFullname" defaultValue={this.state.fullname} onChange={this.handleChangeValue} required />
                            {this.state.changeFullname === '' && <div isHidden={this.state.changeFullname === ''} ><p className="text-color-red">Đây là thông tin được yêu cầu</p></div>}
                        </FormGroup>

                        <FormGroup>
                            <Label for="email"><h5><dt>Email</dt></h5></Label>
                            <Input disabled type="text" id="email" name="changeEmail" defaultValue={this.state.email} />
                        </FormGroup>


                        <FormGroup>
                            <Label for="gender"><h5><dt>Giới tính</dt></h5></Label>
                            <Input type="select" id="gender" name="changeGender" defaultValue={this.state.gender} onChange={this.handleChangeValue}>
                                <option>Nam</option>
                                <option>Nữ</option>
                                {/* <option>Không biết</option> */}
                            </Input>
                        </FormGroup>
{/* 
                        <FormGroup>
                            <Label for="phone_number"><h5><dt>Mobile</dt></h5></Label>
                            <Input type="tel" id="phone_number" name="changePhone_number" defaultValue={this.state.phone_number} onChange={this.handleChangeValue} />
                        </FormGroup> */}
{/* 
                        <FormGroup>
                            <Label for="address"><h5><dt>Địa chỉ</dt></h5></Label>
                            <Input type="text" id="address" name="changeAddress" defaultValue={this.state.address} onChange={this.handleChangeValue} />
                        </FormGroup> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" className="mr-2" color="primary" onClick={this.updateUser.bind(this)}>Lưu</Button>
                        <Button type="button" className="ml-2" color="primary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                </Modal>

                <CardBody className='text-center'>
                    {!this.state.isLoadedImg ? <LoadingSprinner /> :
                        <CustomImg
                            src={this.state.avatar}
                            className="rounded-circle img-responsive mb-2"
                            width="128"
                            height="128"
                        />}
                    <CardTitle className="text-center">
                        <strong><div>{this.state.fullname}</div></strong>
                    </CardTitle>
                </CardBody>

                <hr />

                <CardBody>
                    <CardTitle tag="h5">Thông Tin</CardTitle>
                    <ul className="list-unstyled mb-0">
                        <div>
                            <li className="mb-1">
                                <Mail width={14} height={14} className="mr-1" /> Email: {" "} {this.props.email !== null ? this.state.email : <i className="Profile__font-size-078rem">Đang cập nhật</i>}
                            </li>
                        </div>

                        <div>
                            <li className="mb-1">
                                <User width={14} height={14} className="mr-1" /> Giới tính: {" "} {this.props.gender !== null ? this.state.gender : <i className="Profile__font-size-078rem">Đang cập nhật</i>}
                            </li>
                        </div>

                        <div>
                            <li className="mb-1">
                                <Phone width={14} height={14} className="mr-1" /> SĐT: {" "} {this.props.phone_number !== null ? this.state.phone_number : <i className="Profile__font-size-078rem">Đang cập nhật</i>}
                            </li>
                        </div>

                        {/* <div>
                            <li className="mb-1">
                                <MapPin width={14} height={14} className="mr-1" /> Địa chỉ: {" "} {this.props.address !== null ? this.state.address : <i className="Profile__font-size-078rem">Đang cập nhật</i>}
                            </li>
                        </div> */}

                        <li className="mb-1">
                            <FileText width={14} height={14} className="mr-1" /> Tên Gateway: {" "} {
                                this.props.farms.map((farms, index) => {
                                    return (
                                        <p className="d-inline">{farms}, </p>
                                    )
                                })
                            }
                        </li>

                        <li className="mb-1">
                            <Users width={14} height={14} className="mr-1" /> Ngày tạo: {" "} {moment(this.props.date_joined).format('DD/MM/YYYY h:mm:ss a')}
                        </li>

                    </ul>
                    {/* <hr /><MessageSquare width={14} height={14} className="mr-1" /> Giới thiệu: {" "}{this.state.bio} */}
                </CardBody>
            </Card>
        );
    }
}

export default ProfDetails;

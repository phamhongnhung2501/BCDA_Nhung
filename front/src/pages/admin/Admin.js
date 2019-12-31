import React from "react";
import {
	Card, CardBody, CardHeader,
	Col, Row,
	Button,
	ModalHeader, ModalFooter, Modal,
	CustomInput,
	Table,
} from "reactstrap";
import General from "./General"
import {
	Tabs, Tab
} from "react-bootstrap";
import { Trash2, Edit } from "react-feather";
import { Select } from 'react-dropdown-select';
import ModalBody from "reactstrap/es/ModalBody";
import Notification from "../../components/Notification";
import { CustomImg, LoadingSprinner } from "../../components/CustomTag";
import { FormGroup, Input, Label } from "reactstrap";
import moment from 'moment';
import "./General.css";
const api = require("./api/api");
const ValidInput = require("../../utils/ValidInput");
const utils = require("../../utils/utils");


class RowMember extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalRemove: false,
			modalEdit: false,
			options: this.props.role,
			options1: this.props.roleMember
		}
		this.toggleRemove = this.toggleRemove.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handlerOK = this.handlerOK.bind(this);
		this.handleRemove = this.handleRemove.bind(this);

	}
	toggleRemove() {
		this.setState(prevState => ({
			modalRemove: !prevState.modalRemove
		}));
	}
	toggleEdit() {
		this.setState(prevState => ({
			modalEdit: !prevState.modalEdit
		}));
	}
	onChange(value) {
		this.setState(({ options1: value }))
	}
	handlerOK() {
		let element = []
		this.state.options1.map(({ farms }, index) => {
			element.push(farms);
		});
		this.props.handleEditRole(element, this.props.infoMember._id);

		this.setState(prevState => ({
			modalEdit: !prevState.modalEdit
		}));
	}
	handleRemove() {
		this.props.handleDeleteMember(this.props.infoMember._id)
		this.setState(prevState => ({
			modalRemove: !prevState.modalRemove
		}));
	}
	render() {
		return (
			<React.Fragment>
				<React.Fragment>
					{/* Modal delete member*/}
					<Modal isOpen={this.state.modalRemove}>
						<ModalHeader>Delete Member</ModalHeader>
						<ModalBody>
							Are you sure to delete this member?
				</ModalBody>
						<ModalFooter>
							<Button color="secondary" onClick={this.toggleRemove}>
								Cancel
					</Button>
							<Button color="success" onClick={this.handleRemove}>
								Sure
					</Button>
						</ModalFooter>
					</Modal>
					{/* End modal here */}
				</React.Fragment>

				<React.Fragment>
					<Modal isOpen={this.state.modalEdit}>
						<ModalHeader>Edit Role</ModalHeader>
						<ModalBody>
							<FormGroup id="form-create-member">
								<Row>
									<Col md="2" className="mr-0">
										<Label className="align-middle">Email</Label>
									</Col>
									<Col md="10" className="ml-0">
										{this.props.infoMember.email}
									</Col>
								</Row>
								<Row className="mt-1">
									<Col md="2" className="mr-0">
										<Label className="align-middle">Role</Label>
									</Col>
									<Col md="10" className="ml-0">

										<Select
											multi
											options={this.state.options}
											valueField="farms"
											labelField="farms"
											values={this.state.options1}
											onChange={this.onChange.bind(this)}
										/>
									</Col>
								</Row>
								<Row className="mt-3">

								</Row>
							</FormGroup>
						</ModalBody>
						<ModalFooter>
							<Button color="secondary" onClick={this.toggleEdit}>
								Cancel
						</Button>
							<Button color="success" onClick={this.handlerOK}>
								OK
						</Button>
						</ModalFooter>
					</Modal>
				</React.Fragment>
				<React.Fragment>
					<tr key={this.props.index}>
						<td>
							<CustomImg
								src={this.props.infoMember.photo}
								width="50"
								height="50"
								className="rounded-circle my-n1"
								alt="Avatar"
							/>
						</td>
						<td>
							<a href='#' style={{ color: "#495057", textDecoration: "none" }}> {this.props.infoMember.full_name} </a>
						</td>
						<td>{this.props.infoMember.email}</td>
						<td>
							<CustomInput
								type="switch"
								id={this.props.infoMember._id}
								name="customSwitch{id}"
								checked={this.props.infoMember.is_admin}
								style={{ cursor: 'pointer' }}
								onChange={this.props.handleSwitchIsAdminChange.bind(this, this.props.index)}
							/>
						</td>
						<td className="width:100">
							<Input id="roleMember" type="select" style={{ cursor: 'pointer' }} >
								{
									this.props.roleMember.map((role, index) => {

										return (
											<option key={utils.randomString()} value={role.id}>{role.farms}</option>
										)
									})
								}
							</Input>
						</td>
						<td>
							<Edit
								onClick={this.toggleEdit}
								style={{ cursor: 'pointer', color: "blue" }}
								className="mr-2"
							/>
							<Trash2
								onClick={this.toggleRemove}
								style={{ cursor: 'pointer', color: "red" }}
							/>
						</td>
						<td className="text-primary">{moment(this.props.infoMember.last_login, "YYYYMMDD").fromNow()}</td>
					</tr>
				</React.Fragment>
			</React.Fragment>
		)
	}
};

class Members extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: {
				add: false,
				drop: false
			},
			isLoaded: {
				getIdRole: false,
				getListMemberships: false,
				getMemberSuggestions: false
			},
			role: [],
			roleMember: [],
			listMemberships: [],
			memberSuggestions: [],
			find: {
				search: [],
				chars: null
			},
			editRole: true
		};
		this.eventSearchNewMember = this.eventSearchNewMember.bind(this);
		this.handleSearchNewMember = this.handleSearchNewMember.bind(this);
		this.eventSearch = this.eventSearch.bind(this);
		this.handleSwitchIsAdminChange = this.handleSwitchIsAdminChange.bind(this);
		this.handleDeleteMember = this.handleDeleteMember.bind(this);
		this.handleEditRole = this.handleEditRole.bind(this);
		this.eventClickAvatarSugges = this.eventClickAvatarSugges.bind(this);
	}
	eventSearchNewMember(event) {
		let keyWord = event.target.value;
		this.setState({
			[event.target.name]: event.target.value
		})
		if (event.key === "Enter" && !ValidInput.isEmpty(keyWord)) {
			this.handleSearchNewMember(keyWord.toLowerCase());
		}
	}
	handleSearchNewMember(informationSearch) {
		let state = Object.assign({}, this.state);
		state.find.search = [];
		state.memberSuggestions.map((memberSuggestion) => {
			if ((memberSuggestion.full_name.toLowerCase()).indexOf(informationSearch) !== -1 || (memberSuggestion.username.toLowerCase()).indexOf(informationSearch) !== -1) {
				state.find.search.push(memberSuggestion);
			}
		})
		this.setState(state);
	}
	eventSearch(event) {
		let tag = event.target.value;
		let state = Object.assign({}, this.state);
		state.find.chars = tag;
		this.setState(state);
	}

	handleDeleteMember(index) {
		api.deleteMembership(index, (err, result) => {
			if (err) {
				Notification("error", "Error", err.data === undefined ? err : err.status + " " + err.data._error_message);
			} else {
				Notification("success");
				let state = Object.assign({}, this.state);
				api.getListMemberships((err, result) => {
					if (err) {
						Notification("error", "Error", err.data === undefined ? err : err.status + " " + err.data._error_message);
					} else {
						let data = [];
						result.map(({ farms }, index) => {
							farms.map((station, index) => {
								let element = {
									farms: station,
									id: index + 1
								}
								data.push(element);
							});
							state.roleMember[index] = data;
							state.listMemberships = result;

							data = [];
						});
						state.isLoaded.getListMemberships = true;
						this.setState(state);

					}
				})
				api.getIdRole((err, result) => {
					if (err) {
						Notification("error", "Error", err.data === undefined ? err : err.status + " " + err.data._error_message);
					} else {
						let data1 = [];
						result.map(({ sub_id }, index) => {
							let element = {
								farms: sub_id,
								id: index + 1
							}
							data1.push(element);
						});
						state.role = data1;
						state.isLoaded.getIdRole = true;
						this.setState(state);
					}
				})
			}
		})
	}

	handleSwitchIsAdminChange(index) {
		let state = Object.assign({}, this.state);
		let dataSent = {
			"value": !state.listMemberships[index].is_admin,
			"idMemberChange": state.listMemberships[index]._id
		}

		api.editIsAdmin(dataSent, (err, result) => {
			if (err) {
				Notification("error", "Error", err.data === undefined ? err : err.status + " " + err.data._error_message);
			} else {
				state.listMemberships[index].is_admin = result;
				this.setState(state);
				Notification("success");
			}
		})
		this.setState({
			listMemberships: state.listMemberships
		});
	}
	handleEditRole(value, id) {
		api.editRole(value, id, (err, result) => {
			if (err) {
				Notification("error", "Error", err.data === undefined ? err : err.status + " " + err.data._error_message);
			} else {
				Notification("success");
				let state = Object.assign({}, this.state);
				api.getListMemberships((err, result) => {
					if (err) {
						Notification("error", "Error", err.data === undefined ? err : err.status + " " + err.data._error_message);
					} else {
						let data = [];
						result.map(({ farms }, index) => {
							farms.map((station, index) => {
								let element = {
									farms: station,
									id: index + 1
								}
								data.push(element);
							});
							state.roleMember[index] = data;
							state.listMemberships = result;

							data = [];
						});
						state.isLoaded.getListMemberships = true;
						this.setState(state);

					}
				})
				api.getIdRole((err, result) => {
					if (err) {
						Notification("error", "Error", err.data === undefined ? err : err.status + " " + err.data._error_message);
					} else {
						let data1 = [];
						result.map(({ sub_id }, index) => {
							let element = {
								farms: sub_id,
								id: index + 1
							}
							data1.push(element);
						});
						state.role = data1;
						state.isLoaded.getIdRole = true;
						this.setState(state);
					}
				})
			}
		})
	}
	eventClickAvatarSugges(username) {
		document.getElementById("inputSearchAllMember").value = username;
		this.setState({ inputSearchAllMember: username });
	}

	componentDidMount() {
		let state = Object.assign({}, this.state);
		api.getListMemberships((err, result) => {
			if (err) {
				Notification("error", "Error", err.data === undefined ? err : err.status + " " + err.data._error_message);
			} else {
				let data = [];
				result.map(({ farms }, index) => {
					farms.map((station, index) => {
						let element = {
							farms: station,
							id: index + 1
						}
						data.push(element);
					});
					state.roleMember[index] = data;
					state.listMemberships = result;

					data = [];
				});
				state.isLoaded.getListMemberships = true;
				this.setState(state);

			}
		})
		api.getIdRole((err, result) => {
			if (err) {
				Notification("error", "Error", err.data === undefined ? err : err.status + " " + err.data._error_message);
			} else {
				let data1 = [];
				result.map(({ sub_id }, index) => {
					let element = {
						farms: sub_id,
						id: index + 1
					}
					data1.push(element);
				});
				state.role = data1;
				state.isLoaded.getIdRole = true;
				this.setState(state);
			}
		})
	}
	render() {
		return (
			!this.state.isLoaded.getListMemberships ? <LoadingSprinner />
				:
				<React.Fragment>

					{/* End modal here */}
					<Card className="admin__member">
						<CardHeader>
							<Col xs="4" className="float-left d-inline">
								<Input type="search" id="inputSearchMemberproject" placeholder="Search from member infomation" onKeyUp={(event) => this.eventSearch(event)} />
							</Col>
						</CardHeader>
						<CardBody>
							<Table className="mb-0">
								<thead>
									<tr>
										<th>Avatar</th>
										<th>Name</th>
										<th>Email</th>
										<th>Is admin</th>
										<th>Role</th>
										<th>Action</th>
										<th>Online</th>
									</tr>
								</thead>
								<tbody>
									{
										this.state.listMemberships.map((infoMember, index) => {
											let searchChars = this.state.find.chars;
											if (ValidInput.isEmpty(searchChars) || ((infoMember.full_name.toLowerCase()).indexOf(searchChars.toLowerCase()) !== -1)) {
												return (
													<RowMember
														key={utils.randomString()}
														infoMember={infoMember}
														role={this.state.role}
														roleMember={this.state.roleMember[index]}
														index={index}
														handleDeleteMember={this.handleDeleteMember}
														handleSwitchIsAdminChange={this.handleSwitchIsAdminChange}
														handleEditRole={this.handleEditRole}
													/>
												);
											}
										})
									}
								</tbody>
							</Table>
						</CardBody>
					</Card>
				</React.Fragment>
		)
	}
}
class Admin extends React.Component {
	render() {
		return (
			<Tabs defaultActiveKey="setting" >
				<Tab eventKey="setting" title="Cài đặt">
					<General />
				</Tab>
				<Tab eventKey="members" title="Thành viên">
					<Members />
				</Tab>
			</Tabs>
		);
	}
}

export default Admin;

import React from "react";

import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button,
    FormGroup, Input, Row, Col, Label, Badge,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap"

import {CustomImg} from "../components/CustomTag"
import Notification from "./Notification";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTags, faAtom, faExclamation, faBomb} from "@fortawesome/free-solid-svg-icons";

const utils = require("../utils/utils");

class ModalAssignUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props
        }
    }

    handleSelectUser(id) {
        let state = utils.copyState(this.state);
        if (this.state.mode === "single") {
            if (state.userSelected.indexOf(id) === -1) {
                state.userSelected[0] = id;
            } else {
                state.userSelected = [];
            }
        } else {
            let pos = state.userSelected.indexOf(id);
            if (pos === -1) {
                state.userSelected.push(id);
            } else {
                state.userSelected.splice(pos, 1);
            }
        }
        this.setState(state)
    }

    handleSave() {
        this.props.handleSave(this.state.userSelected)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            ...nextProps
        })
    }

    render() {

        return (
            <Modal isOpen={this.props.isOpen}>
                <ModalHeader>
                    Assign users
                </ModalHeader>
                <ModalBody>
                    <Input type="search" placeholder="Search member"/>
                    <div className="mt-3 overflow-y-20x">
                        {
                            this.state.allUsers.map(({id, photo, full_name}, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={"border-bottom hover-color " + (this.state.userSelected.indexOf(id) === -1 ? "" : "active-color")}
                                        onClick={this.handleSelectUser.bind(this, id)}
                                    >
                                        <CustomImg className="img--user--square-3x" src={photo}/>
                                        <span className="ml-2">{full_name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.handleSave.bind(this)}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}


class ModalConfirm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleOk() {
        this.props.handleOk();
    }

    handleCancel() {
        this.props.handleCancel();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}>
                <ModalHeader>Confirm</ModalHeader>
                <ModalBody>Are you sure?</ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.handleCancel}>
                        Cancel
                    </Button>
                    <Button color="success" onClick={this.props.handleOk}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

class ModalIssue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            subject: "",
            type: "Bug",
            severity: "Wishlist",
            priority: "Low",
            tags: [],
            description: "",
            status: "New",
            due_date: "",
            assigned_users: [],

            assign_user: false
        };
        this.handleAddTag = this.handleAddTag.bind(this);
        this.handleRemoveTag = this.handleRemoveTag.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const copy_props = utils.copyState(nextProps);
        const {subject, tags, status, assigned_users, due_date, description, isOpen, type, severity, priority} = copy_props;
        console.log(copy_props);
        
        this.setState({
            isOpen: isOpen,
            subject: utils.returnThisWhenNull(subject, ""),
            type: utils.returnThisWhenNull(type,"Bug"),
            severity: utils.returnThisWhenNull(severity,"Wishlist"),
            priority: utils.returnThisWhenNull(priority, "Low"),
            tags: utils.returnThisWhenNull(tags, []),
            assigned_users: utils.returnThisWhenNull(assigned_users, []),
            description: utils.returnThisWhenNull(description, ""),
            status: utils.returnThisWhenNull(status, "New"),
            due_date: utils.returnThisWhenNull(due_date, "")
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSelect(component, value){
        this.setState({
            [component]: value
        })
    }

    toggle(component) {
        this.setState({
            [component]: !this.state[component]
        })
    }

    handleAddTag(event) {
        if (event.key === "Enter") {
            let tag = document.getElementById("inputTags").value;
            if (utils.ValidInput.isEmpty(tag)) {
                Notification("warning", "Empty value", "Tag is empty value")
            } else {
                let tags = utils.copyState(this.state.tags);
                tags.push(tag);
                this.setState({tags: tags});
                document.getElementById("inputTags").value = "";
            }
        }
    }

    handleRemoveTag(index) {
        let tags = utils.copyState(this.state.tags);
        tags.splice(index, 1);
        this.setState({tags: tags});
    }

    handleAssignUsers(userSelected) {
        this.setState({assigned_users: userSelected});
        this.toggle("assign_user")
    }

    handleOk() {
        if (utils.ValidInput.isEmpty(this.state.subject)) {
            Notification("warning", "Warning", "Subject is required!")
        } else {
            this.props.handleOk(this.state);
        }
    }

    handleCancel() {
        this.props.handleCancel();
    }

    render() {
        const {memberInProject} = this.props;
        return (
            <React.Fragment>
                <ModalAssignUser
                    isOpen={this.state.assign_user}
                    allUsers={memberInProject}
                    userSelected={this.state.assigned_users}
                    handleSave={this.handleAssignUsers.bind(this)}
                />
                <Modal isOpen={this.state.isOpen} size="lg">
                    <ModalHeader>
                        {this.props.id === "add" ? "New Issue" : "Modify Issue"}
                    </ModalHeader>
                    <ModalBody>
                        <Row form>
                            <Col>
                                <Label>Type >> Severity >> Priority</Label>
                            </Col>
                        </Row>
                        <Row form>
                            <Col>
                                <FormGroup>
                                    <UncontrolledDropdown>
                                        <DropdownToggle caret outline color="info" className="full-width">
                                            <FontAwesomeIcon icon={faAtom} className="mr-1"/>
                                            <span className="mr-1">{this.state.type}</span>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={this.handleSelect.bind(this, "type", "Bug")}>Bug</DropdownItem>
                                            <DropdownItem onClick={this.handleSelect.bind(this, "type", "Question")}>Question</DropdownItem>
                                            <DropdownItem onClick={this.handleSelect.bind(this, "type", "Enhancement")}>Enhancement</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <UncontrolledDropdown>
                                        <DropdownToggle caret outline color="danger" className="full-width">
                                            <FontAwesomeIcon icon={faBomb} className="mr-1"/>
                                            <span className="mr-1">{this.state.severity}</span>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={this.handleSelect.bind(this, "severity", "Wishlist")}>Wishlist</DropdownItem>
                                            <DropdownItem onClick={this.handleSelect.bind(this, "severity", "Minor")}>Minor</DropdownItem>
                                            <DropdownItem onClick={this.handleSelect.bind(this, "severity", "Normal")}>Normal</DropdownItem>
                                            <DropdownItem onClick={this.handleSelect.bind(this, "severity", "Important")}>Important</DropdownItem>
                                            <DropdownItem onClick={this.handleSelect.bind(this, "severity", "Critical")}>Critical</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <UncontrolledDropdown>
                                        <DropdownToggle caret outline color="warning" className="full-width">
                                            <FontAwesomeIcon icon={faExclamation} className="mr-1"/>
                                            <span className="mr-1">{this.state.priority}</span>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={this.handleSelect.bind(this, "priority", "Low")}>Low</DropdownItem>
                                            <DropdownItem onClick={this.handleSelect.bind(this, "priority", "Normal")}>Normal</DropdownItem>
                                            <DropdownItem onClick={this.handleSelect.bind(this, "priority", "High")}>High</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md="8">
                                <FormGroup className="mr-3">
                                    <Label>Subject</Label>
                                    <Input
                                        name="subject"
                                        onChange={this.handleChange.bind(this)}
                                        type="text"
                                        value={this.state.subject}
                                        placeholder="Work name"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Status</Label>
                                    <Input
                                        name="status"
                                        onChange={this.handleChange.bind(this)}
                                        type="select"
                                        value={this.state.status}
                                    >
                                        <option>New</option>
                                        <option>Ready</option>
                                        <option>In progress</option>
                                        <option>Ready for test</option>
                                        <option>Done</option>
                                        <option>Archived</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={8}>
                                <FormGroup className="mr-3">
                                    <Label>
                                        <FontAwesomeIcon icon={faTags} size="xs"/>
                                        {
                                            this.state.tags.map((tag, index) => {
                                                return (
                                                    <Badge
                                                        key={index}
                                                        className="badge-pill ml-2"
                                                        color="info"
                                                    >
                                                        <label className="mb-0">{tag}</label>
                                                        &nbsp;
                                                        <label
                                                            className="mb-0 text-color-orange cursor-pointer"
                                                            id={index}
                                                            onClick={() => this.handleRemoveTag(index)}
                                                        >
                                                            X
                                                        </label>
                                                    </Badge>
                                                )
                                            })
                                        }
                                    </Label>
                                    <Input type="text"
                                           id="inputTags"
                                           placeholder="Enter tag"
                                           autoComplete="off"
                                           onKeyPress={this.handleAddTag}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Due date</Label>
                                    <Input
                                        type="date"
                                        name="due_date"
                                        onChange={this.handleChange.bind(this)}
                                        value={utils.ValidInput.isEmpty(this.state.due_date) ? "--/--/--" : this.state.due_date}
                                        max="2100-12-31"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={8}>
                                <FormGroup className="mr-3">
                                    <Label>Description</Label>
                                    <Input
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange.bind(this)}
                                        type="textarea" autoComplete="off"
                                        placeholder="Description"
                                        className="min-height-1x"/>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>
                                        Assigned users
                                    </Label>
                                    <div>
                                        <div>
                                            {
                                                this.state.assigned_users.map((member, index) => {
                                                    let mem = memberInProject.find(memberInProject => memberInProject.id === member);
                                                    if (mem !== undefined)
                                                        return (
                                                            <CustomImg
                                                                key={index}
                                                                src={mem.photo}
                                                                alt="avatar"
                                                                className="rounded-circle img--user--square-2x ml-1 mt-1"
                                                            />
                                                        )
                                                })
                                            }
                                        </div>

                                        <div className="mt-3" onClick={this.toggle.bind(this, "assign_user")}>
                                            <a className="font-size-1x"><span
                                                className="text-color-orange">Assign</span> or <span
                                                className="text-color-orange">Assign to me</span></a>
                                        </div>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleCancel.bind(this)}>
                            Cancel
                        </Button>
                        <Button color="success" onClick={this.handleOk.bind(this)}>
                            OK
                        </Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export {
    ModalAssignUser,
    ModalConfirm,
    ModalIssue
}


import React from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../redux/actions/sidebarActions";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import $ from "jquery";

import {
    Collapse,
    Navbar, Nav,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    ListGroup,
    UncontrolledTooltip,
} from "reactstrap";

import {
    Bell,
    Home,
    PieChart,
    Settings,
    User,
    Layout
} from "react-feather";
import { CustomImg } from "../components/CustomTag";

import usFlag from "../assets/img/flags/us.png";
import vnFlag from "../assets/img/flags/vn.png";

import empty_avatar from "../assets/img/avatars/empty_avatar.png";
import "./Navbar.css"
// important, default, login, request


class NavbarDropdown extends React.Component {

    render() {
        const { children, count, showBadge, header, icon } = this.props;
        return (
            <UncontrolledDropdown nav inNavbar className="mr-2">
                <DropdownToggle nav className="nav-icon dropdown-toggle">
                    <div className="position-relative">
                        <Bell id="navbar-notificatipn" className="align-middle" />
                        <UncontrolledTooltip placement="bottom" target="navbar-notificatipn">
                            Notifications
                        </UncontrolledTooltip>
                        {showBadge ? <span className="indicator">{count}</span> : null}
                    </div>
                </DropdownToggle>
                <DropdownMenu right className="dropdown-menu-lg py-0">
                    <div className="dropdown-menu-header position-relative">
                        {count} {header}
                    </div>
                    <ListGroup>{children}</ListGroup>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}


class NavbarComponent extends React.Component {
    changeLanguage(lang) {
        this.setState({
            lang: lang
        });
        let flag = lang === 'en' ? usFlag : vnFlag;
        $("#language_selected").attr("src", flag)
    }

    replacePage(page) {
        window.location.replace(page)
    }

    render() {
        const { dispatch } = this.props;
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const avatar = userInfo.photo;
        const name = userInfo.full_name;
        return (
            <Navbar color="white" light expand>
                {
                    <span className="sidebar-toggle d-flex mr-2" onClick={() => { dispatch(toggleSidebar()); }}>
                        <i className="hamburger align-self-center" />
                    </span>
                }

                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar className="mr-2">
                            <DropdownToggle nav>
                                <Home id="navbar-dashboard" size={18} onClick={this.replacePage.bind(this, "/dashboard")} />
                                <UncontrolledTooltip placement="bottom" target="navbar-dashboard">
                                    Dashboard
                                </UncontrolledTooltip>
                            </DropdownToggle>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar className="mr-2">
                            <DropdownToggle nav>
                                <Layout id="navbar-project" size={18} onClick={this.replacePage.bind(this, "/stations")} />
                                <UncontrolledTooltip placement="bottom" target="navbar-project">
                                    Stations
                                </UncontrolledTooltip>
                            </DropdownToggle>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar className="mr-2">
                            <DropdownToggle nav>
                                <Bell id="navbar-dashboard" size={18} onClick={this.replacePage.bind(this, "/dashboard")} />
                                <UncontrolledTooltip placement="bottom" target="navbar-dashboard">
                                    Notification
                                </UncontrolledTooltip>
                            </DropdownToggle>
                        </UncontrolledDropdown>
                        {/* <NavbarDropdown
                            header="New Notifications"
                        count={this.props.notification.length}
                        >
                            {
                                this.props.notification.map(({event_type, data, created}, key) => {
                                return (
                                    <NavbarDropdownItem
                                        key={key}
                                        event_type={event[event_type]}
                                        user={data.user.name}
                                        photo={data.user.photo}
                                        subject={data.obj===undefined ? null : data.obj.subject} // Mot so notification khong co subject
                                        project={data.project.name}
                                        time={created}
                                    />
                                );
                            })}
                        </NavbarDropdown> */}


                        <UncontrolledDropdown nav inNavbar>
                            <span className="d-inline-block d-sm-none">
                                <DropdownToggle nav caret>
                                    <Settings size={18} className="align-middle" />
                                </DropdownToggle>
                            </span>
                            <span className="d-none d-sm-inline-block">
                                <DropdownToggle nav caret>
                                    <CustomImg
                                        src={avatar !== null ? avatar : empty_avatar}
                                        className="avatar img-fluid rounded-circle mr-1"
                                        alt="Avatar"
                                    />
                                    <span className="text-dark">{name}</span>
                                </DropdownToggle>
                            </span>
                            <DropdownMenu right>
                                <Link to="/profile" className="text-dark">
                                    <DropdownItem>
                                        <User size={18} className="align-middle mr-2" />
                                        Profile
                                    </DropdownItem>
                                </Link>
                                <Link to="">
                                    <DropdownItem>
                                        <PieChart size={18} className="align-middle mr-2" />
                                        Analytics
                                    </DropdownItem>
                                </Link>
                                <DropdownItem divider />
                                <Link to="">
                                    <DropdownItem>Settings & Privacy</DropdownItem>
                                </Link>
                                <Link to="">
                                    <DropdownItem>Help</DropdownItem>
                                </Link>
                                <Link to="/logout" className="text-dark">
                                    <DropdownItem>Sign out</DropdownItem>
                                </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default connect(store => ({
    app: store.app
}))(NavbarComponent);

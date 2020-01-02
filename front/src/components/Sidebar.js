import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import { Badge } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { Box } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import routes from "../routes/index";
import { CustomImg } from "../components/CustomTag";
import { Settings, Users, TrendingUp, CameraOff, ToggleLeft, Cpu, Eye, Codepen } from "react-feather";

const SidebarItem = withRouter(({ name, badgeColor, badgeText, icon: Icon, location, to }) => {
    const getSidebarItemClass = path => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <li className={"sidebar-item " + getSidebarItemClass(to)}>
            <NavLink to={to} className='sidebar-link' activeClassName='active'>
                {Icon ? <Icon size={18} className='align-middle mr-3' /> : null}
                {name}
                {badgeColor && badgeText ? (
                    <Badge color={badgeColor} size={18} className='sidebar-badge'>
                        {badgeText}
                    </Badge>
                ) : null}
            </NavLink>
        </li>
    );
});

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    toggle = index => {
        this.setState(state => ({
            [index]: !state[index],
        }));
    };

    componentDidMount() {
        /* Open collapse element that matches current url */
        const pathName = this.props.location.pathname;

        routes.forEach((route, index) => {
            const isActive = pathName.indexOf(route.path) === 0;
            const isOpen = route.open;
            const isHome = route.containsHome && pathName === "/" ? true : false;

            this.setState(() => ({
                [index]: isActive || isOpen || isHome,
            }));
        });
    }

    render() {
        const { sidebar, layout, user } = this.props;

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const name = userInfo.full_name;
        const avatar = userInfo.photo;

        const isAdmin = userInfo.is_admin;

        if (name === undefined || avatar === undefined) {
            return <div> </div>;
        } else
            return (
                <nav
                    className={
                        "sidebar" +
                        (!sidebar.isOpen ? " toggled" : "") +
                        (sidebar.isSticky ? " sidebar-sticky" : "")
                    }>
                    <div className='sidebar-content'>
                        <PerfectScrollbar>
                            <a className='sidebar-brand' href='/'>
                                <Box className='align-middle text-primary mr-2' size={24} />{" "}
                                <span className='align-middle'>Vườn Ươm</span>
                            </a>

                            <ul className='sidebar-nav'>
                                <React.Fragment>
                                    <SidebarItem
                                        name='Theo dõi cảm biến'
                                        to='/dashboard'
                                        icon={Cpu}
                                    />
                                    <SidebarItem
                                        name='Theo dõi độ ẩm đất'
                                        to='/TrackSoilMoisture'
                                        icon={Eye}
                                    />
                                    <SidebarItem
                                        name='Điều khiển thiết bị'
                                        to='/ControlStation'
                                        icon={ToggleLeft}
                                    />
                                    <SidebarItem
                                        name='Theo dõi cây trồng'
                                        to='/TrackingCamera'
                                        icon={CameraOff}
                                    />
                                    <SidebarItem name='Tiểu sử' to='/profile' icon={Users} />
                                     {/* {isAdmin ? (
                                        <SidebarItem
                                            name='Cài đặt thông số'
                                            to='/Config'
                                            icon={Codepen}
                                        />
                                    ) : null} */}
                                   
                                    {isAdmin ? (
                                        <SidebarItem
                                            name='Quản trị viên'
                                            icon={Settings}
                                            to='/farms/admin'
                                        />
                                    ) : null}
                                </React.Fragment>
                            </ul>

                            {!layout.isBoxed && !sidebar.isSticky ? (
                                <div className='sidebar-bottom d-none d-lg-block'>
                                    <div className='media'>
                                        <CustomImg
                                            className='rounded-circle mr-3'
                                            src={avatar}
                                            alt='Avatar'
                                            width='40'
                                            height='40'
                                        />
                                        <div className='media-body'>
                                            <h5 className='mb-1'>
                                                {name.length < 20 ? name : name.substring(0, 20)}
                                            </h5>
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faCircle}
                                                    className='text-success'
                                                />{" "}
                                                Online
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </PerfectScrollbar>
                    </div>
                </nav>
            );
    }
}

export default withRouter(
    connect(store => ({
        sidebar: store.sidebar,
        layout: store.layout,
    }))(Sidebar),
);

import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    CardText,
    Button,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from "reactstrap";
import { Tabs, Tab } from "react-bootstrap";
import Moment from "react-moment";
import "moment-timezone";
import { Briefcase, Home, MapPin, Bell, User } from "react-feather";
import "./Db.css";
import Map from "./Map";
class StationInformation extends React.Component {
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.state = {
            data: data,
            activeTab: "1",
            value: null,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {
        const { changeValueOfSeed, data } = this.props;
        // if(
        //     this.state.data.stage.name === "stage_1" ? "Gieo hạt" : "";
        // ) 

        // const stg2 = this.state.data.stage.name === "stage_2" ? "Ra hoa" : "";
        // const stg3 = this.state.data.stage.name === "stage_3" ? "Phát triển" : "";
        // const stg4 = this.state.data.stage.name === "stage_4" ? "Thu hoạch" : "";
        return (
            <React.Fragment>
                <Tabs defaultActiveKey='info'>
                    <Tab eventKey='info' title='Thông tin vườn ươm'>
                        <Card className='flex-fill w-100' style={{ height: 523, width: "100%" }}>
                            <CardBody className='my-0'>
                                <h3 className='text-center'>{data.name}</h3>
                                <ul className='list-unstyled mb-0'>
                                    <li className='mb-3'>
                                        <Home width={20} height={20} className='mr-1' /> Gateway:{" "}
                                        <Link to='#'>{data.sub_id}</Link>
                                    </li>
                                    <li className='mb-3'>
                                        <Home width={20} height={20} className='mr-1' /> Hạt giống:{" "}
                                        <Link to='#'>
                                            {
                                            data.seed_name === "tomato" ? "Cà chua" : ""||
                                            data.seed_name === "cucumber" ? "Dưa chuột" : ""||
                                            data.seed_name === "pakchoi" ? "Cải ngọt" : ""||
                                            data.seed_name === "brassica" ? "Cải chíp" : ""||
                                            data.seed_name === "cabbage" ? "Bắp cải" : ""
                                            }
                                        </Link>
                                    </li>
                                    <li className='mb-3'>
                                        <Briefcase width={20} height={20} className='mr-1' />
                                        Ngày gieo hạt:{" "}
                                        <Link to='#'>
                                            <Moment format='YYYY/MM/DD'>
                                                {data.started_plant}
                                            </Moment>
                                        </Link>
                                    </li>
                                    <li className='mb-3'>
                                        <MapPin width={20} height={20} className='mr-1' />
                                        Địa chỉ: <Link to='#'>{data.address}</Link>
                                    </li>
                                    <li className='mb-3'>
                                        <User width={20} height={20} className='mr-1' />
                                        Người quản lí: <Link to='#'>{data.manager.full_name}</Link>
                                    </li>
                                    <Row className='mb-3'>
                                        <Col xs='1'>
                                            <div className='warning__statistic bg-danger'></div>
                                        </Col>
                                        <Col xs='9'>
                                            <div className=''>
                                                : Thông số cảm môi trường ở mức cao
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col xs='1'>
                                            <div className='warning__statistic bg-success'></div>
                                        </Col>
                                        <Col xs='9'>
                                            <div className=''>
                                                : Thông số cảm môi trường ở trung bình
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col xs='1'>
                                            <div className='warning__statistic bg-primary'></div>
                                        </Col>
                                        <Col xs='9'>
                                            <div className=''>
                                                : Thông số cảm môi trường ở mức thấp
                                            </div>
                                        </Col>
                                    </Row>
                                </ul>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab eventKey='map' title='Trạng thái cây'>
                        <Card className='flex-fill w-100' style={{ height: 523, width: "100%" }}>
                            <CardBody className='my-0'>
                                <ul className='list-unstyled mb-0'>
                                    <li className='mb-3'>
                                        <Home width={20} height={20} className='mr-1' /> Giai đoạn:{" "}
                                        <Link to='#'>
                                            {
                                            //  data.stage.name   
                                                
                                                    data.stage.name === "germination stage" ? "Gieo hạt" : ""||
                                                
                                                    data.stage.name === "development 1 stage" ? "Ra hoa" : ""||
                                                
                                                    data.stage.name === "development 2 stage" ? "Phát triển" : ""||
                                                 
                                                    data.stage.name === "harvest stage" ? "Thu hoạch" : ""
                                               
                                            }
                                            
                                        </Link>
                                    </li>
                                    <li className='mb-3'>
                                        <Briefcase width={20} height={20} className='mr-1' />
                                        Nhiệt độ: <Link to='#'>{data.stage.min_temp}</Link>{" "}
                                        {" < T < "} <Link to='#'>{data.stage.max_temp}</Link>
                                    </li>

                                    <li className='mb-3'>
                                        <Briefcase width={20} height={20} className='mr-1' />
                                        Ánh sáng: <Link to='#'>{data.stage.min_light}</Link>
                                        {" < L < "} <Link to='#'>{data.stage.max_light}</Link>
                                    </li>
                                    <li className='mb-3'>
                                        <Briefcase width={20} height={20} className='mr-1' />
                                        PH: <Link to='#'>{data.stage.min_PH}</Link> {" < PH < "}{" "}
                                        <Link to='#'>{data.stage.max_PH}</Link>
                                    </li>
                                    <li className='mb-3'>
                                        <Briefcase width={20} height={20} className='mr-1' />
                                        Độ ẩm đất:{" "}
                                        <Link to='#'>{data.stage.min_soil_moisture}</Link>{" "}
                                        {" < SM < "}{" "}
                                        <Link to='#'>{data.stage.max_soil_moisture}</Link>
                                    </li>
                                    <li className='mb-3'>
                                        <Briefcase width={20} height={20} className='mr-1' />
                                        Độ ẩm không khí: <Link to='#'>
                                            {data.stage.min_hum}
                                        </Link>{" "}
                                        {" < H < "} <Link to='#'>{data.stage.max_hum}</Link>
                                    </li>
                                </ul>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </React.Fragment>
        );
    }
}

export default StationInformation;

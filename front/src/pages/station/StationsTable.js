import React from "react";
import { Progress } from "react-sweet-progress";
import "./Stations.css";
import Notification from "../../components/Notification";
import { Link } from "react-router-dom";

import { Card, CardTitle, Table, Badge, UncontrolledTooltip, Container } from "reactstrap";
import { CustomImg } from "../../components/CustomTag";
import Moment from 'react-moment';
import 'moment-timezone';
const api = require("./api/api");
const none = "none";

class TableProject extends React.Component {
    constructor(props) {
        super(props);
        const data = this.props;
        this.state = {
            data: data,
        };
    }
    handleSelectProject() {
        api.getInfoProject(this.state.data.sub_id, (err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.data._error_message);
            } else {
                localStorage.setItem("project", JSON.stringify(result));
                window.location.replace("/dashboard");
            }
        });
    }
    render() {
        return (
            <Container fluid className="table-project mt-4">
                <Card id={"table-project-" + this.state.data._id} className="table-project__card border-bottom-0">
                    <Link
                        to="#"
                        onClick={this.handleSelectProject.bind(this)}
                        className="table-project__card-header mb-0 px-2 py-1 hover-pointer:hover text-decoration-none overflow-hidden position-relative table-project__card__header"
                    >
                        <CustomImg className="img--user rounded-circle  mr-2" src={this.state.data.logo === null ? none : this.state.data.logo} alt="avt" />
                        <CardTitle className="align-middle d-inline-block mb-0 font-size-2x font-weight-bold text-color-black mt-0 border-bottom-0 ml-3">
                            <div>
                                <div className="d-inline-block " id={"tooltip-project-" + this.state.data.id}>
                                    {this.state.data.name}
                                </div>

                                <div className="d-inline-block ml-1 pt-1 font-size-1x">
                                    <Badge color={this.state.data.i_am_owner ? "info" : "primary"} className="badge-pill px-1 mr-1 mb-1">
                                        {this.state.data.is_admin ? "Admin" : null}
                                    </Badge>
                                </div>
                                <h6 className="text-muted table-project__h6 mt-1">Giống cây: 
                                {
                                    this.state.data.seed_name === "tomato" ? " Cà chua" : ""||
                                    this.state.data.seed_name === "cucumber" ? " Dưa chuột" : ""||
                                    this.state.data.seed_name === "pakchoi" ? " Cải ngọt" : ""||
                                    this.state.data.seed_name === "brassica" ? " Cải chíp" : ""||
                                    this.state.data.seed_name === "cabbage" ? " Bắp cải" : ""
                                }
                                </h6>
                                <h6 className="text-muted table-project__h6 mt-1">Gateway: {this.state.data.sub_id} </h6>
                                <h6 className="text-muted table-project__h6">Ngày bắt đầu gieo trồng:  <Moment format="YYYY/MM/DD">
                                                                                                            {this.state.data.started_plant}
                                                                                                        </Moment>                                                                                                          
                              </h6>
                                <UncontrolledTooltip placement={"bottom"} target={"tooltip-project-" + this.state.data.id}>
                                    Nhấn vào để biết thêm chi tiết
                                </UncontrolledTooltip>
                            </div>
                        </CardTitle>
                    </Link>
                </Card>
            </Container>
        );
    }
}

export default TableProject;

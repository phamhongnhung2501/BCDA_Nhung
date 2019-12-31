import React, { Component } from "react";
import { Col, Card, CardBody, CardHeader, Row, Media } from "reactstrap";
import "./switch.css";
class ControlStation extends Component {
    render() {
        return (
            <Row className='border buttonRGB row mx-1 my-3'>
                <Col sm='4'>
                    <div className='col-4 m-rocker d-flex justify-content-around pl-5'>
                        <input
                            id='R'
                            type='checkbox'
                            onclick='handleClickButtonControl(this.id);
                            '
                        />
                        <label htmlFor='R' style={{ borderColor: "#A9A9A9" }}>
                            Switch
                        </label>
                    </div>
                </Col>
                <Col sm='4'>
                    <div className='col-4 m-rocker d-flex justify-content-around pl-5'>
                        <input id='G' type='checkbox' onclick='handleClickButtonControl(this.id)' />
                        <label htmlFor='G' style={{ borderColor: "#A9A9A9" }}>
                            Switch
                        </label>
                    </div>
                </Col>
                <Col sm='4'>
                    <div className='col-4 m-rocker d-flex justify-content-around pl-5'>
                        <input id='B' type='checkbox' onclick='handleClickButtonControl(this.id)' />
                        <label htmlFor='B' style={{ borderColor: "#A9A9A9" }}>
                            Switch
                        </label>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ControlStation;

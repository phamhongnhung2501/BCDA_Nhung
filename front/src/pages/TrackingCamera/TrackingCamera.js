import React, { Component } from "react";
import { Container, Row, Col, Table } from "reactstrap";
class TrackingCamera extends Component {
    render() {
        return (
            <React.Fragment>
                <h4 className='text-center  text-primary '>
                    Nhấn vào webcam để theo dõi cây trồng!{" "}
                </h4>

                <div className='d-flex justify-content-center '>
                    <a
                        href='http://lophocvui.ddns.net/doc/page/login.asp?_1574329102388'
                        target='_blank'>
                        <img
                            className='camera__camera'
                            src='https://www.a4tech.com/alanUpload/colorImg/img/201803/0203101147364114.jpg'
                            alt='Card image cap'
                        />
                    </a>
                </div>
            </React.Fragment>
        );
    }
}

export default TrackingCamera;

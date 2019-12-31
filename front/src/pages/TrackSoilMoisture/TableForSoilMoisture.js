import React, { Component } from 'react';
import {
    Row, Col, Label,
    Card, CardBody
} from "reactstrap";
import './Db.css';
import './DomCssTable.css';
var a = 60;
var b = 80;

class TableForSoilMoisture extends Component {
    ConvertCSS1() {

        if (this.props.data.SM1 >= a && this.props.data.SM1 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM1 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS2() {

        if (this.props.data.SM2 >= a && this.props.data.SM2 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM2 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS3() {

        if (this.props.data.SM3 >= a && this.props.data.SM3 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM3 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS4() {

        if (this.props.data.SM4 >= a && this.props.data.SM4 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM4 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS5() {

        if (this.props.data.SM5 >= a && this.props.data.SM5 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM5 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }

    ConvertCSS6() {

        if (this.props.data.SM6 >= a && this.props.data.SM6 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM6 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS7() {

        if (this.props.data.SM7 >= a && this.props.data.SM7 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM7 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS8() {

        if (this.props.data.SM8 >= a && this.props.data.SM8 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM8 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS9() {

        if (this.props.data.SM9 >= a && this.props.data.SM9 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM9 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS10() {

        if (this.props.data.SM10 >= a && this.props.data.SM10 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM10 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }

    ConvertCSS11() {

        if (this.props.data.SM11 >= a && this.props.data.SM11 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM11 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS12() {

        if (this.props.data.SM12 >= a && this.props.data.SM12 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM12 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS13() {

        if (this.props.data.SM13 >= a && this.props.data.SM13 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM13 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS14() {

        if (this.props.data.SM14 >= a && this.props.data.SM14 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM14 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS15() {

        if (this.props.data.SM15 >= a && this.props.data.SM15 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM15 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }

    ConvertCSS16() {

        if (this.props.data.SM16 >= a && this.props.data.SM16 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM16 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS17() {

        if (this.props.data.SM17 >= a && this.props.data.SM17 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM17 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS18() {

        if (this.props.data.SM18 >= a && this.props.data.SM18 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM1 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS19() {

        if (this.props.data.SM19 >= a && this.props.data.SM19 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM19 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }
    ConvertCSS20() {

        if (this.props.data.SM20 >= a && this.props.data.SM20 < b) {

            return "bgmedium";
        }
        else if (this.props.data.SM1 < a) {
            return "bglow";
        }
        else {
            return "bghigh";
        }

    }

    // ConvertCSS21() {

    //     if (this.props.data.SM21 >= a && this.props.data.SM21 < b) {

    //         return "bgmedium";
    //     }
    //     else if (this.props.data.SM21 < a) {
    //         return "bglow";
    //     }
    //     else {
    //         return "bghigh";
    //     }

    // }
    // ConvertCSS22() {

    //     if (this.props.data.SM22 >= a && this.props.data.SM22 < b) {

    //         return "bgmedium";
    //     }
    //     else if (this.props.data.SM1 < a) {
    //         return "bglow";
    //     }
    //     else {
    //         return "bghigh";
    //     }

    // }
    // ConvertCSS23() {

    //     if (this.props.data.SM23 >= a && this.props.data.SM23 < b) {

    //         return "bgmedium";
    //     }
    //     else if (this.props.data.SM23 < a) {
    //         return "bglow";
    //     }
    //     else {
    //         return "bghigh";
    //     }

    // }
    // ConvertCSS24() {

    //     if (this.props.data.SM24 >= a && this.props.data.SM24 < b) {

    //         return "bgmedium";
    //     }
    //     else if (this.props.data.SM24 < a) {
    //         return "bglow";
    //     }
    //     else {
    //         return "bghigh";
    //     }

    // }
    // ConvertCSS25() {

    //     if (this.props.data.SM25 >= a && this.props.data.SM25 < b) {

    //         return "bgmedium";
    //     }
    //     else if (this.props.data.SM25 < a) {
    //         return "bglow";
    //     }
    //     else {
    //         return "bghigh";
    //     }

    // }



    render() {

        // console.log(this.ConvertCSS1());
        return (
            <React.Fragment>
            <div className="w-100 nhaluoi mb-5 mt-4">
                <h4 className="text-center mt-3 !important">Khu nhà lưới</h4>
                <Row className="ml-2 mr-1 mt-4 px-0 !important">
                    <Col className="pl-0 pr-0 mb-3 Table__size--col !important">
                        <Card className="   !important" >
                            <CardBody className={this.ConvertCSS1()} >
                                <div className="font-weight-bolder h4 text-center Table-cardbody--text-size" >SM1: {this.props.data.SM1}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="pl-0 pr-0 Table__size--col  !important">
                        <Card className="   !important" >
                            <CardBody className={this.ConvertCSS2()} >
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size" >SM2: {this.props.data.SM2}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="pl-0 pr-0 Table__size--col  !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS3()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM3: {this.props.data.SM3}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0  !important" >
                            <CardBody className={this.ConvertCSS4()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM4: {this.props.data.SM4}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS5()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM5: {this.props.data.SM5}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
            </Row>
                <Row className="ml-2 mr-1 px-0 !important">
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS6()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM6: {this.props.data.SM6}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS7()} >
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM7: {this.props.data.SM7}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS8()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM8: {this.props.data.SM8}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS9()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM9: {this.props.data.SM9}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS10()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM10: {this.props.data.SM10}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
            </Row>
            </div>
            <div className="w-100 nhakinh mb-5">
                <h4 className="text-center mt-3 !important">Khu nhà kính</h4>
                <Row className="ml-2 mr-1  px-0 !important mt-4">
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS11()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM11: {this.props.data.SM11}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS12()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM12: {this.props.data.SM12}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS13()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM13: {this.props.data.SM13}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS14()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM14: {this.props.data.SM14}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS15()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM15: {this.props.data.SM15}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
            </Row>
                <Row className="ml-2 mr-1  px-0 !important">
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS16()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM16: {this.props.data.SM16}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS17()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM17: {this.props.data.SM17}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS18()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM18: {this.props.data.SM18}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mx-0 px-0 Table__size--col !important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS19()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM19: {this.props.data.SM19}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mx-0 px-0 Table__size--col!important">
                        <Card className=" mx-0 px-0   !important" >
                            <CardBody className={this.ConvertCSS20()}>
                                <div className="m-b-5 font-weight-bolder h4 text-center Table-cardbody--text-size">SM20: {this.props.data.SM20}</div>
                                {/* <div className="m-0 font-weight-lighter h5 text-center">{ghgg}</div> */}
                            </CardBody>
                        </Card>
                    </Col>
            </Row>
            </div>
            {/* <h3 className="Table--lable--text text-center text-danger">Bảng theo dõi độ ẩm đất theo thời gian thực</h3> */}
                <hr />
            </React.Fragment>
        )

    }
}

export default TableForSoilMoisture;
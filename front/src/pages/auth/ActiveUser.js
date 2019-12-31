import React from "react";
import {
    Card, CardBody,
    Button,
} from "reactstrap";
import { NavLink } from 'react-router-dom';
import { CustomImg } from "../../components/CustomTag";
import success_icon from "../../assets/img/photos/success_icon.gif";
import warning_error from "../../assets/img/photos/warning_error.gif";
import { LoadingSprinner } from "../../components/CustomTag";
const api = require("./api/api");

class SignUpSuccessfully extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccess: null
        }
    }

    componentDidMount() {
        const request = window.location.search
            .slice(1)
            .split('&')
            .map(p => p.split('='))
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
        const that = this;
        api.activeAccount(request, (err, result) => {
            if (err) {
                that.setState({ isSuccess: false })
            } else {
                that.setState({ isSuccess: true })
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.isSuccess === true ?
                        <Card className="bg-white p-3">
                            <CardBody>
                                <center><CustomImg src={success_icon} alt="success_icon" className="img--user--square-8x" /></center>
                                <h1 className="text-center">Your account has been created successfully!</h1>
                                <h3 className="font-size-1x text-center">Welcome to Your Smart Farm</h3>
                                <div className="text-center pt-2">
                                    <NavLink to="/auth/sign-in">
                                        <Button color="success" size="lg">Back to Sign In</Button>
                                    </NavLink>
                                </div>
                            </CardBody>
                        </Card>
                        : this.state.isSuccess === false ?
                            < Card className="bg-white p-3">
                                <CardBody>
                                    <center><CustomImg src={warning_error} alt="success_icon" className="img--user--square-8x" /></center>
                                    <div className="text-center">
                                        <NavLink to="/auth/sign-up">
                                            <Button color="primary" size="lg">Back to Sign Up</Button>
                                        </NavLink>
                                    </div>
                                </CardBody>
                            </Card>
                            : <LoadingSprinner />
                }
            </React.Fragment>
        );
    }
}


export default SignUpSuccessfully;

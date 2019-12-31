import React from "react";
import { Link, NavLink } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { CustomImg, LoadingSprinner } from "../../components/CustomTag";
import avata from "../../assets/img/logo/login.png";
import utils from "../../utils/utils";
import {
    Button,
    Card, CardBody,
    Form, FormGroup, FormFeedback,
    Input,
    Alert,
    Container,
} from "reactstrap";
import "./SignIn.css";
const api = require("./api/api");
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (!(email && password)) {
            return;
        }

        this.setState({ loading: true });
        setTimeout(() => {
            api.login(email, password, (err, result) => {
                if (err) {
                    this.setState({ error: err.data === undefined ? err : err.data._error_message, loading: false })
                } else {
                    console.log(result);

                    if (result._id !== undefined) {
                        localStorage.setItem('userInfo', JSON.stringify({
                            id: result._id,
                            token: result.auth_token,
                            full_name: result.full_name,
                            photo: result.photo,
                            is_admin: result.is_admin
                        }))
                    }
                    window.location.replace("/stations");
                }
            })
        }, 500);
    }

    render() {
        const { email, password, submitted, loading, error } = this.state;
        return (

            <React.Fragment>
                <Container className="signin-container-width">
                    {error &&
                        <Alert color="danger" className="p-2" >{error}</Alert>
                    }
                    <div class="d-flex justify-content-center container">
                        <Card className="col-md-7 p-2 !important signin-card">
                            <CardBody className="px-0 pt-0 pb-0">
                                <div className="m-sm-4">
                                    <div className="text-center">
                                        <CustomImg
                                            width={170}
                                            height={170}
                                            key={utils.randomString()}
                                            src={avata}
                                            className="img--user--square-7x mb-2"
                                        />
                                    </div>
                                    <h1 className="text-center signin-text-fwork">Smart Farm</h1>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <Input
                                                bsSize="mb-3"
                                                type="email"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                placeholder="Email"
                                                invalid={submitted && !email ? true : false}
                                            />
                                            <FormFeedback invalid>
                                                Email là một trường bắt buộc phải nhập!
                                            </FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                bsSize="mb-3"
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                placeholder="Password"
                                                invalid={submitted && !password ? true : false}
                                            />
                                            <FormFeedback invalid>
                                                Mật khẩu là một trường bắt buộc phải nhập!
                                            </FormFeedback>
                                            <small>
                                                <Link className="text-password" to="/auth/reset-password">Quên mật khẩu</Link>
                                            </small>
                                            <div className="text-center mt-3">
                                                {loading === false ?
                                                    <Button
                                                        color="primary"
                                                        font-weight="200"
                                                        size="mb-3"
                                                        className="btn btn-block text-capitalize"
                                                    >
                                                        Đăng nhập
                                                    </Button>
                                                    :
                                                    <LoadingSprinner />
                                                }
                                            </div>

                                        </FormGroup>
                                    </Form>
                                
                                
                                    <div className="text-center mt-2">
                                        <NavLink to="/auth/sign-up">Bạn chưa có tài khoản. Đăng ký?</NavLink>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Container>

                
            </React.Fragment>
        );
    }
}

export default SignIn;

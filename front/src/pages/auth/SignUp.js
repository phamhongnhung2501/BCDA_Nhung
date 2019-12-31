import React from "react";
import { NavLink } from 'react-router-dom'
import { withTranslation } from 'react-i18next';
import { LoadingSprinner } from "../../components/CustomTag";
import "./SignUp.css"
import {
    Button,
    Card, CardBody,
    Form, FormGroup, FormFeedback,
    Label,
    Input, CustomInput,
    Alert,
    Container,
} from "reactstrap";

const api = require("./api/api");

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.term = React.createRef()
        this.textInput = React.createRef();
        this.state = {
            email: "",
            full_name: "",
            password: "",
            phone_number: "",
            terms: false,
            submitted: false,
            loading: false,
            phone_number: "",
            error: "",
            success: "",
            confirm_password: "",
            visible: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.statusTerms = this.statusTerms.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = Object.assign(this.state);

        this.setState({ submitted: true });
        const { email, password, confirm_password, phone_number } = this.state;

        // stop here if form is invalid
        if (!(email && password && phone_number && confirm_password && password === confirm_password && !this.validatePhoneNumber(phone_number) && !this.validatePassword(password))) {
            return;
        }

        this.setState({ loading: true });
        setTimeout(() => {
            api.register(data, (err, response) => {
                console.log(response);

                if (err) {
                    this.setState({ error: err.data === undefined ? err : err.data._error_message, loading: false })
                } else {
                    this.setState({ success: "Your account has been successfully created, Please check your email to activate your account", loading: false });
                    window.location.replace("/auth/verify-account?email=" + this.state.email);
                }
            }
            )
        }, 500);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    statusTerms(event) {
        this.setState({
            [event.target.name]: event.target.checked
        })
    }

    validateEmail(value) {
        let error;
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = false;
        } else {
            error = true;
        }
        return error;
    }

    validatePassword(value) {
        let error;
        if (/(?=^.{8,}$).*$/i.test(value)) {
            error = false;
        } else {
            error = true;
        }
        return error;
    }

    validatePhoneNumber(value) {
        let error;
        if (/^\d{10,11}$/i.test(value)) {
            error = false;
        } else {
            error = true;
        }
        return error;
    }

    render() {
        const { email, password, phone_number, full_name, terms, confirm_password, submitted, loading, error, success } = this.state;

        return (
            <React.Fragment>
                <Container className="signup-container">
                    {success &&
                        <Alert className="p-2" color="success">{success}</Alert>
                    }
                    {error &&
                        <Alert className="p-2" color="danger" isOpen={success ? false : true}>{error}</Alert>
                    }
                    <Card className="signup-card">
                        <h1 className="text-center signup-text-register mt-3">Đăng ký</h1>
                        <CardBody className="signup-card-body">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label className="text-primary">Email</Label>
                                    <Input
                                        bsSize="mb-3"
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        placeholder="Email"
                                        invalid={submitted && this.validateEmail(this.state.email) ? true : false}
                                    />
                                    {!email &&
                                        <FormFeedback invalid>
                                            Email là trường bắt buộc bạn cần nhập!
                                    </FormFeedback>
                                    }
                                    {email && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) &&
                                        <FormFeedback invalid>
                                            Email không tồn tại!
                                    </FormFeedback>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-primary">Tên đầy đủ</Label>
                                    <Input
                                        bsSize="mb-3"
                                        type="text"
                                        name="full_name"
                                        value={this.state.full_name}
                                        onChange={this.handleChange}
                                        placeholder="Tên đầy đủ"
                                        invalid={submitted && !full_name ? true : false}
                                    />
                                    <FormFeedback invalid>
                                        Đây là trường bắt buộc bạn cần nhập!
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-primary ">Mật khẩu</Label>
                                    <Input
                                        bsSize="mb-3"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        placeholder="Mật khẩu"
                                        invalid={submitted && this.validatePassword(this.state.password) ? true : false}
                                    />
                                    {!password &&
                                        <FormFeedback invalid>
                                             Đây là trường bắt buộc bạn cần nhập!
                                    </FormFeedback>
                                    }

                                    {password && (!/(?=^.{8,}$).*$/i.test(password)) &&
                                        <FormFeedback invalid>
                                            Mật khẩu của bạn phải chứa ít nhất 8 ký tự hoặc hơn!
                                    </FormFeedback>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-primary">Xác thực mật khẩu</Label>
                                    <Input
                                        bsSize="mb-3"
                                        type="password"
                                        name="confirm_password"
                                        value={this.state.confirm_password}
                                        onChange={this.handleChange}
                                        placeholder="Xác thực mật khẩu"
                                        invalid={submitted && password !== confirm_password ? true : false}
                                    />
                                    <FormFeedback invalid>
                                        Xác thực mật khẩu không chính xác. Vui lòng nhập lại!
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-primary">Số điện thoại</Label>
                                    <Input
                                        bsSize="mb-3"
                                        type="number"
                                        name="phone_number"
                                        value={this.state.phone_number}
                                        onChange={this.handleChange}
                                        placeholder="Số điện thoại"
                                        invalid={submitted && this.validatePhoneNumber(this.state.phone_number) ? true : false}
                                    />
                                    {!phone_number &&
                                        <FormFeedback invalid>
                                           Đây là trường bắt buộc bạn cần nhập!
                                    </FormFeedback>
                                    }
                                    {phone_number && (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(phone_number)) &&
                                        <FormFeedback invalid>
                                           Số điện thoại không tồn tại!
                                    </FormFeedback>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        <CustomInput type="checkbox" name="terms" id="term" onChange={this.statusTerms} />
                                    </Label>
                                    <small>
                                        <NavLink to="/term" target="_blank" className="mt-1">
                                            Bạn đồng ý với điều khoản và dịch vụ của chúng tôi?
                                        </NavLink>
                                    </small>
                                </FormGroup>
                                <div className="text-center mt-3">
                                    {loading === false ?
                                        <Button
                                            color="primary"
                                            size="mb-3"
                                            disabled={!terms ? true : false}>
                                            Đăng ký
                                    </Button>
                                        :
                                        <LoadingSprinner />
                                    }
                                </div>
                            </Form>
                            {/* <div className="text-center mt-2"> */}
                            {/* <NavLink to="/auth/sign-in" >Already have an account. Signin?</NavLink> */}
                            {/* <NavLink to="/auth/verify-account" >-> Next to the Verify Account page</NavLink> */}
                            {/* </div> */}
                        </CardBody>
                    </Card>
                </Container>

            </React.Fragment>
        );
    }
}


export default SignUp;
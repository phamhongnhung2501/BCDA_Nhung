import React from "react";

import { Col, Container, Row } from "reactstrap";

import Main from "../components/Main";

import LoadingOverlay from "react-loading-overlay";
import "./Auth.css";
function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
}

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
        this.handleLoading = this.handleLoading.bind(this);
    }

    handleLoading(action) {
        this.setState({
            isLoading: action,
        });
    }

    render() {
        let children_props = Object.assign(
            { handleLoading: this.handleLoading },
            this.props.children.props,
        );
        let children = _objectWithoutProperties(this.props.children, "props");
        children = Object.assign(children, { props: children_props });

        return (
            <React.Fragment>
                <LoadingOverlay active={this.state.isLoading} spinner text='Please wait...'>
                    <Main className='d-flex w-100 sign-back'>
                        <Container className='d-flex flex-column'>
                            <Row className='h-100'>
                                <Col sm='6' md='8' lg='8' className='mx-auto d-table h-100'>
                                    <div className='d-table-cell align-middle '>{children}</div>
                                </Col>
                            </Row>
                        </Container>
                    </Main>
                </LoadingOverlay>
            </React.Fragment>
        );
    }
}

export default Auth;

import React from "react";

import {
    Spinner
} from "reactstrap";

const returnWhenThisNull = require("../utils/utils").returnThisWhenNull;

class LoadingSprinner extends React.Component {
    render() {
        return (
            this.props.type
                ?
                <div className={"text-align-center " + returnWhenThisNull(this.props.className, "")}>
                    <Spinner color="info" size={returnWhenThisNull(this.props.size, "")}/>
                </div>
                :
            <div className={"text-align-center " + returnWhenThisNull(this.props.className, "")}>
                <Spinner color="info" type="grow" size={returnWhenThisNull(this.props.size, "")}/>
                <Spinner color="danger" type="grow" size={returnWhenThisNull(this.props.size, "")}/>
                <Spinner color="success" type="grow" size={returnWhenThisNull(this.props.size, "")}/>
            </div>
        )
    }
}

export default LoadingSprinner;
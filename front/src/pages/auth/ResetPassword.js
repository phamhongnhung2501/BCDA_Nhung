import React from "react";
import {
	Button,
	Card,CardBody,
	Form, FormGroup, FormFeedback,
	Label,
	Input,
	Alert
} from "reactstrap";

const api = require("./api/api");

class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			submitted: false
		}
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
		const { email } = this.state;

		// stop here if form is invalid
		if (!email) {
			return;
		}

		setTimeout(() => {
			api.recovery(email, (err, result) =>{	
				if(err){				
					this.setState({isError: true, isSuccess:false, loading: false})
				} else {
					this.setState({isSuccess: true, isError:false, loading: false})
				}
			})
		}, 500);
  }
  
  validateEmail(value) {
    let error;
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = false;
    } else{
        error = true;
    }
    return error;
  }
	render() {
		const { email, submitted, isSuccess, isError } = this.state;
		return (
			<React.Fragment>
				{isSuccess &&
					<Alert  color="primary"  className="p-2" >
						<div>Check your email to complete the password reset</div>
					</Alert>
				}
				{isError &&
					<Alert  color="danger" className="p-2" >
						<div>Email doesn't exist!</div>
					</Alert>
				}

				<div className="text-center mt-2">
				<h1 className="h2">Reset password</h1>
				<p className="lead">Enter your email to reset your password.</p>
				</div>

				<Card>
				<CardBody>
					<div className="m-sm-4">
					<Form onSubmit={this.handleSubmit}>
						<FormGroup>
							<Label>Email</Label>
							<Input
								bsSize="lg"
								type="email"
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
                				placeholder="Enter your email"
                				invalid={submitted && this.validateEmail(this.state.email)}
							/>
							{ !email &&
								<FormFeedback invalid>
									Email s a required field!
								</FormFeedback> 
							}
							{ email && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) &&
								<FormFeedback invalid>
									Email is not valid!
								</FormFeedback> 
							}    
						</FormGroup>
						<div className="text-center mt-3">
							<Button color="primary" size="lg">
								Reset password
							</Button>
						</div>
					</Form>
					</div>
				</CardBody>
				</Card>
			</React.Fragment>
		);
	}
}

export default ResetPassword;
import React, {Component} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerUser} from "../../actions/authActions";
import {withRouter} from 'react-router-dom';
import TextField from '../common/TextFieldGroup';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="row m-4">
                <div className="col-md-8 offset-md-2">
                    <h1 className="text-center">Sign Up</h1>
                    <p className="text-center">Create your DevConnector account</p>
                    <form noValidate onSubmit={this.onSubmit}>
                        <TextField value={this.state.name}
                                   placeholder="name"
                                   name="name"
                                   type="name"
                                   error={errors.name}
                                   onChange={this.onChange}
                        />
                        <TextField value={this.state.email}
                                   name="email"
                                   type="email"
                                   error={errors.email}
                                   onChange={this.onChange}
                                   placeholder="email"
                                   info="We'll never share your email with This site uses Gravatar so if you want a profile image, use a Gravatar email"
                        />
                        <TextField value={this.state.password}
                                   placeholder="password"
                                   name="password"
                                   type="password"
                                   error={errors.password}
                                   onChange={this.onChange}
                        />
                        <TextField value={this.state.password2}
                                   placeholder="confirm password"
                                   name="password2"
                                   type="password"
                                   error={errors.password2}
                                   onChange={this.onChange}
                        />
                        <button type="submit" className="btn btn-info btn-block mt-4">submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
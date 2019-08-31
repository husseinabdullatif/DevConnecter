import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import TextField from '../common/TextFieldGroup';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('./dashboard');
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="row m-4">
                <div className="col-md-8 offset-md-2">
                    <h1 className="text-center">Login</h1>
                    <p className="text-center">Create your DevConnector account</p>
                    <form onSubmit={this.onSubmit}>
                        <TextField value={this.state.email}
                                   placeholder="email"
                                   name="email"
                                   type="email"
                                   error={errors.email}
                                   onChange={this.onChange}
                        />
                        <TextField value={this.state.password}
                                   name="password"
                                   type="password"
                                   error={errors.password}
                                   onChange={this.onChange}
                                   placeholder="Password"
                        />

                        <button type="submit" className="btn btn-info btn-block mt-4">submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {loginUser})(withRouter(Login));
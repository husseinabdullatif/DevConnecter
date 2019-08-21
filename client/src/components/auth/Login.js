import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';

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
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated){
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
                        <div className="form-group">
                            <input
                                name="email"
                                type="email"
                                className={classnames('form-control', {
                                    'is-invalid': errors.email
                                })}
                                id="email-address"
                                placeholder="Enter email"
                                onChange={this.onChange}
                            />
                            <small className="form-text text-muted">We'll never share your email with
                                This site uses Gravatar so if you want a profile image, use a Gravatar email
                            </small>
                            <div className='invalid-feedback'>{errors.email}</div>
                        </div>
                        <div className="form-group">
                            <input
                                name="password"
                                type="password"
                                className={classnames('form-control', {
                                    'is-invalid': errors.password
                                })}
                                placeholder="password"
                                onChange={this.onChange}
                            />
                            <div className='invalid-feedback'>{errors.password}</div>
                        </div>
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
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../style/navbar.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logOutUser} from "../../actions/authActions";
import {clearCurrentProfile} from "../../actions/profileActions";

class Navbar extends Component {
    onLogOutClick(e) {
        e.preventDefault();
        this.props.logOutUser();
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to="" onClick={this.onLogOutClick.bind(this)} className="nav-link">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="rounded-circle"
                            style={{width: "25px", marginRight: "5px"}}
                        />
                        Logout
                    </Link>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">SignUp</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        );

        return (
            <header>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                    <div className="container">
                        <Link to="/" className="navbar-brand">DevConnector</Link>
                        <button className="navbar-toggler" data-target="#collapse" data-toggle="collapse">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/profiles" className="nav-link">
                                        Developers
                                    </Link>
                                </li>
                            </ul>
                            {
                                isAuthenticated ? authLinks : guestLinks
                            }
                        </div>
                    </div>
                </nav>
            </header>

        );
    }
}

Navbar.propTypes = {
    logOutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {logOutUser, clearCurrentProfile})(Navbar);
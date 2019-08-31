import React, {Component} from 'react';
import {getCurrentProfile, deleteAccount} from "../../actions/profileActions";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
import ProfileActions from './profileActions';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteAccount(e) {
        this.props.deleteAccount();
    }

    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;
        let dashboardContent;
        if (profile === null || loading) {
            dashboardContent = <Spinner/>
        }
        else {
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted mt-2">
                            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <ProfileActions/>
                        <div className="mt-2 mb-2">
                            <button type="button" onClick={this.onDeleteAccount.bind(this)} className="btn btn-danger">Delete my
                                account
                            </button>
                        </div>
                    </div>
                )
            }
            else {
                dashboardContent = <div className="mt-5 mb-5">
                    <p className="lead text-muted">Welcome {user.name}</p>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">
                        Create Profile
                    </Link>
                </div>
            }
        }

        return (
            <div className="dashboard">
                {dashboardContent}
            </div>
        );
    }
}


Dashboard.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile,
        auth: state.auth
    };
}

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
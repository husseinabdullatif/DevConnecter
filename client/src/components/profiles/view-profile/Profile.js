import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import {getProfileByHandle} from '../../../actions/profileActions';
import Spinner from '../../common/Spinner';

class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle)
        }
    }

    render() {
        const {profile} = this.props.profile;
        let viewProfile;
        if (profile === null) {
            viewProfile = <Spinner/>
        }
        else {
            viewProfile = (
                <div>
                    <ProfileHeader/>
                    <ProfileCreds/>
                    <ProfileGithub/>
                    <ProfileAbout/>
                </div>
            )
        }
        return (
            <div>
                {viewProfile}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
};

export default connect(mapStateToProps, {getProfileByHandle})(Profile);
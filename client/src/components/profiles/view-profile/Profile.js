import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import {getProfileByHandle} from '../../../actions/profileActions';
import Spinner from '../../common/Spinner';

class Profile extends Component {
    componentWillReceiveProps(nextProps){
        if(nextProps.profile.profile === null){
            this.props.history.push('/not-found')
        }
    }
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
                <div className="col-md-12">
                    <div className="col-md-12 mt-4 mb-4">
                        <div className="col-md-6">
                            <Link to='/profiles' className="btn btn-dark"> Back to profiles </Link>
                        </div>
                        <div className="col-md-6"/>
                    </div>
                    <div className="col-md-12">
                        <ProfileHeader profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <ProfileCreds education={profile.education} experience={profile.experience}/>
                        {profile.githubusername? (<ProfileGithub username={profile.githubusername}/>) : null}
                    </div>
                </div>
            )
        }
        return (
            <div className="row">
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
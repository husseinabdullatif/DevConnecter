import React, {Component} from 'react';
import isEmpty from '../../validaion/isEmty';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileItem extends Component {
    render() {
        const {profile} = this.props;
        return (
            <div className="card card-body bg-light mb-4">
                <div className="row">
                    <div className="col-2">
                        <img src={profile.user.avatar} className="rounded-circle" alt=""/>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{profile.user.name}</h3>
                        <p>
                            {profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
                        </p>
                        <p>
                            {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
                        </p>
                        <Link className="btn btn-info" to={`/profile/${profile.handle}`}>view profile</Link>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h4>skill set</h4>
                        <ul className="list-group">
                            {
                                profile.skills.slice(0,4).map((skill, index)=>{
                                    return(
                                        <li key={index} className="list-group-item">
                                            <i className="fa fa-check pr-1"/>
                                            {skill}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileItem;
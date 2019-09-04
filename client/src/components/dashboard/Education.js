import React, {Component} from "react";
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileActions';
import PropTypes from 'prop-types';

class Education extends Component {
    constructor(props) {
        super(props);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onDeleteClick(id) {
        this.props.deleteEducation(id);
    }

    render() {
        const education = this.props.education.map(edu => {
            return (
                <tr key={edu._id}>
                    <td>{edu.school}</td>
                    <td>{edu.degree}</td>
                    <td>
                        <Moment format="YYYY/MM/DD">{edu.from}</Moment>{' - '}
                        {
                            edu.to === null ?
                                ("now") :
                                (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)
                        }
                    </td>
                    <td>
                        <button type="button" onClick={()=>{this.onDeleteClick(edu._id)}} className="btn btn-danger">Delete
                        </button>
                    </td>
                </tr>
            );
        });
        return (
            <div>
                <h4 className='mb-4'>Experience Credentials</h4>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>years</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {education}
                    </tbody>
                </table>
            </div>
        );
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
};

export default connect(null, {deleteEducation})(Education);
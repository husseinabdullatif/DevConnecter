import React from 'react';
import {Link, withRouter} from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addEducation} from "../../actions/profileActions";

class AddEducation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            school: "",
            degree: "",
            fieldofstudy: "",
            from: "",
            to: "",
            current: false,
            description: "",
            errors: {},
            disabled: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description,
        };
        this.props.addEducation(eduData, this.props.history)
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            [e.target.name]: !this.state.current
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    render() {
        const errors = this.state.errors;
        return (
            <div className="add-experience">
                <div className=" mt-4  mb-4 container">
                    <div className="raw">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">
                                Add Education
                            </h1>
                            <p className="lead text-center">
                                Add any school, bootcamp, etc that you have attended
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    placeholder="* school"
                                    error={errors.school}
                                />
                                <TextFieldGroup
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    placeholder="*degree or certification"
                                    error={errors.degree}
                                />
                                <TextFieldGroup
                                    name="fieldofstudy"
                                    value={this.state.fieldofstudy}
                                    onChange={this.onChange}
                                    placeholder="* fieldofstudy"
                                    error={errors.fieldofstudy}
                                />
                                <h6>* from date</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>to date</h6>
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={this.state.disabled}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        name="current"
                                        value={this.state.current}
                                        onChange={this.onCheck}
                                        type="checkbox"
                                        className="form-check-input"
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">Current Job</label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="program description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="tell us about the program that you are in"
                                />
                                <input type="submit" value="submit" className="btn btn-info btn-block"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));
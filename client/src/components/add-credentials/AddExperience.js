import React from 'react';
import {Link, withRouter} from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addExperience} from "../../actions/profileActions";

class AddExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "",
            title: "",
            location: "",
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
        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description,
        };
        this.props.addExperience(expData, this.props.history)
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
                                Add Experience
                            </h1>
                            <p className="lead text-center">
                                Add any job position that you have had in the past or current
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    placeholder="* company"
                                    error={errors.company}
                                />
                                <TextFieldGroup
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    placeholder="* job title"
                                    error={errors.title}
                                />
                                <TextFieldGroup
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    placeholder="location"
                                    error={errors.location}
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
                                    placeholder="job description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="tell us about the position"
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

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));
import React from 'react';
import TextAreaFieldGroup from '../common/textAreaFieldGroup';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from '../../actions/postActions';

class PostForm extends React.Component {
    constructor() {
        super();
        this.state = {
            text: "",
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    onSubmit(e) {
        e.preventDefault();
        const {name, avatar} = this.props.auth.user;
        const newPost = {
            name,
            avatar,
            text: this.state.text
        };
        this.props.addPost(newPost);
        this.setState({text: ""})
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg-info text-white">
                                say something ...
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <TextAreaFieldGroup
                                        placeholder="write post"
                                        name="text"
                                        value={this.state.text}
                                        onChange={this.onChange}
                                        error={this.state.errors.text}
                                    />
                                    <button type="submit" className="btn btn-dark">submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PostForm.propTypes = {
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    }
};
export default connect(mapStateToProps, {addPost})(PostForm);
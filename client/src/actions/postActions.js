import axios from 'axios';
import {ADD_POST,GET_ERRORS} from '../actions/types';
export const addPost = (newPost) => dispatch => {
    axios
        .post('/api/posts', newPost)
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            });
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload:err.response.data
            })
        })
};
import axios from 'axios';
import {GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER} from "./types";
import {setCurrentUser} from "./authActions";

export const getCurrentProfile = () => dispatch => {
    axios.get('/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
};

export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => {
            history.push("/dashboard")
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

export const clearCurrentProfile = () => dispatch => {
    dispatch({
        type: CLEAR_CURRENT_PROFILE
    })
};

export const deleteAccount = () => dispatch => {
    axios
        .delete("/api/profile/")
        .then(res => {
            dispatch(setCurrentUser({}))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

};
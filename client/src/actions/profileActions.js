import axios from 'axios';
import {GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_ERRORS, GET_PROFILES} from "./types";
import {logOutUser} from "./authActions";

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
            history.push("/dashboard");
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
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

export const addExperience = (expData, hisory) => dispatch => {
    axios
        .post("/api/profile/experience", expData)
        .then(res => {
            hisory.push('/dashboard')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};
export const addEducation = (eduData, hisory) => dispatch => {
    axios
        .post("/api/profile/education", eduData)
        .then(res => {
            hisory.push('/dashboard')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

export const deleteExperience = (id) => dispatch => {
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

};

export const deleteEducation = (id) => dispatch => {
    axios
        .delete(`/api/profile/education/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

};

export const deleteAccount = (history) => dispatch => {
    axios
        .delete("/api/profile/")
        .then(res => {
            history.push('/register');
            dispatch(logOutUser({}));
            dispatch(clearCurrentProfile())
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

};

export const getProfiles = () => dispatch => {
    axios
        .get("api/profile/all")
        .then(res => {
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        })
};

export const getProfileByHandle = (handle) => dispatch => {
    axios
        .get(`/api/profile/handle/${handle}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: null
            })
        })
};
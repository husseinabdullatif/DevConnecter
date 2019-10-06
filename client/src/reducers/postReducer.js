import {ADD_POST} from "../actions/types";

const initialState = {
    post: {},
    posts: []
};

export default function (state=initialState, action) {
    switch (action.type){
        case(ADD_POST):
            return{
                ...state,
                post: action.payload,
                posts: [action.payload,...state.posts]
            };
        default:
            return state;
    }
}
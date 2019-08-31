import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from "./actions/authActions";
import {logOutUser} from "./actions/authActions";
import {clearCurrentProfile} from "./actions/profileActions";

if(localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now()/1000;
    if(decoded.exp < currentTime){
        clearCurrentProfile();
        store.dispatch(logOutUser());
        window.location.href = '/login'
    }
}

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));


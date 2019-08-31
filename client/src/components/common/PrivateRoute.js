import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

// function PrivateRoute({component: Component, auth}) {
//     return (
//         <Route
//             render={
//                 props => auth.isAuthenticated === true ?
//                     (<Component {...props} />) : (<Redirect to="/login"/>)
//             }
//         />
//     );
// }

function PrivateRoute({auth, path, component}) {
    return (
        auth.isAuthenticated=== true? <Route exact path={path} component={component}/>: <Redirect to='/login' />
    );
}

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

export default connect(mapStateToProps)(PrivateRoute);

//React
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//style
import './App.css';
//Components
import Landing from './components/layouts/Landing';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/greate-profile/CreateProfile';
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profiles/view-profile/Profile";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <Route exact path="/" component={Landing}/>
                    <div className="container">
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profiles" component={Profiles} />
                        <Route exact path="/profile/:handle" component={Profile} />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/add-experience" component={AddExperience} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/add-education" component={AddEducation} />
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </Router>
        )
    }
}

export default App;
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './components/layouts/Landing';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

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
                    </div>
                    <Footer/>
                </div>
            </Router>
        )
    }
}

export default App;
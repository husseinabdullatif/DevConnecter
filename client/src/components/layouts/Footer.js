import React, {Component} from 'react';

class Landing extends Component {
    render() {
        return (
            <footer className="bg-dark text-white p-4 text-center">
                Copyright &copy; {new Date().getFullYear()} DevConnector
            </footer>
        );
    }
}

export default Landing;
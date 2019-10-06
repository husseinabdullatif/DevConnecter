import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProfileGithub extends Component {
    constructor() {
        super();
        this.state = {
            clientId: 'aae699f126ef4fe37a21',
            clientSecret: '7c0b0f874b60c10bddf4b77b8e357d3295fa386a',
            count: 5,
            sort: 'created: asc',
            repos: []
        }
    }

    componentDidMount() {
        const username = this.props.username;
        const { count, sort, clientId, clientSecret } = this.state;
        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    repos: data
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        const repos = this.state.repos;
        const repoItems = repos.map(repo => (
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <Link to={repo.html_url} className="text-info" target="_blank">
                                {repo.name}
                            </Link>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1">
                            Stars: {repo.stargazers_count}
                        </span>
                        <span className="badge badge-secondary mr-1">
                            Watchers: {repo.watchers_count}
                        </span>
                        <span className="badge badge-success">
                            Forks: {repo.forks_count}
                        </span>
                    </div>
                </div>
            </div>
        ));
        return (
            <div>
                <h3 className="mb-4">Latest Github Repos</h3>
                {repoItems}
            </div>
        );
    }
}

export default ProfileGithub;
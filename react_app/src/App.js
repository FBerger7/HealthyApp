import React, {Component} from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import BMIForm from './components/BMIForm';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: '',
            weight: 0,
            height: 1
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/healthy_app/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    this.setState(
                        {
                            id: json.id,
                            username: json.username,
                            weight: json.weight,
                            height: json.height
                        });
                });
        }
    }

    handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    id: json.id,
                    username: json.user.username,
                    weight: json.user.weight,
                    height: json.user.height
                });
            });
    };

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/healthy_app/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.username
                });
            });
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({logged_in: false, username: ''});
        this.state.displayed_form = "home"
    };

    handle_bmi = (e, data) => {
                e.preventDefault();
        fetch(`http://localhost:8000/healthy_app/update_user/${this.state.id}/`, {
            method: 'PUT',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {

                this.setState({
                    weight: json.weight,
                    height: json.height
                });
            });
    }


    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };

    render() {
        let form;
        switch (this.state.displayed_form) {
            case 'home':
                form = <Home logged_in={this.state.logged_in} username={this.state.username}/>;
                break;
            case 'login':
                form = <LoginForm handle_login={this.handle_login}/>;
                break;
            case 'signup':
                form = <SignupForm handle_signup={this.handle_signup}/>;
                break;
            case 'bmi':
                form = <BMIForm handle_bmi={this.handle_bmi} height={parseFloat(this.state.height)}
                                weight={parseFloat(this.state.weight)} username={this.state.username}/>;
                break;
            default:
                form = <Home logged_in={this.state.logged_in} username={this.state.username}/>;
        }

        return (
            <div className="App">
                <Nav
                    logged_in={this.state.logged_in}
                    display_form={this.display_form}
                    handle_logout={this.handle_logout}
                />
                {form}
                {this.state.id}
            </div>
        );
    }
}

export default App;

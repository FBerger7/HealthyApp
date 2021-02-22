import React, {Component} from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MyMap from './components/Map';
import './App.css';
import {TileLayer} from 'react-leaflet'
import {Marker, Popup} from "leaflet";
import AddFriendForm from "./components/AddFriendForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: '',
            show_map: false,
            tmp: ''
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
                    this.setState({username: json.username});
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
                    username: json.user.username,
                    tmp: JSON.stringify(json, null, 5)
                });
            });
    };

    handle_add_friend = (e, data) => {
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
                    username: json.user.username
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
        this.setState({logged_in: false, username: '', show_map: false});
        window.location.reload();
    };

    handle_map = () => {
        this.setState({show_map: true, displayed_form:''});
    };


    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };


    render() {
        let form;
        let position = [51.505, -0.09];
        switch (this.state.displayed_form) {
            case 'login':
                form = <LoginForm handle_login={this.handle_login}/>;
                break;
            case 'signup':
                form = <SignupForm handle_signup={this.handle_signup}/>;
                break;
            case 'add_friend':
                form = <AddFriendForm handle_add_friend={this.handle_add_friend}/>;
                break;
            default:
                form = null;
        }
        let airly_code = <div style={{float: 'right'}}>
            <script src="https://airly.org/map/airly.js"
                    type="text/javascript"/>
            <iframe id="airly_1165337967"
                    title={"Airly"}
                    src="https://airly.org/map/widget.html#w=280&h=380&m=false&i=true&d=false&ah=true&aw=false&l=en&it=AIRLY_CAQI&us=metric&ut=celsius&lat=50.090562&lng=19.092582&id=10546"
                    style={{width: '280px', height: 'auto', border: 'none'}}/>
        </div>;
        let airly = this.state.logged_in ? airly_code : null;

        let map_code = <div>
            <MyMap center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>
            </MyMap>
        </div>;
        let user_map = this.state.show_map ? map_code : null;

        return (
            <div className="App">
                {airly}
                <Nav
                    logged_in={this.state.logged_in}
                    display_form={this.display_form}
                    handle_logout={this.handle_logout}
                    handle_map={this.handle_map}
                    handle_add_friend={this.handle_add_friend}
                />
                {form}
                <h3>
                    {this.state.logged_in
                        ? `Hello, ${this.state.username}`
                        : 'Please Log In'}
                </h3>
                {user_map}
                {this.state.tmp}

            </div>
        );
    }
}

export default App;

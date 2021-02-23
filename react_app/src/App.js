import React, {Component} from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MyMap from './components/Map';
import BMIForm from './components/BMIForm';
import './App.css';
import {TileLayer} from 'react-leaflet'
import {Marker, Popup} from "leaflet";
import AddFriendForm from "./components/AddFriendForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: '',
            weight: 0,
            height: 1,
            show_map: false,
            bmi_state: '',
            bmi_value: null
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
                try{
                    this.setState({
                        logged_in: true,
                        displayed_form: '',
                        id: json.user.id,
                        username: json.user.username,
                        weight: json.user.weight,
                        height: json.user.height
                    });
                }
                catch(err){
                    alert("Wrong credentials! Try again!");
                }
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
        this.state.displayed_form = "home";
        window.location.reload();
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
    };

    handle_map = () => {
        this.setState({show_map: true, displayed_form: ''});
    };


    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };

    render() {
        let form;
        let position = [51.505, -0.09];
        let bmi = null;

        switch (this.state.displayed_form) {
            case 'home':
                form = <Home logged_in={this.state.logged_in} username={this.state.username}/>;
                break;
            case 'login':
                form = <LoginForm handle_login={this.handle_login}/>;
                break;
            case 'add_friend':
                form = <AddFriendForm handle_add_friend={this.handle_add_friend}/>;
                break;
            case 'signup':
                form = <SignupForm handle_signup={this.handle_signup}/>;
                break;
            case 'bmi':
                form = <BMIForm handle_bmi={this.handle_bmi} height={parseFloat(this.state.height)}
                                weight={parseFloat(this.state.weight)} username={this.state.username} bmi_value={this.state.bmi_value}/>;
                let bmi_value = (this.state.weight / this.state.height / this.state.height * 10000).toFixed(2);
                if(bmi_value < 18.5)
                    bmi=<div>Your weight is too low! BMI value: {bmi_value}</div>;
                else if(bmi_value < 25)
                    bmi=<div>Your weight is perfect! BMI value: {bmi_value}</div>;
                else
                    bmi=<div>You are overweight! BMI value: {bmi_value}</div>;
                break;
            default:
                form = <Home logged_in={this.state.logged_in} username={this.state.username}/>;
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
                <Nav
                    logged_in={this.state.logged_in}
                    display_form={this.display_form}
                    handle_logout={this.handle_logout}
                    handle_map={this.handle_map}
                    handle_add_friend={this.handle_add_friend}
                />
                {form}
                {bmi}
                {user_map}
                {/*{this.state.id}*/}
            </div>
        );
    }
}

export default App;

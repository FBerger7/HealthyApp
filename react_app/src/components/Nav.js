import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
    const logged_out_nav = (
        <ul id="menu">

            <li><a href='#' onClick={() => props.display_form('login')}>Login</a></li>
            <li><a href='#' onClick={() => props.display_form('signup')}>Sign up</a></li>
            <li style={{float: "left"}}><a href='#' onClick={() => props.display_form('home')}>Home</a></li>
        </ul>
    );

    const logged_in_nav = (
        <ul id="menu">

            <li><a href='#' onClick={props.handle_logout}>Logout</a></li>
            <li><a href='#' onClick={() => props.display_form('bmi')}>BMI</a></li>
            <li><a href='#' onClick={props.handle_map}>map</a></li>
            <li><a href='#' onClick={() =>props.display_form('add_friend')}>add friend!</a></li>
            <li style={{float: "left"}}><a href='#' onClick={() => props.display_form('home')}>Home</a></li>
        </ul>
    );
    return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired,
    handle_map: PropTypes.func.isRequired,
    handle_add_friend: PropTypes.func.isRequired
};
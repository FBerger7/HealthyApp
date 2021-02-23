import React from 'react';
import PropTypes from 'prop-types';

function Home(props) {
    const logged_out_home = (
        <h3>
           Please Log In!
        </h3>
    );

    const logged_in_home = (
        <div>
            <div style={{float:'right'}}>
                <script src="https://airly.org/map/airly.js"
                        type="text/javascript"/>
                <iframe id="airly_1165337967"
                        title={"Airly"}
                        src="https://airly.org/map/widget.html#w=280&h=380&m=false&i=true&d=false&ah=true&aw=false&l=en&it=AIRLY_CAQI&us=metric&ut=celsius&lat=50.090562&lng=19.092582&id=10546"
                        style={{width:'280px', height:'auto', border:'none'}}/>
            </div>
            <h3>
            Hello, {props.username}
            </h3>
        </div>
    );

    return <div>{props.logged_in ? logged_in_home : logged_out_home}</div>;
}

export default Home;

Home.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired
};
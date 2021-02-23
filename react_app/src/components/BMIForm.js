import React from 'react';
import PropTypes from 'prop-types';

class BMIForm extends React.Component {
    state = {
        username: '',
        height: '',
        weight: '',
        bmi_value:null,
        handle_bmi: null
    };

    constructor(props) {
      super(props);
      this.state.username= props.username;
      this.state.height= props.height;
      this.state.weight= props.weight;
      this.state.handle_bmi= props.handle_bmi;
      this.state.bmi_value = props.bmi_value;
  }

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = {...prevstate};
            newState[name] = value;
            return newState;
        });
    };

    render() {
        return (
            <form onSubmit={e => this.state.handle_bmi(e, this.state)}>
                <h4>BMI</h4>
                <label htmlFor="height">Height [cm]</label>
                <input
                    type="number"
                    name="height"
                    value={this.state.height}
                    onChange={this.handle_change}
                />
                <label htmlFor="weight">Weight [kg]</label>
                <input
                    type="number"
                    name="weight"
                    value={this.state.weight}
                    onChange={this.handle_change}
                />
                {/*<input type="text" size="3" disabled/>*/}
                <input value ="Oblicz" type="submit"/>
                <label htmlFor="Result">Result:</label>
            </form>
        );
    }
}

export default BMIForm;

BMIForm.propTypes = {
        handle_bmi: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired
};
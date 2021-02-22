import React from 'react';
import PropTypes from 'prop-types';

class BMIForm extends React.Component {
    state = {
        height: '',
        weight: '',
        bmi: ''
    };

    constructor(props) {
      super(props);
      this.state.height= props.height;
      this.state.weight= props.weight;
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
            <form onSubmit={e => this.props.handle_bmi(e, this.state)}>
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
                <label htmlFor="Result">Result:</label>
                <input type="text" size="3" disabled/>
                <input value ="Oblicz" type="submit"/>
                bm: {this.state.weight}
                <br/>
                bm: {this.state.height}
            </form>
        );
    }
}

export default BMIForm;

BMIForm.propTypes = {
        handle_bmi: PropTypes.func.isRequired,
        height: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired
};
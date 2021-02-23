import React from 'react';
import PropTypes from 'prop-types';

class AddFriendForm extends React.Component {
  state = {
    username: '',
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <form onSubmit={e => this.props.handle_add_friend(e, this.state)}>
        <h4>Add a friend!</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <input type="submit" />
      </form>
    );
  }
}

export default AddFriendForm;

AddFriendForm.propTypes = {
  handle_add_friend: PropTypes.func.isRequired
};
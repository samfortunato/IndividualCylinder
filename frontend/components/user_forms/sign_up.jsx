import React from 'react';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateValue(value) {
    return (e) => {
      this.setState({ [value]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createUser(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username
          <input
            id="username"
            type="text"
            value={this.state.username}
            onChange={this.updateValue('username')}
          />
        </label>

        <label htmlFor="password">Password
          <input
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.updateValue('password')}
          />
        </label>

        <input type="submit" value="Sign Up"/>
      </form>
    );
  }
}

export default SignUpForm;

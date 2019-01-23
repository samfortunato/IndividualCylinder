import React from 'react';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
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

    this.props.logInUser(this.state);
  }

  render() {
    return (
      <main className="user-form-page">
        <h2>Sign In</h2>

        <form className="user-form" onSubmit={this.handleSubmit}>
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

          <input type="submit" value="Sign In" />
        </form>
      </main>
    );
  }
}

export default SignInForm;

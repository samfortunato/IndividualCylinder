import React from 'react';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

    this.props.logInUser(this.state)
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <main className="user-form-page">
        <section className="user-form">
          <h2>Sign In</h2>

          <form className="sign-in-form" onSubmit={this.handleSubmit}>
            <label htmlFor="email">email</label>
            <input
              id="email"
              type="email"
              value={this.state.username}
              onChange={this.updateValue('email')}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.updateValue('password')}
            />

            <input type="submit" value="Sign In" />
          </form>
        </section>
      </main>
    );
  }
}

export default SignInForm;

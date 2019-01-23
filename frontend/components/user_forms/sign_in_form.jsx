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

    this.props.logInUser(this.state)
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <main className="user-form-page">
        <section className="user-form">
          <h2>Sign In</h2>

          <form className="sign-in-form" onSubmit={this.handleSubmit}>
            <div className="label-input-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={this.state.username}
                onChange={this.updateValue('username')}
              />
            </div>

            <div className="label-input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.updateValue('password')}
              />
            </div>

            <input type="submit" value="Sign In" />
          </form>
        </section>
      </main>
    );
  }
}

export default SignInForm;

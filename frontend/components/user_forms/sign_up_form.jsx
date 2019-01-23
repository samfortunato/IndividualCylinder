import React from 'react';

class SignUpForm extends React.Component {
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

    this.props.createUser(this.state);
  }

  render() {
    return (
      <main className="user-form-page">
        <section class="user-form">
          <h2>Create your Account</h2>
          <h3>to continue to IndividualCylinder</h3>

          <form className="sign-up-form" onSubmit={this.handleSubmit}>
            <label htmlFor="username">Username
              <input
                id="username"
                type="text"
                value={this.state.username}
                onChange={this.updateValue('username')}
              />
            </label>

            <label htmlFor="email">Your email address
              <input
                id="email"
                type="email"
                value={this.state.email}
                onChange={this.updateValue('email')}
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
            <span>Use 6 or more characters with a mix of letters, numbers &amp; symbols</span>

            <input type="submit" value="Sign Up"/>
          </form>
        </section>
      </main>
    );
  }
}

export default SignUpForm;

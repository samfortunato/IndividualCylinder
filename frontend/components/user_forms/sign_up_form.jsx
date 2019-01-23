import React from 'react';
import { Link } from 'react-router-dom';

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

    this.props.createUser(this.state)
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <main className="user-form-page">
        <section className="user-form">
          <form className="sign-up-form" onSubmit={this.handleSubmit}>
            <img className="form-logo" src="https://placeimg.com/74/37/tech" alt="IndividualCylinder logo" />
            <h1>Create your Account</h1>
            <h2>to continue to IndividualCylinder</h2>

            <div className="label-input-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={this.state.username}
                required
                placeholder="Username"
                onChange={this.updateValue('username')}
              />
            </div>

            <div className="label-input-group">
              <label htmlFor="email">Your email address</label>
              <input
                id="email"
                type="email"
                value={this.state.email}
                required
                placeholder="Your email address"
                onChange={this.updateValue('email')}
              />
            </div>

            <div className="label-input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={this.state.password}
                required
                placeholder="Password"
                onChange={this.updateValue('password')}
              />
              <span className="helper-text">Use 8 or more characters with a mix of letters, numbers &amp; symbols</span>
            </div>

            <div className="user-form-bottom-options">
              <input type="submit" value="Sign Up"/>
              <Link className="form-secondary-btn" to="/signin">Sign in instead</Link>
            </div>
          </form>

          <aside className="user-form-badge">
            <figure>
              <img src="https://placeimg.com/244/244/tech" alt="IndividualCylinder sign up badge"/>
              <figcaption>One account. All of IndividualCylinder working for you.</figcaption>
            </figure>
          </aside>
        </section>
      </main>
    );
  }
}

export default SignUpForm;

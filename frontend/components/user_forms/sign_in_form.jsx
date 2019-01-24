import React from 'react';
import { Link } from 'react-router-dom';

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
        <section className="user-form sign-in-form-section">
          <img className="form-logo" src="https://placeimg.com/74/37/tech" alt="IndividualCylinder logo" />
        
          <h1>Sign In</h1>
          <h2>to continue to IndividualCylinder</h2>

          <form className="sign-in-form" onSubmit={this.handleSubmit}>
            <div className="label-input-group">
              <input
                id="email"
                type="email"
                value={this.state.email}
                required
                onChange={this.updateValue('email')}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="label-input-group">
              <input
                id="password"
                type="password"
                value={this.state.password}
                required
                onChange={this.updateValue('password')}
              />
              <label htmlFor="password">Password</label>
            </div>

            <span className="helper-text">You can sign in with a demo account to try out the app.</span>
            <a href="#">Sign in as demo user</a>

            <div className="user-form-bottom-options">
              <input type="submit" value="Sign In" />
              <Link className="form-secondary-btn" to="/signup">Create account</Link>
            </div>
          </form>
        </section>
      </main>
    );
  }
}

export default SignInForm;
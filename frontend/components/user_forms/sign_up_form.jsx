import React from 'react';
import { Link } from 'react-router-dom';
import merge from 'lodash/merge';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
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

    const user = merge({}, this.state);
    this.props.createUser(user)
      .then(() => this.props.history.push('/'));
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  render() {
    const errorLis = this.props.errors.map((error, i) => {
      return <li key={i}>{error}</li>;
    }) || null;
    
    return (
      <main className="user-form-page">
        <section className="user-form">
          <form className="sign-up-form" onSubmit={this.handleSubmit}>
            <img className="form-logo" src="https://placeimg.com/74/37/tech" alt="IndividualCylinder logo" />

            <h1>Create your Account</h1>
            <h2>to continue to IndividualCylinder</h2>

            <div className="sign-up-full-name">
              <div className="label-input-group">
                <input
                  id="first-name"
                  type="text"
                  value={this.state.first_name}
                  autoFocus
                  onChange={this.updateValue('first_name')}
                />
                <label htmlFor="first-name">First name</label>
              </div>
              
              <div className="label-input-group">
                <input
                  id="last-name"
                  type="text"
                  value={this.state.last_name}
                  onChange={this.updateValue('last_name')}
                />
                <label htmlFor="last-name">Last name</label>
              </div>
            </div>

            <div className="label-input-group">
              <input
                id="email"
                type="email"
                value={this.state.email}
                onChange={this.updateValue('email')}
              />
              <label htmlFor="email">Your email address</label>
            </div>

            <div className="label-input-group">
              <input
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.updateValue('password')}
              />
              <label htmlFor="password">Password</label>
            </div>
            <span className="helper-text">Use 8 or more characters in your password</span>

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

        <ul className="form-error-messages">{errorLis}</ul>
      </main>
    );
  }
}

export default SignUpForm;

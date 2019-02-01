import React from 'react';
import { Link } from 'react-router-dom';

import { userAvatarGenerator } from '../../util/user_avatar_util';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    
    this.userAvatarGenerator = userAvatarGenerator.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateValue(value) {
    return (e) => {
      this.setState({ [value]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.set('user[first_name]', this.state.firstName);
    formData.set('user[last_name]', this.state.lastName);
    formData.set('user[email]', this.state.email);
    formData.set('user[password]', this.state.password);
    
    const userAvatar = this.userAvatarGenerator(this.state.firstName);
    formData.set('user[avatar]', userAvatar);

    this.props.createUser(formData)
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
            <img className="form-logo" src="https://i.imgur.com/k5ZfpMM.png" alt="IndividualCylinder logo" />

            <h1>Create your Account</h1>
            <h2>to continue to IndividualCylinder</h2>

            <div className="sign-up-full-name">
              <div className="label-input-group">
                <input
                  id="first-name"
                  type="text"
                  value={this.state.firstName}
                  autoFocus
                  onChange={this.updateValue('firstName')}
                />
                <label htmlFor="first-name">First name</label>
              </div>
              
              <div className="label-input-group">
                <input
                  id="last-name"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.updateValue('lastName')}
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

          <aside className="user-form-sign-up-badge">
            <figure>
              <img src="https://i.imgur.com/blRkZpA.png" alt="IndividualCylinder sign up badge"/>
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

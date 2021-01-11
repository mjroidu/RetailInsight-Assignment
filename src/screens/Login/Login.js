import React, { Component } from 'react';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions/profile';
import { getStore } from '../../utils';
import './style.css';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {
        username: 'Enter User Name!',
        password: 'Enter Password!'
      },
      loginStatus: '',
      submitted: false
    }
  }

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.validationErrorMessage(event);
  }

  validationErrorMessage = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'username': 
        errors.username = value.length < 1 ? 'Enter User Name' : '';
        break;
      case 'password': 
        errors.password = value.length < 1 ? 'Enter Password' : '';
        break;
      default:
        break;
    }
    this.setState({ errors });
  }

  validateForm = (errors) => {
    let valid = true;
    console.log(errors)
    Object.entries(errors).forEach(item => {
      console.log(item)
      item && item[1].length > 0 && (valid = false)
    })
    console.log(valid)
    return valid;
  }

  loginForm = async (event) => {
    this.setState({ submitted: true });
    event.preventDefault();
    if (this.validateForm(this.state.errors)) {
      console.info('Valid Form')
      const user = getStore('user')
      if (user) {
        this.props.dispatch(ActionCreators.login(user));
        this.props.history.push('/home')
      } else {
        this.setState({ loginStatus: 'Login Failed! Invalid Username and Password'})
      }
    } else {
      console.log('Invalid Form')
    }
  }

  render() {
    const { username, password, errors, submitted, loginStatus } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">

        <h1>Login Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">User Name</label>
              <input type="text" value={username} name="username" onChange={(e) => { this.inputChange(e)} } className="form-control" id="username" placeholder="User Name" />
              { submitted && errors.username.length > 0 &&  <span className='error'>{errors.username}</span>}
              {/* {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )} */}
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" value={password} autoComplete="on" name="password" onChange={(e) => { this.inputChange(e)} } className="form-control" id="password" placeholder="Password" />
              { submitted && errors.password.length > 0 &&  <span className='error'>{errors.password}</span>}
              
            </div>

            <div className="col-sm-12 center mt-1">
              { submitted && loginStatus.length > 0 &&  <span className='error'>{loginStatus}</span>}
            </div>

            <div className="createAccount">
              <button type="submit" onClick={this.loginForm} >Login Account</button>
              <small> <a href="/register"> Register Account here! </a></small>
            </div>



            </form>

      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(Login));

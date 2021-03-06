import React, {Component} from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom'
import $ from 'jquery';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      location: '',
      errorMessage : '',
    };
  }
  handleUsernameInput(e) {
    this.setState({username: e.target.value});
  }
  handleCityInput(e) {
    this.setState({location: e.target.value});
  }
  handlePasswordInput(e) {
    this.setState({password: e.target.value});
  }
  handleSignUpInput() {
    // console.log('inside handleSignUpInput');
    const data = {'username': this.state.username, 'password': this.state.password, 'location': this.state.location};

  return new Promise((resolve,reject) => {
    $.ajax({
      type: 'POST',
      url: '/signup',
      data: data,
      success: response => {
        console.log('success signUp');
        console.log(response);
        resolve(response)
      },
      error: (err)=> {
        console.log('failure signUp');
        console.log(err);
        reject(err)
      }
    });

    })
  }
  render() {
    const Button = withRouter(({ history}) => (
      <button
        type='button'
        className='ui secondary button'
        onClick={() =>{
          this.handleSignUpInput()
            .then(() => history.push('/Login'))
            .catch((error) => {
              console.log("promise error hit");
              if (error.status === 403 ){
                this.setState({errorMessage: 'Username unavailable, please try again'})
              }else {
                this.setState({errorMessage: 'Username already exists, please try again'})
              }
            })
        }}>
        Submit
      </button>
    ));
    return (
      <div className='signUpPage'>
        <div className='signup-div'>
          <h3>Sign Up</h3>
            <Link className='close' to='/'/>
        <div className='signUpForm'>
          <Form>
            <Form.Field>
              <label>Username</label>
              <input placeholder='username' onChange={e => this.handleUsernameInput(e)} />
            </Form.Field>
            <p className='error' style={{color: 'red'}} >{this.state.errorMessage}</p>
              <Form.Field>
                <label>Zip Code</label>
                <input placeholder='zip code' onChange={e => this.handleCityInput(e)} />
              </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type='password' placeholder='password' onChange={e => this.handlePasswordInput(e)}  />
            </Form.Field>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button/>
          </Form>
        </div>
        </div>
      </div>
    );
  }
};

export default SignUp;

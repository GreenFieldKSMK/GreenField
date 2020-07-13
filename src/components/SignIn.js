import React, { Fragment } from 'react';
import axios from 'axios';
import './CSS/account.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  render() {
    return (
      <Fragment>
        <div className='box1'>
          <label>Email</label>
          <input type='text' value={this.state.email} name='email'></input>
          <br></br>
          <br></br>
          <label>Password</label>
          <input
            type='text'
            value={this.state.password}
            name='password'
          ></input>
          <button className='btn'>Sign In</button>
        </div>
      </Fragment>
    );
  }
}

export default Signin;

import React, { Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Profile from './profile';
import './CSS/account.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userinfo: undefined,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .get(
        `http://localhost:4000/user/${this.state.email}/${this.state.password}`
      )
      .then((result) => {
        console.log(result.data);
        var info = result.data;
        this.setState({
          userinfo: info,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <Fragment>
        <div className='box1'>
          <label>Email</label>
          <input
            type='email'
            value={this.state.email}
            name='email'
            onChange={this.handleChange.bind(this)}
          ></input>
          <br></br>
          <br></br>
          <label>Password</label>
          <input
            type='password'
            value={this.state.password}
            name='password'
            onChange={this.handleChange.bind(this)}
          ></input>
          <button className='btn' onClick={this.handleSubmit.bind(this)}>
            <Link to='/profile'>Sign In</Link>
          </button>
        </div>
        <Profile userinfo={this.state.userinfo} />;
      </Fragment>
    );
  }
}

export default Signin;

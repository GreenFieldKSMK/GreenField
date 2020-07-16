import React, { Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './CSS/account.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      age: '',
      date: '',
      comingE: '',
      comingP: 0,
      email: '',
      password: '',
      userinfo: [],
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .get(
        `http://localhost:4000/user/${this.state.email}/${this.state.password}`
      )
      .then((response) => {
        console.log(response.data);
        var { email, password, message } = response.data;
        this.setState({
          comingE: email,
          comingP: password,
        });
        alert(message);
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
    if (
      this.state.comingE === this.state.email &&
      this.state.comingP === this.state.password
    ) {
      return <Redirect to='/profile' />;
    }
    return (
      <Fragment>
        <div className='box1'>
          <form onSubmit={this.handleSubmit.bind(this)}>
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
            <button className='btn' onClick={this.render.bind(this)}>
              {/* <Link
              to={{
                pathname:
                  this.state.email !== '' && this.state.password !== ''
                    ? '/profile'
                    : '',
                state: {
                  userinfo: this.state.userinfo,
                },
              }}
              className='btn'
            > */}
              Sign In
              {/* </Link> */}
            </button>
          </form>
        </div>
        {/* <Profile userinfo={this.state.userinfo} /> */}
      </Fragment>
    );
  }
}

export default Signin;
// console.log(result.data);
// var info = result.data;
// info.map((Element, index) => {
//   this.state.userinfo.push(Element.firstname);
//   this.state.userinfo.push(Element.lastname);
// });

// this.setState({
//   userinfo: info,
// });
// console.log(this.state.userinfo);

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
      message: '',
      userinfo: [],
    };
  }
  // it sends a get request to the server with both the email and password
  // and gets the user's info if the server found both the email and password
  // then it sets the state with the recied data.
  // the  comingE & comingP , are the email and password recieved from the server.
  handleSubmit(e) {
    e.preventDefault();
    axios
      .get(
        `http://localhost:4000/user/${this.state.email}/${this.state.password}`
      )
      .then((response) => {
        console.log(response.data);
        var {
          email,
          password,
          message,
          firstname,
          lastname,
          age,
          date,
        } = response.data;
        this.setState({
          comingE: email,
          comingP: password,
          firstname: firstname,
          lastname: lastname,
          age: age,
          date: date,
        });
        if (message !== undefined) {
          // alert(message);
          this.setState({
            message: message,
          });
        }
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
    // here iit checks if the values of  comingE comingP are equal to the email and password provided by the user
    // if they are, it will send the user to the '/profile' page.
    // if there was a message sent from the server side it will be displayed when the buttom is clicked.
    if (
      this.state.comingE === this.state.email &&
      this.state.comingP === this.state.password
    ) {
      return (
        <Redirect
          to={{
            pathname: '/profile',
            state: {
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              age: this.state.age,
              date: this.state.date,
            },
          }}
        />
      );
    } else if (this.state.message !== '') {
      return (
        <div className='box1'>
          <h2 className='message'>{this.state.message}</h2>
          <button
            className='btn'
            style={{ marginLeft: '275px' }}
            onClick={() => window.location.reload(false)}
          >
            Return
          </button>
        </div>
      );
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
        <br></br>
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

import React, { Fragment } from 'react';
// import axios from 'axios';
import './CSS/profile.css';
import { Link } from 'react-router-dom';
import Change from './ApiReact';

// this is the profile component that displayes both the user's info ,
//which is recieved from the either the sign in or sign up components, and the api component
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      age: '',
      date: '',
    };
  }

  // the function extracts the recieved data if there any
  // if there isn't any recived data it will send the user to the main page if the user tries to access '/profile'
  // directly without moving step by step.

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      const { firstname, lastname, age, date } = this.props.location.state;
      var d;
      if (date !== undefined) {
        var ndate = date.split('T');
        d = ndate[0];
      }

      this.setState({
        firstname: firstname,
        lastname: lastname,
        age: age,
        date: d,
      });
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <Fragment>
        <div>
          <div className='left'>
            <button id='deposit'>
              <Link to='/deposit' className='btn'>
                Deposit
              </Link>
            </button>
            <button className='btn'>
              <Link to='/withdraw' className='btn'>
                Withdraw
              </Link>
            </button>
            <button id='transfer'>
              <Link to='/transfer' className='btn'>
                Transfer
              </Link>
            </button>
            <button id='display'>
              <Link to='/display' className='btn'>
                Display
              </Link>
            </button>
            <div className='pardiv'>
              <ul>
                <h2>User's Info</h2>
                <li className='in'>
                  Fisrt Name: &nbsp; {this.state.firstname}
                </li>
                <li className='in'>Last Name: &nbsp; {this.state.lastname}</li>
                <li className='in'>Age: &nbsp; {this.state.age}</li>
                <li className='in'>Joining Date: &nbsp; {this.state.date}</li>
              </ul>
            </div>
          </div>
          <div className='right'>
            <Change />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;

import React from 'react';
// import axios from 'axios';
import './CSS/SignUp.css';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var userinfo = this.props.userinfo;
    return (
      <div>
        <label>name</label>
        <label>lastname</label>
        <button>Deposite</button>
        <button>Withdraw</button>
      </div>
    );
  }
}

export default Profile;

import React, { Fragment } from 'react';
// import axios from 'axios';
import './CSS/profile.css';
import { Link } from 'react-router-dom';
import Change from './ApiReact';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { userinfo } = this.props.location.state;
    console.log(userinfo);
    console.log(Array.isArray(userinfo));
    console.log(userinfo['0']);
  }

  render() {
    var userinfo = this.props.userinfo;
    return (
      <Fragment>
        <div>
          <div className='left'>
            <span>name</span>
            <br></br>
            <span>lastname</span>
            <br></br>
            <button className='btn'>Deposite</button>
            <br></br>
            <button className='btn'>Withdraw</button>
            <br></br>
            <button className='btn'>Display</button>
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

import React, { Fragment } from 'react';
// import axios from 'axios';
import './CSS/profile.css';
import { Link } from 'react-router-dom';
import Change from './ApiReact';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: [],
    };
  }
  // componentDidMount() {
  //   const { userinfo } = this.props.location.state;
  //   // console.log(userinfo);
  //   this.state.userinfo = userinfo;
  //   // this.setState({
  //   //   userinfo: userinfo,
  //   // });
  //   console.log(this.state.userinfo);
  // }

  render() {
    // var userinfo = this.props.userinfo;
    // const { userinfo } = this.props.location.state;
    // this.state.userinfo = userinfo;
    // console.log(this.state.userinfo);
    return (
      <Fragment>
        <div>
          <div className='left'>
            <ul>
              {this.state.userinfo.map((Element, index) => (
                <li key={index}>{Element} </li>
              ))}
            </ul>
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

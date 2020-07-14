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
            <button id='deposit'>
              <Link to='/deposit' className='btn'>
                Deposit
              </Link>
            </button>
            <br></br>
            <button className='btn'>
              <Link to='/withdraw' className='btn'>
                Withdraw
              </Link>
            </button>
            <br></br>
            <button id='transfer'>Transfer</button>
            <br></br>
            <button id='display'>Display</button>
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

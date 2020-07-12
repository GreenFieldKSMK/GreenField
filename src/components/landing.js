import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './CSS/landing.css';

class Landing extends React.Component {
  render() {
    return (
      <div className='landing'>
        <h2>Hello there</h2>
        <button className='first'>
          <Link to='/signup'>Sign Up</Link>
        </button>
        <button className='first'>
          <Link to='/signin'>Sign In</Link>
        </button>
      </div>
    );
  }
}
export default Landing;

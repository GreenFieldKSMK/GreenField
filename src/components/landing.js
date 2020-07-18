import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/landing.css';

// this is the main page.
class Landing extends React.Component {
  render() {
    return (
      <div className='landing'>
        <h2 className='title'>
          <span style={{ color: '#e74c3c', fontSize: '113px' }} className='x'>
            X
          </span>
          change
        </h2>
        <button className='first'>
          <Link to='/signup' className='first'>
            Sign Up
          </Link>
        </button>
        <br></br>
        <button className='first'>
          <Link to='/signin' className='first'>
            Sign In
          </Link>
        </button>
      </div>
    );
  }
}
export default Landing;

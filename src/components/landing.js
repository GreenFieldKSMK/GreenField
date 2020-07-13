import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/landing.css';

class Landing extends React.Component {
  render() {
    return (
      <div className='landing'>
        <h2>eXchange</h2>
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

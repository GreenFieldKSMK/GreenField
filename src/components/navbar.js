import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './CSS/navbar.css';

class Navbar extends React.Component {
  render() {
    return (
      <Fragment>
        <ul>
          <li className='nav'>
            <Link to='/' className='na'>
              Home
            </Link>
          </li>
          <li className='nav'>
            <Link to='/about' className='na'>
              About
            </Link>
          </li>
          <li className='nav'>
            <Link to='/contact-us' className='na'>
              Contact Us
            </Link>
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default Navbar;

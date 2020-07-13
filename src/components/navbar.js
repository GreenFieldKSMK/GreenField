import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './CSS/navbar.css';

class Navbar extends React.Component {
  render() {
    return (
      <Fragment>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </Fragment>
    );
  }
}

export default Navbar;

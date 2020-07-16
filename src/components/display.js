import React, { Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './CSS/withdraw.css';

class Display extends React.Component {
  state = {
    creditcard: '',
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    return (
      <Fragment>
        <div className='box2'>
          <label>Enter your credit card number</label>
          <input
            type='number'
            name='creditcard'
            value={this.state.creditcard}
            onChange={this.handleChange.bind(this)}
          ></input>
          <button className='btn'>GO</button>
        </div>
      </Fragment>
    );
  }
}

export default Display;

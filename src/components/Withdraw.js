import React from 'react';
import { render } from '@testing-library/react';
import './CSS/withdraw.css';
import axios from 'axios';

class Withdrawl extends React.Component {
  state = {
    number: '',
    creditcard: '',
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .put('http://localhost:4000/withdraw', {
        number: this.state.number,
        creditcard: this.state.creditcard,
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data);
      })
      .catch((err) => {
        console.log('failed to update');
      });
    this.setState({
      number: '',
      creditcard: '',
    });
  }
  render() {
    return (
      <div className='box2'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Credit card number</label>
          <input
            type='number'
            name='creditcard'
            value={this.state.creditcard}
            onChange={this.handleChange.bind(this)}
          />
          <br></br>
          <label> Enter the amount of your Withdrawal </label>
          <input
            type='number'
            name='number'
            value={this.state.number}
            onChange={this.handleChange.bind(this)}
          ></input>
          <button className='btn'>Confirm</button>
        </form>
      </div>
    );
  }
}

export default Withdrawl;

import React from 'react';
import { render } from '@testing-library/react';
import './CSS/withdraw.css';

class Deposit extends React.Component {
  state = { deposit: '' };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    //Here goes the axios request

    event.preventDefault();
    this.setState({
      deposit: '',
    });
    alert(`Deposited an amount of :   ${this.state.deposit}$ only!`);
  }
  render() {
    return (
      <div className='box2'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Credit card number</label>
          <input type='number' />
          <br></br>
          <label> Enter the amount of your deposit: </label>
          <input
            type='number'
            name='deposit'
            value={this.state.deposit}
            onChange={this.handleChange.bind(this)}
          ></input>
          <button className='btn'>Confirm</button>
        </form>
      </div>
    );
  }
}

export default Deposit;

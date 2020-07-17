import React from 'react';
import axios from 'axios';
import './CSS/withdraw.css';

class Transfer extends React.Component {
  state = {
    sender: '',
    reciever: '',
    amount: '',
  };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    let value = this.state.amount;
    axios
      .get('http://localhost:3000/transfer', {
        params: {
          creditcard: this.state.sender,
          id: this.state.reciever,
          amount: this.state.amount,
        },
      })
      .then(function (response) {
        let msg = response.data;
        alert(msg);
        console.log('Request succeeded');
      })
      .catch(function (error) {
        alert('Something went wrong!');
        console.log(error);
      });

    event.preventDefault();
    this.setState({
      sender: '',
      reciever: '',
      amount: '',
    });
  }
  render() {
    return (
      <div className='box3'>
        <h3> Transfer </h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label> Please enter your credit card number: </label>
          <input
            type='number'
            name='sender'
            value={this.state.sender}
            onChange={this.handleChange.bind(this)}
          ></input>

          <label> Reciever's ID number: </label>
          <input
            type='number'
            name='reciever'
            value={this.state.reciever}
            onChange={this.handleChange.bind(this)}
          ></input>

          <label> Amount of money you would like to transfer: </label>
          <input
            type='number'
            name='amount'
            value={this.state.amount}
            onChange={this.handleChange.bind(this)}
          ></input>

          <button className='btn'>Tranfer</button>
        </form>
      </div>
    );
  }
}

export default Transfer;

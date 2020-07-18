import React from 'react';
import axios from 'axios';
import './CSS/withdraw.css';

// the transfer componenet which allows the user to send money from one account to another.
class Transfer extends React.Component {
  state = {
    sender: '',
    reciever: '',
    amount: '',
    message: '',
  };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  // it sends the user's creditcard number as well as the reciever ID number
  // and it recieves a message, then it sets the state

  handleSubmit(event) {
    // let value = this.state.amount;
    axios
      .get('http://localhost:3000/transfer', {
        params: {
          creditcard: this.state.sender,
          id: this.state.reciever,
          amount: this.state.amount,
        },
      })
      .then((response) => {
        let msg = response.data;
        console.log(response.data);
        console.log(msg);
        // alert(msg);
        if (msg !== undefined) {
          this.setState({
            message: msg,
          });
        }
        console.log(this.state.message);
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
    // if there was a recieved message from the server, it will be displayed when the buttom is clicked.
    if (this.state.message !== '') {
      return (
        <div className='box1'>
          <h2 className='message'>{this.state.message}</h2>
          <button
            className='btn'
            style={{ marginLeft: '275px' }}
            onClick={() => window.location.reload(false)}
          >
            Return
          </button>
        </div>
      );
    }
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

          <button className='btn'>Confirm</button>
          <button onClick={this.props.history.goBack} className='btn'>
            Back
          </button>
        </form>
      </div>
    );
  }
}

export default Transfer;

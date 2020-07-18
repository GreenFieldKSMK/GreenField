import React from 'react';
import './CSS/withdraw.css';
import axios from 'axios';

class Withdrawl extends React.Component {
  state = {
    number: '',
    creditcard: '',
    message: '',
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // it sends the amount we want to withdraw and recieves a message whether the withdraw is successful
  // or the credit card number doeesn't exist, and changes the state of the message if there was a message
  // sent from the server.

  handleSubmit(event) {
    event.preventDefault();
    var number = Number(this.state.number);
    axios
      .put('http://localhost:4000/withdraw', {
        number: number,
        creditcard: this.state.creditcard,
      })
      .then((response) => {
        var msg = response.data;
        // alert(response.data);
        if (msg !== undefined) {
          this.setState({
            message: msg,
          });
        }
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
    // if there was a message it will be displayed when the button is clicked
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
          <button className='btn' onClick={this.render.bind(this)}>
            Confirm
          </button>
          <button onClick={this.props.history.goBack} className='btn'>
            Back
          </button>
        </form>
      </div>
    );
  }
}

export default Withdrawl;

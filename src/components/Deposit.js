import React from 'react';
import './CSS/withdraw.css';
import axios from 'axios';

class Deposit extends React.Component {
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

  handleSubmit(event) {
    event.preventDefault();
    var number = Number(this.state.number);
    axios
      .put('http://localhost:4000/deposit', {
        number: number,
        creditcard: this.state.creditcard,
      })
      .then((response) => {
        var msg = response.data;
        // alert(msg);
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
          <label> Enter the amount of your deposit </label>
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

export default Deposit;

import React from 'react';
import './CSS/account.css';
import axios from 'axios';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      total: '',
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    axios
      .post('http://localhost:4000/users', {
        userid: this.state.userid,
        total: this.state.total,
      })
      .then((result) => {
        console.log('account info saved');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    return (
      <div className='box1'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Credit Card number</label>
          <input
            type='number'
            name='userid'
            value={this.state.userid}
            onChange={this.handleChange.bind(this)}
          />
          <br />
          <br />
          <label>Balance</label>
          <input
            type='number'
            name='total'
            value={this.state.total}
            onChange={this.handleChange.bind(this)}
          />
          <button className='btn'>Register</button>
        </form>
      </div>
    );
  }
}

export default Account;

import React from 'react';
import './CSS/account.css';
// import axios from 'axios';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      total: '',
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    return (
      <div className='box1'>
        <form>
          <h3>Supply your info</h3>
          <label>User ID</label>
          <input
            type='number'
            name='userid'
            value={this.state.userid}
            onChange={this.handleChange.bind(this)}
          />
          <br />
          <br />
          <label>Total</label>
          <input
            type='number'
            name='total'
            value={this.state.total}
            onChange={this.handleChange.bind(this)}
          />
        </form>
        <button className='btn'>Enter</button>
      </div>
    );
  }
}

export default Account;

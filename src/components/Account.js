import React from 'react';
import './CSS/account.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      creditcard: '',
      total: '',
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    await axios
      .post('http://localhost:4000/users', {
        creditcard: this.state.creditcard,
        total: this.state.total,
      })
      .then((result) => {
        // console.log('account info saved');
        var { number, message } = result.data;
        this.setState({
          number: number,
        });
        console.log(result.data);
        console.log(this.state.number);
        alert(message);
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
    if (this.state.number === this.state.creditcard) {
      return <Redirect to='/profile' />;
    }
    return (
      <div className='box1'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Credit Card number</label>
          <input
            type='number'
            name='creditcard'
            value={this.state.creditcard}
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
          <button className='btn' onClick={this.render.bind(this)}>
            {/* <Link
              to={
                this.state.creditcard === this.state.number &&
                this.state.total !== ''
                  ? '/profile'
                  : ''
              }
              className='btn'
            > */}
            Register
            {/* </Link> */}
          </button>
        </form>
      </div>
    );
  }
}

export default Account;

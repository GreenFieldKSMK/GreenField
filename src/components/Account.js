import React from 'react';
import './CSS/account.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      creditcard: '',
      total: '',
      firstname: '',
      lastname: '',
      age: '',
      date: '',
    };
  }
  componentDidMount() {
    console.log(this.props.location.state);
    if (this.props.location.state === undefined) {
      this.props.history.push('/');
    }
  }

  sendData() {
    const { firstname, lastname, age } = this.props.location.state;

    this.setState({
      firstname: firstname,
      lastname: lastname,
      age: age,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    await axios
      .post('http://localhost:4000/users', {
        creditcard: this.state.creditcard,
        total: this.state.total,
      })
      .then((result) => {
        var { number, message } = result.data;
        this.setState({
          number: number,
        });
        /////////////////////////////////
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
      return (
        <Redirect
          to={{
            pathname: '/profile',
            state: {
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              age: this.state.age,
            },
          }}
        />
      );
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
          <button
            className='btn'
            onClick={(this.render.bind(this), this.sendData.bind(this))}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Account;

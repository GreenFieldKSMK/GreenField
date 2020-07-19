import React from 'react';
import './CSS/account.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

//the second step of the siging up process. where the user enters the credidt card number.
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
      message: '',
    };
  }

  // this function returns the user to the main page if they add '/user' endpoint to the url
  componentDidMount() {
    console.log(this.props.location.state);
    if (this.props.location.state === undefined) {
      this.props.history.push('/');
    }
  }

  // this will change tha values when the button is clicked

  sendData() {
    const { firstname, lastname, age } = this.props.location.state;

    this.setState({
      firstname: firstname,
      lastname: lastname,
      age: age,
    });
  }

  // it willl send the credit 'card number' to the sever and recieve both a number 'creditcard number'  and a message whether the number is found or not.
  //in the database
  // if it finds the number it will update 'this.state.number', and also this.state.message if there is message sent.
  //if not it will stay as an empty string

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
        if (message !== undefined) {
          this.setState({
            message: message,
          });
        }
        // alert(message);
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
    // here it checks if the sent credit card number and value of 'number' in the state are the same 
    // if they are it will ssend us to the '/profile' page when the button is clicked
    // it will also send firstname, lastname, and age, which are recieved from the signup
    // component, to the '/profile' component.

    // else if there is a message which is sent the credit card number is not found, it will display the message.
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
    } else if (this.state.message !== '') {
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

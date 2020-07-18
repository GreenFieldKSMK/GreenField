import React, { Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './CSS/withdraw.css';

class Display extends React.Component {
  state = {
    creditcard: '',
    total: '',
    lastwithdraw: '',
    lastdeposit: '',
    comingcredit: '',
    message: '',
  };

  handlesubmit(e) {
    e.preventDefault();
    axios
      .get(`http://localhost:4000/profile/${this.state.creditcard}`)
      .then((response) => {
        var message = response.data.message;
        var user = response.data;
        console.log(user);
        this.setState({
          total: user.total,
          lastwithdraw: user.lastwitdraw,
          lastdeposit: user.lastdeposite,
          comingcredit: user.creditcard,
        });
        if (message !== undefined) {
          // alert(message);
          this.setState({
            message: message,
          });
        }
      })
      .catch((err) => {
        console.log('error in display ====>', err);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    var credit = Number(this.state.creditcard);
    if (this.state.comingcredit === credit) {
      return (
        <Redirect
          to={{
            pathname: '/userinfo',
            state: {
              total: this.state.total,
              lastwithdraw: this.state.lastwithdraw,
              lastdeposit: this.state.lastdeposit,
            },
          }}
        ></Redirect>
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
      <Fragment>
        <div className='box2'>
          <form onSubmit={this.handlesubmit.bind(this)}>
            <label>Enter your credit card number</label>
            <input
              type='number'
              name='creditcard'
              value={this.state.creditcard}
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
      </Fragment>
    );
  }
}

export default Display;

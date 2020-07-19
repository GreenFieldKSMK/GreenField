import React from 'react';
import './CSS/withdraw.css';

// this is the component which 'display' takes us to
// it recieves the data sent from 'display' component and views it to the customer.
class Info extends React.Component {
  state = {
    total: '',
    lastwithdraw: '',
    lastdeposit: '',
  };

  // it rxtracts the data that was recieved and chnges the state.
  componentDidMount() {
    var total = this.props.location.state.total;
    var lastwithdraw = this.props.location.state.lastwithdraw;
    var lastdeposit = this.props.location.state.lastdeposit;

    this.setState({
      total: total,
      lastwithdraw: lastwithdraw,
      lastdeposit: lastdeposit,
    });
  }

  render() {
    return (
      <div className='box2'>
        <ul>
          <li className='in'>Total: &nbsp;&nbsp; {this.state.total}</li>
          <li className='in'>
            Last deposit: &nbsp;&nbsp; {this.state.lastdeposit}
          </li>
          <li className='in'>
            Last withdraw: &nbsp;&nbsp; {this.state.lastwithdraw}
          </li>
        </ul>
        <button onClick={this.props.history.goBack} className='btn'>
          Back
        </button>
      </div>
    );
  }
}

export default Info;

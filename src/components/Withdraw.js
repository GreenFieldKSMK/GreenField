import React from 'react';
import { render } from '@testing-library/react';
import './CSS/withdraw.css';

class Withdrawl extends React.Component {
  state = { withdraw: '' };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    //Here goes the axios request

    event.preventDefault();
    this.setState({
      withdraw: '',
    });
    alert(`Withdrew an amount of :   ${this.state.withdraw}$`);
  }
  render() {
    return (
      <div className='box2'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Credit card number</label>
          <input type='number' />
          <br></br>
          <label> The amount of your withdrawl: </label>
          <input
            type='number'
            name='withdraw'
            value={this.state.withdraw}
            onChange={this.handleChange.bind(this)}
          ></input>
          <button className='btn'>Confirm</button>
        </form>
      </div>
    );
  }
}

export default Withdrawl;

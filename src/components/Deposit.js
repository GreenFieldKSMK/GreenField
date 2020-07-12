import React from 'react';
import { render } from '@testing-library/react';

class Deposit extends React.Component {
    state = { deposit: '' };
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit(event) {
        //Here goes the axios request

        event.preventDefault();
        this.setState({
            deposit: ''
        });
        alert(`Deposited an amount of :   ${this.state.deposit}$ only!`);
    }
    render() {
        return (
            <div>
                <h3> Deposit </h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label> Please enter the amount of your deposit: </label>
                    <input type='number' name='deposit' value={this.state.deposit} onChange={this.handleChange.bind(this)}></input>
                    <input type="submit" value="Deposit" />
                </form>
            </div>
        )
    }
}


export default Deposit;


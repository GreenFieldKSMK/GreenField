import React from 'react';
import { render } from '@testing-library/react';

class Withdrawl extends React.Component {
    state = { withdraw: '' };
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit(event) {
        //Here goes the axios request

        event.preventDefault();
        this.setState({
            withdraw: ''
        });
        alert(`Withdrew an amount of :   ${this.state.withdraw}$`);
    }
    render() {
        return (
            <div>
                <h3> Withdrawl </h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label> Please enter the amount of your withdrawl: </label>
                    <input type='number' name='withdraw' value={this.state.withdraw} onChange={this.handleChange.bind(this)}></input>
                    <input type="submit" value="Withdraw" />
                </form>
            </div>
        )
    }
}


export default Withdrawl;


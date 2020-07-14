import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
let style = { width: 200, textAlign: "left", marginLeft: 0 };

class Transfer extends React.Component {
    state = { sender: '', reciever: '', amount: '' };
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit(event) {
        let value = this.state.amount;
        axios.get('/transfer', { creditcard: this.state.sender, id: this.state.reciever, amount: this.state.amount })
            .then(function (response) {
                console.log(response)
                alert(`Successfully transfered  ${value}$ `);
                console.log("Success")
            })
            .catch(function (error) {
                console.log(error);
            })

        event.preventDefault();
        this.setState({
            sender: '',
            reciever: '',
            amount: ''
        });
    }
    render() {
        return (
            <div>
                <h3> Transfer </h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label> Please enter your credit card number: </label>
                    <input type='number' name='sender' value={this.state.sender} onChange={this.handleChange.bind(this)}></input>
                    <hr style={style} />
                    <label> Reciever's ID number: </label>
                    <input type='number' name='reciever' value={this.state.reciever} onChange={this.handleChange.bind(this)}></input>
                    <hr style={style} />
                    <label> Amount of money you would like to transfer: </label>
                    <input type='number' name='amount' value={this.state.amount} onChange={this.handleChange.bind(this)}></input>
                    <hr style={style} />
                    <input type="submit" value="Transfer" />
                </form>
            </div>
        )
    }
}


export default Transfer;


import React from 'react';
import axios from 'axios';
import './CSS/SignUp.css';
import { Link } from 'react-router-dom';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      idnumber: '',
      email: '',
      password: '',
      gender: '',
      age: '',
      occupation: '',
      phonenumber: '',
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post('http://localhost:4000/user', {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        idnumber: this.state.idnumber,
        email: this.state.email,
        password: this.state.password,
        gender: this.state.gender,
        age: this.state.age,
        occupation: this.state.occupation,
        phonenumber: this.state.phonenumber,
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='box'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label className='la'>First name:</label>
          <input
            className='su'
            type='text'
            name='firstname'
            placeholder='i.e. John'
            value={this.state.firstname}
            onChange={this.handleChange.bind(this)}
          />

          <br></br>
          <label className='la'>Last name:</label>
          <input
            className='su'
            type='text'
            name='lastname'
            placeholder='i.e. Smith'
            value={this.state.lastname}
            onChange={this.handleChange.bind(this)}
          />

          <br></br>
          <label className='la'>ID number:</label>
          <input
            className='su'
            type='number'
            name='idnumber'
            onChange={this.handleChange.bind(this)}
          />

          <br></br>
          <label className='la'>Email:</label>
          <input
            className='su'
            type='text'
            name='email'
            placeholder='i.e. jsmith@gmail.com'
            value={this.state.email}
            onChange={this.handleChange.bind(this)}
          />

          <br></br>
          <label className='la'>Password:</label>
          <input
            className='su'
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          />

          <br></br>
          <label className='la'>Gender:</label>
          <select
            value={this.state.gender}
            name='gender'
            onChange={this.handleChange.bind(this)}
          >
            <option> </option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='none'> Prefer not to say </option>
          </select>
          <br></br>
          <label className='la'>Age:</label>
          <input
            className='su'
            type='number'
            min='18'
            max='90'
            name='age'
            value={this.state.age}
            onChange={this.handleChange.bind(this)}
          />

          <br></br>
          <label className='la'>Occupation:</label>
          <input
            className='su'
            type='text'
            name='occupation'
            value={this.state.occupation}
            onChange={this.handleChange.bind(this)}
          />

          <br></br>
          <label className='la'>Phone number:</label>
          <input
            className='su'
            type='tel'
            placeholder='1234567890'
            name='phonenumber'
            value={this.state.phonenumber}
            onChange={this.handleChange.bind(this)}
          />

          <br />
          <br />

          <button className='btn' onClick={this.handleSubmit.bind(this)}>
            <Link
              to={this.state.firstname !== '' ? '/user' : '#'}
              className='btn'
            >
              Next
            </Link>
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;

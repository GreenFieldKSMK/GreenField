import React from 'react';
import axios from 'axios';
import './CSS/SignUp.css'
class SignUp extends React.Component{
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
		occupation:'', 
		phonenumber:''
	}
}


  handleChange(event) {
    this.setState({
		[event.target.name]: event.target.value
	});
  }

  handleSubmit(event) {
    event.preventDefault();
	axios.post('http://localhost:4000/user', {
		firstname: this.state.firstname, 
		lastname: this.state.lastname, 
		idnumber: this.state.idnumber, 
		email: this.state.email, 
		password: this.state.password, 
		gender: this.state.gender, 
		age: this.state.age, 
		occupation: this.state.occupation, 
		phonenumber: this.state.phonenumber
	})
	.then((result) => {
    	console.log(result.data)}
	)
	.catch((err) => {
		console.log(err)
	})
  }

  render() {
		return(
			<div className = "box">
				<h1> Sign up </h1>
				<br>
				</br>
				<form onSubmit={this.handleSubmit.bind(this)}>
			        <label>
			          First name: 
			        </label>
					<input type="text" name="firstname" placeholder="i.e. John" value={this.state.firstname} onChange={this.handleChange.bind(this)} />

					<br>
					</br>
					<label>
			          Last name: 
			        </label>
					<input type="text" name="lastname" placeholder="i.e. Smith" value={this.state.lastname} onChange={this.handleChange.bind(this)} />

					<br>
					</br>
					<label>
			          ID number: 
			        </label>
					<input type="number" name="idnumber" onChange={this.handleChange.bind(this)} />

					<br>
					</br>
			        <label>
			          Email: 
			        </label>
					<input type="text" name="email" placeholder="i.e. jsmith@gmail.com" value={this.state.email} onChange={this.handleChange.bind(this)} />

					<br>
					</br>
			        <label>
			          Password: 
			        </label>
					<input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} />

					<br>
					</br>
			        <label>
			          Gender: 
			        </label>
					<select value={this.state.gender} name="gender" onChange={this.handleChange.bind(this)}>
						  <option> </option>
						  <option value="male">Male</option>
						  <option value="female">Female</option>
						  <option value="none"> Prefer not to say </option>
					  </select>
					<br>
					</br>
			        <label>
			           Age: 
			        </label>
					<input type="number" min="18" max="90" name="age" value={this.state.age} onChange={this.handleChange.bind(this)} />

					<br>
					</br>
			        <label>
			          Occupation: 
			        </label>
					<input type="text" name="occupation" value={this.state.occupation} onChange={this.handleChange.bind(this)} />

					<br>
					</br>
			        <label>
			          Phone number: 
			        </label>
					<input type="tel" placeholder="Format: 123-456-7890" name="phonenumber" value={this.state.phonenumber} onChange={this.handleChange.bind(this)} />

					<br/><br/>
			        <input className="btn" type="submit" value="Submit" />
	      		</form>
			</div>
		)
	}
}

export default SignUp;

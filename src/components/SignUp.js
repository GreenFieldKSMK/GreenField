import React from 'react';
import axios from 'axios';

class SignUp extends React.Component{
	constructor(props) {
    super(props);
    this.state = {firstname: '', lastname: '', idnumber: '', email: '', password: '', gender: '', age: '', occupation:'', phonenumber:''}
}


  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
	axios.post('http://localhost:4000/user', {firstname: this.state.firstname, lastname: this.state.lastname, idnumber: this.state.idnumber, email: this.state.email, password: this.state.password, gender: this.state.gender, age: this.state.age, occupation: this.state.occupation, phonenumber: this.state.phonenumber})
	.then((result) => {
    	console.log(result.data)}
	)
	.catch((err) => {
		console.log(err)
	})
  }

  render() {
		return(
			<div>
				<h1> Sign up </h1>
				<hr/>
				<form onSubmit={this.handleSubmit.bind(this)}>
			        <label>
			          First name: 
			          <input type="text" name="firstname" placeholder="i.e. John" value={this.state.firstname} onChange={this.handleChange.bind(this)} />
			        </label>
					<label>
			          Last name: 
			          <input type="text" name="lastname" placeholder="i.e. Smith" value={this.state.lastname} onChange={this.handleChange.bind(this)} />
			        </label>
					<label>
			          ID number: 
			          <input type="number" name="idnumber" onChange={this.handleChange.bind(this)} />
			        </label>
					<br/>
			        <label>
			          Email: 
			          <input type="text" name="email" placeholder="i.e. jsmith@gmail.com" value={this.state.email} onChange={this.handleChange.bind(this)} />
			        </label>
			        <label>
			          Password: 
			          <input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
			        </label><br/>
			        <label>
			          Gender: 
			          <select value={this.state.gender} name="gender" onChange={this.handleChange.bind(this)}>
						  <option> </option>
						  <option value="male">Male</option>
						  <option value="female">Female</option>
						  <option value="none"> Prefer not to say </option>
					  </select>
			        </label>
			        <label>
			           Age: 
			        	<input type="number" min="18" max="90" name="age" value={this.state.age} onChange={this.handleChange.bind(this)} />
			        </label>
			        <label>
			          Occupation: 
			          <input type="text" name="occupation" value={this.state.occupation} onChange={this.handleChange.bind(this)} />
			        </label>
			        <label>
			          Phone number: 
			          <input type="tel" placeholder="Format: 123-456-7890" name="phonenumber" value={this.state.phonenumber} onChange={this.handleChange.bind(this)} />
			        </label><br/><br/>
			        <input type="submit" value="Submit" />
	      		</form>
			</div>
		)
	}
}

export default SignUp;

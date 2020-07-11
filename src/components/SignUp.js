import React from 'react';

class SignUp extends React.Component{
	constructor(props) {
    super(props);
    this.state = {fullName: '', email: '', password: '', gender: '', age: '', occupation:'', phoneNumber:''}
}


  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
		return(
			<div>
				<h1> Sign up </h1>
				<hr/>
				<form onSubmit={this.handleSubmit}>
			        <label>
			          Full name: 
			          <input type="text" name="fullName" placeholder="i.e. John smith" value={this.state.fullName} onChange={this.handleChange.bind(this)} />
			        </label><br/>
			        <label>
			          Email: 
			          <input type="text" name="email" placeholder="i.e. jsmith@gmail.com" value={this.state.email} onChange={this.handleChange.bind(this)} />
			        </label>
			        <label>
			          Password: 
			          <input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
			        </label><br/>
			        <label>
			          gender: 
			          <select value={this.state.value} name="gender" onChange={this.handleChange.bind(this)}>
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
			          <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Format: 123-456-7890" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange.bind(this)} />
			        </label><br/><br/>
			        <input type="submit" value="Submit" />
	      		</form>
			</div>
		)
	}
}

export default SignUp;

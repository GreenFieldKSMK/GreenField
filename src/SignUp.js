import React from 'react';

class SignUp extends React.Component{
	constructor(props) {
    super(props);
    this.state = {fullName: 'i.e. John Smith', email: 'i.e. jsmith@gmail.com', password: '', value: '', age: 0, occupation:'', phoneNumber:0}
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
			          <input type="text" name="fullName" value={this.state.fullName} onChange={this.handleChange} />
			        </label><br/>
			        <label>
			          Email: 
			          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
			        </label>
			        <label>
			          Password: 
			          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
			        </label><br/>
			        <label>
			          gender: 
			          <select value={this.state.value} name="value" onChange={this.handleChange}>
						  <option value="male">Male</option>
						  <option value="female">Female</option>
						  <option value="none"> Prefer not to say </option>
					  </select>
			        </label>
			        <label>
			           Age: 
			        	<input type="number" name="age" value={this.state.age} onChange={this.handleChange} />
			        </label>
			        <label>
			          Occupation: 
			          <input type="text" name="occupation" value={this.state.occupation} onChange={this.handleChange} />
			        </label>
			        <label>
			          Phone number: 
			          <input type="number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} />
			        </label>
			        <input type="submit" value="Submit" />
	      		</form>
			</div>
		)
	}
}

export default SignUp;

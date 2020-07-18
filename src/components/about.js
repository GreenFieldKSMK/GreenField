import React, { Fragment } from 'react';

// this is the about component. it includes information about the website

class About extends React.Component {
  render() {
    return (
      <Fragment>
        <div className='box1'>
          <p className='about'>
            Welcome dear customer, Xchange is designed to make your financial
            activities easy and effortless. We deliver multiple services to our
            beloved customers, such as the ability to deposit, withdraw, and
            even transfer money from one account to another, so feel free to
            join our amazing and wonderful family.
          </p>
          <br></br>
          <br></br>
          <p className='about'>Ps: &nbsp; We only allow rich people to join.</p>
        </div>
      </Fragment>
    );
  }
}

export default About;

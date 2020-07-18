import React, { Fragment } from 'react';

// it inclcudes the contact emails fot the 'contact us' part of the nav bar.
class Contact extends React.Component {
  render() {
    return (
      <Fragment>
        <div className='box1'>
          <p className='contact'>abo.naie.93@gmail.com</p>
          <p className='contact'>saritadh74@gmail.com</p>
          <p className='contact'>m.hourani98@gmail.com</p>
          <p className='contact'>karamqaoud@gmail.com</p>
        </div>
      </Fragment>
    );
  }
}

export default Contact;

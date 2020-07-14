import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/landing';
import SignUp from './components/SignUp';
import Signin from './components/SignIn';
import Account from './components/Account';
import Navbar from './components/navbar';
import Profile from './components/profile';
<<<<<<< HEAD
import Withdraw from './components/Withdraw';
import Diposit from './components/Deposit';
=======
import Transfer from './components/transfer';
import Change from './components/ApiReact';
>>>>>>> a0f209ef16b32118fe0b082560e2f9a647444842

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/user' component={Account} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/withdraw' component={Withdraw} />
          <Route exact path='/deposit' component={Diposit} />
        </section>
      </div>
    </Router>
  );
}

export default App;
{
  /* <SignUp />
<hr />
<Account /> */
}

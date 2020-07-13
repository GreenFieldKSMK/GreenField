import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/landing';
import SignUp from './components/SignUp';
import Signin from './components/SignIn';
import Account from './components/Account';
import Navbar from './components/navbar';
import Profile from './components/profile';

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

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/landing';
import SignUp from './components/SignUp';
<<<<<<< HEAD
import Change from './components/ApiReact';

function App() {
  return (
    <div className='App'>
      <SignUp />
      <Change />
    </div>
=======
import Account from './components/Account';

function App() {
  return (
    <Router>
      <div className='App'>
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/user' component={Account} />
        </section>
      </div>
    </Router>
>>>>>>> 7b92ddfcb57c2408c3dae3bdba63d69855297472
  );
}

export default App;
{
  /* <SignUp />
<hr />
<Account /> */
}

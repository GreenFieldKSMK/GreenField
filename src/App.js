import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/landing';
import SignUp from './components/SignUp';
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
  );
}

export default App;
{
  /* <SignUp />
<hr />
<Account /> */
}

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import SetupOrganization from './Components/SetupOrganization';
import Start from './Components/Start';

function App() {


  return (
    <BrowserRouter><Switch>
      <Route path="/" exact component={Start} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/setuporganization" component={SetupOrganization} />
    </Switch></BrowserRouter>
  );
}

export default App;

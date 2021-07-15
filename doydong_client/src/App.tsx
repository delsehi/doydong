import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import SetupOrganization from './Components/SetupOrganization';
import Start from './Components/Start';
import Footer from './Components/Footer';
import PageNotFound from './Components/PageNotFound';
import Login from './Components/Login';
import CreateOrg from './Components/CreateOrg';
import Lesson from './Components/Prototypes/Lesson';

function App() {

  return (
    <BrowserRouter><Switch>
      <Route path="/" exact component={Start} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/lessonproto" component={Lesson} />
      <Route path="/setuporganization" component={SetupOrganization} />
      <Route path="/createorganization" component={CreateOrg} />
      <Route path="*" component={PageNotFound} />
      
    </Switch>
    <Footer />
    </BrowserRouter>

  );
}

export default App;

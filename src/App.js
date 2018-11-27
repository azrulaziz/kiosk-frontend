import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Booking from './Booking'
import Payment from './Payment'
import { initiateWS} from './wsFunction.js'

class App extends Component {
  
  render() {
    initiateWS();
    return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/booking' component={Booking}/>
      <Route exact path='/payment' component={Payment}/>
    </Switch>
    )
  }
}

export default App;

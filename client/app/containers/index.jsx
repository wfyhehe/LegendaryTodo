import React from 'react'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import Main from './Main/index';
import NotFound from './404';
import User from './User/index';


class App extends React.Component {
  constructor(props, context) {
    super(props, context)
  }


  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact path='/' to='/main'/>
          <Route path='/main' component={Main}/>
          <Route path='/user' component={User}/>
          <Route path='*' component={NotFound}/>
        </Switch>
      </Router>
    )
  }


}


export default App

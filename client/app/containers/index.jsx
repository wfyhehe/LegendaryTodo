import React from 'react'
import {Router, Route, Switch, Redirect} from 'react-router-dom'

import Main from './Main/index'
import NotFound from './404'
import User from './User/index'

import createHistory from 'history/createHashHistory'
const history = createHistory()

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
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

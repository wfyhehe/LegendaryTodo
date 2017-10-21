import React from 'react'
import {Layout} from 'antd'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import Navigator from '../components/Navigator/index';
import Main from './Main/index';
import NotFound from './404';
import User from './User/index';
import {Provider} from 'mobx-react';

const {Header, Footer, Content} = Layout

class App extends React.Component {
  constructor(props, context) {
    super(props, context)
  }


  render() {
    // console.log(this.props.children)
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

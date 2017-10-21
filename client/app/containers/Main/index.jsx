import React from 'react'
import Navigator from '../../components/Navigator/index';
import {Layout} from 'antd';
import Home from './Home/index';
import Search from './Search/index';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import NotFound from '../404';
import {inject, observer} from 'mobx-react';

const {Content, Footer, Header, Sider} = Layout

@inject('viewStore') @observer
class Main extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {viewStore} = this.props
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          collapsible
          collapsed={viewStore.collapsed}
          onCollapse={viewStore.onCollapse}
        >
          <Navigator/>
        </Sider>
        <Layout>
          <Content>
            <Router>
              <Switch>
                <Route exact path='/main/' component={Home}/>
                <Route path='/main/search' component={Search}/>
                <Route path='*' component={NotFound}/>
              </Switch>
            </Router>
          </Content>
        </Layout>
      </Layout>
    )
  }
}


export default Main
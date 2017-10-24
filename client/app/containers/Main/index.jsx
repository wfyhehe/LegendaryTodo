import React from 'react'
import Navigator from '../../components/Navigator/index';
import {Layout} from 'antd';
import Home from './Home/index';
import Search from './Search/index';
import {Router, Route, Switch} from 'react-router-dom'
import NotFound from '../404';
import {inject, observer} from 'mobx-react';
import axios from '../../axios/index'
import {backendUrl} from '../../config/urlConfig';
import local from '../../utils/localStore';
import {TOKEN} from '../../constants/localStorage';
import {message} from 'antd';
import ChangePassword from "./ChangePassword/index";

const {Content, Footer, Header, Sider} = Layout

@inject('viewStore') @observer
class Main extends React.Component {

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
            {/*<Router history={this.props.history}>*/}
            <Switch>
              <Route exact path='/main/' component={Home}/>
              <Route path='/main/search' component={Search}/>
              <Route path='/user/change-password' component={ChangePassword}/>
              <Route path='*' component={NotFound}/>
            </Switch>
            {/*</Router>*/}
          </Content>
        </Layout>
      </Layout>
    )
  }

  componentDidMount() {
    const url = `${backendUrl}/verify/`
    axios.post(url, {
      token: local.getItem(TOKEN)
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        // console.log(response.data)
      }
    }).catch(err => {
      message.error('请重新登录')
      this.props.history.push('/user/sign-in')
    })
  }
}


export default Main
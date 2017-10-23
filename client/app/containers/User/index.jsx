import React from 'react'
import {Col, Layout, Menu, Row} from 'antd'
import './style.less'
import {backendUrl} from '../../config/urlConfig'
import SignIn from '../../components/SignIn/index'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import SignUp from '../../components/SignUp/index'

const {Header, Content, Footer} = Layout

class User extends React.Component {

  render() {
    return (
      <Layout id="user">
        <Header>
          <i className="icon icon-Legendary-Todo"/>
        </Header>
        <Content style={{padding: '0 50px'}}>
          <div className="content">
            <Row className="row" gutter={16}>
              <Col span={4}>
              </Col>
              <Col span={8}>
                <img src={backendUrl + '/media/poster.png'}/>
              </Col>
              <Col span={8}>
                {/*<Router history={this.props.history}>*/}
                <Switch>
                  <Redirect exact path='/user' to='/user/sign-in'/>
                  <Route path='/user/sign-in' component={SignIn}/>
                  <Route path='/user/sign-up' component={SignUp}/>
                </Switch>
                {/*</Router>*/}
              </Col>
              <Col span={4}>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Legendary Todo ©2017 Created by wfy
        </Footer>
      </Layout>
    )
  }
}

export default User
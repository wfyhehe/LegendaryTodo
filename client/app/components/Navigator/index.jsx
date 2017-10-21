import {Menu, Icon} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import './style.less'
import {inject, observer} from 'mobx-react';

const SubMenu = Menu.SubMenu;

@inject('viewStore') @observer
class Navigator extends React.Component {
  signOut = () => {
    console.log('signOut')
  }

  componentDidMount() {
    console.log(this.props.viewStore)
  }

  render() {
    const {viewStore} = this.props
    return (
      <div id="navigator">
        {
          !viewStore.collapsed ?
            <div className="expanded-icon">
              <i className="icon icon-Legendary-Todo"/>
            </div>
            :
            <div className="collapsed-icon">
              <i className="icon icon-L"/>
            </div>
        }
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Link to="/main/">
              <Icon type="solution"/>
              <span>任务</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/main/search">
              <Icon type="search"/>
              <span>搜索</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="user"/><span>用户</span></span>}
          >
            <Menu.Item key="3">
              <Link to="/main/change-password">
                <span>修改密码</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <span onClick={this.signOut.bind(this)}>退出登录</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default Navigator
import React from 'react'
import Navigator from '../../../components/Navigator/index';
import {Button, Layout, Switch} from 'antd';
import {inject, observer} from 'mobx-react';
import Header from '../../../components/Header/index';
import List from '../../../components/List/index';


class Home extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <List/>
      </div>
    )
  }
}


export default Home
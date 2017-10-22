import React from 'react'
import {Button, Timeline} from 'antd'
import {inject, observer} from 'mobx-react'
import TodoItem from '../TodoItem/index'
import {backendUrl} from '../../config/urlConfig'
import local from '../../utils/localStore'
import {TOKEN} from '../../constants/localStorage'
import axios from '../../axios/index'

@inject('todoStore') @inject('viewStore') @observer
class List extends React.Component {

  test = () => {
    const url = `${backendUrl}/sign-in/`
    axios.post(url, JSON.stringify({ // 验证用户名密码
      username: 'admin',
      password: 'admin123'
    }), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => {
      console.log(response)
      if (response.status >= 200 && response.status < 300) {
        local.setItem(TOKEN, response.data.token)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  test2 = () => {
    const url = `${backendUrl}/todo/`
    axios.get(url, {
      params: {}
    }, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => {
      console.log(response)
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const {todoStore, viewStore} = this.props
    return (
      <div id="list">
        <Button type="primary" onClick={this.test.bind(this)}>test</Button>
        <Button type="primary" onClick={this.test2.bind(this)}>test2</Button>
        <div className="timeline">
          {todoStore.todos.map((item) => {
            return (
              <TodoItem item={item}/>
            )
          })}
        </div>
      </div>
    )
  }
}

export default List
import React from 'react'
import {Button, Timeline} from 'antd'
import {inject, observer} from 'mobx-react'
import TodoItem from '../TodoItem/index'
import {backendUrl} from '../../config/urlConfig'
import local from '../../utils/localStore'
import {TOKEN} from '../../constants/localStorage'

@inject('todoStore') @inject('viewStore') @observer
class List extends React.Component {

  test = () => {
    const url = `${backendUrl}/jwt-auth/`
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response) //=> number 100–599
      return response.json()
    }, (error) => {
    }).then((json) => {
      console.log(json)
      local.setItem(TOKEN, json.token)
    })
  }
  test2 = () => {
    const url = `${backendUrl}/todo/`
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': ` JWT ${local.getItem(TOKEN)}`
      }
    }).then((response) => {
      console.log(response) //=> number 100–599
      return response.json()
    }, (error) => {
    }).then((json) => {
      console.log(json)
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
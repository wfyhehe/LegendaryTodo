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
  constructor(props, context) {
    super(props, context)
    this.state = {
      todos: []
    }
  }

  render() {
    const {todoStore, viewStore} = this.props
    const {todos} = this.state
    return (
      <div id="list">

        <div className="timeline">
          {todos.map((item) => {
            return (
              <TodoItem item={item}/>
            )
          })}
        </div>
      </div>
    )
  }

  componentDidMount() {
    const url = `${backendUrl}/todos/`
    axios.get(url, {
      params: {}
    }).then(response => {
      this.state.todos = response.data
    }).catch(err => {
    })

  }
}

export default List
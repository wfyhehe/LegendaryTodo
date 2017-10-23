import React from 'react'
import {Timeline} from 'antd'
import {inject, observer} from 'mobx-react';


@inject('todoStore') @observer
class TodoItem extends React.Component {

  render() {
    const {todoStore, data} = this.props
    return (
      <div className="todo-item">
        <p>{data.title}</p>
      </div>
    )
  }

  componentDidMount() {
    console.log(this.props)
  }
}

export default TodoItem
import React from 'react'
import {Timeline} from 'antd'
import {inject, observer} from 'mobx-react';


@inject('todoStore') @observer
class TodoItem extends React.Component {

  render() {
    const {todoStore} = this.props
    const item = this.props.item
    return (
      <div className="todo-item" color={item.color}>
        <p>{item.title}</p>
      </div>
    )
  }
}

export default TodoItem
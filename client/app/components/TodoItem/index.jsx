/* eslint-disable indent */
import React from 'react'
import {Button, Card, Checkbox, Timeline} from 'antd'
import {inject, observer} from 'mobx-react'
import './style.less'
import axios from '../../axios/index'
import {backendUrl} from '../../config/urlConfig'
import moment from 'moment'

@inject('todoStore') @observer
class TodoItem extends React.Component {

  onCompletedChange = (id, e) => {
    const completed = e.target.checked
    const url = `${backendUrl}/todo/${id}`
    this.props.todoStore.setCompleted(id, completed)
    axios.patch(url, JSON.stringify({ // 验证用户名密码
      completed
    }), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => {
      console.log(response)
    }).catch(error => {
    })
  }

  onEdit = (id) => {
    console.log(id)
    console.log(this)
  }

  onDelete = (id) => {
    console.log(id)
    console.log(this)
  }

  render() {
    const {todoStore, data} = this.props
    return (
      <Card className={`todo-item urgency${data.urgency} ${data.completed ? 'completed' : ''}`}
            title={
              <div>
                <Checkbox
                  className="complete"
                  value={data.completed}
                  checked={data.completed}
                  onChange={this.onCompletedChange.bind(this, data.id)}/>
                <p className="expire">
                  {!data.completed ? `截止时间：${moment(data.expire_datetime).fromNow()}` : '已完成'}
                </p>
              </div>}
            extra={
              <div>
                <Button
                  className="edit-button"
                  type="ghost"
                  icon="close"
                  onClick={this.onDelete.bind(this, data.id)}/>
                <Button
                  className="delete-button"
                  type="ghost"
                  icon="edit"
                  onClick={this.onEdit.bind(this, data.id)}/>
              </div>}>
        <p className="title">{data.title}</p>
      </Card>

    )
  }

  componentDidMount() {
    console.log(this.props)
  }
}

export default TodoItem
/* eslint-disable indent */
import React from 'react'
import {Button, Card, Checkbox, Popconfirm, Timeline} from 'antd'
import {inject, observer} from 'mobx-react'
import './style.less'
import axios from '../../axios/index'
import {backendUrl} from '../../config/urlConfig'
import moment from 'moment'
import {UPDATE} from '../../constants/modalStore'
import {message} from 'antd'

@inject('todoStore') @inject('modalStore') @observer
class TodoItem extends React.Component {

  onCompletedChange = (id, e) => {
    const completed = e.target.checked
    const url = `${backendUrl}/todo/${id}/`
    this.props.todoStore.setCompleted(id, completed)
    axios.patch(url, JSON.stringify({
      completed
    }), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => {
    }).catch(error => {
    })
  }

  onEdit = (data) => {
    this.props.modalStore.initData(
      data.id,
      UPDATE,
      data.title,
      data.urgency,
      moment(data.expire_datetime),
      moment(data.expire_datetime)
    )
  }

  onDelete = (id) => {
    const url = `${backendUrl}/todo/${id}/`
    axios.patch(url, JSON.stringify({
      deleted: true
    }), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => {
      message.success('删除成功!')
      this.props.todoStore.removeTodo(id)
    }).catch(error => {
    })
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
                <Popconfirm
                  title="Are you sure delete this task?"
                  onConfirm={this.onDelete.bind(this, data.id)}
                  okText="Yes"
                  cancelText="No">
                  <Button
                    className="edit-button"
                    type="danger"
                    ghost
                    icon="close"/>
                </Popconfirm>
                <Button
                  className="delete-button"
                  type="primary"
                  ghost
                  icon="edit"
                  onClick={this.onEdit.bind(this, data)}/>
              </div>}>
        <p className="title">{data.title}</p>
      </Card>

    )
  }

  componentDidMount() {
  }
}

export default TodoItem
/* eslint-disable indent,camelcase */
import React from 'react'
import {Button, Modal, Input, Timeline, DatePicker, TimePicker, Radio} from 'antd'
import {inject, observer} from 'mobx-react'
import TodoItem from '../TodoItem/index'
import {backendUrl} from '../../config/urlConfig'
import local from '../../utils/localStore'
import {TOKEN, USERNAME} from '../../constants/localStorage'
import axios from '../../axios/index'
import './style.less'
import moment from 'moment'
import {message} from 'antd'
import {CREATE, HIDDEN, UPDATE} from '../../constants/modalStore'

const {TextArea} = Input
const RadioGroup = Radio.Group

@inject('modalStore') @inject('todoStore') @observer
class TodoModal extends React.Component {
  handleOk = (e) => {
    let url = `${backendUrl}/todo/`
    if (this.props.modalStore.modalType === CREATE) { // create
      axios.post(url, JSON.stringify({
        title: this.props.modalStore.title,
        urgency: this.props.modalStore.urgency,
        expire_datetime: this.props.modalStore.datetime
      }), {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response => {
        this.props.modalStore.setType(HIDDEN)
        message.success('添加成功!')
        this.getTodos()
        // this.props.getTodos()
      }).catch(error => {
      })
    } else if (this.props.modalStore.modalType === UPDATE) { //  update
      url = `${backendUrl}/todo/${this.props.modalStore.id}/`
      axios.patch(url, JSON.stringify({
        title: this.props.modalStore.title,
        urgency: this.props.modalStore.urgency,
        expire_datetime: this.props.modalStore.datetime
      }), {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response => {
        this.props.modalStore.setType(HIDDEN)
        message.success('修改成功!')
        // this.props.getTodos()
        this.getTodos()
      }).catch(error => {
      })
    }
  }
  handleCancel = (e) => {
    this.props.modalStore.setType(HIDDEN)
  }
  onDateChange = (date) => {
    this.props.modalStore.setDate(date)
  }
  onTimeChange = (time) => {
    this.props.modalStore.setTime(time)
  }
  onUrgencyChange = (e) => {
    this.props.modalStore.setUrgency(e.target.value)
  }
  onTitleChange = (e) => {
    this.props.modalStore.setTitle(e.target.value)
  }

  render() {
    const {modalStore} = this.props
    return (
      <Modal
        title={
          modalStore.modalType === CREATE ? '添加任务' : '修改任务'
        }
        className="my-modal"
        visible={modalStore.modalType !== HIDDEN}
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this)}
      >
        <div className="my-form-item">
              <TextArea
                placeholder="接下来要做什么呢..."
                rows={4}
                value={this.props.modalStore.title}
                onChange={this.onTitleChange.bind(this)}/>
        </div>
        <div className="my-form-item">
          <RadioGroup value={this.props.modalStore.urgency} onChange={this.onUrgencyChange.bind(this)}>
            <Radio className='urgency urgency1' value={1}>不紧急</Radio>
            <Radio className='urgency urgency2' value={2}>一般紧急</Radio>
            <Radio className='urgency urgency3' value={3}>比较紧急</Radio>
            <Radio className='urgency urgency4' value={4}>十万火急</Radio>
          </RadioGroup>
        </div>
        <div className="my-form-item">
          <span>截止时间:</span>
          <DatePicker onChange={this.onDateChange.bind(this)} value={this.props.modalStore.date}/>
          <TimePicker onChange={this.onTimeChange.bind(this)} value={this.props.modalStore.time}/>
        </div>
      </Modal>
    )
  }

  getTodos() {
    const url = `${backendUrl}/todo/`
    axios.get(url, {
      params: {
        ordering: '-create_datetime'
      }
    }).then(response => {
      this.props.todoStore.fillTodos(response.data)
    }).catch(err => {
    })
  }
}

export default TodoModal
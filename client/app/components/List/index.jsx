/* eslint-disable camelcase */
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

const {TextArea} = Input
const RadioGroup = Radio.Group

@inject('todoStore') @inject('viewStore') @observer
class List extends React.Component {
  state = {
    modalVisible: false,
    urgency: 1,
    time: moment(),
    date: moment().day(moment().day() + 1)
  }
  showModal = () => {
    this.setState({
      modalVisible: true
    })
  }
  handleOk = (e) => {
    let datetime = this.state.date
    if (this.state.date && this.state.time) {
      const date = this.state.date.format().split('T')[0]
      const time = this.state.time.format().split('T')[1]
      datetime = date + 'T' + time
    }
    const url = `${backendUrl}/todo/`
    axios.post(url, JSON.stringify({ // 验证用户名密码
      title: this.state.title,
      urgency: this.state.urgency,
      expire_datetime: datetime
    }), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => {
      message.success('添加成功!')
      this.getTodos()
      this.setState({
        modalVisible: false
      })
    }).catch(error => {
    })
  }
  handleCancel = (e) => {
    this.setState({
      modalVisible: false
    })
  }
  onDateChange = (date, dateString) => {
    this.setState({
      date
    })
  }
  onTimeChange = (time, timeString) => {
    this.setState({
      time
    })
  }
  onUrgencyChange = (e) => {
    this.setState({
      urgency: e.target.value
    })
  }
  onTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  render() {
    const {todoStore, viewStore} = this.props
    return (
      <div id="list">
        <div>
          <Button icon="plus" shape="circle" className="add-button" onClick={this.showModal.bind(this)}/>
          <Modal
            title="添加任务"
            visible={this.state.modalVisible}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}
          >
            <div className="my-form-item">
              <TextArea
                placeholder="接下来要做什么呢..."
                rows={4}
                value={this.state.title}
                onChange={this.onTitleChange.bind(this)}/>
            </div>
            <div className="my-form-item">
              <RadioGroup value={this.state.urgency} onChange={this.onUrgencyChange.bind(this)}>
                <Radio className='urgency urgency1' value={1}>不紧急</Radio>
                <Radio className='urgency urgency2' value={2}>一般紧急</Radio>
                <Radio className='urgency urgency3' value={3}>比较紧急</Radio>
                <Radio className='urgency urgency4' value={4}>十万火急</Radio>
              </RadioGroup>
            </div>
            <div className="my-form-item">
              <span>截止时间:</span>
              <DatePicker onChange={this.onDateChange.bind(this)} value={this.state.date}/>
              <TimePicker onChange={this.onTimeChange.bind(this)} value={this.state.time}/>
            </div>
          </Modal>
        </div>
        <div className="timeline">
          {todoStore.todos.map((item) => {
            return (
              <TodoItem key={item.id} data={item}/>
            )
          })}
        </div>
      </div>
    )
  }

  getTodos() {
    const url = `${backendUrl}/todo/`
    axios.get(url, {
      params: {}
    }).then(response => {
      this.props.todoStore.todos = response.data
    }).catch(err => {
    })

  }

  componentDidMount() {
    this.getTodos()
  }

}

export default List
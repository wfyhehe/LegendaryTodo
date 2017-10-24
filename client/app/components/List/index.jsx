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
import {CREATE} from '../../constants/modalStore'
import TodoModal from '../TodoModal/index';

const {TextArea} = Input
const RadioGroup = Radio.Group

@inject('todoStore') @inject('modalStore') @observer
class List extends React.Component {
  showModal = () => {
    this.props.modalStore.initData()
    this.props.modalStore.setType(CREATE)
  }

  render() {
    const {todoStore, modalStore} = this.props
    return (
      <div id="list">
        <div>
          <Button icon="plus" shape="circle" className="add-button" onClick={this.showModal.bind(this)}/>
          <TodoModal/>
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
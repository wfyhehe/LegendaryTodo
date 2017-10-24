/* eslint-disable camelcase */
import React from 'react'
import {Button, Modal, Input, Timeline, DatePicker, TimePicker, Radio, Spin} from 'antd'
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
import {TODAY} from '../../constants/todoStore'

const {TextArea} = Input
const RadioGroup = Radio.Group

@inject('todoStore') @inject('modalStore') @observer
class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  showModal = () => {
    this.props.modalStore.initData()
    this.props.modalStore.setType(CREATE)
  }

  test = () => {
    console.log(this.state.loading)
  }

  render() {
    const {todoStore, modalStore} = this.props
    return (
      <div id="list">
        {
          this.state.loading && (
            <div className="loading">
              <Spin/>
            </div>
          )
        }
        {
          !this.state.loading && todoStore.todosView.length === 0 && (
            <div className="loading">
              没有任务！
            </div>
          )
        }
        <div>
          <Button icon="plus" shape="circle" className="add-button" onClick={this.showModal.bind(this)}/>
          <TodoModal/>
        </div>
        <div className="timeline">
          {todoStore.todosView.map((item) => {
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
    this.setState({loading: true})
    axios.get(url, {
      params: {
        ordering: '-create_datetime'
      }
    }).then(response => {
      this.props.todoStore.fillTodos(response.data)
      this.setState({loading: false})
    }).catch(err => {
    })
  }

  componentDidMount() {
    this.getTodos()
  }

}

export default List
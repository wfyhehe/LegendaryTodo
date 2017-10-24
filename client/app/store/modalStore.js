import {observable, computed, action} from 'mobx'
import {ALL} from '../constants/viewStore'
import moment from 'moment'
import {HIDDEN} from '../constants/modalStore'

class ModalStore {
  @observable modalType
  @observable title
  @observable urgency
  @observable time
  @observable date
  @observable id


  constructor() {
    this.modalType = HIDDEN
    this.title = ''
    this.urgency = 1
    this.time = moment()
    this.date = moment().day(moment().day() + 1)
  }

  @computed
  get datetime() {
    if (!this.date || !this.time) {
      return ''
    }
    const date = this.date.format().split('T')[0]
    const time = this.time.format().split('T')[1]
    return date + 'T' + time
  }

  @action.bound
  setType(value) {
    this.modalType = value
    console.log(this.modalType)
  }

  @action.bound
  setTitle(value) {
    this.title = value
  }

  @action.bound
  setUrgency(value) {
    this.urgency = value
  }

  @action.bound
  setTime(value) {
    this.time = value
  }

  @action.bound
  setDate(value) {
    this.date = value
  }

  @action.bound
  initData(id = '', modalType = HIDDEN, title = '', urgency = 1, time = moment(), date = moment().day(moment().day() + 1)) {
    this.modalType = modalType
    this.title = title
    this.urgency = urgency
    this.time = time
    this.date = date
    this.id = id
  }

}

const modalStore = new ModalStore();

export default modalStore;
export {ModalStore};
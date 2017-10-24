import {observable, action, computed, useStrict} from 'mobx'
import uuid, {debounce} from '../utils/utils';
import viewStore from './viewStore'
import {COMPLETED, CREATE_DATETIME, EXPIRE_DATETIME, INCOMPLETE, TODAY, URGENCY} from '../constants/todoStore';
import {autorun} from 'mobx';
import moment from 'moment';
// class TodoModel {
//   store
//   id
//   @observable title
//   @observable ddl
//   @observable urgency
//   @observable completed
//
//
//   constructor(store, id, title, ddl, urgency, completed) {
//     this.store = store
//     this.id = id
//     this.title = title
//     this.ddl = ddl
//     this.urgency = urgency
//     this.completed = completed
//   }
//
//   @computed
//   color() {
//     if (this.completed === INCOMPLETE) {
//       return BLUE
//     } else if (this.completed === COMPLETED) {
//       return GREEN
//     } else {
//       return RED
//     }
//   }
// }

class TodoStore {

  @observable todos = []
  @observable todosView = []
  @observable filters
  @observable order
  @observable search

  constructor() {
    this.filters = [COMPLETED, INCOMPLETE]
    this.order = EXPIRE_DATETIME
    this.search = ''
  }

  getTodo = (id) => {
    return this.todos.find(item =>
      item.id === id
    )
  }

  @action
  onChangeSearch = (value) => {
    this.search = value
    this.doSearch()
  }

  @action
  doSearch = debounce(this.filterTodos, 500)

  @action
  filterTodos() {
    console.log(this)
    let todos = this.todos;
    const now = moment()
    if (this.search) {
      todos = todos.filter(todo => {
        return todo.title.indexOf(this.search) >= 0
      })
    }
    if (this.hasFilter(TODAY)) {
      todos = todos.filter(todo => {
        return Math.abs(now.diff(todo.expire_datetime, 'days')) < 1
      })
    }
    if (!this.hasFilter(COMPLETED)) {
      todos = todos.filter(todo => {
        return !todo.completed
      })
    }
    if (!this.hasFilter(INCOMPLETE)) {
      todos = todos.filter(todo => {
        return todo.completed
      })
    }
    if (this.order === EXPIRE_DATETIME) {
      todos = todos.slice().sort((t1, t2) => {
        if (t1.completed !== t2.completed) {
          return t1.completed ? 1 : -1
        } else {
          return moment(t1.expire_datetime).diff(t2.expire_datetime)
        }
      })
    } else if (this.order === URGENCY) {
      todos = todos.slice().sort((t1, t2) => {
        if (t1.completed !== t2.completed) {
          return t1.completed ? 1 : -1
        } else {
          if (t2.urgency !== t1.urgency) {
            return t2.urgency - t1.urgency
          } else {
            return moment(t1.expire_datetime).diff(t2.expire_datetime)
          }
        }
      })
    } else if (this.order === CREATE_DATETIME) {
      todos = todos.slice().sort((t1, t2) => {
        return moment(t1.expire_datetime).diff(t2.expire_datetime)
      })
    }
    this.todosView = todos
  }

  hasFilter = (filter) => {
    return this.filters.indexOf(filter) >= 0
  }

  @action
  fillTodos = (todos) => {
    this.todos = todos
    this.todosView = this.todos
    this.filterTodos()
  }

  @action
  removeTodo = (id) => {
    this.todos = this.todos.filter(todo => todo.id !== id)
    this.todosView = this.todosView.filter(todo => todo.id !== id)
  }

  @action
  setCompleted = (id, complete) => {
    let todo = this.todos.find(item =>
      item.id === id
    )
    todo.completed = complete
  }

  @action
  addFilter = (filter) => {
    if (!this.hasFilter(filter)) {
      this.filters.push(filter)
      this.filterTodos()
    }
  }

  @action
  removeFilter = (filter) => {
    if (this.hasFilter(filter)) {
      this.filters.splice(this.filters.indexOf(filter), 1)
      this.filterTodos()
    }
  }

  @action
  setOrder = (order) => {
    this.order = order
    this.filterTodos()
  }
}

const todoStore = new TodoStore()

export default todoStore

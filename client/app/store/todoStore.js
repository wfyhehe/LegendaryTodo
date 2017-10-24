import {observable, action, computed} from 'mobx'
import uuid from '../utils/uuid';
import {COMPLETED, INCOMPLETE} from '../constants/viewStore';
import {BLUE, GREEN, RED} from '../constants/todoStore';

class TodoModel {
  store
  id
  @observable title
  @observable ddl
  @observable urgency
  @observable completed


  constructor(store, id, title, ddl, urgency, completed) {
    this.store = store
    this.id = id
    this.title = title
    this.ddl = ddl
    this.urgency = urgency
    this.completed = completed
  }

  @computed
  color() {
    if (this.completed === INCOMPLETE) {
      return BLUE
    } else if (this.completed === COMPLETED) {
      return GREEN
    } else {
      return RED
    }
  }
}

class TodoStore {

  @observable todos = []

  getTodo = (id) => {
    return this.todos.find(item =>
      item.id === id
    )
  }

  @action setCompleted = (id, complete) => {
    let todo = this.todos.find(item =>
      item.id === id
    )
    todo.completed = complete
  }


}

const todoStore = new TodoStore();

export default todoStore;
export {TodoStore};

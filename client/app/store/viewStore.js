import {observable, computed, action} from 'mobx';
import {ALL, CREATE, HIDDEN} from '../constants/viewStore';

class ViewStore {

  @observable collapsed;
  @observable showToday;
  @observable todoCategory;
  @observable order;


  constructor() {
    this.collapsed = false;
    this.showToday = false;
    this.todoCategory = ALL;
    this.order = HIDDEN;
  }

  @action.bound
  onCollapse() {
    this.collapsed = !this.collapsed
  }

  @action.bound
  onShowToday() {
    this.showToday = !this.showToday
  }

  @action.bound
  onTodoCategory(value) {
    this.todoCategory = value
  }


}

const viewStore = new ViewStore();

export default viewStore;
export {ViewStore};

import {observable, computed, action} from 'mobx';
import {ALL} from '../constants/viewStore';

class ViewStore {

  @observable collapsed;
  @observable showToday;
  @observable todoCategory;
  @observable order;


  constructor() {
    this.collapsed = false;
    this.showToday = false;
    this.todoCategory = ALL;
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
  OnTodoCategory(value) {
    this.todoCategory = value
  }

}

const viewStore = new ViewStore();

export default viewStore;
export {ViewStore};

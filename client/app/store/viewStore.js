import {observable, computed, action} from 'mobx';
import {ALL, CREATE, HIDDEN} from '../constants/viewStore';

class ViewStore {

  @observable collapsed;
  @observable showToday;
  @observable todoCategory;
  @observable order;
  @observable modalType;


  constructor() {
    this.collapsed = false;
    this.showToday = false;
    this.todoCategory = ALL;
    this.modalType = HIDDEN;
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

  @action.bound
  OnChangeModal(value) {
    this.modalType = value
  }

}

const viewStore = new ViewStore();

export default viewStore;
export {ViewStore};

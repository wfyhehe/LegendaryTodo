import {observable, computed, action} from 'mobx';

class ViewStore {

  @observable collapsed

  constructor() {
    this.collapsed = false
  }

  @action
  onCollapse = () => {
    this.collapsed = !this.collapsed
  }

}

const viewStore = new ViewStore()

export default viewStore

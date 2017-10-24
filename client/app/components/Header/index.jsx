import React from 'react'
import {inject, observer} from 'mobx-react'
import {Button, Checkbox, Input, Select} from 'antd'
import './style.less'
import {
  COMPLETED, CREATE_DATETIME, EXPIRE_DATETIME, EXPIRED, INCOMPLETE, TODAY,
  URGENCY
} from '../../constants/todoStore'
import moment from 'moment';

const Option = Select.Option
const Search = Input.Search

@inject('todoStore') @observer
class Header extends React.Component {
  onCheckboxChange = (e) => {
    if (e.target.checked) {
      this.props.todoStore.addFilter(e.target.value)
    } else {
      this.props.todoStore.removeFilter(e.target.value)
    }
  }

  onSearchChange = (e) => {
    this.props.todoStore.onChangeSearch(e.target.value)
  }

  render() {
    const {todoStore} = this.props
    return (
      <div id="header">
        {
          todoStore.hasFilter(TODAY) ?
            <Button type="primary" onClick={todoStore.removeFilter.bind(this, TODAY)}>查看全部</Button> :
            <Button type="primary" onClick={todoStore.addFilter.bind(this, TODAY)}>只看今天</Button>
        }
        <span className="my-checkbox">
          <Checkbox
            value={COMPLETED}
            checked={todoStore.hasFilter(COMPLETED)}
            onChange={this.onCheckboxChange.bind(this)}>
            已完成
          </Checkbox>
          <Checkbox
            value={INCOMPLETE}
            checked={todoStore.hasFilter(INCOMPLETE)}
            onChange={this.onCheckboxChange.bind(this)}>
            未完成
          </Checkbox>
        </span>
        <span>排序规则：</span>
        <Select
          className="order"
          defaultValue={EXPIRE_DATETIME}
          style={{width: 120}}
          onChange={todoStore.setOrder.bind(this)}>
          <Option value={EXPIRE_DATETIME}>截止时间</Option>
          <Option value={URGENCY}>紧急程度</Option>
          <Option value={CREATE_DATETIME}>创建时间</Option>
        </Select>
        <Input
          placeholder="搜索"
          className="search"
          style={{width: 200}}
          value={todoStore.search}
          onChange={this.onSearchChange.bind(this)}
        />
      </div>
    )
  }
}

export default Header
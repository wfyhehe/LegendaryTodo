import React from 'react'
import {inject, observer} from 'mobx-react'
import {Button, Select} from 'antd'
import './style.less'
import {ALL, COMPLETED, EXPIRED, INCOMPLETE} from '../../constants/viewStore'

const Option = Select.Option

@inject('viewStore') @observer
class Header extends React.Component {

  render() {
    const {viewStore} = this.props

    return (
      <div id="header">
        {
          viewStore.showToday ?
            <Button type="primary" onClick={viewStore.onShowToday}>查看全部</Button> :
            <Button type="primary" onClick={viewStore.onShowToday}>只看今天</Button>
        }
        <Select className="category" defaultValue={ALL} style={{width: 120}} onChange={viewStore.onTodoCategory}>
          <Option value={ALL}>全部</Option>
          <Option value={INCOMPLETE}>未完成</Option>
          <Option value={COMPLETED}>已完成</Option>
          <Option value={EXPIRED}>已过期</Option>
        </Select>

      </div>
    )
  }
}

export default Header
import React from 'react'
import {Button, Timeline} from 'antd';
import {inject, observer} from 'mobx-react';
import TodoItem from '../TodoItem/index';

@inject('todoStore') @inject('viewStore') @observer
class List extends React.Component {

  test = () => {
    // const url = `${backendUrl}/`
    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   credentials: "same-origin"
    // }).then(function (response) {
    //   response.status     //=> number 100–599
    //   response.statusText //=> String
    //   response.headers    //=> Headers
    //   response.url        //=> String
    //
    //   response.text().then(function (responseText) { ...
    //   })
    // }, function (error) {
    //   error.message //=> String
    // })
  }

  render() {
    const {todoStore, viewStore} = this.props
    return (
      <div id="list">
        <Button type="primary" onClick={this.test.bind(this)}>test</Button>
        <div className="timeline">
          {todoStore.todos.map((item) => {
            return (
              <TodoItem item={item}/>
            )
          })}
        </div>
      </div>
    )
  }
}

export default List
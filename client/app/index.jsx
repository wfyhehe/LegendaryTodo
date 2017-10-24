import React from 'react'
import {render} from 'react-dom'
import './static/css/common.less'
import './static/css/font.css'
import todoStore from './store/todoStore'
import {Provider} from 'mobx-react'
import viewStore from './store/viewStore'
import App from './containers/index'
import modalStore from './store/modalStore'

const rootElement = document.getElementById('root')


render(
  <Provider todoStore={todoStore} viewStore={viewStore} modalStore={modalStore}>
    <App/>
  </Provider>,
  rootElement
)

import React from 'react'
import {render} from 'react-dom'
import './static/css/common.less'
import './static/css/font.css'

const rootElement = document.getElementById('root')
import todoStore from './store/todoStore'
import {Provider} from 'mobx-react'
import viewStore from './store/viewStore'
import App from './containers/index'


render(
  <Provider todoStore={todoStore} viewStore={viewStore}>
    <App/>
  </Provider>,
  rootElement
)

import React from 'react'

class NotFound extends React.Component {

  render() {
    return (
      <div>
        <h1>404 not found page</h1>
        <h3>Sorry, we didn't find what you want</h3>
      </div>
    )
  }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
export default NotFound
// module.exports = NotFound
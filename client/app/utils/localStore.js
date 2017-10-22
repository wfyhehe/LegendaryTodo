/* eslint-disable no-undef */


export default {
  getItem(key) {
    let value
    try {
      value = localStorage.getItem(key)
      return value
    } catch (ex) {
      if (__DEV__) {
        console.error('localStorage.getItem报错, ', ex.message)
      }
    }
    return null
  },
  setItem(key, value) {
    try {
      // ios safari 无痕模式下，直接使用 localStorage.setItem 会报错
      localStorage.setItem(key, value)
    } catch (ex) {
      if (__DEV__) {
        console.error('localStorage.setItem报错, ', ex.message)
      }
    }
  }
}
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
      localStorage.setItem(key, value)
    } catch (ex) {
      if (__DEV__) {
        console.error('localStorage.setItem报错, ', ex.message)
      }
    }
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key)
    } catch (ex) {
      if (__DEV__) {
        console.error('localStorage.setItem报错, ', ex.message)
      }
    }
  }
}
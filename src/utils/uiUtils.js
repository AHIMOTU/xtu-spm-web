import Vue from 'vue'
import { Message, MessageBox } from 'element-ui'
import Utils from './utils'

const bus = new Vue()

class UiUtils extends Utils {
  bus = null
  constructor () {
    super()
    this.bus = bus
  }

  // 消息框简单封装
  message (message, type = 'success', duration = 3000) {
    Message({ message, type, duration })
  }

  confirm (content, title = '确认操作', options) {
    return new Promise((resolve) => {
      MessageBox.confirm(content, title, {
        type: 'warning',
        ...options
      }).then(() => resolve(true)).catch(() => resolve(false))
    })
  }
}

const uiUtils = new UiUtils()
export default uiUtils

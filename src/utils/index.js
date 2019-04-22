import utils from './uiUtils'
import ls from './lsUtils'

export default {
  install (Vue) {
    Vue.prototype.$utils = utils
    Vue.prototype.$ls = ls
  }
}

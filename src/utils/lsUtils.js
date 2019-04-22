export class LsUtils {
  set (key, val) {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    }
    localStorage.setItem(key, val)
  }
  get (key) {
    return localStorage.getItem(key)
  }
  getJSON (key) {
    const obj = this.get(key)
    if (obj) {
      return JSON.parse(obj)
    }
    return null
  }
  remove (key) {
    localStorage.removeItem(key)
  }
}

export default new LsUtils()

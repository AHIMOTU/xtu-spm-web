export default class Utils {
  // 数组转树
  list2tree (source, parentIdVal, id, parentId) {
    const target = source.filter(s => s[parentId] === parentIdVal)
    target.forEach(t => {
      const children = this.list2tree(source, t[id], id, parentId)
      if (children.length) {
        t.children = children
      }
    })
    return target
  }
}

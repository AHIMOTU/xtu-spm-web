import conn from './conn.js'

const request = (method, url, data, config) => {
  data = { ...data, ...config }
  return conn.request({ method, url, data }).then((data) => ({ data })).catch((error) => ({ error }))
}

export default {
  // 登录
  login: (params = {}, config = {}) => request('post', '/users/login', params, config),
  // 获取验证码
  getSms: (params = {}, config = {}) => request('get', '/users/sms', params, config),
  // 检验验证码
  postCheckSms: (params = {}, config = {}) => request('post', '/users/checkSms', params, config),
  // 注册
  regist: (params = {}, config = {}) => request('post', '/users/regist', params, config),
  // 获取phone
  getPhone: (params = {}, config = {}) => request('get', '/users/phone', params, config),
  // 重置密码
  postEditPassword: (params = {}, config = {}) => request('post', '/users/editPassword', params, config),
  // 商品列表
  getProductList: (params = {}, config = {}) => request('get', '/product/list', params, config),
  // 根据品类id搜索商品
  getProductByCateId: (params = {}, config = {}) => request('get', '/product/listByCateId', params, config),
  // 商品详情
  getProductDetail: (params = {}, config = {}) => request('get', '/product/detail', params, config),
  // 获取品类列表
  getCategoryList: (params = {}, config = {}) => request('get', '/category/list', params, config),
  // 加入购物车
  postAddCart: (params = {}, config = {}) => request('post', '/cart/add', params, config),
  // 从购物车删除
  postDelCart: (params = {}, config = {}) => request('post', '/cart/delete', params, config),
  // 直接加入购物车
  postDirectAddCart: (params = {}, config = {}) => request('post', '/cart/directAdd', params, config),
  // 获取购物车
  getFindCart: (params = {}, config = {}) => request('get', '/cart/find', params, config),
  // 改变购物车 单个商品的选中状态
  postSelectCart: (params = {}, config = {}) => request('post', '/cart/selected', params, config),
  // 改变购物车 单个商品的选中状态
  postSelectAllCart: (params = {}, config = {}) => request('post', '/cart/selectedAll', params, config),
  // 新增地址
  postAddAddress: (params = {}, config = {}) => request('post', '/address/add', params, config),
  // 查询地址
  getFindAddress: (params = {}, config = {}) => request('get', '/address/find', params, config),
  // 编辑地址
  postEditAddress: (params = {}, config = {}) => request('post', '/address/edit', params, config),
  // 删除地址
  postDelAddress: (params = {}, config = {}) => request('post', '/address/del', params, config),
  // 新增订单
  postAddOrder: (params = {}, config = {}) => request('post', '/order/add', params, config),
  // 改变订单状态
  postChangeStatus: (params = {}, config = {}) => request('post', '/order/changeStatus', params, config),
  // 根据订单id获取订单详情
  getFindByOrderId: (params = {}, config = {}) => request('get', '/order/findByOrderId', params, config),
  // 获取所有订单
  getFindAllOrder: (params = {}, config = {}) => request('get', '/order/findAllOrder', params, config),
  // 新增评论
  postAddComment: (params = {}, config = {}) => request('post', '/comment/add', params, config),
  // 根据商品id获取评价
  getFindComment: (params = {}, config = {}) => request('get', '/comment/find', params, config)
}

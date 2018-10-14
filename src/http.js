let Fly = require('flyio/dist/npm/wx')
let fly = new Fly() //创建fly实例

fly.interceptors.request.use((config, promise) => {
  const token = wx.getStorageSync('token')
  if (token) {
    config.headers['openid'] = token.openid
    config.headers['time'] = token.time
  }
  config.headers['Content-Type'] = 'application/json'
  config.baseURL = 'https://www.saber-toothed.xyz/wx/'
  return config
})

const $http = (url, data) =>
  new Promise((resolve, reject) => {
    fly
      .request(url, data, {
        method: data ? 'post' : 'get'
      })
      .then(res => {
        const { succ, msg = '', data } = res.data
        if (succ) {
          resolve(data)
        } else {
          console.log('操作失败,' + msg, url)
          if(msg.includes('验证失败')) {
              wx.showToast({
                  title: '登录信息已过期，请重新登录',
                  icon: 'none'
              })
              setTimeout(() => {
                  wx.clearStorageSync()
                  wx.redirectTo({ url: '../index/main' })
              }, 2000);
              return
          }
          wx.showToast({
            title: `请求${url}时发生错误` + (msg ? `：${msg}` : ''),
            icon: 'none',
            duration: 2000
          })
          reject(res.msg)
        }
      })
      .catch(e => {
        wx.showToast({ title: '出错了', icon: 'none', duration: 2000 })
      })
  })

export default $http

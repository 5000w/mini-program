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
                if (res.data.succ) {
                    resolve(res.data.data)
                } else {
                    console.log('操作失败,' + res.data.msg)
                    wx.showToast({
                        title: '操作失败,' + res.data.msg,
                        icon: 'none'
                    })
                    reject(res.msg)
                }
            })
            .catch(e => {
                wx.showToast({
                    title: '出错了',
                    icon: 'none'
                })
                
            })
    })

export default $http

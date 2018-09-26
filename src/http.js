let Fly = require('flyio/dist/npm/wx')
let fly = new Fly() //创建fly实例



fly.interceptors.request.use((config, promise) => {
    config.headers['Content-Type'] = 'application/json'
    // config.headers['X-Requested-With'] = 'XMLHttpRequest'
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
                if (res.succ) {
                    resolve(res.data)
                } else {
                    console.log('操作失败,' + res.data.desc)
                    wx.showToast({
                        title: '操作失败,' + res.data.desc,
                        icon: 'none'
                    })
                    reject(res.desc)
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

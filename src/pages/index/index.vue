<template>
    <div class="container">
        极速刷小程序 <br>
        大学生的神器
        <img src="/static/img/index-wave.jpg" alt="" class="wave">
        <w-button @click="start">点击开启</w-button>
    </div>
</template>

<script>

    export default {
    	data() {
    		return {
    			motto: 'Hello World',
    			userInfo: {}
    		}
    	},
    	methods: {
    		start() {
    			const url = '../home/main'
    			wx.switchTab({ url })
    		},
    		getUserInfo() {
    			// 调用登录接口
    			wx.login({
    				success: () => {
    					wx.getUserInfo({
    						success: res => {
    							this.userInfo = res.userInfo
    						}
    					})
    				}
    			})
    		},
    	},

    	created() {
    		// 调用应用实例的方法获取全局数据
    		// this.getUserInfo()
    	}
    }
</script>

<style scoped>
    .counter {
    	display: inline-block;
    	margin: 10px auto;
    	padding: 5px 10px;
    	color: blue;
    	border: 1px solid blue;
    }
    .wave {
        width: 100vw;
        height: 40px;
    }
</style>

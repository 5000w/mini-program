<template>
    <div class="container">
        <Card  v-for="(card,idx) in cardList" :key="idx" :disabled="card.disabled" :name="card.name" :date="card.date"></Card>
    </div>
</template>

<script>
     
    import Card from '@/components/coupon-card'
    export default {
    	data() {
    		return {
                cardList: [
                    {name: '满99减25',date: 30,disabled: true},
                    {name: '满99减25',date: 30,disabled: false},
                ]
    		}
    	},


    	methods: {
            handleClick() {
                console.log(1)
            },
    		bindViewTap() {
    			const url = '../logs/main'
    			wx.navigateTo({ url })
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
        },
        components: {Card}
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

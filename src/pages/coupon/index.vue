<template>
    <div class="container">
        <Card v-for="(card,idx) in cardList" :key="idx" :state="card.state" @goCart="goCart" :name="`满${mapCoupon[card.share_times].condition}减${mapCoupon[card.share_times].minus}`" :date="card.date" @share="() => {receice(card.price)}">
        </Card>
    </div>
</template>

<script>
    import Card from '@/components/coupon-card'
    // const mapCoupon = {
    // 	login: { condition: 29, minus: 5 },
    // 	share_once: { condition: 99, minus: 19 },
    // 	share_twice: { condition: 149, minus: 39 }
    // }
    const mapCoupon = [{ condition: 16, minus: 1 }, { condition: 32, minus: 3 }, { condition: 99, minus: 8 }]
    export default {
    	data() {
    		return {
    			mapCoupon,
    			cardList: []
    		}
    	},
    	onShareAppMessage() {
            this.share()
            return {
                title: '这个小程序可以刷网课？',
                imageUrl: '/static/img/share.png',
                path: 'pages/index/main'
            }
    	},
    	onShow() {
    		// 调用应用实例的方法获取全局数据
    		// this.getUserInfo()
            this.getCoupon()
    	},

    	methods: {
    		getCoupon() {
    			this.fetch('get_coupon').then(res => {
    				const list = Object.values(res)
    				// const list = [1, 2, 0, 0]
    				const own = [],
    					notOwn = [],
    					used = []
    				list.forEach((v, idx) => {
    					if (v === 1) {
    						own.push(idx)
    					} else if (v === 2) {
    						used.push(idx)
    					} else if (v === 0) {
    						notOwn.push(idx)
    					}
    				})
    				const arr = []

    				own.forEach(v =>
    					arr.push({
    						state: 'own',
    						share_times: v
    					})
    				)
    				used.forEach(v =>
    					arr.push({
    						state: 'used',
    						share_times: v
    					})
    				)
    				if (notOwn.length) {
    					arr.push({
    						state: 'notOwn',
    						share_times: notOwn[0]
    					})
    				}
    				this.cardList = arr
    			})
    		},
            goCart() {
                const url = '../cart/main'
                wx.switchTab({ url })
            },
    		share(price) {
    			this.fetch('share_for_coupon').then(res => {
    				this.getCoupon()
    			})
    		}
    	},

    	components: { Card }
    }
</script>

<style scoped>
    .container {
    	display: flex;
    	flex-direction: column;
    	align-items: center;
    }
</style>

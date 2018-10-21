<template>
    <div class="goods-list">
        <Card v-for="(goods,idx) in goodsList" :key="idx" @click="handleClick" :src="goods.src || 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'" :name="goods.name" :price="goods.price"> </Card>
    </div>
</template>

<script>
    import Card from '@/components/goods-card'
    function getRandom(Min = 0, Max = 150) {
    	var Range = Max - Min
    	var Rand = Math.random()
    	return Min + Math.round(Rand * Range)
    }
    export default {
    	data() {
    		return {
    			goodsList: [],
    			imgUrls: ['/static/img/banner1.jpg', '/static/img/banner2.jpg', '/static/img/banner3.jpg']
    		}
    	},
    	onShow() {
    		this.getGoods()
    	},
    	methods: {
    		handleClick() {
    			// const url = '../detail/main'
    			// wx.navigateTo({ url })

    			const url = '../cart/main'
    			wx.switchTab({ url })
    		},
    		getGoods() {
    			return this.fetch('get_all_goods').then(res => {
    				const arr = []
    				res.list.forEach(v => {
    					arr.push({
    						...v,
    						src: this.imgUrls[getRandom(0, 2)]
    					})
    				})
    				this.goodsList = arr
    			})
    		}
    	},

    	components: { Card }
    }
</script>

<style scoped lang="scss">
    .goods-list {
    	display: flex;
    	flex-wrap: wrap;
    	justify-content: space-between;
    	padding: 0 15px;
    	margin-top: 15px;
    }
</style>

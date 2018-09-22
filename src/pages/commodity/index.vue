<template>
    <div class="goods-list">
        <Card v-for="(goods,idx) in goodsList" :key="idx" @click="handleClick" :src="goods.src" :name="goods.name" :price="goods.price"> </Card>
    </div>
</template>

<script>
    import Card from '@/components/goods-card'

    export default {
    	data() {
    		return {
    			goodsList: new Array(20).fill({
    				id: 'xx',
    				src:
    					'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    				name: '商品测试名称',
    				price: '88'
    			})
    		}
    	},

    	methods: {
    		handleClick() {
    			const url = '../detail/main'
    			wx.navigateTo({ url })
    		},
    	},

    	created() {
    		// 调用应用实例的方法获取全局数据
    		// this.getUserInfo()
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

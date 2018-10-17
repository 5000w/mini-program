<template>
    <div class="goods-list">
        <Card v-for="(goods,idx) in goodsList" :key="idx" @click="handleClick" :src="goods.src || 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'" :name="goods.name" :price="goods.price"> </Card>
    </div>
</template>

<script>
    import Card from '@/components/goods-card'

    export default {
    	data() {
    		return {
    			goodsList: []
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
                wx.switchTab({url})
            },
            getGoods() {
                return this.fetch('get_all_goods').then(res => {
                    this.goodsList = res.list
                })
            },
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

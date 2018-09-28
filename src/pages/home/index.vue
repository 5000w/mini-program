<template>
    <div class="container">
        <swiper :indicator-dots="true" :autoplay="true" :circular="true">
            <block v-for="(img,idx) in imgUrls" :key="idx">
                <swiper-item>
                    <img :src="img" @click="handleSlideClick(idx)" class="slide-image" />
                </swiper-item>
            </block>
        </swiper>
        <div class="coupon-wrapper">
            <div class="title">
                <div>
                    <img src="/static/img/home-title-coupon.png" alt="" style="width: 22px;height: 16px;"> 专享优惠券
                </div>
                <span>领券购物更优惠</span>
            </div>
            <div class="coupon-list">
                <div v-for="(item,idx) in coupons" class="coupon" :key="idx">
                    {{ item }}
                </div>
            </div>
        </div>
        <div class="commodity">
            <div class="title">
                <div>
                    <img src="/static/img/home-title-hot.png" style="width: 17px;height: 19px;" alt=""> 热卖商品
                </div>
                <span>热卖商品为您推荐</span>
            </div>
            <div class="goods-list">
                <Card  v-for="(goods,idx) in goodsList" @click="handleClick" :key="idx" :src="goods.src" :name="goods.name" :price="goods.price"> </Card>
            </div>
        </div>
    </div>
</template>

<script>
    import Card from '@/components/goods-card'
    export default {
    	data() {
    		return {
    			coupons: ['满25减5', '29', '149', '119'],
    			imgUrls: [
    				'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    				'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    				'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
                ],
                goodsList: new Array(20).fill({
                    id: 'xx',
                    src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
                    name: '商品测试名称',
                    price: '88'
                })
    		}
    	},

        mounted() {
            this.getCoupon()
        },

    	methods: {
            getCoupon() {
                console.log('xxx')
                this.fetch('get_coupon').then(res => {
                    console.log(res)
                })
            },
    		handleSlideClick(idx) {
    			const url = '../detail/main'
                wx.navigateTo({ url })
    		},
    		handleClick() {
    			const url = '../detail/main'
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
    		}
    	},

    	created() {
    		// 调用应用实例的方法获取全局数据
    		// this.getUserInfo()
    	},
        components: {Card}
    }
</script>

<style scoped lang="scss">
    //跳过图床
    $homeCouponBg: 'https://s1.ax1x.com/2018/09/19/ieweAK.png';
    .container {
    	background: #f6f6f6;
    }
    .slide-image {
    	width: 100vw;
    	height: 100%;
    }
    .title {
    	display: flex;
    	justify-content: space-between;
    	align-items: center;
    	font-size: 13px;
    	>span {
    		color: #b3b3b3;
    	}
        >div {
            display: flex;
            align-items: center;
            >img {
                margin-right: 10px;
            }
        }
    }
    .coupon-wrapper,
    .commodity {
    	padding: 7px 13px;
    	margin-top: 10px;
    	background: white;
    }
    .coupon-list {
    	display: flex;
    	width: 100%;
    	overflow-x: auto;
        margin-top: 10px;
    	.coupon {
    		width: 120px;
    		height: 45px;
            background-image: url($homeCouponBg);
    		background-size: cover;
    		flex-shrink: 0;
    		margin: 0 8px;
    		color: #ec6941;
    		font-size: 13px;
    		text-align: right;
    		padding-right: 20px;
    		box-sizing: border-box;
    		line-height: 45px;
    	}
    }
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 5px;
        margin-top: 15px;
    }
</style>

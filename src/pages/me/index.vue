<template>
    <div class="container">
        <div class="user">
            <img :src="avatarUrl" alt="">
            <span>
                {{nickName}}
            </span>
        </div>

        <div class="main">
            <div class="wrapper-home" v-if="currView === 'home'">
                <div @click="currView = 'order'"><img src="/static/img/order.png" alt=""><span>我的订单</span></div>
                <div><img src="/static/img/not-pay.png" alt=""><span>待付款</span></div>
                <div><img src="/static/img/smile.png" alt=""><span>这有个微笑:)</span></div>
            </div>
            <div class="wrapper-order" v-else>
                <div class="title">
                    <div><img src="/static/img/order.png" alt=""><span>我的订单</span></div>
                    <div @click="currView = 'home'">返回</div>
                </div>
                <ul>
                    <li v-for="(item,idx) in orderList" :key="idx">
                        <span>{{item.courseName}}</span>
                        <span class="percent">{{item.planProgress}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="service" v-if="currView === 'home'" @click="showDialog = true">
            <img src="/static/img/service.png" alt="" >
            联系客服
        </div>

        <cs-dialog :show="showDialog" @close="showDialog = false"></cs-dialog>
    </div>
</template>

<script>
    import Dialog from '@/components/service-dialog'
    export default {
    	data() {
    		return {
    			nickName: '',
    			avatarUrl: '',
    			orderList: [],
    			currView: 'home',
                showDialog: false
    		}
    	},
    	onShow() {
    		const { nickName, avatarUrl } = wx.getStorageSync('userInfo') || {}
    		this.nickName = nickName
    		this.avatarUrl = avatarUrl
    		this.getOrder()
    	},
    	methods: {
    		getOrder() {
    			this.fetch('get_order_detail').then(res => {
    				this.orderList = res
    			})
    		}
    	},
        components: { 'cs-dialog': Dialog }
    }
</script>

<style scoped lang="scss">
    $mainColor: rgb(70, 79, 203);
    img {
    	width: 20px;
    	height: 20px;
    }
    .user {
    	height: 25vh;
    	background: $mainColor;
    	padding: 0 40px;
    	display: flex;
    	align-items: center;
    	> img {
    		width: 70px;
    		height: 70px;
    		border-radius: 50%;
    	}
    	> span {
    		color: white;
    		font-size: 18px;
    		margin-left: 20px;
    	}
    }
    .main {
    	height: 10vh;
    	background: linear-gradient(to bottom, $mainColor, white);
    	.wrapper-home {
    		width: 90%;
    		height: 15vh;
    		margin: 0 auto;
    		border-radius: 3px;
    		background: white;
    		box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.3);
    		display: flex;
    		justify-content: space-around;
    		align-items: center;
    		padding-top: 10px;
    		> div {
    			display: flex;
    			flex-direction: column;
    			align-items: center;
    		}
    		span {
    			font-size: 14px;
    			margin-top: 10px;
    		}
    	}
    	.wrapper-order {
    		font-size: 14px;
    		padding: 10px;
    		box-sizing: border-box;
    		width: 90%;
    		border-radius: 3px;
    		background: white;
    		margin: 0 auto;
    		box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.3);
    		> .title {
    			display: flex;
    			justify-content: space-between;
    			align-items: center;
    			> div {
    				display: flex;
    				align-items: center;
                    >img {
                        margin-right: 5px;
                    }
    			}
    		}
            >ul {
                >li {
                    padding: 0 25px;
                    border-bottom: 1px solid #333;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 13px;
                    line-height: 1.7;
                    .percent {
                        color: $mainColor;
                    }
                }
            }
    	}
    }
    .service {
    	display: flex;
    	justify-content: center;
    	transform: translateY(10vh);
    	font-size: 14px;
    	align-items: center;
    	> img {
    		margin-right: 10px;
    	}
    }
</style>

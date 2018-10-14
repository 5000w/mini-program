<template>
    <div class="container">
        <div class="main">
            <ul class="selectedList">
                <li v-for="(li,idx) in selectedList" :key="idx">
                    <img :src="li.img" alt="">
                    <div>
                        <p>{{li.name}}</p>
                        <div>
                            <span>￥{{li.price}}</span>
                            <inputNumber :defaultValue="li.count" v-if="li.show"></inputNumber>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-for="(rec,idx) in receivers" :key="idx">
                <div class="receiver">
                    <div class="title">
                        <img src="/static/img/gift.png" alt="">
                        选择收货人
                    </div>
                    <div class="item">
                        <span class="label">平台</span>
                        <picker @change="e => {bindPickerChange(e,rec,idx)}" :value="rec.platform" :range="platformList">
                            <w-button v-if="rec.platform === -1" size="small" :clear="true" type="calm">选择平台</w-button>

                            <div v-else class="picker">
                                {{ platformList[rec.platform] }}
                            </div>
                        </picker>
                    </div>
                    <div class="item">
                        <span class="label">学校</span>
                        <input placeholder="请输入学校" v-model="rec.school_name" type="text">
                    </div>
                    <div class="item">
                        <span class="label">账号</span>
                        <input placeholder="请输入11位手机号" v-model="rec.phone_number" type="number" :maxlength="11">
                    </div>
                    <div class="item">
                        <span class="label">密码</span>
                        <input type="text" placeholder="请输入密码" v-model="rec.pwd" :password="true">
                    </div>

                    <div class="submit">
                        <div></div>
                        <div>
                            <div class="btn" @click="query(rec,idx)">查询</div>
                        </div>
                        <div class="addReceiver" v-if="idx === receivers.length - 1">
                            添加收货人
                            <img src="/static/img/plus.png" alt="" @click="add">
                        </div>
                        <div v-else> </div>
                    </div>

                </div>

                <lessonPicker v-if="rec.list.length" @select="arr => {handleSelect(arr,rec,idx)}" :list="rec.list"></lessonPicker>
            </div>
        </div>
        <div class="footer">
            <div class="icon-wrapper">
                <img src="/static/img/message.png" alt="">
                <span>联系卖家</span>
            </div>
            <div class="totalPrice">
                合计:￥{{totalPrice}}
            </div>

            <div class="oper" :class="{disabled: totalPrice === 0}" @click="pay">立即结算</div>
        </div>
    </div>
</template>

<script>
    import inputNumber from '@/components/input-number'
    import lessonPicker from '@/components/lesson-picker'



    export default {
    	data() {
    		return {
    			selectedList: [
    				{
    					name: '课程名称',
    					price: 9.9,
    					count: 1,
    					img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    					show: false
    				}
    			],
    			// totalPrice: 99,

    			platformList: ['超星', '智慧树', '其他'],
    			receivers: [
    				{
    					platform: -1,
    					school_name: '西安财经学院行知学院',
    					phone_number: '13325465996',
    					pwd: 'fzh19971115',
    					list: [],
    					class_name: []
    				}
    			],
    			coupons: []
    		}
    	},
    	computed: {
    		totalPrice() {
    			return Math.round(this.receivers.reduce((p, n) => p + n.class_name.length, 0) * 9.9 * 100) / 100                                
    		}
    	},
    	methods: {
    		bindPickerChange(e, rec, idx) {
    			const platform = e.mp.detail.value
    			this.receivers.splice(idx, 1, {
    				...rec,
    				platform
    			})
    		},
    		add() {
    			if (!this.receivers.some(v => v.list.length)) {
    				wx.showToast({
    					title: '请先查询',
    					icon: 'none'
    				})
    				return
    			}
    			this.receivers.push({
    				platform: -1,
    				school_name: '',
    				phone_number: '',
    				pwd: '',
    				list: [],
    				class_name: []
    			})
    		},
    		query(rec, idx) {

    			wx.showLoading({
    				title: '正在查询',
    				mask: true
                })
                
    			const { platform, school_name, phone_number, pwd } = rec
    			this.fetch('get_class', {
    				// type: platform === '超星' ? 2 : 1,
    				type: 1,
    				phone_number,
    				pwd,
    				school_name
    			}).then(res => {
    				
    				this.receivers.splice(idx, 1, {
    					...rec,
    					list: res.list.map(v => ({
    						name: v.courseName,
    						percent: v.planProgress
    					}))
                    })
                    wx.hideLoading()
    			})
    		},
    		handleSelect(arr, rec, idx) {
    			this.receivers.splice(idx, 1, {
    				...rec,
    				class_name: arr
    			})
    		},
    		getCoupon() {
    			this.fetch('get_coupon').then(res => {
    				this.coupons = res.list
    			})
    		},
    		pay() {
    			const { receivers, totalPrice, coupons } = this
    			let minus = 0
    			if (totalPrice >= 149) {
    				minus = coupons.find(v => v.price === 'share_twice').state === 1 ? 39 : 0
    			} else if (totalPrice >= 99) {
    				minus = coupons.find(v => v.price === 'share_once').state === 1 ? 19 : 0
    			} else if (totalPrice >= 29) {
    				minus = coupons.find(v => v.price === 'login').state === 1 ? 5 : 0
    			}
    			// const price = (totalPrice - minus) * 100
    			const price = 1
    			const params = {
    				price,
    				class_data_list: receivers.map(v => {
    					const { platform, school_name, phone_number, pwd, class_name } = v
    					return {
    						// type: platform === '超星' ? 2 : 1,
    						type: 1,
    						phone_number,
    						pwd,
    						school_name,
    						class_name
    					}
    				})
    			}

    			this.fetch('payOrder', { price }).then(res => {
    				wx.requestPayment({
    					timeStamp: res.timeStamp,
    					nonceStr: res.nonceStr,
    					package: res.prepay_id,
    					signType: 'MD5',
    					paySign: res.paySign,
    					success: res => {
    						wx.showToast({
    							title: '支付成功',
    							icon: 'success',
    							duration: 2000
    						})
    						this.fetch('add_order', params)
    					},
    					fail: function({ errMsg }) {
    						wx.showToast({
    							title: errMsg.includes('cancel') ? '您已取消支付' : '支付失败',
    							icon: 'none',
    							duration: 2000
    						})
    					}
    				})
    			})
    		}
    	},

    	mounted() {
    		// 调用应用实例的方法获取全局数据
    		// this.getUserInfo()
    		this.getCoupon()
    	},
    	components: {
    		inputNumber,
    		lessonPicker
    	}
    }
</script>

<style scoped lang="scss">
    $mainColor: #ec6941;
    $footerH: 47px;
    $border: 1px solid #ddd;
    .container {
    	background: #f2f2f2;
    	* {
    		box-sizing: border-box;
    	}
    }
    .main {
    	height: calc(100vh - #{$footerH});
    	overflow: auto;
    	.selectedList {
    		> li {
    			border-top: $border;
    			border-bottom: $border;
    			width: 100vw;
    			background: white;
    			padding: 10px;
    			box-sizing: border-box;
    			display: flex;
    			margin: 10px 0;
    			> img {
    				width: 80px;
    				height: 80px;
    				margin-right: 15px;
    			}
    			> div {
    				display: flex;
    				flex-direction: column;
    				justify-content: space-around;
    				flex: 1;
    				> p {
    					font-size: 18px;
    					color: #333;
    					margin-bottom: 10px;
    				}
    				> div {
    					width: 100%;
    					color: red;
    					font-size: 16px;
    					display: flex;
    					justify-content: space-between;
    					align-items: center;
    				}
    			}
    		}
    	}
    	.receiver {
    		padding: 10px;
    		font-size: 16px;
    		box-sizing: border-box;
    		background: white;
    		padding-bottom: 5px;
    		margin-bottom: 10px;
    		input {
    			font-size: 14px;
    		}
    		> .title,
    		> .item {
    			height: 30px;
    			line-height: 30px;
    			border-bottom: $border;
    			display: flex;
    			align-items: center;
    		}
    		.title {
    			height: 40px;
    			img {
    				width: 25px;
    				height: 25px;
    				margin-right: 15px;
    			}
    		}
    		.item {
    			.label {
    				width: 60px;
    			}
    		}
    		.submit {
    			width: 100%;
    			display: flex;
    			justify-content: space-between;
    			align-items: center;
    			height: 50px;
    			margin-top: 5px;
    			> div {
    				flex: 1;
    			}
    			.addReceiver {
    				display: flex;
    				align-items: center;
    				justify-content: flex-end;
    				img {
    					width: 15px;
    					height: 15px;
    				}
    			}
    		}
    	}
    }
    .btn {
    	height: 36px;
    	line-height: 36px;
    	border-radius: 18px;
    	text-align: center;
    	color: white;
    	background: #2400ff;
    	padding: 0 30px;
    }
    .footer {
    	position: fixed;
    	height: $footerH;
    	bottom: 0;
    	left: 0;
    	right: 0;
    	width: 100vw;
    	display: flex;
    	border-top: $border;
    	background: white;
    	.icon-wrapper {
    		width: 20%;
    		display: flex;
    		flex-direction: column;
    		align-items: center;
    		justify-content: space-between;
    		padding: 3px 0;
    		img {
    			width: 25px;
    			height: 25px;
    		}
    		span {
    			font-size: 10px;
    			color: #999;
    		}
    	}
    	.totalPrice {
    		width: 30%;
    		font-size: 14px;
    		color: $mainColor;
    		line-height: $footerH;
    	}
    	.oper {
    		width: 50%;
    		background: $mainColor;
    		text-align: center;
    		line-height: $footerH;
    		color: white;
    		font-size: 18px;
    	}
        .disabled {
            background: #bbb;
            pointer-events: none;
        }
    }
</style>

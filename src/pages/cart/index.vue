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
                    <!-- <div class="item">
                        <span class="label">平台</span>
                        <picker @change="e => {bindPickerChange(e,rec,idx)}" :value="rec.type" :range="platformList">
                            <w-button v-if="rec.type === -1" size="small" :clear="true" type="calm">选择平台</w-button>

                            <div v-else class="picker">
                                {{ platformList[rec.type] }}
                            </div>
                        </picker>
                    </div> -->

                    <div class="platform">
                        <span class="label">平台</span>
                        <div>
                            <radio-group class="radio-group" @change="e => {radioChange(e,rec,idx)}">
                                <label class="radio-wrapper" v-for="(r,index) in platformList" :key="index">
                                    <radio :value="r.value" class="radio" :disabled="r.disabled" :checked="false" />
                                    <span>{{r.title}}</span>
                                    <input type="text" v-if="r.value === 3" v-model="rec.platform_name" placeholder="请输入自定义平台">
                                </label>
                            </radio-group>
                        </div>
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
                        <!-- ****当超星可以正常使用时，采用本行代码并将下行代码注释**** <div v-if="rec.type != 3"> -->
                        <div v-if="rec.type == 1">           
                            <!-- <span v-if="receivers.length > 1" style="color: red;" @click="del(idx)">删除</span> -->
                        </div>
                        <div>
                            <!--  ****当超星可以正常使用时，采用本行代码并将下行代码注释****    <div v-if="rec.type != 3">     -->
                            <div v-if="rec.type != 1" class="input-wrapper">
                                <span>请选择门数&nbsp;&nbsp;</span>
                                <inputNumber :defaultValue="0" @change="({value}) => {handleSelect(new Array(value).fill('其他课程'),rec,idx)}"></inputNumber>
                            </div>
                            <div v-else class="btn" @click="query(rec,idx)">查询</div>
                        </div>
                        <div class="addReceiver" v-if="idx === receivers.length - 1" @click="add">
                            添加收货人
                            <img src="/static/img/plus.png" alt="">
                        </div>
                        <div v-else> </div>
                    </div>

                </div>

                <!--  ****当超星可以正常使用时，采用本行代码并将下行代码注释****     <lessonPicker v-if="rec.list.length && rec.type != 3" @select="arr => {handleSelect(arr,rec,idx)}" :list="rec.list"></lessonPicker>                -->
                <lessonPicker v-if="rec.list.length && rec.type == 1" @select="arr => {handleSelect(arr,rec,idx)}" :list="rec.list"></lessonPicker>

            </div>
        </div>
        <div class="footer">
            <div class="icon-wrapper" @click="showDialog = true">
                <img src="/static/img/message.png" alt="">
                <span>联系客服</span>
            </div>
            <div class="totalPrice">
                合计:￥{{totalPrice}}
            </div>

            <div class="oper" :class="{disabled: totalPrice === 0}" @click="pay">立即结算</div>
        </div>

        <cs-dialog :show="showDialog" @close="showDialog = false"></cs-dialog>
    </div>
</template>

<script>
import inputNumber from '@/components/input-number'
import lessonPicker from '@/components/lesson-picker'
import Dialog from '@/components/service-dialog'

export default {
    data() {
        return {
            showDialog: false,
            selectedList: [
                {
                    name: '课程名称',
                    price: 8,
                    count: 1,
                    img: '/static/img/share.png',
                    show: false
                }
            ],
            // totalPrice: 99,

            platformList: [
                { title: '智慧树/知到', value: 1 },
                { title: '超星/学习通/尔雅', value: 2 },
                { title: '其他：', value: 3 }
            ],
            receivers: [
                // {
                // 	type: '',
                // 	school_name: '西安财经学院行知学院',
                // 	phone_number: '13325465996',
                // 	pwd: 'fzh19971115',
                // 	list: [],
                // 	class_name: [],
                //  platform_name: ''
                // }
                {
                    type: '',
                    school_name: '',
                    phone_number: '',
                    pwd: '',
                    list: [],
                    class_name: [],
                    platform_name: ''
                }
            ],
            coupons: []
        }
    },
    computed: {
        totalPrice() {
            return (
                Math.round(
                    this.receivers.reduce(
                        (p, n) => p + n.class_name.length,
                        0
                    ) *
                        8 *
                        100
                ) / 100
            )
        }
    },
    methods: {
        bindPickerChange(e, rec, idx) {
            const type = e.mp.detail.value
            if (type === '其他') {
                return
            }
            this.receivers.splice(idx, 1, {
                ...rec,
                type
            })
        },
        radioChange(e, rec, idx) {
            const type = e.mp.detail.value
            this.receivers.splice(idx, 1, {
                ...rec,
                type,
                class_name: [],
                list: []
            })
            console.log(this.receivers)
        },
        del(idx) {
            const arr = [...this.receivers]
            console.log(arr)
            wx.showModal({
                title: '提示',
                content: '确定要删除该收货人吗？',
                success: ({ confirm, cancel }) => {
                    if (confirm) {
                        this.receivers = []
                        arr.splice(idx, 1)
                        this.receivers = arr
                        console.log(this.receivers)
                    }
                }
            })
        },
        add() {
            const arr = this.receivers
            const item = arr[arr.length - 1]

            if (item.type === '') {
                wx.showToast({
                    title: '请先选择平台',
                    icon: 'none'
                })
                return
            }
            // if ((item.type == 1 || item.type == 2) && item.list.length === 0) {    	  ****当超星可以正常使用时，采用本行代码并将下行代码注释****
            if (item.type == 1 && item.list.length === 0) {
                wx.showToast({
                    title: '请先查询',
                    icon: 'none'
                })
                return
            }
            if (item.type == 3 && item.platform_name.trim() === '') {
                wx.showToast({
                    title: '请输入平台名称',
                    icon: 'none'
                })
                return
            }
            this.receivers.push({
                type: '',
                school_name: '',
                phone_number: '',
                pwd: '',
                list: [],
                class_name: [],
                platform_name: ''
            })
        },
        query(rec, idx) {
            const { type, school_name, phone_number, pwd } = rec

            if ([school_name, phone_number, pwd, type].some(v => v === '')) {
                wx.showToast({
                    title: '请输入完整信息',
                    icon: 'none'
                })
                return
            }

            wx.showLoading({
                title: '正在查询',
                mask: true
            })

            this.fetch('get_class', {
                // type: type == 1 ? 1 : 3,  ****当超星可以正常使用时，采用本行代码并将下行代码注释****
                type: +type,
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
                this.coupons = res
            })
        },
        pay() {
            const { receivers, totalPrice, coupons } = this

            //当选择其他平台时，信息不能为空
            if (
                receivers.some(v => {
                    const {
                        type,
                        platform_name,
                        school_name,
                        phone_number,
                        pwd
                    } = v
                    // return type == 3 && [platform_name, school_name, phone_number, pwd].some(i => i.trim() === '')  ****当超星可以正常使用时，采用本行代码并将下行代码注释****
                    return (
                        type != 1 &&
                        [
                            type == 3 ? platform_name : '超星',
                            school_name,
                            phone_number,
                            pwd
                        ].some(i => i.trim() === '')
                    )
                })
            ) {
                wx.showToast({
                    title: '请输入完整信息',
                    icon: 'none'
                })
                return
            }
            const couponsKey = Object.entries(coupons)
                .filter(v => v[1] === 1)
                .map(v => v[0])
            let minus = 0
            let coupon = -1

            if (totalPrice >= 99) {
                if (couponsKey.includes('2')) {
                    minus = 8
                    coupon = 2
                } else if (couponsKey.includes('1')) {
                    minus = 3
                    coupon = 1
                } else if (couponsKey.includes('0')) {
                    minus = 1
                    coupon = 0
                }
            } else if (totalPrice >= 32) {
                if (couponsKey.includes('1')) {
                    minus = 3
                    coupon = 1
                } else if (couponsKey.includes('0')) {
                    minus = 1
                    coupon = 0
                }
            } else if (totalPrice >= 16) {
                if (couponsKey.includes('0')) {
                    minus = 1
                    coupon = 0
                }
            }
            const price = (totalPrice - minus) * 100

            // const price = 1
            const class_data_list = []
            receivers.forEach(v => {
                const {
                    type,
                    school_name,
                    phone_number,
                    pwd,
                    class_name = [],
                    platform_name
                } = v
                if (class_name.length) {
                    class_data_list.push({
                        // type,  ****当超星可以正常使用时，采用本行代码并将下行代码注释****
                        type: type == 1 ? 1 : 3,
                        platform_name:
                            type == 3
                                ? platform_name
                                : type == 2
                                    ? '超星/学习通/尔雅'
                                    : '',
                        phone_number,
                        pwd,
                        school_name,
                        class_name
                    })
                }
            })
            const params = {
                price,
                class_data_list
            }
            console.log(params, 'params')
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
                        if (coupon !== -1) {
                            this.fetch('set_coupon_sta', {
                                price: coupon,
                                state: 2
                            })
                        }
                        this.fetch('add_order', params)
                    },
                    fail: function({ errMsg }) {
                        wx.showToast({
                            title: errMsg.includes('cancel')
                                ? '您已取消支付'
                                : '支付失败',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            })
        }
    },

    onShow() {
        this.getCoupon()
    },
    components: {
        inputNumber,
        lessonPicker,
        'cs-dialog': Dialog
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
        .input-wrapper {
            display: flex;
            width: 180px;
            align-items: center;
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
.radio-group {
    display: flex;
    flex-direction: column;

    > .radio-wrapper {
        display: flex;
        margin-bottom: 5px;
        font-size: 14px;
        align-items: center;
        > .radio {
            height: 25px;
        }
        > span {
            margin: 0 5px;
        }
        > input {
            width: 200px;
        }
    }
}
.platform {
    display: flex;
    padding: 10px 0;
    > .label {
        width: 60px;
    }
}
</style>

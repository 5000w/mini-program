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
                            <inputNumber :defaultValue="li.count"></inputNumber>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="receiver">
                <div class="title">
                    <img src="/static/img/gift.png" alt="">
                    选择收货人
                </div>
                <div class="item">
                    <span class="label">平台</span>
                    <picker @change="bindPickerChange" :value="platform" :range="platformList">
                        <w-button v-if="platform === -1" size="small" :clear="true" type="calm">选择平台</w-button>

                        <div v-else class="picker">
                            {{ platformList[platform] }}
                        </div>
                    </picker>
                </div>
                <div class="item">
                    <span class="label">账号</span>
                    <input placeholder="请输入11位手机号" type="number" :maxlength="11">
                </div>
                <div class="item">
                    <span class="label">密码</span>
                    <input type="text" placeholder="请输入密码" :password="true">
                </div>

                <div class="submit">
                    <div></div>
                    <div>
                        <div class="btn">查询</div>
                    </div>
                    <div class="addReceiver">
                        添加收货人
                        <img src="/static/img/plus.png" alt="">
                    </div>
                </div>

                
            </div>

            <lessonPicker @select="handleSelect"></lessonPicker>
        </div>
        <div class="footer">
            <div class="icon-wrapper">
                <img src="/static/img/message.png" alt="">
                <span>联系卖家</span>
            </div>
            <div class="totalPrice">
                合计：￥{{totalPrice}}
            </div>

            <div class="oper">立即结算</div>
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
                    img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
                }
            ],
            totalPrice: 99,
            platform: -1,
            platformList: ['超星','智慧树','其他']
        }
    },

    methods: {
        bindPickerChange(e) {
            this.platform = e.mp.detail.value
        },
        handleSelect(arr) {
            console.log(arr)
        }
    },

    created() {
        // 调用应用实例的方法获取全局数据
        // this.getUserInfo()
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
        >li {
            border-top: $border;
            border-bottom: $border;
            width: 100vw;
            background: white;
            padding: 10px;
            box-sizing: border-box;
            display: flex;
            margin: 10px 0;
            >img {
                width: 80px;
                height: 80px;
                margin-right: 15px;
            }
            >div {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                flex: 1;
                >p {
                    font-size: 18px;
                    color: #333;
                    margin-bottom: 10px;
                }
                >div {
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
        >.title,>.item {
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
            >div {
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
        font-size: 16px;
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
}
</style>

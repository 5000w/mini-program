<template>
    <div class="container">
        <div class="main">
            <swiper :indicator-dots="true" :autoplay="true" :circular="true" class="swiper">
                <block v-for="(img,idx) in imgUrls" :key="idx">
                    <swiper-item>
                        <img :src="img" class="slide-image" />
                    </swiper-item>
                </block>
            </swiper>
            <div class="info">
                <p> {{ name }} </p>
                <div class="price">
                    ￥{{price}}
                    <small>库存{{ remain }} </small>
                </div>
            </div>
            <div class="getCoupon">
                领券
            </div>
            <div class="count">
                数量
                <inputNumber  :max="remain"></inputNumber>
            </div>
            <div class="detail">
                <h4>图文详情</h4>
                <div class="imgs">
                    <img v-for="(img,index) in details"  :src="img" :key="index" alt="" />
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="icon-wrapper">
                <img src="/static/img/message.png" alt="">
                <span>联系卖家</span>
            </div>
            <div class="icon-wrapper">
                <w-badge count="3">
                    <img src="/static/img/detail-cart.png" alt="">
                </w-badge>
                <span>去购物车</span>
            </div>

            <div class="oper">加入购物车</div>
        </div>

    </div>
</template>

<script>
import inputNumber from '@/components/input-number'
export default {
    data() {
        return {
            imgUrls: [
                'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
            ],
            name: '商品名称商品名称商品名称商品名称商品名称商品名称',
            price: 99,
            remain: 6,
            details: [
                'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
            ],
        }
    },

    methods: {},

    created() {
        // 调用应用实例的方法获取全局数据
        // this.getUserInfo()
    },
    components: {
        inputNumber
    }
}
</script>

<style scoped lang="scss">
$mainColor: #464fcc;
$footerH: 47px;
$border: 1px solid #ddd;
.container {
    * {
        box-sizing: border-box;
    }
}
.swiper {
    height: 300px;
}
.slide-image {
    width: 100vw;
    height: 100%;
}
.main {
    height: calc(100vh - #{$footerH});
    overflow: auto;
    .info {
        padding: 10px;
        border-bottom: $border;
        p {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
        }
        .price {
            color: red;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            small {
                color: #999;
                font-size: 12px;
            }
        }
    }
    .getCoupon,.count {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        height: 35px;
        font-size: 14px;
        color: #666;
        border-bottom: $border;
    }
    .detail {
        
        >h4 {
            font-size: 16px;
            color: #333;
            padding: 10px;
        }
        >.imgs {
            img {
                width: 100vw;
                // height: 150px;
                margin: 0;
            }
        }
    }
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
        width: 17%;
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
    .oper {
        width: 66%;
        background: $mainColor;
        text-align: center;
        line-height: $footerH;
        color: white;
        font-size: 18px;
    }
}
</style>

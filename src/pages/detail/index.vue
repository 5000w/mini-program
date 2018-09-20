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
        </div>

        <div class="footer">
            <div class="icon-wrapper">
                <img src="/static/img/message.png" alt="">
            </div>
            <div class="icon-wrapper">
                <w-badge count="99">
                    <img src="/static/img/detail-cart.png" alt="">
                </w-badge>
            </div>

            <div class="oper">加入购物车</div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrls: [
                'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
            ]
        }
    },

    methods: {},

    created() {
        // 调用应用实例的方法获取全局数据
        // this.getUserInfo()
    }
}
</script>

<style scoped lang="scss">
$mainColor: #464fcc;
$footerH: 47px;
.swiper {
    height: 300px;
}
.slide-image {
    width: 100vw;
    height: 100%;
}
.main {
    height: calc(100vh - $footerH);
}
.footer {
    position: fixed;
    height: $footerH;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    display: flex;
    .icon-wrapper {
        width: 17%;
        img {
            width: 100%;
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

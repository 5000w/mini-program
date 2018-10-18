<template>
    <div class="wrapper" v-if="show" @click="close">
        <div class="wrapper">
            <div>
                <img src="/static/img/qq-group.jpg" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>
<style lang="scss" scoped>
.wrapper {
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
        > img {
            width: 270px;
            height: 370px;
        }
    }
}
</style>






<template>
    <div class="card" @click.stop="handleClick">
        <img :src="src" alt="" >
        <div class="intr">
            <h4> {{ name }} </h4>
            <h5> ￥{{ price }} </h5>
        </div>
    </div>
</template>

<script>
    export default {
    	props: ['src','name','price','id'],
        methods: {
            handleClick() {
                this.$emit('click')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
    	width: 43vw;
        border-radius: 3px;
        box-shadow: 1px 1px 2px 0 rgba(0,0,0,.3);
        margin-bottom: 20px;
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        img {
            width: 100%;
            height: 160px;
        }
        .intr {
            color: black;
            background: white;
            width: 100%;
            text-align: center;
            height: 42px;
            >h4 {
                font-size: 12px;
            }
            >h5 {
                font-size: 14px;
                font-weight: bold;
            }
        }
    }
</style>

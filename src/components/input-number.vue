<template>
    <div class="wrapper" :class="{disabled}">
        <img class="minus" src="/static/img/minus.png" @click.stop="handleCount('minus')" alt="">
        {{count}}
        <img class="plus" src="/static/img/plus.png" @click.stop="handleCount('plus')" alt="">
    </div>
</template>
<script>
export default {
    data() {
        return {
            count: 0,
        }
    },
    props: {
        defaultValue: {
            type: [Number,String],
            default: 0
        },
        step: {
            type: [Number,String],
            default: 1
        },
        min: {
            type: [Number,String],
            default: 0
        },
        max: {
            type: [Number,String],
            default: Infinity
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.count = +this.defaultValue
    },
    methods: {
        handleCount(type) {
            const {count,step,min,max} = this
            const result = type === 'plus' ? count + step : count - step
            if(result < min || result > max) {
                return 
            }
            this.count = result
            this.$emit(type,result)
        }
    }
}
</script>
<style lang="scss" scoped>
.wrapper {
    width: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    .minus {
        width: 30px;
        height: 30px;
    }
    .plus {
        width: 18px;
        height: 18px;
        margin-left: 6px;
    }
}
.disabled {
    pointer-events: none;
}
</style>



<template>
    <div class="container" v-if="list.length">
        <div class="top" @click="selectAll">
            <img :src="isSelectAll ? checkedImg : uncheckedImg" alt="">全选
        </div>
        <ul class="items">
            <li v-for="(li,idx) in initList" :key="idx">
                <div @click="handleCheck(li,idx)">

                    <img :src="li.checked ? checkedImg : uncheckedImg" alt=""> {{li.name}}
                </div>
                <span>
                    当前进度:&nbsp;&nbsp;
                    <span>{{li.percent}}</span>
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
    	data() {
    		return {
    			uncheckedImg: '/static/img/unchecked.png',
    			checkedImg: '/static/img/checked.png',
    			initList: []
    		}
    	},
    	created() {
    		this.initList = this.list
    	},
    	computed: {
    		selected() {
    			return this.initList.filter(v => v.checked).map(v => v.id)
    		},
    		isSelectAll() {
    			return this.selected.length === this.list.length
    		}
    	},
    	props: {
    		list: {
    			type: Array,
    			default: [
    				{ name: '军事理论课', percent: '99%', id: 1 },
    				{ name: '军事理论课', percent: '9%', id: 2 },
    				{ name: '军事理论课', percent: '9%', id: 3 }
    			]
    		}
    	},
    	methods: {
    		selectAll() {
    			const { isSelectAll, list } = this
    			list.forEach(v => {
    				v.checked = !isSelectAll
    			})
    			this.initList = [...list]
    			this.$emit('select', this.selected)
    		},
    		handleCheck(li, idx) {
    			this.initList.splice(idx, 1, {
    				...li,
    				checked: !li.checked
    			})
    			this.$emit('select', this.selected)
    		}
    	}
    }
</script>
<style lang="scss" scoped>
    .container {
    	background: white;
    	box-sizing: border-box;
    	width: 100%;
    	font-size: 16px;
        padding: 15px 0;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    	img {
    		width: 20px;
    		height: 20px;
    	}
    	.top {
    		padding-left: 15px;
    		display: flex;
            margin-bottom: 10px;
            img {
                margin-right: 15px;
            }
    	}
    	.items {
    		padding-left: 40px;
            
    		> li {
    			display: flex;
    			justify-content: space-between;
    			align-items: center;
                margin-bottom: 10px;
    			> div {
    				display: flex;
    				align-items: center;
                    img {
                        margin-right: 5px;
                    }
    			}
    			> span {
    				width: 150px;
    				> span {
    					color: blue;
    				}
    			}
    		}
    	}
    }
</style>



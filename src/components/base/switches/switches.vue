<template>
    <div class="switches">
        <ul class="box">
            <li class="switch-item" v-for="(item,index) in switches"
                :class="{'active':defIndex===index}"
                @click="selectItem(index)">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script type='text/ecmascript-6'>
    export default{
        props:{
            switches:{
                type:Array,
                default:[]
            },
            defIndex:{
                type:Number,
                default:0
            }
        },
        methods:{
            selectItem(index){
                this.$emit('switch',index);
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    .switches{
        .box{
            width: 60%;
            border:1px solid #666;
            margin:auto;
            border-radius: 10px;
            display: flex;
            .switch-item{
                flex: 1;
                padding:10px;
                text-align: center;
                &.active{
                    background-color: #666;
                    color: #e0e0e0;
                }

            }
        }

    }
</style>
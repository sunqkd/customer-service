<template>
    <div class="top">
        <img @click="goBack()" class="backImg" src="/static/img/topnav_icon_back.png" alt="goback" v-if="backflag">
        <span class="homeIndex">Support</span>
        <img @click="homePage()" class="closeImg" src="/static/img/topnav_icon_close.png" alt="gohome" v-if="homeflag">
    </div>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        props:{
            backflag:{
                type:Boolean,
                default:false
            },
            homeflag:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            // 回退一步
            goBack(){
                this.$router.go(-1)
            },
            // 主页
            homePage(){
                this.$router.push('/')
            },
        }
    }
</script>
<style lang="scss" scoped>
    .top{
        width: 100%;
        height:0.45rem;
        padding:0 0.24rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content:center;
        background:#405a89;
        position: relative;
        .backImg{
            display: inline-block;
            position:absolute;
            left:0.24rem;
            width: 0.24rem;
            outline: none;
            height: auto;
        }
        .homeIndex{
            font-size:0.18rem;
            font-weight: bold;
            color:#ffffff;
        }
        .closeImg{
            position:absolute;
            right:0.24rem;
            display: inline-block;
            width: 0.17rem;
            outline: none;
            height: auto;
        }
    }
</style>
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
    // 竖屏模式
    @media screen and (orientation:portrait) {
        .top{
            height:0.45rem;
            padding:0 0.24rem;
            .backImg{
                width: 0.24rem;
                left:0.24rem;
            }
            .homeIndex{
                font-size:0.18rem;
            }
            .closeImg{
                width: 0.17rem;
                right:0.24rem;
            }
        }
    }
    // 横屏模式
    @media screen and (orientation:landscape) {
        .top{
            height:0.257rem;
            padding:0 0.137rem;
            .backImg{
                width: 0.137rem;
                left: 0.137rem;
            }
            .homeIndex{
                font-size:0.1028rem;
            }
            .closeImg{
                width: 0.097rem;
                right: 0.137rem;
            }
        }
    }
    .top{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content:center;
        background:#405a89;
        position: relative;
        .backImg{
            display: inline-block;
            position:absolute;
            outline: none;
            height: auto;
        }
        .homeIndex{
            font-weight: bold;
            color:#ffffff;
        }
        .closeImg{
            position:absolute;
            display: inline-block;
            outline: none;
            height: auto;
        }
    }
</style>
<template>
    <div class="loadingContain">
        <div class="loading">
            <van-loading color="#1989fa" size="40"/>
        </div>
    </div>
</template>
<script>
    import { Loading } from 'vant';
    export default {
        name: 'loading',
        data(){
            return{

            }
        },
        components:{
			[Loading.name]:Loading
		}
    }
</script>
<style lang="scss" scoped>
    .loadingContain{
        // 竖屏模式
        @media screen and (orientation:portrait) {
            .loading{
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top:0.4rem;
            }
        }
        // 横屏模式
        @media screen and (orientation:landscape){
            .loading{
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top:0.228rem;
            }
        }
    }
</style>
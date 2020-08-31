<template>
    <div class="top">
        <span @click="goBack()">回退</span>
        <span @click="homePage()">主页</span>
    </div>
</template>
<script>
    export default {
        data(){
            return{

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
<style scoped>
    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background:pink;
    }
</style>
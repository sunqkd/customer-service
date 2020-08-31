<template>
	<div>
		<van-button type="primary" @click="goFaq()">账号</van-button>
		<van-button type="primary" @click="goFaq()">充值</van-button>
		<van-button type="primary" @click="goFaq()">网络</van-button>
		<van-button type="primary" @click="goFaq()">bug</van-button>
		<van-button type="primary" @click="goFaq()">其他</van-button>
		<van-button type="primary" @click="goTicket()">ticket</van-button>
	</div>
</template>
<script>
	import { Button } from 'vant';
	import url from 'url'
	export default {
		name: 'index',
		data() {
			return {
				msg: '问题反馈类型'
			}
		},
		created(){
			console.log()
			var urllist = window.location.href
			console.log(url.parse(urllist,true))
		},
		methods:{
			goFaq(){ // 去faq界面
				this.$router.push('/faq')
			},
			goTicket(){ // 去票单页面
				/*
					处理页面				
				*/
				this.$router.push('/createTicket')
			}
		},
		components:{
			[Button.name]:Button
		}
	}
</script>
<style scoped>
	
</style>
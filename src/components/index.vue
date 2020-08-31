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
			var urllist = window.location.href
			console.log(url.parse(urllist,true))
			/*
				如果有参数拼接 则存储为session中
				如果没有参数拼接 session不做处理
			*/
		},
		methods:{
			goFaq(){ // 去faq界面
				this.$router.push('/faq')
			},
			goTicket(){ // 去票单页面
				/*
					处理逻辑
					当玩家存在多条票单，跳转票单列表  /ticketList	
					当玩家仅有一条票单，票单详情 /ticketDetail
					当玩家无票单：新建票单  /createTicket
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
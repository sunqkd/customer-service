<template>
	<div>
		<Top></Top>
		<b>票单列表</b>
		<ul>
			<li @click="goTicketDetail()">ticket</li>
			<li @click="goTicketDetail()">ticket</li>
			<li @click="goTicketDetail()">ticket</li>
			<li @click="goTicketDetail()">ticket</li>
			<li @click="goTicketDetail()">ticket</li>
			<li @click="goTicketDetail()">ticket</li>
		</ul>
		<div>
			<van-button type="danger">历史反馈</van-button>
			<van-button type="danger">联系客服</van-button>
		</div>
	</div>
</template>
<script>
	import { Button } from 'vant';
	import Top from '../assets/top'
	export default {
		name: 'ticketList',
		data() {
			return {
				msg: 'ticketList'
			}
		},
		methods:{
			goTicketDetail(){
				this.$router.push('/ticketDetail')
			}
		},
		components:{
			Top,
			[Button.name]:Button
		}
	}
</script>
<style scoped>
	
</style>
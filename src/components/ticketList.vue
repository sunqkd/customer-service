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
			Top
		}
	}
</script>
<style scoped>
	
</style>
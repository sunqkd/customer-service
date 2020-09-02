<template>
	<div>
		<Top></Top>
		<b>票单列表</b>
		<ul>
			<!-- 当前的反馈 -->
			<!-- 已回复2   -->
			<li v-for="(item,index) in repliedTicketList" :key="index + 'a'" @click="goTicketDetail(item.id)">{{item.id}} <br/></li>
			<!-- 显示待回复1 和 -->
			<li v-for="(item,index) in waitReplyTicketList" :key="index + 'b'" @click="goTicketDetail(item.id)">{{item.id}} <br/></li>
		</ul>
		<div>
			<van-button type="danger" @click="gohistory()">历史反馈</van-button>
			<van-button type="danger" @click="linkCustomer()">联系客服</van-button>
			<van-button type="danger" @click="getTicketList()">查询</van-button>
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
				repliedTicketList:[], // 已回复工单
				waitReplyTicketList:[], // 待回复
			}
		},
		created(){
			this.getRepliedTicketList()
			this.getwaitReplyTicketList()
		},
		methods:{
			// 查询已回复的工单
			getRepliedTicketList(){
				var data = {
					"accountId": "100", // 玩家ID
					// "createAt": "", // 工单创建时间
					// "name": "100name", // 玩家名字
					"page": 1, // 页码
					"pageSize": 100, // 每页创建数量
					"status": 2, // 工单状态 2表示已回复
					// "ticketNo": "", // 工单号
					// "type": 0 // 工单类型
				}
				this.$axios.post('/api/ticket/search',data).then((res)=>{
					if(res.data.code == 0){
						this.repliedTicketList = res.data.data
					}
				})
			},
			// 查询待回复的工单
			getwaitReplyTicketList(){
				var data = {
					"accountId": "100", // 玩家ID
					// "createAt": "", // 工单创建时间
					// "name": "100name", // 玩家名字
					"page": 1, // 页码
					"pageSize": 100, // 每页创建数量
					"status": 1, // 工单状态 1表示 待回复
					// "ticketNo": "", // 工单号
					// "type": 0 // 工单类型
				}
				this.$axios.post('/api/ticket/search',data).then((res)=>{
					if(res.data.code == 0){
						this.waitReplyTicketList = res.data.data
					}
				})
			},
			// 获取沟通
			goTicketDetail(id){
				this.$router.push(`/ticketDetail?ticketId=${id}`)
			},
			// 历史反馈
			gohistory(){
				this.$router.push(`/historyticketlist`)
			},
			// 联系客服
			linkCustomer(){
				this.$router.push(`/createTicket`)
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
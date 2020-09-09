<template>
	<div class="ticketList">
		<Top :backflag="true" :homeflag="true"></Top>
		<div class="ticketContain">
			<!-- 有数据 -->
			<div class="ticketList">

			</div>
			<!-- 无数据 -->
			<div class="noTickets">

			</div>
			<!-- 联系我们 -->
			<div class="ticketFooter">
				<span>History Feedback</span>
				<span class="contactUs">Contact us</span>
			</div>
		</div>

		<!-- <b>票单列表</b>
		<ul>
		
			<li v-for="(item,index) in repliedTicketList" :key="index + 'a'" @click="goTicketDetail(item.id)">{{item.id}} <br/></li>
		
			<li v-for="(item,index) in waitReplyTicketList" :key="index + 'b'" @click="goTicketDetail(item.id)">{{item.id}} <br/></li>
		</ul>
		<div>
			<van-button type="danger" @click="gohistory()">历史反馈</van-button>
			<van-button type="danger" @click="linkCustomer()">联系客服</van-button>
		</div> -->
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
<style lang="scss" scoped>
	.ticketList{
		width: 100%;
		height:100%;
		
		// 竖屏模式
		@media screen and (orientation:portrait) {

		}
		// 横屏模式
		@media screen and (orientation:landscape){
			.ticketContain{
				width:100%;
				padding:0.174rem 0.132rem 0.375rem 0.174rem;
				box-sizing: border-box;
				.ticketFooter{
					position: fixed;
					left: 0;
					bottom: 0;
					z-index: 1;
					width:100%;
					height:0.37rem;
					padding:0 0.137rem;
					border-top: 1px solid #d7d8d9;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 0.0857rem;
					color: #405a89;
					.contactUs{
						display: inline-flex;
						justify-content: center;
						align-items: center;
						box-sizing: border-box;
						width: 0.57rem;
						height: 0.2rem;
						border-radius: 0.0457rem;
						border: 2px solid #405a89;
					}
				}
			}
		}
	}
</style>
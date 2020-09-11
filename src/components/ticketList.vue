<template>
	<div class="ticketList">
		<Top :backflag="true" :homeflag="true"></Top>
		<div class="ticketContain">
			<div v-if="!loadingFlag">
				<!-- 有数据 -->
				<div class="ticketList" v-if="repliedTicketList.length > 0 || waitReplyTicketList.length > 0">
					<!-- 标题 -->
					<div class="ticketTitle">
						<span>Current Feedback</span>
						<span>Feedback Time</span>
					</div>
					<!-- 有新回复 -->
					<div class="ticketReplied" v-for="(item,index) in repliedTicketList" :key="index + 'a'"  @click="goTicketDetail(item.id)">
						<span>
							Ticket {{item.ticketNo}}
						</span>
						<span>
							{{ item.updateAt?$moment(item.updateAt).format('YYYY-MM-DD HH:mm:ss'):'--' }}
						</span>
						<span class="newReply">
							New Reply
						</span>
					</div>
					<!-- 待回复 -->
					<div class="ticketwait" v-for="(item,index) in waitReplyTicketList" :key="index + 'b'"  @click="goTicketDetail(item.id)">
						<span>
							Ticket {{item.ticketNo}}
						</span>
						<span>
							{{ item.updateAt?$moment(item.updateAt).format('YYYY-MM-DD HH:mm:ss'):'--' }}
						</span>
					</div>
				</div>
				<!-- 无数据 -->
				<div class="noTickets" v-if="repliedTicketList.length == 0 && waitReplyTicketList.length == 0">
					<img src="/static/img/blank_icon_feedback.png" alt="">
					<span>You can contact us for more help </span>
				</div>
			</div>
			<Loading v-if="loadingFlag"></Loading>
			<!-- 联系我们 -->
			<div class="ticketFooter">
				<span @click="gohistory()">History Feedback</span>
				<span class="contactUs" @click="linkCustomer()">Contact us</span>
			</div>
		</div>
	</div>
</template>
<script>
	import Top from '../assets/top'
	import Loading from '../assets/loading'
	export default {
		name: 'ticketList',
		data() {
			return {
				loadingFlag:false, // loading
				repliedTicketList:[], // 已回复工单
				waitReplyTicketList:[], // 待回复
			}
		},
		async created(){
			this.loadingFlag = true
			await this.getRepliedTicketList()
			await this.getwaitReplyTicketList()
			this.loadingFlag = false
		},
		methods:{
			// 查询已回复的工单
			async getRepliedTicketList(){
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
				await this.$axios.post('/api/ticket/search',data).then((res)=>{
					if(res.data.code == 0){
						this.repliedTicketList = res.data.data
					}else{
						this.repliedTicketList = []
					}
				}).catch((res)=>{
					console.log(res)
				})
			},
			// 查询待回复的工单
			async getwaitReplyTicketList(){
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
				await this.$axios.post('/api/ticket/search',data).then((res)=>{
					if(res.data.code == 0){
						this.waitReplyTicketList = res.data.data
					}else{
						this.waitReplyTicketList = []
					}
				}).catch((res)=>{
					console.log(res)
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
			Loading
		}
	}
</script>
<style lang="scss" scoped>
	.ticketList{
		width: 100%;
		height:100%;
		// 竖屏模式
		@media screen and (orientation:portrait) {
			.ticketContain{
				width:100%;
				padding:0.13rem 0.24rem 1rem 0.24rem;
				box-sizing: border-box;
				.ticketFooter{
					position: fixed;
					left: 0;
					bottom: 0;
					z-index: 1;
					width:100%;
					height:0.65rem;
					padding:0 0.24rem;
					border-top: 1px solid #d7d8d9;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 0.15rem;
					color: #405a89;
					background:#d9e7f1;
					.contactUs{
						display: inline-flex;
						justify-content: center;
						align-items: center;
						box-sizing: border-box;
						width: 1rem;
						height: 0.35rem;
						border-radius: 0.08rem;
						border: 2px solid #405a89;
					}
				}
				.noTickets{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 0.15rem;
					color: #b3c2dc;
					font-weight: bold;
					padding-top:0.27rem;
					box-sizing: border-box;
					img{
						margin-bottom:0.14rem;
						display: block;
						width:1.51rem;
						height:auto;
					}
				}
				.ticketList{
					width:100%;
					.ticketTitle{
						width:100%;
						height:0.46rem;
						display: flex;
						align-items: center;
						border-bottom:1px solid #b3c2dc;
						box-sizing: border-box;
						span{
							display: inline-block;
							color: #333333;
							font-size: 0.14rem;
							font-weight:bold;
							&:nth-child(1){
								width:50%
							}
							&:nth-child(2){
								width:30%
							}
						}
					}
					.ticketReplied{
						width:100%;
						height:0.55rem;
						display: flex;
						align-items: center;
						color: #405a89;
						span{
							font-size: 0.14rem;
							display: inline-block;
							font-weight: bold;
							&:nth-child(1){
								width:50%
							}
							&:nth-child(2){
								width:30%
							}
							&:nth-child(3){
								width:20%
							}
						}
						.newReply{
							color: #b3c2dc;
							text-align: right;
						}
					}
					.ticketwait{
						width:100%;
						height:0.55rem;
						display: flex;
						align-items: center;
						color: #333333;
						span{
							font-size: 0.14rem;
							display: inline-block;
							&:nth-child(1){
								width:50%
							}
							&:nth-child(2){
								width:30%
							}
						}
					}
				}
			}
		}
		// 横屏模式
		@media screen and (orientation:landscape){
			.ticketContain{
				width:100%;
				padding:0.074rem 0.132rem 0.5rem 0.174rem;
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
					background:#d9e7f1;
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
				.noTickets{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 0.0857rem;
					color: #b3c2dc;
					font-weight: bold;
					padding-top:0.154rem;
					box-sizing: border-box;
					img{
						margin-bottom:0.08rem;
						display: block;
						width:0.863rem;
						height:auto;
					}
				}
				.ticketList{
					width:100%;
					.ticketTitle{
						width:100%;
						height:0.269rem;
						display: flex;
						align-items: center;
						border-bottom:1px solid #b3c2dc;
						box-sizing: border-box;
						span{
							display: inline-block;
							color: #333333;
							font-size: 0.091rem;
							font-weight:bold;
							&:nth-child(1){
								width:45%
							}
							&:nth-child(2){
								width:35%
							}
						}
					}
					.ticketReplied{
						width:100%;
						height:0.269rem;
						display: flex;
						align-items: center;
						color: #405a89;
						span{
							font-size: 0.091rem;
							display: inline-block;
							font-weight: bold;
							&:nth-child(1){
								width:45%
							}
							&:nth-child(2){
								width:35%
							}
							&:nth-child(3){
								width:20%
							}
						}
						.newReply{
							color: #b3c2dc;
							text-align: right;
						}
					}
					.ticketwait{
						width:100%;
						height:0.269rem;
						display: flex;
						align-items: center;
						color: #333333;
						span{
							font-size: 0.091rem;
							display: inline-block;
							&:nth-child(1){
								width:45%
							}
							&:nth-child(2){
								width:35%
							}
						}
					}
				}
			}
		}
	}
</style>
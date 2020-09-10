<template>
	<div class="tickDetail">
		<Top :backflag="true" :homeflag="true"></Top>
		<div class="ticketdetailContain">
			<!-- 问题类型 -->
			<div class="detailTitle">
				<span>Question Type:  Others</span>
				<span>Email: 123456@ingcreations.com</span>
			</div>
			<!-- 聊天记录 -->
			<div class="chatOutContain">
				<div class="chatList" v-for="i in 5">
					<!-- 时间及人物 -->
					<div class="timeandHeros">
						<span class="hero">
							Me
						</span>
						<span class="serverTime">
							UTC 2020/08/01 12:34:56
						</span>
					</div>
					<!-- 详细内容 -->
					<div class="chatContent">
						<div class="chatText">
							1. Facebook registration: open Whoot!, go to the “Login” page and tap “Facebook Login”. Whoot! will then use your Facebook account information to create your account.<br/>
							2. Apple registration: open Whoot! Stamp, go to the “Login” page and tap “Apple Login”. Whoot! Stamp will then use your Apple account information to create your account.
						</div>
						<div class="chatImg">
							<div class="chatimgContain">
								<img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
							</div>
							<div class="chatimgContain">
								<img src="https://img.yzcdn.cn/vant/leaf.jpg" alt="">
							</div>
							<div class="chatimgContain">
								<img src="https://img.yzcdn.cn/vant/tree.jpg" alt="">
							</div>
							<div class="chatimgContain">
								<img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
							</div>
							<div class="chatimgContain">
								<img src="https://img.yzcdn.cn/vant/leaf.jpg" alt="">
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 回复消息输入框 -->
			<div>
				
			</div>
			<!-- footer -->
			<div class="replyMessage">
				<!-- 回复信息 -->
				<div class="replayAnswer" v-if="listFlag">
					<span class="cancelBtn"  @click="cancelReply()">Cancel</span>
					<span class="sendBtn" @click="sendreply()">Send</span>
				</div>
				<!-- 评分打星星 -->
				<div class="replayStar" v-if="!listFlag">
					<span class="problemBtn" @click="showScore()">problem solved</span>
					<span class="replyBtn"  @click="reply()">Reply message</span>
				</div>
			</div>
		</div>
		<!-- 评分 弹出层-->
		<van-overlay :show="startFlag">
			<div class="starOut">
				<div class="starContain">
					<div class="starValue">
						<van-rate v-model="startValue" :size="40" color="#d81e06" void-icon="star" void-color="#d7d8d9"/>
					</div>
					<div class="starText">
						<span>Your feedback is very important,</span>
						<span>please rate this service</span>
					</div>
					<div class="startBtn">
						<span @click="cancelScore()">Cancel</span>
						<span class="submitBtn" @click="submitScore()">Submit</span>
					</div>
				</div>
			</div>
		</van-overlay>



		<div style="display:none">
		<hr/>
		<b>票单详情</b>
		<pre>{{form}}</pre>
		<ul>
			<li v-for="(item,index) in recodeList" :key="index">
				{{item.createAt}}<br/>
				{{item.content}}
				<br/>
				<img  :src="item.image" style="width:50px;height:50px;"/>
				<hr/>
			</li>
		</ul>
		<!-- 显示发送框-->
		<div v-if="listFlag">
			<span>回复消息</span>
			<input type="text" v-model="form.content">
			<!-- 上传图片 -->
			<div>
				<van-uploader :after-read="afterRead" v-model="fileList" multiple/>
			</div>
			<div>
				<van-button type="info" @click="cancelReply()">取消回复</van-button>
				<van-button type="info" @click="sendreply()">发送</van-button>
			</div>
		</div>
		<!-- 隐藏发送框 -->
		<div v-if="!listFlag">
			<van-button type="danger" @click="updateResolve()">问题已解决</van-button>
			<van-button type="danger" @click="reply()">回复信息</van-button>
		</div></div>
	</div>
</template>
<script>
	import { Button,Uploader,Toast, Overlay, Rate} from 'vant';
	import url from 'url'
	import Top from '../assets/top'
	export default {
		name: 'ticketDetail',
		data() {
			return {
				ticketId:'', // 票单id
				form:{
					content:'', // 回复内容
					image:'', // 添加的图片
				},
				fileList:[
					{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }
				],
				listFlag:false, // 是否显示发送输入框
				recodeList:[], // 工单记录
				startFlag: false, // 评分弹出层
				startValue:0,
			}
		},
		created(){
			// var urllist = window.location.href
			// this.ticketId = url.parse(urllist,true).query.ticketId
			// this.getRecodeList()
		},
		methods:{
			// 显示评分
			showScore(){
				this.startFlag = true
			},
			// 取消评分
			cancelScore(){
				this.startFlag = false
			},
			// 提交评分  问题已解决
			submitScore(){
				this.startFlag = false;
				// this.updateResolve();
			},
			// 查询工单沟通记录
			getRecodeList(){
				let data = {
					ticketId:this.ticketId
				}
				this.$axios.post('/api/ticket/record/all',data).then((res)=>{
					if(res.data.code == 0){
						this.recodeList = res.data.data
					}else{

					}
				})
			},
			// 上传图片
			afterRead(file){
				console.log(file)
			},
			// 回复信息
			reply(){
				this.listFlag = true
			},
			// 取消回复 
			cancelReply(){
				this.listFlag = false
			},
			// 回复信息发送
			sendreply(){
				var data = {
					content:this.form.content,
					image:'https://img.yzcdn.cn/vant/leaf.jpg',
					ticketId:this.ticketId,
					type:1
				}
				this.$axios.post('/api/ticket/record/create',data).then((res)=>{
					console.log(res)
					Toast.success('success');
					this.getRecodeList()
				}).catch((error)=>{
					
				})
			},
			// 问题已解决
			updateResolve(){
				let data = {
					status:3, // 3 表示已解决
					ticketId:this.ticketId
				}
				this.$axios.post('/api/ticket/update',data).then((res)=>{
					console.log(res)
					Toast.success('success');
				})
			}
		},
		components:{
			Top,
			[Button.name]:Button,
			[Toast.name]:Toast,
			[Uploader.name]:Uploader,
			[Overlay.name]:Overlay,
			[Rate.name]:Rate
		}
	}
</script>
<style lang="scss" scoped>
	.tickDetail{
		width:100%;
		height:100%;
		// 竖屏模式
		@media screen and (orientation:portrait){

		}
		// 横屏模式
		@media screen and (orientation:landscape){
			.ticketdetailContain{
				width:100%;
				.detailTitle{
					width: 100%;
					height: 0.366rem;
					padding:0 0.137rem;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 0.0857rem;
					color: #405a89;
				}
				.chatOutContain{
					width: 100%;
					box-sizing: border-box;
					padding-bottom: 0.5rem;
					.chatList{
						width:100%;
						.timeandHeros{
							width: 100%;
							height: 0.228rem;
							padding:0 0.137rem;
							box-sizing: border-box;
							background-color: #b3c2dc;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.hero{
								font-size: 0.091rem;
								font-weight: bold;
								color: #333333;
							}
							.serverTime{
								font-size: 0.0857rem;
								color: #333333;
							}
						}
						.chatContent{
							width: 100%;
							padding: 0.11rem 0.151rem 0.137rem 0.151rem;
							box-sizing: border-box;
							.chatText{
								width: 100%;
								margin-bottom: 0.074rem;
								color: #333333;
								font-size: 0.0685rem;
								line-height: 0.11rem;
							}
							.chatImg{
								display: flex;
								align-items: center;
								flex-wrap: wrap;
								.chatimgContain{
									width:0.611rem;
									height:0.611rem;
									display: flex;
									align-items: center;
									justify-content: center;
									box-sizing: border-box;
									background-color: #ffffff;
									border-radius: 0.0457rem;
									border: solid 2px #000000;
									overflow: hidden;
									margin-right: 0.05rem;
									margin-bottom: 0.05rem;
								}
								img{
									display: block;
									width:0.611rem;
									height:auto;
								}
							}
						}
					}
				}
				.replyMessage{
					width: 100%;
					border-top: 1px solid #d7d8d9;
					height: 0.37rem;
		            position: fixed;
					left: 0;
					bottom: 0;
					background:#d9e7f1;
					font-size: 0.0857rem;
					.replayStar{
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						span{
							display: inline-flex;
							align-items: center;
							height: 0.2rem;
							padding:0 0.0657rem;
							border: 2px solid #405a89;
							box-sizing: border-box;
							border-radius: 0.034rem;
							&.problemBtn{
								color: #405a89;
								margin-right:0.297rem;
							}
							&.replyBtn{
								background-color: #405a89;
								color: #ffffff;
							}
						}
					}
					.replayAnswer{
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 0.134rem;
						box-sizing: border-box;
						span{
							display: inline-flex;
							align-items: center;
							&.cancelBtn{
								color: #405a89;
							}
							&.sendBtn{
								height: 0.2rem;
								padding:0 0.0657rem;
								border: 2px solid #405a89;
								box-sizing: border-box;
								border-radius: 0.034rem;
								background-color: #405a89;
								color: #ffffff;
							}
						}
					}
				}
			}
			.starOut{
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				width: 100%;
				.starContain{
					width: 1.657rem;
					height: 0.95rem;
					background-color: #ffffff;
					border-radius: 0.0457rem;
					padding-top:0.1rem;
					box-sizing: border-box;
					.starValue{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 0.183rem;
						margin-bottom: 0.0914rem;
					}
					.starText{
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						font-size: 0.074rem;
						color: #333333;
						line-height:0.102rem;
						margin-bottom: 0.0857rem;
					}
					.startBtn{
						width: 100%;
						padding:0 0.1457rem;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 0.0875rem;
						span{
							font-size: 0.0857rem;
							color: #405a89;
							&.submitBtn{
								display: inline-flex;
								align-items: center;
								height:0.2rem;
								padding:0 0.1514rem;
								color: #ffffff;
								background-color: #405a89;
								border-radius: 0.0457rem;
							}
						}
					}
				}
			}
		}
	}
</style>
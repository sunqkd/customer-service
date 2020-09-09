<template>
	<div class="tickDetail">
		<Top :backflag="true" :homeflag="true"></Top>
		<div class="ticketdetailContain">
			<div class="detailTitle">
				<span>Question Type:  Others</span>
				<span>Email: 123456@ingcreations.com</span>
			</div>
			<!-- 聊天记录 -->
			<div class="chatList">
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
				<div class="">
					
				</div>
			</div>
		</div>



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
	import { Button,Uploader,Toast } from 'vant';
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
			}
		},
		created(){
			// var urllist = window.location.href
			// this.ticketId = url.parse(urllist,true).query.ticketId
			// this.getRecodeList()
		},
		methods:{
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
			[Uploader.name]:Uploader
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

				}
			}
		}
	}
</style>
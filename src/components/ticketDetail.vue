<template>
	<div class="tickDetail">
		<Top :backflag="true" :homeflag="true" :routego="'xxxx'"></Top>
		<div class="ticketdetailContain">
			<!-- 问题类型 -->
			<div class="detailTitle">
				<span>Question Type:  {{typeArr[type].label}}</span>
				<span>Email: {{this.email}}</span>
			</div>
			<!-- 聊天记录 -->
			<div class="chatOutContain">
				<div class="chatList" v-for="(item,index) in recodeList" :key="index">
					<!-- 时间及人物 -->
					<div class="timeandHeros">
						<span class="hero">
							{{item.type == 1?`REPLY FROM ${item.operatorName}`:'Me'}}
						</span>
						<span class="serverTime">
							UTC {{ item.createAt?$moment(item.createAt).format('YYYY-MM-DD HH:mm:ss'):'--' }}
						</span>
					</div>
					<!-- 详细内容 -->
					<div class="chatContent">
						<div class="chatText" v-html="item.content"  style="white-space:pre-line">
							
						</div>
						<div class="chatImg" v-if="item.image.length > 0">
							<div class="chatimgContain" v-for="(lit,litindex) in item.image.split(',')" :key="litindex">
								<img :src="lit" alt="" @click="sceneImg(item.image.split(','),litindex)">
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 回复消息输入框 -->
			<div class="inputFiled" v-if="listFlag">
				<div class="filedTitle">
					Reply Message
				</div>
				<div class="filedContent">
					<div class="vantFiledOut">
						<van-field
							required
							class="filedText"
							v-model="form.content"
							rows="4"
							autosize
							type="textarea"
							maxlength="400"
							placeholder="I can’t find..."
							show-word-limit
							@keyup.native="testFiled()"
						/>
					</div>
					<div class="uploadImgContain">
						<!-- 图片列表 -->
						<div class="imgWaiting" v-for="(item,index) in form.image" :key="index">
							<img :src="item" alt="" class="uploadImgItem" @click="sceneImg(form.image,index)">
							<img src="/static/img/form_pic_icon_close.png" alt="" class="delectUpload" @click="delectFormImg(index)">
						</div>
						<!-- 上传按钮 -->
						<van-uploader :after-read="afterRead" multiple class="upbtncontain" v-if="form.image.length < 5">
							<div v-if="uploadImgFlag" class="uploading">
								<van-loading type="spinner" color="#1989fa"/>
							</div>
							<div v-if="!uploadImgFlag" class="upbtn"></div>
						</van-uploader>
					</div>
				</div>
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
					<span class="problemBtn" @click="showScore()">Problem solved</span>
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
	</div>
</template>
<script>
	import { Uploader,Toast, Overlay, Rate, Field , Loading, ImagePreview } from 'vant';
	import url from 'url'
	import Top from '../assets/top'
	import lrz from 'lrz';
	export default {
		name: 'ticketDetail',
		data() {
			return {
				ticketId:'', // 票单id
				email:'', // 邮箱
				type: 0, // 问题类型
				typeArr:[
					{
						label:'Choose a type',
						value:0
					},{
						label:'Account',
						value:1
					},{
						label:'Recharge',
						value:2
					},{
						label:'Network',
						value:3
					},{
						label:'Bug',
						value:4
					},{
						label:'Others',
						value:5
					}
				],
				form:{
					content:'', // 回复内容
					image:[], // 添加的图片
				},
				uploadImgFlag:false, // 上传loading
				listFlag:false, // 是否显示发送输入框
				recodeList:[], // 工单记录
				startFlag: false, // 评分弹出层
				startValue:0,
			}
		},
		created(){
			var urllist = window.location.href
			this.ticketId = url.parse(urllist,true).query.ticketId
			this.email = url.parse(urllist,true).query.email
			this.type = url.parse(urllist,true).query.type
			this.getRecodeList()
		},
		methods:{
			// 开头不能输入空格
			testFiled(){
				this.form.content = this.form.content.replace(/(^[\s|　]*)/g,"");
			},
			// 预览图片
			sceneImg(images,index) {
				ImagePreview({
					images:images, //需要预览的图片 URL 数组
					showIndex:true, //是否显示页码
					loop:false, //是否开启循环播放
					startPosition:index //图片预览起始位置索引
				})
			},
			// 删除上传图片
			delectFormImg(index){
				this.form.image.splice(index, 1)
			},
			// 上传图片回调函数
			afterRead(fileImg){
				this.uploadImgFlag = true; // 上传loading
				var fd = new FormData();
				// 压缩图片在上传
				lrz(fileImg.file,{ quality: 0.6 }).then((rst)=>{
					fd.append('file',rst.file,fileImg.file.name)
					var config = {
						headers: {
							'Content-Type': 'multipart/form-data;boundary'
						}
					}
					this.$axios.post('/api/file/gcs?bucket=ticket_images',fd,config).then((res)=>{
						if(res.data.code == 0){
							Toast.success('Upload successful');
							this.form.image.push(res.data.data);
						}else{
							Toast.fail(res.data.message);
						}
						this.uploadImgFlag = false
					})
				}).catch((error)=>{
					console.log(error)
				})
			},
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
				this.updateResolve();
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
						this.recodeList = []
					}
				}).catch((res)=>{
					console.log(res)
				})
			},
			// 回复信息
			reply(){
				this.listFlag = true;
				setTimeout(()=>{
					var t = this.documentHeight()
					window.scroll({top:t,left:0,behavior:'smooth' })
				},0)
			},
			//获取页面文档的总高度
			documentHeight(){
				//现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
				return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
			},
			// 取消回复 
			cancelReply(){
				this.listFlag = false
			},
			// 创建回复信息发送
			sendreply(){
				// 校验输入框 是否填写
				if(this.form.content.length == 0){
					Toast.fail('Please fill in the question content')
				}else{
					var data = {
						content:this.form.content,
						image:this.form.image.join(','),
						ticketId:this.ticketId,
						type:2
					}
					this.$axios.post('/api/ticket/record/create',data).then((res)=>{
						if(res.data.code == 0){
							Toast.success('success');
							this.getRecodeList()
						}else{
							Toast.fail(res.data.message);
						}
					}).catch((error)=>{
						console.log(error)
					})					
				}
			},
			// 问题已解决
			updateResolve(){
				let data = {
					status:3, // 3 表示已解决
					ticketId:this.ticketId
				}
				this.$axios.post('/api/ticket/update',data).then((res)=>{
					if(res.data.code == 0){
						Toast.success('Thank you for your feedback');
						this.$router.push('/ticketList')
					}else{
						Toast.fail(res.data.message);
					}
				})
			}
		},
		components:{
			Top,
			[Toast.name]:Toast,
			[Uploader.name]:Uploader,
			[Overlay.name]:Overlay,
			[Rate.name]:Rate,
			[Field.name]:Field,
			[Loading.name]:Loading,
			[ImagePreview.name]:ImagePreview
		}
	}
</script>
<style lang="scss" scoped>
	.tickDetail{
		width:100%;
		height:100%;
		// 竖屏模式
		@media screen and (orientation:portrait){
			.ticketdetailContain{
				width:100%;
				padding-bottom: 0.5rem;
				.detailTitle{
					width: 100%;
					height: 0.64rem;
					padding:0 0.235rem;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 0.15rem;
					color: #405a89;
				}
				.chatOutContain{
					width: 100%;
					box-sizing: border-box;
					.chatList{
						width:100%;
						.timeandHeros{
							width: 100%;
							height: 0.4rem;
							padding:0 0.24rem;
							box-sizing: border-box;
							background-color: #b3c2dc;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.hero{
								font-size: 0.14rem;
								font-weight: bold;
								color: #333333;
							}
							.serverTime{
								font-size: 0.14rem;
								color: #333333;
							}
						}
						.chatContent{
							width: 100%;
							padding: 0.185rem 0.265rem 0.24rem 0.265rem;
							box-sizing: border-box;
							.chatText{
								width: 100%;
								margin-bottom: 0.15rem;
								color: #333333;
								font-size: 0.12rem;
								line-height: 0.2rem;
							}
							.chatImg{
								display: flex;
								align-items: center;
								flex-wrap: wrap;
								.chatimgContain{
									width:1.02rem;
									height:1.02rem;
									display: flex;
									align-items: center;
									justify-content: center;
									box-sizing: border-box;
									background-color: #ffffff;
									border-radius: 0.08rem;
									border:2px solid #000000;
									overflow: hidden;
									margin-right: 0.05rem;
									margin-bottom: 0.05rem;
								}
								img{
									display: block;
									width:1.02rem;
									height:auto;
								}
							}
						}
					}
				}
				.replyMessage{
					width: 100%;
					border-top: 1px solid #d7d8d9;
					height: 0.65rem;
		            position: fixed;
					left: 0;
					bottom: 0;
					background:#d9e7f1;
					font-size: 0.15rem;
					.replayStar{
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						span{
							display: inline-flex;
							align-items: center;
							height: 0.35rem;
							padding:0 0.11rem;
							border: 2px solid #405a89;
							box-sizing: border-box;
							border-radius: 0.08rem;
							&.problemBtn{
								color: #405a89;
								margin-right:0.52rem;
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
						padding: 0 0.235rem;
						box-sizing: border-box;
						span{
							display: inline-flex;
							align-items: center;
							&.cancelBtn{
								color: #405a89;
							}
							&.sendBtn{
								height: 0.35rem;
								padding:0 0.33rem;
								border: 2px solid #405a89;
								box-sizing: border-box;
								border-radius: 0.08rem;
								background-color: #405a89;
								color: #ffffff;
							}
						}
					}
				}
				.inputFiled{
					width: 100%;
					.filedTitle{
						width: 100%;
						height: 0.4rem;
						padding: 0 0.26rem;
						box-sizing: border-box;
						background-color: #b3c2dc;
						display: flex;
						align-items: center;
						font-size: 0.16rem;
						font-weight: bold;
						color: #333333;
					}
					.filedContent{
						width: 100%;
						padding:0.23rem;
						box-sizing: border-box;
						.vantFiledOut{
							width:100%;
							margin-bottom: 0.15rem;
							.filedText{
								border-radius: 0.08rem;
								border: 2px solid  #000000;
								font-size: 0.16rem;
								color: #333333;
							}
						}
						.uploadImgContain{
							width: 100%;
							display: flex;
							flex-wrap: wrap;
							.imgWaiting{
								width:0.95rem;
								height:0.95rem;
								margin-bottom: 0.1rem;
								margin-right:0.1rem;
								background-color: #ffffff;
								border-radius: 0.08rem;
								border: 2px solid #000000;
								display: inline-flex;
								align-items: center;
								justify-content: center;
								position:relative;
								.uploadImgItem{
									display: block;
									width: 100%;
									border-radius: 0.08rem;
									height:100%;
								}
								.delectUpload{
									display: block;
									width:0.25rem;
									height:0.25rem;
									position:absolute;
									top:-0.1rem;
									right:-0.1rem;
								}
							}
							.upbtncontain{
								width:0.95rem;
								height:0.95rem;
								background-color: #ffffff;
								border-radius: 0.08rem;
								border: 2px solid #000000;
								.uploading{
									width: 0.95rem;
									height: 0.95rem;
									border-radius: 0.08rem;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.upbtn{
									width: 0.95rem;
									height: 0.95rem;
									border-radius: 0.08rem;
									background: url('/static/img/form_pic_icon_add.png') no-repeat scroll center center transparent;
									background-size: 0.60rem 0.42rem;
								}
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
					width: 2.9rem;
					background-color: #ffffff;
					border-radius: 0.08rem;
					padding:0.19rem 0;
					box-sizing: border-box;
					.starValue{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 0.32rem;
						margin-bottom: 0.16rem;
					}
					.starText{
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						font-size: 0.13rem;
						color: #333333;
						line-height:0.18rem;
						margin-bottom: 0.15rem;
					}
					.startBtn{
						width: 100%;
						padding:0 0.255rem;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 0.15rem;
						span{
							color: #405a89;
							&.submitBtn{
								display: inline-flex;
								align-items: center;
								height:0.35rem;
								padding:0 0.265rem;
								color: #ffffff;
								background-color: #405a89;
								border-radius: 0.08rem;
							}
						}
					}
				}
			}
		}
		// 横屏模式
		@media screen and (orientation:landscape){
			.ticketdetailContain{
				width:100%;
				padding-bottom: 0.5rem;
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
									border: 2px solid #000000;
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
								padding:0 0.1886rem;
								border: 2px solid #405a89;
								box-sizing: border-box;
								border-radius: 0.034rem;
								background-color: #405a89;
								color: #ffffff;
							}
						}
					}
				}
				.inputFiled{
					width: 100%;
					.filedTitle{
						width: 100%;
						height: 0.228rem;
						padding: 0 0.137rem;
						box-sizing: border-box;
						background-color: #b3c2dc;
						display: flex;
						align-items: center;
						font-size: 0.091rem;
						font-weight: bold;
						color: #333333;
					}
					.filedContent{
						width: 100%;
						padding:0.1314rem;
						box-sizing: border-box;
						.vantFiledOut{
							width:100%;
							margin-bottom: 0.0857rem;
							.filedText{
								border-radius: 0.0457rem;
								border: 2px solid  #000000;
								font-size: 0.091rem;
								color: #333333;
							}
						}
						.uploadImgContain{
							width: 100%;
							display: flex;
							flex-wrap: wrap;
							.imgWaiting{
								width:0.61rem;
								height:0.61rem;
								margin-bottom: 0.1rem;
								margin-right:0.06rem;
								background-color: #ffffff;
								border-radius: 0.0457rem;
								border: 2px solid #000000;
								display: inline-flex;
								align-items: center;
								justify-content: center;
								position:relative;
								.uploadImgItem{
									display: block;
									width: 100%;
									border-radius: 0.0457rem;
									height:100%;
								}
								.delectUpload{
									display: block;
									width:0.17rem;
									height:0.17rem;
									position:absolute;
									top:-0.06rem;
									right:-0.06rem;
								}
							}
							.upbtncontain{
								width:0.61rem;
								height:0.61rem;
								background-color: #ffffff;
								border-radius: 0.0457rem;
								border: 2px solid #000000;
								.uploading{
									width: 0.61rem;
									height: 0.61rem;
									border-radius: 0.0457rem;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.upbtn{
									width: 0.61rem;
									height: 0.61rem;
									border-radius: 0.0457rem;
									background: url('/static/img/form_pic_icon_add.png') no-repeat scroll center center transparent;
									background-size: 0.35rem 0.24rem;
								}
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
					background-color: #ffffff;
					border-radius: 0.0457rem;
					padding:0.1rem 0;
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
<template>
	<div class="createTicket">
		<Top :backflag="true" :homeflag="true" :routego="'/ticketList'"></Top>
		<div class="createContain">
			<!-- title -->
			<div class="createTitle">
				<img src="/static/img/blank_icon_feedback.png" alt="">
				<span>Contact us</span>
			</div>
			<!-- email -->
			<div class="createMail">
				<span>Email (optional)</span>
				<input type="text" v-model="form.email" placeholder="mail@ingcreations.com">
			</div>
			<!-- question type -->
			<div class="questionType">
				<span>Question Type</span>
				<select v-model="form.type">
					<option :value="item.value" v-for="(item,index) in typeList" :key="index">{{item.label}}</option>
				</select>
			</div>
			<!-- question content -->
			<div class="questionContent">
				<span>Question Content</span>
				<van-field
					required
				    class="questionFiled"
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
			<!-- 上传图片 -->
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
			<!-- 发送按钮 -->
			<div class="sendContain">
				<div @click="send()">
					Send
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Uploader, Toast ,Loading, Field, ImagePreview } from 'vant';
	import lrz from 'lrz';
	import Top from '../assets/top'
	export default {
		name: 'createTicket',
		data() {
			return {
				form:{
					email:'', // 邮箱
					type:0, // 问题类型  默认为请选择
					content:'', // 问题内容
					image:[] // 问题图片
				},
				uploadImgFlag:false, // 上传按钮和loading
				// 问题类型数组
				typeList:[ 
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
				]
			}
		},
		created(){
			
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
					this.$axios.post('/file/gcs?bucket=ticket_images',fd,config).then((res)=>{
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

			send(){ // 发送
				// console.log(this.form)
				// 校验邮箱
				// 问题类型必填
				// 信息内容必填
				var re = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
				if(re.test(this.form.email)){ // 邮箱正确
					if(this.form.type == 0){ // 问题类型必选
						Toast.fail('Please choice question type')
					}else{
						if(this.form.content.length == 0){
							Toast.fail('Please fill in the question content')
						}else{
							this.createTicket()
						}
					}
				}else{ // 邮箱错误
					console.log('邮箱错误')
					Toast.fail('Please check the email format!')
				}
			},

			// 创建工单
			createTicket(){
			    let data = {
					"content": this.form.content, // 问题内容  ***
					"device": sessionStorage.getItem('device'), // 设备信息
					"email": this.form.email, // 邮件  ***
					"image": this.form.image.join(','), // 图片  ***
					"nation": sessionStorage.getItem('nation'), // 国家
					"os": sessionStorage.getItem('os'), // 操作系统
					"playerId": sessionStorage.getItem('playerId'), // 玩家ID
					"playerName": sessionStorage.getItem('playerName'), // 玩家名称
					"remainGem": sessionStorage.getItem('remainGem'), // 剩余钻石
					"type": this.form.type, // 工单类型  ***
					"version": sessionStorage.getItem('version') // 客户端版本
				}
				this.$axios.post('/ticket/create',data).then((res)=>{
					if(res.data.code == 0){
						this.sendreply(res.data.data.id)
						Toast.success('Creating a successful');
						this.$router.push('/ticketList')
					}else{
						Toast.fail(res.data.message);
					}
				}).catch((error)=>{
					console.log(error)
				})
			},
			// 创建工单的同时添加一条沟通记录玩家 发起
			sendreply(ticketId){
				var data = {
					content:this.form.content,
					image:this.form.image.join(','),
					ticketId:ticketId,
					type:2
				}
				this.$axios.post('/ticket/record/create',data).then((res)=>{
					if(res.data.code == 0){
						console.log("玩家创建首条沟通记录成功")
					}else{
						Toast.fail(res.data.message);
					}
				}).catch((error)=>{
					console.log(error)
				})					
			},

			delectFormImg(index){ // 删除图片
				this.form.image.splice(index, 1)
			}
		},
		components:{
			Top,
			[Uploader.name]:Uploader,
			[Toast.name]:Toast,
			[Loading.name]:Loading,
			[Field.name]:Field,
			[ImagePreview.name]:ImagePreview
		}
	}
</script>
<style lang="scss" scoped>
	.createTicket{
		width:100%;
		height:100%;
		// 竖屏模式
		@media screen and (orientation:portrait){
			.createContain{
				width: 100%;
				padding:0.225rem;
				box-sizing: border-box;
				.createTitle{
					width:100%;
					display: flex;
					align-items: center;
					margin-bottom:0.265rem;
					font-weight: bold;
					font-size: 0.26rem;
					color: #b3c2dc;
					img{
						margin-right:0.095rem;
						display: block;
						width:0.35rem;
						height:auto;
					}
				}
				.createMail{
					display: flex;
					flex-direction: column;
					margin-bottom: 0.265rem;
					span{
						font-size: 0.16rem;
						color: #333333;
						font-weight: bold;
						margin-bottom: 0.07rem;
					}
					input{
						text-indent:0.215rem;
						height: 0.45rem;
						background-color: #ffffff;
						border-radius: 0.08rem;
						border: 2px solid  #000000;
						font-size:0.16rem;
						color: #333333;
						&::-webkit-input-placeholder { /* WebKit, Blink, Edge */
							color: #c3c3c3;
							font-size:0.16rem;
						}
						&:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
							color: #c3c3c3;
							font-size:0.16rem;
						}
						&::-moz-placeholder { /* Mozilla Firefox 19+ */
							color: #c3c3c3;
							font-size:0.16rem;
						}
						&:-ms-input-placeholder { /* Internet Explorer 10-11 */
							color: #c3c3c3;
							font-size:0.16rem;
						}
					}
				}
				.questionType{
					display: flex;
					flex-direction: column;
					margin-bottom: 0.265rem;
					span{
						font-size: 0.16rem;
						color: #333333;
						font-weight: bold;
						margin-bottom: 0.07rem;
					}
					select{
						outline: none;
						width:100%;
						box-sizing: border-box;
						padding-left: 0.195rem;
						height: 0.45rem;
						border-radius: 0.08rem;
						border: 2px solid  #000000;
						font-size: 0.16rem;
						color: #333333;
						appearance:none;
						-moz-appearance:none;
						-webkit-appearance:none;
						background: url('/static/img/form_list_down.png') no-repeat scroll right center transparent;
						background-color: #ffffff;
						background-size: 0.15rem 0.09rem;
						background-position: 98%;
						&::-ms-expand { display: none; }
					}
				}
				.questionContent{
					width: 100%;
					display: flex;
					flex-direction: column;
					margin-bottom: 0.265rem;
					span{
						font-size: 0.16rem;
						color: #333333;
						font-weight: bold;
						margin-bottom: 0.07rem;
					}
					.questionFiled{
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
						width:0.98rem;
						height:0.98rem;
						margin-bottom: 0.1rem;
						margin-right:0.08rem;
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
						width:0.98rem;
						height:0.98rem;
						background-color: #ffffff;
						border-radius: 0.08rem;
						border: 2px solid #000000;
						.uploading{
							width: 0.98rem;
							height: 0.98rem;
							border-radius: 0.08rem;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.upbtn{
							width: 0.98rem;
							height: 0.98rem;
							border-radius: 0.08rem;
							background: url('/static/img/form_pic_icon_add.png') no-repeat scroll center center transparent;
							background-size: 0.60rem 0.42rem;
						}
					}
				}
				.sendContain{
					width: 100%;
					margin-top:0.315rem;
					display: flex;
					align-items: center;
					justify-content: center;
					div{
						display: inline-flex;
						align-items: center;
						justify-content: center;
						width: 1.14rem;
						height: 0.45rem;
						background: url('/static/img/form_btn_bg.png') no-repeat scroll center center transparent;
						background-size: 1.14rem  0.45rem;
						border-radius: 5px;
						font-weight: bold;
						color: #ffffff;
						font-size: 0.18rem;
					}
				}
			}
		}
		// 横屏模式
		@media screen and (orientation:landscape){
			.createContain{
				width: 100%;
				padding:0.122rem;
				box-sizing: border-box;
				.createTitle{
					width:100%;
					display: flex;
					align-items: center;
					margin-bottom:0.15rem;
					font-weight: bold;
					font-size: 0.15rem;
					color: #b3c2dc;
					img{
						margin-right:0.057rem;
						display: block;
						width:0.2rem;
						height:auto;
					}
				}
				.createMail{
					display: flex;
					flex-direction: column;
					margin-bottom: 0.134rem;
					span{
						font-size: 0.091rem;
						color: #333333;
						font-weight: bold;
						margin-bottom: 0.04rem;
					}
					input{
						text-indent: 0.091rem;
						height: 0.257rem;
						background-color: #ffffff;
						border-radius: 0.0457rem;
						border: 2px solid  #000000;
						font-size: 0.091rem;
						color: #333333;
						&::-webkit-input-placeholder { /* WebKit, Blink, Edge */
							color: #c3c3c3;
							font-size: 0.091rem;
						}
						&:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
							color: #c3c3c3;
							font-size: 0.091rem;
						}
						&::-moz-placeholder { /* Mozilla Firefox 19+ */
							color: #c3c3c3;
							font-size: 0.091rem;
						}
						&:-ms-input-placeholder { /* Internet Explorer 10-11 */
							color: #c3c3c3;
							font-size: 0.091rem;
						}
					}
				}
				.questionType{
					display: flex;
					flex-direction: column;
					margin-bottom: 0.134rem;
					span{
						font-size: 0.091rem;
						color: #333333;
						font-weight: bold;
						margin-bottom: 0.04rem;
					}
					select{
						outline: none;
						width:100%;
						box-sizing: border-box;
						padding-left: 0.091rem;
						height: 0.257rem;
						border-radius: 0.0457rem;
						border: 2px solid  #000000;
						font-size: 0.091rem;
						color: #333333;
						appearance:none;
						-moz-appearance:none;
						-webkit-appearance:none;
						background: url('/static/img/form_list_down.png') no-repeat scroll right center transparent;
						background-color: #ffffff;
						background-size: 0.088rem 0.051rem;
						background-position: 98%;
						&::-ms-expand { display: none; }
					}
				}
				.questionContent{
					width: 100%;
					display: flex;
					flex-direction: column;
					margin-bottom: 0.157rem;
					span{
						font-size: 0.091rem;
						color: #333333;
						font-weight: bold;
						margin-bottom: 0.04rem;
					}
					.questionFiled{
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
				.sendContain{
					width: 100%;
					margin-top:0.145rem;
					display: flex;
					align-items: center;
					justify-content: center;
					div{
						display: inline-flex;
						align-items: center;
						justify-content: center;
						width: 0.651rem;
						height: 0.25rem;
						background: url('/static/img/form_btn_bg.png') no-repeat scroll center center transparent;
						background-size: 0.651rem  0.25rem;
						border-radius: 5px;
						font-weight: bold;
						color: #ffffff;
						font-size: 0.102rem;
					}
				}
			}
		}
	}
</style>
<template>
	<div>
		<Top></Top>
		<b>创建票单</b>
		<!-- 邮箱 -->
		<pre>
			{{form}}
		</pre>
		<div>
			<span>邮箱：</span>
			<input type="text" v-model="form.email">
		</div>
	    <!-- 问题类型 -->
		<div>
			<span>问题类型：</span>
			<select v-model="form.type">
				<option :value="item.value" v-for="(item,index) in typeList" :key="index">{{item.label}}</option>
			</select>
		</div>
		<!-- 问题内容 -->
		<div>
			<span>问题内容：</span>
			<input type="text" v-model="form.content">
		</div>
		<!-- 上传图片 -->
		<div>
			<!-- 图片列表 -->
			<div>
				<img v-for="(item,index) in form.image" :key="index"  style="width:80px;height:80px" :src="item" alt="">
			</div>
			<!-- 上传按钮 -->
			<van-uploader :after-read="afterRead" multiple>
				<div v-if="uploadImgFlag">
					<van-loading type="spinner" color="#1989fa"/>
				</div>
				<button v-if="!uploadImgFlag">点击上传</button>
			</van-uploader>
		</div>
		<!-- 发送 -->
		<div>
			<van-button type="primary" @click="send()">发送</van-button>
		</div>
	</div>
</template>
<script>
	import { Button, Uploader, Toast ,Loading } from 'vant';
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
						label:'请选择问题类型',
						value: 0
					},{
						label:'账号',
						value:1
					},{
						label:'充值',
						value:2
					},{
						label:'网络',
						value:3
					},{
						label:'bug',
						value:4
					},{
						label:'其他',
						value:5
					}
				]
			}
		},
		created(){
			
		},
		methods:{
			// 上传图片回调函数
			afterRead(fileImg){
				this.uploadImgFlag = true; // 上传loading
				fileImg.status = 'uploading';
      			fileImg.message = '上传中...';
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
							Toast.success('上传成功');
							console.log(res);
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
				console.log(this.form)
				this.createTicket()
			},
			// 创建工单
			createTicket(){
			    let data = {
					"content": this.form.content, // 问题内容  ***
					"device": "", // 设备信息
					"email": this.form.email, // 邮件  ***
					"image": this.form.image.join(','), // 图片  ***
					"nation": "", // 国家
					"os": "", // 操作系统
					"playerId": "100", // 玩家ID
					"playerName": "100name", // 玩家名称
					"remainGem": 0, // 剩余钻石
					"type": this.form.type, // 工单类型  ***
					"version": "" // 客户端版本
				}
				this.$axios.post('/api/ticket/create',data).then((res)=>{
					if(res.data.code == 0){
						Toast.success('创建成功');
					}else{
						Toast.fail(res.data.message);
					}
				}).catch((error)=>{
					console.log(error)
				})
			}
		},
		components:{
			Top,
			[Button.name]:Button,
			[Uploader.name]:Uploader,
			[Toast.name]:Toast,
			[Loading.name]:Loading
		}
	}
</script>
<style scoped>
	
</style>
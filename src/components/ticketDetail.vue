<template>
	<div>
		<Top></Top>
		<b>票单详情</b>
		<pre>{{form}}</pre>
		<ul>
			<li>
				UTC 2020/08/01 12:34:56<br/>
				blablablabla
				<hr/>
			</li>
			<li>
				UTC 2020/08/01 12:34:56<br/>
				blablablabla
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
			<van-button type="danger">问题已解决</van-button>
			<van-button type="danger" @click="reply()">回复信息</van-button>
		</div>
	</div>
</template>
<script>
	import { Button,Uploader } from 'vant';
	import url from 'url'
	import Top from '../assets/top'
	export default {
		name: 'ticketDetail',
		data() {
			return {
				ticketId:'', // 票单id
				form:{
					content:'',
				},
				fileList:[
					{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }
				],
				listFlag:false, // 是否显示发送输入框
			}
		},
		created(){
			var urllist = window.location.href
			this.ticketId = url.parse(urllist,true).query.ticketId
			this.getRecodeList()
		},
		methods:{
			// 查询工单沟通记录
			getRecodeList(){
				let data = {
					ticketId:this.ticketId
				}
				this.$axios.post('/api/ticket/record/all',data).then((res)=>{
					console.log(res)
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

			}
		},
		components:{
			Top,
			[Button.name]:Button,
			[Uploader.name]:Uploader
		}
	}
</script>
<style scoped>
	
</style>
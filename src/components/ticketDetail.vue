<template>
	<div>
		<Top></Top>
		<b>票单详情</b>
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
			<input type="text">
			<!-- 上传图片 -->
			<div>
				<van-uploader :after-read="afterRead" v-model="fileList" multiple/>
			</div>
			<div>
				<van-button type="info" @click="cancelReply()">取消回复</van-button>
				<van-button type="info">发送</van-button>
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
	import { Button } from 'vant';
	import { Uploader } from 'vant';
	import Top from '../assets/top'
	export default {
		name: 'ticketDetail',
		data() {
			return {
				fileList:[
					{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }
				],
				listFlag:false, // 是否显示发送输入框
			}
		},
		methods:{
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
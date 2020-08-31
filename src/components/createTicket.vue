<template>
	<div>
		<Top></Top>
		<b>创建票单</b>
		<!-- 邮箱 -->
		<div>
			<span>邮箱：</span>
			<input type="text" v-model="form.mail">
		</div>
	    <!-- 问题类型 -->
		<div>
			<span>问题类型：</span>
			<input type="text" v-model="form.question">
		</div>
		<!-- 问题内容 -->
		<div>
			<span>问题内容：</span>
			<input type="text" v-model="form.questionContent">
		</div>
		<!-- 上传图片 -->
		<div>
			<van-uploader :after-read="afterRead" v-model="form.fileList" multiple/>
		</div>
		<!-- 发送 -->
		<div>
			<van-button type="primary" @click="send()">发送</van-button>
		</div>
	</div>
</template>
<script>
	import { Button } from 'vant';
	import { Uploader } from 'vant';
	import Top from '../assets/top'
	export default {
		name: 'createTicket',
		data() {
			return {
				form:{
					mail:'', // 邮箱
					question:'', // 问题类型
					questionContent:'', // 问题内容
					fileList:[
						{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
						{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }
					]	
				}
			}
		},
		methods:{
			// 上传回调函数
			afterRead(file){
				file.status = 'uploading';
				file.message = '上传中...';

				setTimeout(() => {
					file.status = 'failed';
					file.message = '上传失败';
				}, 1000);
			},
			send(){ // 发送
				console.log(this.form)
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
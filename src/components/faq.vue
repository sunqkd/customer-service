<template>
	<div>
		<Top></Top>
		<b>faq</b>
		<input type="text" v-model="searchName" placeholder="请输入您遇到的问题">
	</div>
</template>
<script>
	import { Button } from 'vant';
	import Top from '../assets/top'
	export default {
		name: 'faq',
		data() {
			return {
				searchName:'' // 搜索内容
			}
		},
		components:{
			Top
		}
	}
</script>
<style scoped>
	
</style>
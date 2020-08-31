<template>
	<div>
		<Top></Top>
		<b><div>faq</div></b>
		<input type="text" v-model="searchName" placeholder="请输入您遇到的问题">
		<ul>
			<li @click="faqDetail()">faq1x</li>
			<li @click="faqDetail()">faq2x</li>
			<li @click="faqDetail()">faq3x</li>
			<li @click="faqDetail()">faq4x</li>
			<li @click="faqDetail()">faq5x</li>
			<li @click="faqDetail()">faq6x</li>
			<li @click="faqDetail()">faq7x</li>
		</ul>
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
		methods:{
			// faq detail
			faqDetail(){
				this.$router.push('/faqdetail')
			}
		},
		components:{
			Top,
			[Button.name]:Button
		}
	}
</script>
<style scoped>
	
</style>
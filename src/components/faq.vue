<template>
	<div class="faq">
		<Top :backflag="true" :homeflag="true"></Top>
		<div class="faqContain">
			<div class="inputSearch">
				<div>
					<img src="/static/img/bar_icon_search.png" alt="">
				</div>
				<input type="text" v-model="searchName" placeholder="请输入您遇到的问题">
			</div>
		</div>
		
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
<style lang="scss" scoped>
	.faq{
		width:100%;
		height:100%;
		// 竖屏模式
		@media screen and (orientation:portrait){

		}
		// 横屏模式
		@media screen and (orientation:landscape) {
			.faqContain{

			}
		}
	}
</style>
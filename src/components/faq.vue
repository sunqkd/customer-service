<template>
	<div class="faq">
		<!-- 返回条 -->
		<Top :backflag="true" :homeflag="true"></Top>
		<div class="faqContain">
			<!-- 搜索框 -->
			<div class="searchLine">
				<div class="inputSearch">
					<div class="searchImg">
						<img src="/static/img/bar_icon_search.png" alt="search">
					</div>
					<div class="inputFaq">
						<input  type="text" v-model="searchName" placeholder="#Input your questions">
					</div>
				</div>
				<!-- 跳转到票单列表 -->
				<div class="tickListContain">
					<img src="/static/img/support_icon_ticket.png" alt="tickets" @click="goTickList()">
				</div>
			</div>
			<!-- 搜索内容 -->
			<div>
				<!-- 有数据 -->
				<div></div>
				<!-- 无数据 -->
				<div></div>
			</div>
		</div>
		
		<!-- <ul>
			<li @click="faqDetail()">faq1x</li>
			<li @click="faqDetail()">faq2x</li>
			<li @click="faqDetail()">faq3x</li>
			<li @click="faqDetail()">faq4x</li>
			<li @click="faqDetail()">faq5x</li>
			<li @click="faqDetail()">faq6x</li>
			<li @click="faqDetail()">faq7x</li>
		</ul> -->
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
			},
			// 跳转到票单列表
			goTickList(){
				this.$router.push('/ticketList')
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
				width: 100%;
				box-sizing: border-box;
				padding: 0.125rem 0.137rem 0 0.137rem;
				.searchLine{
					width:100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.inputSearch{
						flex: 1;
						height:0.257rem;
						padding:0 0.128rem;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						background-color: #ffffff;
						border-radius: 16px;
						border: solid 2px #000000;
						.searchImg{
							width: 0.11rem;
							height:100%;
							display: flex;
							align-items: center;
							img{
								display: block;
								width: 0.11rem;
								height: 0.11rem;
							}
						}
						.inputFaq{
							flex: 1;
							height:100%;
							padding: 0.02rem 0 0.02rem 0.04rem;
							box-sizing: border-box;
							input{
								display: block;
								width:100%;
								height: 100%;
								border: none;
								font-size: 0.091rem;
								color: #c3c3c3;
								font-family: PTsans;
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
					}
					.tickListContain{
						width:0.314rem;
						height:0.277rem;
						margin-left: 0.11rem;
						img{
							display: block;
							width:100%;
							height:auto;
						}
					}
				}

			}
		}
	}
</style>
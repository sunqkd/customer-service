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
					<img src="/static/img/support_icon_ticket.png" alt="ticket" @click="goTickList()">
				</div>
			</div>
			<!-- 搜索内容 -->
			<div class="faqContent">
				<!-- 有数据 -->
				<div class="faqList">
					<div class="faqItem" v-for="i in 10" :key="i" @click="faqDetail()">
						<div class="maxtwoline">
							<span>
								ost my accountI l myi account
							</span>
						</div>
						<img src="/static/img/form_list_arrow.png" alt="">
					</div>
				</div>
				<!-- 无数据 -->
				<div class="nofaq" style="display:none">
					<img src="/static/img/blank_icon_questions.png" alt="">
					<span>Sorry, no answer for this question</span>
					<span>You can contact us for more help</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
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
			Top
		}
	}
</script>
<style lang="scss" scoped>
	.faq{
		width:100%;
		height:100%;
		// 竖屏模式
		@media screen and (orientation:portrait){
			.faqContain{
				width: 100%;
				box-sizing: border-box;
				padding: 0.22rem 0.24rem 0 0.24rem;
				.searchLine{
					width:100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.inputSearch{
						flex: 1;
						height:0.45rem;
						padding:0 0.225rem;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						background-color: #ffffff;
						border-radius: 0.08rem;
						border: solid 2px #000000;
						.searchImg{
							width: 0.2rem;
							height:100%;
							display: flex;
							align-items: center;
							img{
								display: block;
								width: 0.2rem;
								height: 0.2rem;
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
								font-size: 0.16rem;
								color: #c3c3c3;
								font-family: PTsans;
								&::-webkit-input-placeholder { /* WebKit, Blink, Edge */
									color: #c3c3c3;
									font-size: 0.16rem;
								}
								&:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
									color: #c3c3c3;
									font-size: 0.16rem;
								}
								&::-moz-placeholder { /* Mozilla Firefox 19+ */
									color: #c3c3c3;
									font-size: 0.16rem;
								}
								&:-ms-input-placeholder { /* Internet Explorer 10-11 */
									color: #c3c3c3;
									font-size: 0.16rem;
								}
							}
						}
					}
					.tickListContain{
						width:0.55rem;
						height:0.5rem;
						margin-left: 0.2rem;
						img{
							display: block;
							width:100%;
							height:auto;
						}
					}
				}
				.faqContent{
					width:100%;
					padding-bottom:0.2rem;
					box-sizing: border-box;
					.nofaq{
						width: 100%;
						padding-top:0.39rem;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						img{
							margin-bottom:0.175rem;
							display: block;
							width:1.225rem;
							height:auto;
						}
						span{
							font-size: 0.15rem;
							color: #b3c2dc;
						}
					}
					.faqList{
						width: 100%;
						padding:0 0.12rem;
						margin:0.2rem 0;
						box-sizing: border-box;
						border: 2px solid #000000;
						border-radius: 0.08rem;
						background:#ffffff;
						color: #405a89;
						.faqItem{
							width:100%;
							height:0.65rem;
							border-bottom:1px solid #d7d8d9;
							display: flex;
							align-items: center;
							justify-content: space-between;
							font-size: 0.16rem;
							.maxtwoline{
								height:100%;
								padding:0 0.7rem 0 0;
								box-sizing: border-box;
								flex:1;
								display: flex;
								align-items: center;
								span{
									overflow:hidden;
									text-overflow:-o-ellipsis-lastline;
									text-overflow:ellipsis;
									display:-webkit-box;
									-webkit-line-clamp:2;
									line-clamp:2;
									-webkit-box-orient:vertical;
								}
							}
							img{
								display: block;
								width: 0.09rem;
								height:auto;
							}
						}
					}
				}
			}			
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
						border-radius: 0.0457rem;
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
				.faqContent{
					width:100%;
					padding-bottom:0.2rem;
					box-sizing: border-box;
					.nofaq{
						width: 100%;
						padding-top:0.15rem;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						img{
							margin-bottom:0.1rem;
							display: block;
							width:0.7rem;
							height:auto;
						}
						span{
							font-size: 0.085rem;
							color: #b3c2dc;
						}
					}
					.faqList{
						width: 100%;
						padding:0 0.068rem;
						margin-top:0.11rem;
						box-sizing: border-box;
						border: 2px solid #000000;
						border-radius: 0.0457rem;
						background:#ffffff;
						color: #405a89;
						.faqItem{
							width:100%;
							height:0.37rem;
							border-bottom:1px solid #d7d8d9;
							display: flex;
							align-items: center;
							justify-content: space-between;
							font-size: 0.09rem;
							.maxtwoline{
								height:100%;
								padding:0 0.4rem 0 0;
								box-sizing: border-box;
								flex:1;
								display: flex;
								align-items: center;
								span{
									overflow:hidden;
									text-overflow:-o-ellipsis-lastline;
									text-overflow:ellipsis;
									display:-webkit-box;
									-webkit-line-clamp:2;
									line-clamp:2;
									-webkit-box-orient:vertical;
								}
							}
							img{
								display: block;
								width: 0.05rem;
								height:auto;
							}
						}
					}
				}
			}
		}
	}
</style>
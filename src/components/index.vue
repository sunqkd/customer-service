<template>
	<div class="homeIndex">
		<Top></Top>
		<!-- 竖屏样式 布局 -->
		<section class="portraitFlag">
			<div class="topImgLogo">
				<img src="/static/img/support_home_bg2.png" alt="logo">
			</div>
			<div class="questionList">
				<div class="lineone">
					<div class="questionItem" @click="goFaq()">
						<img src="/static/img/support_icon_account.png" alt="">
						<span>Account</span>
					</div>
					<div class="questionItem" @click="goFaq()">
						<img src="/static/img/support_icon_recharge.png" alt="">
						<span>Recharge</span>
					</div>
					<div class="questionItem" @click="goFaq()">
						<img src="/static/img/support_icon_network.png" alt="">
						<span>Network</span>
					</div>
				</div>
				<div class="lineTwo">
					<div class="questionItem" @click="goFaq()">
						<img src="/static/img/support_icon_bug.png" alt="">
						<span>Bug</span>
					</div>
					<div class="questionItem" @click="goFaq()">
						<img src="/static/img/support_icon_others.png" alt="">
						<span>Others</span>
					</div>
					<div class="questionItem" @click="goTicket()">
						<img src="/static/img/support_icon_ticket.png" alt="">
						<span>Ticket</span>
					</div>
				</div>
			</div>
		</section>
		<!-- 横屏样式布局 -->
		<section class="landscapeFlag">
           
		</section>
	</div>
</template>
<script>
	import Top from '../assets/top'
	import url from 'url'
	export default {
		name: 'index',
		data() {
			return {
				msg: 'home页',
			}
		},
		created(){
			var urllist = window.location.href
			console.log(url.parse(urllist,true))
			/*
				如果有参数拼接 则存储为session中
				如果没有参数拼接 session不做处理
			*/
		},
		methods:{
			goFaq(){ // 去faq界面
				this.$router.push('/faq')
			},
			goTicket(){ // 去票单列表
				this.$router.push('/ticketList')
			}
		},
		components:{
			Top
		}
	}
</script>
<style lang="scss" scoped>
	.homeIndex{
		// 竖屏样式
		@media screen and (orientation:portrait) {
			.landscapeFlag{
				display: none;
			}
			.portraitFlag{
				.topImgLogo{
					width:100%;
					height: auto;
					img{
						display:block;
						outline: none;
						width:100%;
						height:2.135rem;
					}
				}
				.questionList{
					width:100%;
					padding:0.29rem 0.15rem 0 0.15rem;
					box-sizing: border-box;
					.lineone{
						width:100%;
						margin-bottom:0.17rem;
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
					.lineTwo{
						width:100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
					.questionItem{
						width:1.03rem;
						height:1.03rem;
						background:#ffffff;
						border: solid 2px #000000;
						border-radius: 16px;
						box-sizing: border-box;
						display:flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						font-size:0.16rem;
						color: #4c4c4c;
						img{
							display:block;
							width:0.55rem;
							height:auto;
						}
					}
				}
			}
		}
		// 横屏样式
		@media screen and (orientation:landscape) {
			.portraitFlag{
				display: none;
			}
			.landscapeFlag{
				
			}
		}
	}
	
</style>
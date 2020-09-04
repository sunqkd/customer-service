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
			<!-- 左图片 -->
			<div class="leftImgContain">
				<img src="/static/img/support_home_bg.png" alt="">
			</div>
			<!-- 右内容区 -->
			<div class="rightContain">
				<div class="lineoneP">
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
				<div class="lineTwoP">
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
		width:100%;
		height:100%;
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
				width:100%;
				height:calc(100% - 0.257rem);
				display: flex;
				align-items: center;
				justify-content: space-between;
				.leftImgContain{
					height:100%;
					img{
						display:block;
						height:100%;
						width:auto;
					}
				}
				.rightContain{
					flex: 1;
					height:100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					.lineoneP{
						width:100%;
						display: flex;
						align-items: center;
						justify-content: space-around;
					}
					.lineTwoP{
						width:100%;
						display: flex;
						align-items: center;
						justify-content: space-around;
					}
					.questionItem{
						width:0.725rem;
						height:0.725rem;
						background:#ffffff;
						border: solid 2px #000000;
						border-radius: 16px;
						box-sizing: border-box;
						display:flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						font-size:0.0914rem;
						color: #4c4c4c;
						img{
							display:block;
							width:0.3457rem;
							height:auto;
						}
					}
				}
			}
		}
	}
	
</style>
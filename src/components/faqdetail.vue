<template>
	<div class="faqdetail">
		<Top :backflag="true" :homeflag="true" :routego="'/faq'"></Top>
		<!-- top -->
		<div class="detailContent">
			<div class="detailTitle">
				<span>I lost my account</span>
			</div>
			<div class="detailList">
				1. Facebook registration: open Whoot!, go to the “Login” page and tap “Facebook Login”. Whoot! will then use your Facebook account information to create your account.<br/>
				2. Apple registration: open Whoot! Stamp, go to the “Login” page and tap “Apple Login”. Whoot! Stamp will then use your Apple account information to create your account.<br/>
				3. Phone number registration: open Whoot!, go to the “Login” page, and tap “New User Registration”. Select country code, enter your phone number and continue with the steps to complete registration.<br/>
				4. Email registration: open Whoot!, go to the “Login” page, tap “New User Registration”, and switch to email registration. Enter your name, email address and password, and continue with the steps to complete registration.
			</div>
		</div>
		<!-- footer -->
		<div class="detailFooter">
			<div class="footerTitle">
				{{helpfulFlag?"Was this article helpful?":"This article is not helpful"}}
			</div>
			<div class="footBtn">
				<span class="rightMargin" v-if="helpfulFlag" @click="nohelpful()">
					<img src="/static/img/btn_feedback_icon_no.png" alt="">
					No
				</span>
				<span  v-if="helpfulFlag" @click="helpful()">
					<img src="/static/img/btn_feedback_icon_yes.png" alt="">
					Yes
				</span>
				<span class="noHelp rightMargin"  v-if="!helpfulFlag" @click="closeDetail()">
					Close
				</span>
				<span class="noHelp"  v-if="!helpfulFlag" @click="goCreate()">
					Contact us
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'vant'
	import Top from '../assets/top'
	export default {
		name: 'faqdetail',
		data() {
			return {
				helpfulFlag:true,  // 是否有帮助
			}
		},
		methods:{
			nohelpful(){ // 没有帮助
				this.helpfulFlag = false
			},
			helpful(){ // 有帮助
				Toast.success('Thanks for your feedback');
			},
			closeDetail(){ // 关闭
				this.$router.go(-1)
			},
			goCreate(){ // 创建订单
				this.$router.push('/createTicket')
			}
		},
		components:{
			Top,
			[Toast.name]:Toast
		}
	}
</script>
<style lang="scss" scoped>
	.faqdetail{
		width: 100%;
		height: 100%;
		// 竖屏模式
		@media screen and (orientation:portrait){
			.detailContent{
				width:100%;
				padding:0.245rem;
				box-sizing: border-box;
				.detailTitle{
					width: 100%;
					height:0.455rem;
					border-bottom:1px solid #b3c2dc;
					display: flex;
					align-items: center;
					font-size: 0.18rem;
					color: #333333;
					font-weight: bold;
					span{
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
				.detailList{
                   font-size:0.12rem;
				   width: 100%;
				   padding-top:0.2rem;
				   box-sizing: border-box;
				   font-size: 0.12rem;
				   color: #333333;
				   line-height:0.2rem;
				}
			}
			.detailFooter{
				width:100%;
				padding:0.13rem 0 0.12rem 0;
				border-top:1px solid #d7d8d9;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 0.15rem;
				color: #405a89;
				.footerTitle{
					margin-bottom: 0.1rem;
				}
				.footBtn{
					display: flex;
					align-items: center;
					justify-content: center;
					span{
						display: inline-flex;
						align-items: center;
						justify-content: center;
						border-radius: 26px;
						height:0.255rem;
						padding:0 0.14rem;
						border:2px solid #405a89;
						img{
							display: block;
							width:0.14rem;
							height:0.14rem;
							margin-right:0.09rem;
							outline: none;
						}
						&.noHelp{
							border-radius: 12px;
						}
						&.rightMargin{
							margin-right:0.545rem;
						}
					}
				}
			}
		}
		// 横屏模式
		@media screen and (orientation:landscape) {
			.detailContent{
				width:100%;
				padding:0.14rem;
				box-sizing: border-box;
				.detailTitle{
					width: 100%;
					height:0.26rem;
					border-bottom:1px solid #b3c2dc;
					display: flex;
					align-items: center;
					font-size: 0.1rem;
					color: #333333;
					font-weight: bold;
					span{
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
				.detailList{
                   font-size:0.1rem;
				   width: 100%;
				   padding-top:0.11rem;
				   box-sizing: border-box;
				   font-size: 0.068rem;
				   color: #333333;
				   line-height:0.114rem;
				}
			}
			.detailFooter{
				width:100%;
				padding:0.074rem 0 0.068rem 0;
				border-top:1px solid #d7d8d9;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 0.086rem;
				color: #405a89;
				.footerTitle{
					margin-bottom: 0.057rem;
				}
				.footBtn{
					display: flex;
					align-items: center;
					justify-content: center;
					span{
						display: inline-flex;
						align-items: center;
						justify-content: center;
						border-radius: 26px;
						height:0.146rem;
						padding:0 0.08rem;
						border:2px solid #405a89;
						img{
							display: block;
							width:0.08rem;
							height:0.08rem;
							margin-right:0.05rem;
							outline: none;
						}
						&.noHelp{
							border-radius: 12px;
						}
						&.rightMargin{
							margin-right:0.31rem;
						}
					}
				}
			}
		}
	}
</style>
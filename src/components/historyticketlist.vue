<template>
    <div class="historyTicket">
        <Top :backflag="true" :homeflag="true"></Top>
        <div class="historyContain">
            <!-- 有历史记录 -->
            <div class="historyList" >
                <!-- 标题 -->
				<div class="historyTitle">
					<span>History Feedback</span>
					<span>Feedback Time</span>
				</div>
                <!-- 历史票单 -->
                <!-- 已解决 -->
                <div class="historyList" @click="goTicketDetail(item.id)">
					<span>
						Ticket 222233333
					</span>
					<span>
						2020/08/01 12:34:56
					</span>
				</div>
                <!-- 已归档 -->
                <div class="historyList" @click="goTicketDetail(item.id)">
					<span>
						Ticket 222233333
					</span>
					<span>
						2020/08/01 12:34:56
					</span>
				</div>
            </div>
            <!-- 无历史 -->
            <div class="noHistory" style="display:none">
                <img src="/static/img/blank_icon_feedback.png" alt="">
            </div>
        </div>
        <!-- 
            <div>历史票单</div>
            <ul>
                <li v-for="(item,index) in resolvedTicketList" :key="index + 'c'" @click="goTicketDetail(item.id)">{{item.id}} <br/></li>
                <li v-for="(item,index) in archivedTicketList" :key="index + 'd'" @click="goTicketDetail(item.id)">{{item.id}} <br/></li>
            </ul> 
        -->
    </div>
</template>
<script>
    import Top from '../assets/top'
    export default {
        data(){
            return{
                resolvedTicketList:[], // 已解决票单
                archivedTicketList:[], // 已归档
            }
        },
        created(){
            // this.getResolvedTicketList()
            // this.getArchivedTicketList()
        },
        methods:{
            // 已解决
            getResolvedTicketList(){
				var data = {
					"accountId": "100", // 玩家ID
					// "createAt": "", // 工单创建时间
					"name": "100name", // 玩家名字
					"page": 1, // 页码
					"pageSize": 100, // 每页创建数量
					"status": 3, // 工单状态 3表示已解决
					// "ticketNo": "", // 工单号
					// "type": 0 // 工单类型
				}
				this.$axios.post('/api/ticket/search',data).then((res)=>{
					if(res.data.code == 0){
						this.resolvedTicketList = res.data.data
					}
				})
            },
            // 已归档
            getArchivedTicketList(){
				var data = {
					"accountId": "100", // 玩家ID
					// "createAt": "", // 工单创建时间
					// "name": "100name", // 玩家名字
					"page": 1, // 页码
					"pageSize": 100, // 每页创建数量
					"status": 4, // 工单状态 4表示已归档
					// "ticketNo": "", // 工单号
					// "type": 0 // 工单类型
				}
				this.$axios.post('/api/ticket/search',data).then((res)=>{
					if(res.data.code == 0){
						this.archivedTicketList = res.data.data
					}
				})
            },
            // 获取沟通
			goTicketDetail(id){
				this.$router.push(`/ticketDetail?ticketId=${id}`)
			},
            
        },
        components:{
            Top
        }
    }
</script>
<style lang="scss" scoped>
    .historyTicket{
        width: 100%;
        height: 100%;
        // 竖屏模式
        @media screen and (orientation:portrait){
            .historyContain{
                width: 100%;
                padding:0.13rem 0.24rem 1rem 0.24rem;
                box-sizing: border-box;
                .noHistory{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width:100%;
                    padding-top:0.4rem;
                    box-sizing: border-box;
                    img{
                        display: block;
                        width:1.51rem;
                        height:auto;
                    }
                }
                .historyList{
                    width: 100%;
                    .historyTitle{
                        width:100%;
                       	height:0.46rem;
                        display: flex;
                        align-items: center;
                        border-bottom:1px solid #b3c2dc;
                        box-sizing: border-box;
                        span{
                            display: inline-block;
                            width:50%;
                            color: #333333;
                            font-size: 0.16rem;
                            font-weight:bold;
                        }
                    }
                    .historyList{
                        width:100%;
                        height:0.46rem;
                        display: flex;
                        align-items: center;
                        color: #333333;
                        span{
                            font-size: 0.16rem;
                            display: inline-block;
                            width:50%;
                        }
                    }
                }
            }
        }
        // 横屏模式
        @media screen and (orientation:landscape){
            .historyContain{
                width: 100%;
                padding:0.074rem 0.132rem 0.5rem 0.174rem;
                box-sizing: border-box;
                .noHistory{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width:100%;
                    padding-top:0.14rem;
                    box-sizing: border-box;
                    img{
                        display: block;
                        width: 0.863rem;
                        height:auto;
                    }
                }
                .historyList{
                    width: 100%;
                    .historyTitle{
                        width:100%;
                        height:0.269rem;
                        display: flex;
                        align-items: center;
                        border-bottom:1px solid #b3c2dc;
                        box-sizing: border-box;
                        span{
                            display: inline-block;
                            width:50%;
                            color: #333333;
                            font-size: 0.091rem;
                            font-weight:bold;
                        }
                    }
                    .historyList{
                        width:100%;
                        height:0.269rem;
                        display: flex;
                        align-items: center;
                        color: #333333;
                        span{
                            font-size: 0.091rem;
                            display: inline-block;
                            width:50%;
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div>
        <Top :backflag="true" :homeflag="true"></Top>
        <div>历史票单</div>
        <ul>
            <!-- 历史票单 -->
            <!-- 3 已解决 -->
            <li v-for="(item,index) in resolvedTicketList" :key="index + 'c'" @click="goTicketDetail(item.id)">{{item.id}} <br/></li>
            <!-- 4 已归档 -->
            <li v-for="(item,index) in archivedTicketList" :key="index + 'd'" @click="goTicketDetail(item.id)">{{item.id}} <br/></li>
        </ul>
    </div>
</template>
<script>
    import { Button } from 'vant';
    import Top from '../assets/top'
    export default {
        data(){
            return{
                resolvedTicketList:[], // 已解决票单
                archivedTicketList:[], // 已归档
            }
        },
        created(){
            this.getResolvedTicketList()
            this.getArchivedTicketList()
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
            Top,
            [Button.name]:Button
        }
    }
</script>

<template>
	<div>
		<Top></Top>
		票单详情
	</div>
</template>
<script>
	import { Button } from 'vant';
	import Top from '../assets/top'
	export default {
		name: 'ticketDetail',
		data() {
			return {
				msg: 'ticketDetail'
			}
		},
		components:{
			Top
		}
	}
</script>
<style scoped>
	
</style>
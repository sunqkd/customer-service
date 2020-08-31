<template>
	<div>
		<Top></Top>
		票单列表
	</div>
</template>
<script>
	import { Button } from 'vant';
	import Top from '../assets/top'
	export default {
		name: 'ticketList',
		data() {
			return {
				msg: 'ticketList'
			}
		},
		components:{
			Top
		}
	}
</script>
<style scoped>
	
</style>
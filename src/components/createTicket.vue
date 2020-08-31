<template>
	<div>
		<Top></Top>
		<b>创建票单</b>
		
	</div>
</template>
<script>
	import { Button } from 'vant';
	import Top from '../assets/top'
	export default {
		name: 'createTicket',
		data() {
			return {
				msg: 'createTicket'
			}
		},
		components:{
			Top
		}
	}
</script>
<style scoped>
	
</style>
<template>
	<div>
		<van-button type="primary">账号</van-button>
		<van-button type="primary">充值</van-button>
		<van-button type="primary">网络</van-button>
		<van-button type="primary">bug</van-button>
		<van-button type="primary">其他</van-button>
		<van-button type="primary">ticket</van-button>
	</div>
</template>
<script>
	import { Button } from 'vant';
	export default {
		name: 'index',
		data() {
			return {
				msg: '问题反馈类型'
			}
		},
		components:{
			[Button.name]:Button
		}
	}
</script>
<style scoped>
	
</style>
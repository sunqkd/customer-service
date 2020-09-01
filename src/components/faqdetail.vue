<template>
	<div>
		<Top></Top>
		<div><b>faqdetail</b></div>
	</div>
</template>
<script>
	import { Button } from 'vant';
	import Top from '../assets/top'
	export default {
		name: 'faqdetail',
		data() {
			return {
				msg: 'faqdetail'
			}
		},
		components:{
			Top,
			[Button.name]:Button
		}
	}
</script>
<style scoped>
	
</style>
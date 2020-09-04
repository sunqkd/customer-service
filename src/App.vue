<template>
	<div id="app" v-cloak>
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
    * {
        margin: 0;
        padding: 0
    }
    html, body {
        width: 100%;
        height: 100%;
		font-size: 26.67vw;
		font-family: PTSans-Bold;
		background:#d9e7f1;
    }
	#app {
		font-family: PTSans-Bold;
		width: 100%;
		height:100%;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	[v-cloak] {
        display: none;
    }
</style>
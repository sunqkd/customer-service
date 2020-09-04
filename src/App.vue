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
	@font-face {
		font-family: PTsans;
		src: url('/static/font/PTsans.ttf');
	}
    html, body {
        width: 100%;
        height: 100%;
		font-size: 26.67vw;
		letter-spacing: 0px;
		font-family: PTsans;
		background:#d9e7f1;
		-webkit-font-smoothing: subpixel-antialiased;
		-moz-osx-font-smoothing: grayscale;
    }
	#app {
		width: 100%;
		height:100%;
	}
	[v-cloak] {
        display: none;
    }
</style>
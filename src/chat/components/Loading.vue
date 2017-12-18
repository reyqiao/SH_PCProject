<template lang="html">
	<div v-show="getIsLoading" class="loading">
		<div class="tips">

		</div>
	</div>
</template>

<script>
import { mapGetters,mapMutations,} from 'vuex';

export default {
	computed: {
		/*
		 * getIsLoading获取是否显示加载框
		 */
		...mapGetters(['getIsLoading']),
	},
}
</script>

<style lang="scss" scoped>
.loading{
	position: fixed;
	left:0;
	right:0;
	top:0;
	bottom:0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.3);
	z-index:200;
	text-align: center;
	margin:auto;
	& .tips{
		position: fixed;
		left:0;
		right:0;
		top:0;
		bottom:0;
		width: 30px;
		height: 30px;
		z-index: 101;
		text-align: center;
		margin:auto;
		background-image: url(../images/loading.gif);
		background-repeat: no-repeat;
		background-size: contain;
	}
}
</style>

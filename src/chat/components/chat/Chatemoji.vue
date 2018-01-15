<template lang="html">
	<div v-show="getEmojiShow" class="chatemoji clearfix">
		<template v-for="item in 75">
			<div class="imgemoji f-l" :style="'background-image: url(./static/img/face/'+item+'.gif)'" @click.stop="clickemoji(item)">
				<!-- <image :src="'../../images/face/'+item+'.gif'" > -->
			</div>
 		</template>
	</div>
</template>

<script>
import {mapGetters,mapMutations,} from 'vuex';

export default {
	data(){
		return{
			emojiCode: ['1f60a', '1f60c', '1f60f', '1f601', '1f604',
				'1f609', '1f612', '1f614', '1f616', '1f618', '1f621', '1f628',
				'1f630', '1f631', '1f633', '1f637', '1f603', '1f61e', '1f620',
				'1f61c', '1f60d', '1f613', '1f61d', '1f62d', '1f602', '1f622',
				'1f61a', '1f623', '1f632', '1f62a', '263a', '1f4aa', '1f44a',
				'1f44d', '1f44e', '1f44f', '1f64f', '1f446', '1f447', '261d',
				'270c', '1f44c', '270b', '270a', '1f440', '1f444', '1f35a',
				'1f382', '1f37b', '2615f', '1f451', '1f494', '1f339', '1f4a3',
				'1f004', '1f437', '1f3b5', '2600f', '1f319', '1f525', '1f47b',
				'1f489', '1f4a9', '1f47c', '1f52b', '1f3c6', '26bd', '1f680',
				'1f483', '1f7a9', '5f47c', '9f52b', '2f3c6', '26fd', '1f180',
			],
		}
	},
	methods: {
		clickemoji(index){
			const curremojicode = this.emojiCode[index-1];
			// this.$store.commit('setEmojiShow',false); //关闭表情
			this.$store.commit('addEmoji',{ifadd: true,cont: `[${curremojicode}]`,});
		},
	},
	computed: {
		/*
		 * getEmojiShow 获取是否显示表情框
		 */
		...mapGetters(['getEmojiShow']),
		/**
		 * setEmojiShow设置是否显示表情框
		 * addEmoji添加点击的表情
		 */
		...mapMutations(['setEmojiShow','addEmoji']),
	},
}
</script>

<style lang="scss" scoped>
.chatemoji{
	position: absolute;
	left: 0px;
	top: -220px;
	width: 298px;
	z-index: 101;
	background: #fff;
  	border: 1px #dfe6f6 solid;
  	border-radius: 4px;
	& .imgemoji{
		width: 24px;
    	height: 24px;
    	margin: 2px;
		// border: 1px solid rgb(59, 64, 74);
		// background-image: url(../../images/face/face_bg2.gif);
		//background-repeat: no-repeat;
		//background-size:517px 500px;
		cursor: pointer;
	}
}
</style>

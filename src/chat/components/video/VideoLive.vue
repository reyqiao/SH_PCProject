<template lang="html">
	<div v-show="getVideoInfosType=='VideoLive'" class="videolive">
		<div class="videolive_tip">
			{{txt}}
		</div>
		<div class="videolive_content">
			{{msg}}
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data(){
		return{
			txt:'',
			msg:'',
		}
	},
	watch:{
		getVideoUrl(val){
			if (val.type==='zhibo') {
				this.txt = val.title;
				this.msg = val.description;
			}else if(val.type==='lubo') {
				this.txt = val.videolist[0].Title;
				this.msg = val.videolist[0].Description;
			}
		},
	},
	computed: {
		/*
		 * 获取直播、精品课程、直播预告当前选中项 默认直播选中
		 */
		...mapGetters(['getVideoInfosType','getVideoUrl']),
	},
}
</script>

<style lang="scss" scoped>
.videolive{
	width: 100%;
	padding-left: 20px;
	padding-top: 28px;
	& .videolive_tip{
		font-size: 24px;
		line-height: 48px;
	}
	& .videolive_content{
    padding-right: 30px;
		font-size: 14px;
		line-height: 20px;
    word-wrap:break-word;
	}
}
</style>

<template>
  <div class="bottomBox">
    <div id="btnRow">
      <div>
        <download-btn :item-data="data"></download-btn>
        <sleep-timer-widget :sleep-time="sleepTime"></sleep-timer-widget>
      </div>
      <div class="kalameh w-auto noLyricsText"
           v-show="data && !data.lyric.has_lyric"
           @click="noLyricsToast">
        متن
      </div>
      <div>
        <span :class="!$utils.isTrackInUserLikedTracks(data.id)?'':'liked'"
              @click.stop="$utils.toggleLike(data)" class="notLiked">
        </span>
        <span @click="$utils.openSheet($root.$refs.playerOptionsBottomSheet)">
          <img draggable="false" src="@/assets/icons/more-verticalg.svg"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import sleepTimerWidget from "@/components/includes/Elements/SleepTimerWidget.vue";
// import downloadWidget from "@/components/player/components/downloadWidget.vue";
import DownloadBtn from "@/components/includes/Elements/MusicList/downloadBtn.vue";
export default {
  name: "bottomBox",
  components: {
    DownloadBtn,
    sleepTimerWidget
  },
  props: {
    data:Object,
    sleepTime:Number,
  },
  data() {
    return {
      progress: 0
    }
  },
  methods: {
    noLyricsToast() {
      this.$root.$refs.vToaster.openToast(
          'این آهنگ متن ندارد',
      )
    },
  }
}
</script>

<style scoped>
.noLyricsText {
  opacity:0.5;
}

.bottomBox {
  position: relative;
  z-index: 10;
  height: 8vh;
  display: flex;
  align-items: center;
  width: 100%;
  top: -3px;
}

#btnRow {
  display: flex;
  position: relative;
  bottom: 0px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
}

#btnRow div {
  display: flex;
  flex-direction: row;
  width: 32%;
  justify-content: space-around;
}

#btnRow span {
  border-radius: 60px;
  width: 50px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#btnRow span img {
  vertical-align: middle;
}

#btnRow div span {
  max-width: 23px;
  min-width: 23px;
  height: 25px;
  background-position: center;
  background-repeat: no-repeat;
}

#btnRow .liked, #btnRow div .notLiked {
  width: 100%;
  background-size: contain;
}

#btnRow div .notLiked {
  background-image: url('~@/assets/icons/like2.svg');
}

#btnRow div .liked {
  background-image: url('~@/assets/icons/liked2.svg');
}



@media screen and (max-width: 375px) {
  .bottomBox {
    top: -8px;
  }
}
@media screen and (max-width: 321px) {
  .inLyricBB {
    width: 95%;
    top:10px;
  }
}
</style>
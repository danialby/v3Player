<template :key="currentTime">
  <div class="lyric-container fit" :style="lyricStyle">
    <div id="lyric-top" class="fit-32 m-auto">
  <span class="lyric-top-image">
<img draggable="false" v-if="trackData" :src="$store.state.imgUrl + trackData.image"></span>
      <span class="lyric-top-info" v-if="trackData">
    <p id="lyricTrackTitle" class="track-name kalameh truncate"><svg class="bullet" width="9" height="8"
                                                                     viewBox="0 0 9 8"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
<rect x="0.849365" width="8" height="8" rx="4" fill="#F2F2F2"/>
</svg>
{{
        trackData.title
      }}</p>
              <div id='artistInfo' class="t-r">
                <svg class="bullet" width="9" height="8" viewBox="0 0 9 8" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
<rect x="0.849365" width="8" height="8" rx="4" fill="#828282"/>
</svg>

                <span
                    :class="{'dir-rtl kalameh':!$utils.isLetter(trackData.title)}"
                    class="infoSpan" id="info"
                    v-if="trackData"
                >
						<span :key="index"
                  v-for="(artist,index) in	trackData.artists"
            >
							{{ artist.name }}
							<span :class="{'last':index === trackData.artists.length - 1}" v-if="index !==
							trackData.artists.length - 1">،&nbsp;</span>
						</span>

					</span>
              </div>
  </span>
      <span class="lyric-top-backBtn" @touchend.stop="close" @click.stop="close">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 20L6 12L14 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  </span>


    </div>
    <bottom-box class="inLyricBB"
                :data="trackData"
                :sleep-time="sleepTime">
    </bottom-box>
    <div class="lyric-header kalameh" v-if="trackData">
      <svg width="141" height="43" viewBox="0 0 141 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 43H140.542C127.318 43 115.854 34.054 108.483 23.0744C100.931 11.8261 88.6263 0 70.2712 0C51.9162 0 39.6118 11.8261 32.0598 23.0744C24.6884 34.054 13.2246 43 0 43Z"
            fill="var(--lyricBackColor"/>
      </svg>
      <span class="lyric-header-title">متن</span>
      <span class="lyric-header-hashtag">{{ trackData.lyric.type_title ? trackData.lyric.type_title : '' }}</span>
    </div>


    <div class="lyric-content fit-32 m-auto" :style="{backgroundColor:backColor}">

      <div class="lyric-shareBtn" @click="shareLyrics">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M12.6485 10.2968C11.9216 10.2968 11.2708 10.6283 10.8391 11.1481L9.00926 10.238C8.73886 10.1036 8.41057 10.2136 8.27609 10.4841C8.14159 10.7545 8.25178 11.0828 8.52221 11.2173L10.3548 12.1287C10.3169 12.296 10.297 12.4699 10.297 12.6484C10.297 13.9451 11.3519 15 12.6485 15C13.9452 15 15.0001 13.9451 15.0001 12.6484C15.0001 11.3517 13.9452 10.2968 12.6485 10.2968ZM12.6485 13.9062C11.955 13.9062 11.3907 13.3419 11.3907 12.6484C11.3907 12.4764 11.4254 12.3124 11.4882 12.1629C11.5016 12.143 11.5139 12.122 11.5249 12.0999C11.5366 12.0765 11.5464 12.0525 11.5545 12.0283C11.771 11.6478 12.1803 11.3906 12.6485 11.3906C13.3421 11.3906 13.9063 11.9548 13.9063 12.6484C13.9063 13.3419 13.3421 13.9062 12.6485 13.9062Z"
              fill="#E0E0E0" stroke="#E0E0E0" stroke-width="0.2"/>
          <path
              d="M12.6485 1C11.3518 1 10.2969 2.0549 10.2969 3.35157C10.2969 3.53277 10.3175 3.70925 10.3565 3.87878L5.15188 6.48875C4.72018 5.97531 4.07333 5.64844 3.35157 5.64844C2.05492 5.64844 1 6.70334 1 8.00001C1 9.29668 2.05492 10.3516 3.35157 10.3516C4.07022 10.3516 4.7146 10.0275 5.14628 9.51792L6.02929 9.96731C6.10875 10.0078 6.19343 10.0269 6.27689 10.0269C6.47611 10.0269 6.66818 9.91768 6.76473 9.72797C6.90172 9.45877 6.79459 9.12953 6.52539 8.99253L5.64008 8.54199C5.68131 8.36795 5.70313 8.18647 5.70313 8.00001C5.70313 7.81656 5.68202 7.63795 5.64207 7.4665L10.844 4.85788C11.2757 5.37419 11.9244 5.70313 12.6485 5.70313C13.9451 5.70313 15 4.64824 15 3.35157C15 2.0549 13.9451 1 12.6485 1ZM3.35157 9.25782C2.65802 9.25782 2.09375 8.69356 2.09375 8.00001C2.09375 7.30646 2.65802 6.74219 3.35157 6.74219C4.04511 6.74219 4.60938 7.30646 4.60938 8.00001C4.60938 8.69356 4.04511 9.25782 3.35157 9.25782ZM12.6485 4.60938C11.9549 4.60938 11.3906 4.04511 11.3906 3.35157C11.3906 2.65802 11.9549 2.09375 12.6485 2.09375C13.342 2.09375 13.9063 2.65802 13.9063 3.35157C13.9063 4.04511 13.342 4.60938 12.6485 4.60938Z"
              fill="#E0E0E0" stroke="#E0E0E0" stroke-width="0.2"/>
        </svg>
      </div>
      <div class="lyric-content-list fit-48" v-if="data">
        <div class="lyric-demoLimit" v-if="trackData && trackData.is_demo">
          <img draggable="false" src="@/assets/img/lyricDemoLimit.svg">
          <span class="demoLimit-title">{{ limitation_data.full_screen_text }}</span>
          <ButtonClickable :hasIcon="false"
                           @click.native="$utils.limitAction('lyricsOpened')"
                           class="filled m-auto"
                           style="width:200px; box-shadow: 0px 2px 6px rgba(0,0,0,0.4); min-height: 40px;"
                           text="ویژه شوید">
          </ButtonClickable>
        </div>
        <ul id="syncFS" class="lyric-lines-container kalameh" v-if="data.sync" ref="lyricList"
            @wheel="setScrollableByWheel"
            @touchmove="setScrollable" @touchend="waitToCalm"
            @gesturechange="waitToCalm" @gestureend="waitToCalm">
              <span v-for="(line,index) in synced" :id="'line-'+index" class="lyric-line" @click="setTimeFromLine(line)"
                    :class="synced_line(line)?'white-line':''"
                    :key="index" :data-time="line.time">
          <li>
            {{ line.text }}
          </li>
      </span>

        </ul>

        <ul id="syncFS" class="lyric-lines-container kalameh" v-if="data.text">
    <span v-for="(line,index) in nonSynced" class="lyric-line whiteText" :key="index">
      <li v-if="line.trim().length > 0">{{ line }}</li>
    </span>
        </ul>
      </div>


      <lyrics-in-player-s-k-f-s :count="1" v-if="!data && isLoadingLyrics" style="padding-top:20px;"></lyrics-in-player-s-k-f-s>
      <div v-if="!data && !isLoadingLyrics" style="min-height: 205px; width: 100%;"></div>
      <div class="player-btnContainer">
<!--        <vue-range-slider-->
<!--            ref="slider"-->
<!--            v-model="$root.$refs.thePlayer.playbackTime"-->
<!--            :min="0"-->
<!--            :max="rawDuration"-->
<!--            :step="1"-->
<!--            :speed="0"-->
<!--            :height="3"-->
<!--            style="padding:10px;"-->
<!--            class="fit"-->
<!--            :dot-size="13"-->
<!--            :processStyle="sliderCustomize.processStyle"-->
<!--            :bg-style="sliderCustomize.bgStyle"-->
<!--            :disabled="playerDisabled"-->
<!--            @pointerdown.native="setIsDragging"-->
<!--            @drag-start="setIsDragging"-->
<!--            @drag-end="clearDragging"-->
<!--            @pointerup.native="clearDragging"-->
<!--            stop-propagation>-->
<!--        </vue-range-slider>-->
<!--        <vue-range-slider-->
<!--            ref="slider"-->
<!--            v-if="rawDuration === 0"-->
<!--            :height="3"-->
<!--            class="fit-48 m-auto"-->
<!--            style="padding:10px;"-->
<!--            :disabled="true">-->
<!--        </vue-range-slider>-->
<!--        <vue-range-slider-->
<!--            ref="slider"-->
<!--            v-if="rawDuration > 0"-->
<!--            v-model="$root.$refs.thePlayer.playbackTime"-->
<!--            :max="Number(rawDuration.toPrecision(5))"-->
<!--            :tooltip="'none'"-->
<!--            :interval="0.00001"-->
<!--            :speed="0"-->
<!--            :contained="true"-->
<!--            :drag-on-click="true"-->
<!--            :height="3"-->
<!--            class="fit-48 m-auto"-->
<!--            style="padding:10px;"-->
<!--            :dot-size="13"-->
<!--            :dot-style="sliderCustomize.processStyle"-->
<!--            :processStyle="sliderCustomize.processStyle"-->
<!--            :rail-style="sliderCustomize.bgStyle"-->
<!--            @pointerdown.native="setIsDragging"-->
<!--            @drag-start="setIsDragging"-->
<!--            @drag-end="clearDragging"-->
<!--            @pointerup.native="clearDragging"-->
<!--            stop-propagation>-->
<!--        </vue-range-slider>-->


<!--        <vue-range-slider-->
<!--            ref="slider"-->
<!--            v-if="rawDuration === 0"-->
<!--            :height="3"-->
<!--            :tooltip="'none'"-->
<!--            class="fit-64 m-auto"-->
<!--            style="padding:10px;"-->
<!--            :dot-style="sliderCustomize.dotStyle"-->
<!--            :disabledStyle="sliderCustomize.disabledStyle"-->
<!--            :rail-style="sliderCustomize.bgStyle"-->
<!--            :dot-size="13"-->
<!--            :processStyle="sliderCustomize.processStyle"-->
<!--            :disabled="true">-->
<!--        </vue-range-slider>-->
<!--        <vue-range-slider-->
<!--            ref="slider"-->
<!--            v-if="rawDuration !== 0 && $root.$refs.player.opened && $parent.lyricFS"-->
<!--            v-model="$root.$refs.thePlayer.playbackTime"-->
<!--            :max="Number(rawDuration.toPrecision(5))"-->
<!--            :tooltip="'none'"-->
<!--            :interval="0.00001"-->
<!--            :speed="0"-->
<!--            :contained="true"-->
<!--            :drag-on-click="true"-->
<!--            :height="3"-->
<!--            class="fit-64 m-auto"-->
<!--            style="padding:10px;"-->
<!--            :dot-size="13"-->
<!--            :dot-style="sliderCustomize.dotStyle"-->
<!--            :processStyle="sliderCustomize.processStyle"-->
<!--            :rail-style="sliderCustomize.bgStyle"-->
<!--            :lazy="true"-->
<!--            @change="changeTime"-->
<!--            @pointerdown.native="setIsDragging"-->
<!--            @drag-start="setIsDragging"-->
<!--            @drag-end="clearDragging"-->
<!--            @pointerup.native="clearDragging"-->
<!--            stop-propagation>-->
<!--        </vue-range-slider>-->




        <input class="e-range fit-64 m-auto"
               type="range"
               ref="slider"
               min="0"
               step="0.01"
               :max="Number(rawDuration.toPrecision(2))"
               :value="currentTime"
               @input="changeTime" />


        <buffered :amount="$root.$refs.thePlayer.bufferedAudio"></buffered>
        <div class="duration-container dir-rtl fit-32">
          <span class="full-time">{{ duration === 'NaN:NaN' ? '00:00' : duration }}</span>
          <span class="current-time">{{ seekTime === 'NaN:NaN' ? '00:00' : seekTime }}</span>
        </div>
        <img draggable="false" v-if="!isPlaying" class="player-btn" src="@/assets/icons/lyricPlayBtn.svg" @click="play">
        <img draggable="false" v-else class="player-btn" src="@/assets/icons/whitepause.svg" @click="pause">
      </div>


      <div class="lyric-footer">
        <div class="lyric-btnContainer">
          <div class="lyric-flagBtn dir-rtl kalameh" @click="$utils.openSheet('lyricReportSheet',$root.$refs.app)">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M3.75 16.5C3.3 16.5 3 16.2 3 15.75V3.75C3 3.3 3.3 3 3.75 3H14.25C14.55 3 14.85 3.15 14.925 3.45C15.075 3.75 15 4.05 14.775 4.275L11.925 7.125L14.775 9.975C15 10.2 15.075 10.5 14.925 10.8C14.85 11.1 14.55 11.25 14.25 11.25H4.5V15.75C4.5 16.2 4.2 16.5 3.75 16.5ZM4.5 9.75H12.45L10.35 7.65C10.05 7.35 10.05 6.9 10.35 6.6L12.45 4.5H4.5V9.75Z"
                  fill="#F2F2F2"/>
            </svg>
            <span style="font-size:12px; cursor: pointer;">گزارش خطا</span>
          </div>


          <div class="lyric-toggleBtn" @click.stop="close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M4.33333 0.766739V2.76674C4.33333 3.12036 4.19286 3.4595 3.94281 3.70955C3.69276 3.9596 3.35362 4.10007 3 4.10007H1M13 4.10007H11C10.6464 4.10007 10.3072 3.9596 10.0572 3.70955C9.80714 3.4595 9.66667 3.12036 9.66667 2.76674V0.766739M9.66667 12.7667V10.7667C9.66667 10.4131 9.80714 10.074 10.0572 9.82393C10.3072 9.57388 10.6464 9.43341 11 9.43341H13M1 9.43341H3C3.35362 9.43341 3.69276 9.57388 3.94281 9.82393C4.19286 10.074 4.33333 10.4131 4.33333 10.7667V12.7667"
                  stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

      </div>


    </div>

  </div>
</template>

<script>
// import 'vue-range-component/dist/vue-range-slider.css'
// import VueRangeSlider from 'vue-slider-component'
// import VueEllipseProgress from "vue-ellipse-progress";
import LyricsInPlayerSKFS from "@/components/includes/Elements/Skeletons/lyricsInPlayerSKFS.vue";
// import SleepTimerWidget from "@/components/includes/Elements/SleepTimerWidget.vue";
import BottomBox from "@/components/player/components/bottomBox.vue";
import Buffered from "@/components/player/components/buffered.vue";

let scrollTimer
let timer
let whites
// let lastWhiteTime
// let lastWhiteTimeLimit
// let isInLimit
export default {
  name: "lyricUi",
  components: {
    Buffered,
    BottomBox,
    // SleepTimerWidget,
    LyricsInPlayerSKFS,
    // VueRangeSlider,
    // VueEllipseProgress
  },
  props: {
    trackData: Object,
    data: Object,
    seekTime: String,
    currentTime: Number,
    duration: {
      type: String,
      default: '00:00',
    },
    playBackTime: String,
    playerDisabled: Boolean,
    rawDuration: Number,
    isPlaying: Boolean,
    backColor: String,
    limitation_data: Object,
    sleepTime: Number,
    isLoadingLyrics:Boolean
  },
  data() {
    return {
      opened:false,
      player: null,
      cTime: null,
      lastWhite: null,
      listHeight: 0,
      isShow: false,
      scrollBehaviour: 'smooth',
      scrollable: false,
      isLimited: true,
      sliderCustomize: {
        lineHeight: 2,
        showTooltip: true,
        processStyle: {
          backgroundColor: 'rgba(255,255,255,1)'
        },
        bgStyle: {
          backgroundColor: 'rgba(0,0,0,0.2)'
        },
      },
    }

  },
  mounted() {
      this.$root.$refs.lyricUI = this
      this.opened = true
  },
  destroyed() {
    this.opened = false
    this.$root.$refs.lyricUI = null
  },
  watch: {
    cTime() {
      if (this.$refs.lyricList) {
        whites = this.$refs.lyricList.getElementsByClassName('white-line')
        this.listHeight = this.$refs.lyricList.offsetHeight
        this.lastWhite = whites[whites.length - 1]
        if (this.$store.state.playerLyrics && !this.$root.$refs.thePlayer.isDragging && this.lastWhite) {
          // if (isInLimit) {
          this.activeLineToPosition(this.lastWhite.offsetTop, (this.listHeight / 2) - (this.lastWhite.offsetHeight / 2))
          // }
          // }
        }
      }
    },
    scrollable() {
      this.scrollBehaviour = 'auto'
      setTimeout(() => {
        this.scrollBehaviour = 'smooth'
      }, 100)
    }
    // lastWhite() {
    //   // if(this.lastWhite) {
    //     // lastWhiteTime = Number(this.lastWhite.dataset.time)
    //     // lastWhiteTimeLimit = Number(this.lastWhite.dataset.time) + 1
    //     // isInLimit = (Number(this.lastWhite.dataset.time) < this.currentTime) && (this.currentTime < Number(this.lastWhite.dataset.time) + 1)
    //     // console.log(lastWhiteTime,this.currentTime,lastWhiteTimeLimit,isInLimit)
    //     if(this.$store.state.playerLyrics  && !this.$parent.isDragging) {
    //       // if (isInLimit) {
    //       this.activeLineToPosition(this.lastWhite.offsetTop, (this.listHeight / 2) )
    //       // }
    //     // }
    //   }
    // }
  },
  computed: {
    nonSynced() {
      return this.data.text.split('\n')
    },
    synced() {
      return this.data.sync
    },
    lyricStyle() {
      return {
        '--lyricBackColor': this.backColor
      }
    }
  },
  methods: {
    changeTime() {
      this.$root.$refs.thePlayer.playingElement.seek(this.$refs.slider.value)
    },
    setIsDragging() {
      this.$root.$refs.thePlayer.isDragging = true
      this.scrollBehaviour = 'auto'
    },
    clearDragging() {
      this.$root.$refs.thePlayer.isDragging = false
      this.$root.$refs.thePlayer.playbackTime = this.$root.$refs.thePlayer.playingElement.seek()
      setTimeout(() => {
        this.scrollBehaviour = 'smooth'
      }, 800)

    },
    setScrollableByWheel() {
      clearTimeout(timer)
      this.scrollable = true
      timer = setTimeout(() => {
        this.waitToCalm()
      }, 150);
    },
    setScrollable() {
      clearTimeout(scrollTimer)
      this.scrollable = true
    },
    waitToCalm() {
      if (this.scrollable) {
        scrollTimer = setTimeout(() => {
          this.scrollable = false
        }, 3500)
      }
    },
    gotoSelectedLine() {
      if (this.data && this.data.is_sync_lyric) {
        this.activeLineToPosition(this.lastWhite.offsetTop, (this.listHeight / 2))
      }
    },
    shareLyrics() {
      let toShare = ''
      if (this.data.text) {
        toShare = this.data.text
      } else {
        for (let line in this.data.sync) {
          toShare = toShare + this.data.sync[line].text + '\n'
        }
      }
      window.navigator.share({
        title: 'اشتراک متن آهنگ',
        text: '-- ' + this.trackData.title + ' --' + '\n' + toShare
      })
          .then(() =>
              console.log('Yay, you shared it :)'))
          .catch(error => console.log('Oh noh! You couldn\'t share it! :\'(\n', error));
    },
    synced_line(line) {
      this.cTime = this.currentTime
      return Math.round(this.currentTime) >= line.time;
    },
    setTimeFromLine(line) {
      if (!this.$root.$refs.thePlayer.playerDisabled) {
        this.$root.$refs.thePlayer.playbackTime = line.time + 1
        this.gotoSelectedLine()
        clearTimeout(scrollTimer)
        setTimeout(() => {
          this.scrollable = false
        }, 150)
      }

    },

    play() {
      this.$root.$refs.thePlayer.togglePlay()
    },
    pause() {
      this.$root.$refs.thePlayer.togglePlay()
    },
    activeLineToPosition(lastWhiteOffset, lineOffset) {
      if (!this.scrollable) {
        let topPos = lastWhiteOffset - lineOffset;
        this.$refs.lyricList.scrollTo({
          top: topPos,
          left: 0,
          behavior: this.scrollBehaviour
        });
      }
    },
    close() {
      this.$root.$refs.BigPlayer.lyricFS = false
      this.$root.$refs.BigPlayer.$refs.lyricUI.opened = false
    }
  }
}
</script>




<style id="rangeInLyrics" scoped>
.e-range {
  position: relative;
  display: block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 3px;
  overflow: hidden;
  cursor: pointer;
  padding: 10px 0;
  background: transparent;
  z-index: 1;
}

.e-range:focus {
  outline: none;
}

.e-range::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  background: linear-gradient(to bottom, #ffffff, #ffffff) 100% 50%/100% 3px no-repeat transparent;
  border-radius: 100px;
}

.e-range::-webkit-slider-thumb {
  position: relative;
  -webkit-appearance: none;
  appearance: none;
  height: 13px;
  width: 13px;
  background: #ffffff;
  border-radius: 100%;
  border: 0;
  top: 50%;
  margin-top: -6.5px;
  box-shadow: 1px 0 0 -5px var(--wTrack), 2px 0 0 -5px var(--wTrack), 3px 0 0 -5px var(--wTrack), 4px 0 0 -5px var(--wTrack), 5px 0 0 -5px var(--wTrack), 6px 0 0 -5px var(--wTrack), 7px 0 0 -5px var(--wTrack), 8px 0 0 -5px var(--wTrack), 9px 0 0 -5px var(--wTrack), 10px 0 0 -5px var(--wTrack), 11px 0 0 -5px var(--wTrack), 12px 0 0 -5px var(--wTrack), 13px 0 0 -5px var(--wTrack), 14px 0 0 -5px var(--wTrack), 15px 0 0 -5px var(--wTrack), 16px 0 0 -5px var(--wTrack), 17px 0 0 -5px var(--wTrack), 18px 0 0 -5px var(--wTrack), 19px 0 0 -5px var(--wTrack), 20px 0 0 -5px var(--wTrack), 21px 0 0 -5px var(--wTrack), 22px 0 0 -5px var(--wTrack), 23px 0 0 -5px var(--wTrack), 24px 0 0 -5px var(--wTrack), 25px 0 0 -5px var(--wTrack), 26px 0 0 -5px var(--wTrack), 27px 0 0 -5px var(--wTrack), 28px 0 0 -5px var(--wTrack), 29px 0 0 -5px var(--wTrack), 30px 0 0 -5px var(--wTrack), 31px 0 0 -5px var(--wTrack), 32px 0 0 -5px var(--wTrack), 33px 0 0 -5px var(--wTrack), 34px 0 0 -5px var(--wTrack), 35px 0 0 -5px var(--wTrack), 36px 0 0 -5px var(--wTrack), 37px 0 0 -5px var(--wTrack), 38px 0 0 -5px var(--wTrack), 39px 0 0 -5px var(--wTrack), 40px 0 0 -5px var(--wTrack), 41px 0 0 -5px var(--wTrack), 42px 0 0 -5px var(--wTrack), 43px 0 0 -5px var(--wTrack), 44px 0 0 -5px var(--wTrack), 45px 0 0 -5px var(--wTrack), 46px 0 0 -5px var(--wTrack), 47px 0 0 -5px var(--wTrack), 48px 0 0 -5px var(--wTrack), 49px 0 0 -5px var(--wTrack), 50px 0 0 -5px var(--wTrack), 51px 0 0 -5px var(--wTrack), 52px 0 0 -5px var(--wTrack), 53px 0 0 -5px var(--wTrack), 54px 0 0 -5px var(--wTrack), 55px 0 0 -5px var(--wTrack), 56px 0 0 -5px var(--wTrack), 57px 0 0 -5px var(--wTrack), 58px 0 0 -5px var(--wTrack), 59px 0 0 -5px var(--wTrack), 60px 0 0 -5px var(--wTrack), 61px 0 0 -5px var(--wTrack), 62px 0 0 -5px var(--wTrack), 63px 0 0 -5px var(--wTrack), 64px 0 0 -5px var(--wTrack), 65px 0 0 -5px var(--wTrack), 66px 0 0 -5px var(--wTrack), 67px 0 0 -5px var(--wTrack), 68px 0 0 -5px var(--wTrack), 69px 0 0 -5px var(--wTrack), 70px 0 0 -5px var(--wTrack), 71px 0 0 -5px var(--wTrack), 72px 0 0 -5px var(--wTrack), 73px 0 0 -5px var(--wTrack), 74px 0 0 -5px var(--wTrack), 75px 0 0 -5px var(--wTrack), 76px 0 0 -5px var(--wTrack), 77px 0 0 -5px var(--wTrack), 78px 0 0 -5px var(--wTrack), 79px 0 0 -5px var(--wTrack), 80px 0 0 -5px var(--wTrack), 81px 0 0 -5px var(--wTrack), 82px 0 0 -5px var(--wTrack), 83px 0 0 -5px var(--wTrack), 84px 0 0 -5px var(--wTrack), 85px 0 0 -5px var(--wTrack), 86px 0 0 -5px var(--wTrack), 87px 0 0 -5px var(--wTrack), 88px 0 0 -5px var(--wTrack), 89px 0 0 -5px var(--wTrack), 90px 0 0 -5px var(--wTrack), 91px 0 0 -5px var(--wTrack), 92px 0 0 -5px var(--wTrack), 93px 0 0 -5px var(--wTrack), 94px 0 0 -5px var(--wTrack), 95px 0 0 -5px var(--wTrack), 96px 0 0 -5px var(--wTrack), 97px 0 0 -5px var(--wTrack), 98px 0 0 -5px var(--wTrack), 99px 0 0 -5px var(--wTrack), 100px 0 0 -5px var(--wTrack), 101px 0 0 -5px var(--wTrack), 102px 0 0 -5px var(--wTrack), 103px 0 0 -5px var(--wTrack), 104px 0 0 -5px var(--wTrack), 105px 0 0 -5px var(--wTrack), 106px 0 0 -5px var(--wTrack), 107px 0 0 -5px var(--wTrack), 108px 0 0 -5px var(--wTrack), 109px 0 0 -5px var(--wTrack), 110px 0 0 -5px var(--wTrack), 111px 0 0 -5px var(--wTrack), 112px 0 0 -5px var(--wTrack), 113px 0 0 -5px var(--wTrack), 114px 0 0 -5px var(--wTrack), 115px 0 0 -5px var(--wTrack), 116px 0 0 -5px var(--wTrack), 117px 0 0 -5px var(--wTrack), 118px 0 0 -5px var(--wTrack), 119px 0 0 -5px var(--wTrack), 120px 0 0 -5px var(--wTrack), 121px 0 0 -5px var(--wTrack), 122px 0 0 -5px var(--wTrack), 123px 0 0 -5px var(--wTrack), 124px 0 0 -5px var(--wTrack), 125px 0 0 -5px var(--wTrack), 126px 0 0 -5px var(--wTrack), 127px 0 0 -5px var(--wTrack), 128px 0 0 -5px var(--wTrack), 129px 0 0 -5px var(--wTrack), 130px 0 0 -5px var(--wTrack), 131px 0 0 -5px var(--wTrack), 132px 0 0 -5px var(--wTrack), 133px 0 0 -5px var(--wTrack), 134px 0 0 -5px var(--wTrack), 135px 0 0 -5px var(--wTrack), 136px 0 0 -5px var(--wTrack), 137px 0 0 -5px var(--wTrack), 138px 0 0 -5px var(--wTrack), 139px 0 0 -5px var(--wTrack), 140px 0 0 -5px var(--wTrack), 141px 0 0 -5px var(--wTrack), 142px 0 0 -5px var(--wTrack), 143px 0 0 -5px var(--wTrack), 144px 0 0 -5px var(--wTrack), 145px 0 0 -5px var(--wTrack), 146px 0 0 -5px var(--wTrack), 147px 0 0 -5px var(--wTrack), 148px 0 0 -5px var(--wTrack), 149px 0 0 -5px var(--wTrack), 150px 0 0 -5px var(--wTrack), 151px 0 0 -5px var(--wTrack), 152px 0 0 -5px var(--wTrack), 153px 0 0 -5px var(--wTrack), 154px 0 0 -5px var(--wTrack), 155px 0 0 -5px var(--wTrack), 156px 0 0 -5px var(--wTrack), 157px 0 0 -5px var(--wTrack), 158px 0 0 -5px var(--wTrack), 159px 0 0 -5px var(--wTrack), 160px 0 0 -5px var(--wTrack), 161px 0 0 -5px var(--wTrack), 162px 0 0 -5px var(--wTrack), 163px 0 0 -5px var(--wTrack), 164px 0 0 -5px var(--wTrack), 165px 0 0 -5px var(--wTrack), 166px 0 0 -5px var(--wTrack), 167px 0 0 -5px var(--wTrack), 168px 0 0 -5px var(--wTrack), 169px 0 0 -5px var(--wTrack), 170px 0 0 -5px var(--wTrack), 171px 0 0 -5px var(--wTrack), 172px 0 0 -5px var(--wTrack), 173px 0 0 -5px var(--wTrack), 174px 0 0 -5px var(--wTrack), 175px 0 0 -5px var(--wTrack), 176px 0 0 -5px var(--wTrack), 177px 0 0 -5px var(--wTrack), 178px 0 0 -5px var(--wTrack), 179px 0 0 -5px var(--wTrack), 180px 0 0 -5px var(--wTrack), 181px 0 0 -5px var(--wTrack), 182px 0 0 -5px var(--wTrack), 183px 0 0 -5px var(--wTrack), 184px 0 0 -5px var(--wTrack), 185px 0 0 -5px var(--wTrack), 186px 0 0 -5px var(--wTrack), 187px 0 0 -5px var(--wTrack), 188px 0 0 -5px var(--wTrack), 189px 0 0 -5px var(--wTrack), 190px 0 0 -5px var(--wTrack), 191px 0 0 -5px var(--wTrack), 192px 0 0 -5px var(--wTrack), 193px 0 0 -5px var(--wTrack), 194px 0 0 -5px var(--wTrack), 195px 0 0 -5px var(--wTrack), 196px 0 0 -5px var(--wTrack), 197px 0 0 -5px var(--wTrack), 198px 0 0 -5px var(--wTrack), 199px 0 0 -5px var(--wTrack), 200px 0 0 -5px var(--wTrack), 201px 0 0 -5px var(--wTrack), 202px 0 0 -5px var(--wTrack), 203px 0 0 -5px var(--wTrack), 204px 0 0 -5px var(--wTrack), 205px 0 0 -5px var(--wTrack), 206px 0 0 -5px var(--wTrack), 207px 0 0 -5px var(--wTrack), 208px 0 0 -5px var(--wTrack), 209px 0 0 -5px var(--wTrack), 210px 0 0 -5px var(--wTrack), 211px 0 0 -5px var(--wTrack), 212px 0 0 -5px var(--wTrack), 213px 0 0 -5px var(--wTrack), 214px 0 0 -5px var(--wTrack), 215px 0 0 -5px var(--wTrack), 216px 0 0 -5px var(--wTrack), 217px 0 0 -5px var(--wTrack), 218px 0 0 -5px var(--wTrack), 219px 0 0 -5px var(--wTrack), 220px 0 0 -5px var(--wTrack), 221px 0 0 -5px var(--wTrack), 222px 0 0 -5px var(--wTrack), 223px 0 0 -5px var(--wTrack), 224px 0 0 -5px var(--wTrack), 225px 0 0 -5px var(--wTrack), 226px 0 0 -5px var(--wTrack), 227px 0 0 -5px var(--wTrack), 228px 0 0 -5px var(--wTrack), 229px 0 0 -5px var(--wTrack), 230px 0 0 -5px var(--wTrack), 231px 0 0 -5px var(--wTrack), 232px 0 0 -5px var(--wTrack), 233px 0 0 -5px var(--wTrack), 234px 0 0 -5px var(--wTrack), 235px 0 0 -5px var(--wTrack), 236px 0 0 -5px var(--wTrack), 237px 0 0 -5px var(--wTrack), 238px 0 0 -5px var(--wTrack), 239px 0 0 -5px var(--wTrack), 240px 0 0 -5px var(--wTrack), 241px 0 0 -5px var(--wTrack), 242px 0 0 -5px var(--wTrack), 243px 0 0 -5px var(--wTrack), 244px 0 0 -5px var(--wTrack), 245px 0 0 -5px var(--wTrack), 246px 0 0 -5px var(--wTrack), 247px 0 0 -5px var(--wTrack), 248px 0 0 -5px var(--wTrack), 249px 0 0 -5px var(--wTrack), 250px 0 0 -5px var(--wTrack), 251px 0 0 -5px var(--wTrack), 252px 0 0 -5px var(--wTrack), 253px 0 0 -5px var(--wTrack), 254px 0 0 -5px var(--wTrack), 255px 0 0 -5px var(--wTrack), 256px 0 0 -5px var(--wTrack), 257px 0 0 -5px var(--wTrack), 258px 0 0 -5px var(--wTrack), 259px 0 0 -5px var(--wTrack), 260px 0 0 -5px var(--wTrack), 261px 0 0 -5px var(--wTrack), 262px 0 0 -5px var(--wTrack), 263px 0 0 -5px var(--wTrack), 264px 0 0 -5px var(--wTrack), 265px 0 0 -5px var(--wTrack), 266px 0 0 -5px var(--wTrack), 267px 0 0 -5px var(--wTrack), 268px 0 0 -5px var(--wTrack), 269px 0 0 -5px var(--wTrack), 270px 0 0 -5px var(--wTrack), 271px 0 0 -5px var(--wTrack), 272px 0 0 -5px var(--wTrack), 273px 0 0 -5px var(--wTrack), 274px 0 0 -5px var(--wTrack), 275px 0 0 -5px var(--wTrack), 276px 0 0 -5px var(--wTrack), 277px 0 0 -5px var(--wTrack), 278px 0 0 -5px var(--wTrack), 279px 0 0 -5px var(--wTrack), 280px 0 0 -5px var(--wTrack), 281px 0 0 -5px var(--wTrack), 282px 0 0 -5px var(--wTrack), 283px 0 0 -5px var(--wTrack), 284px 0 0 -5px var(--wTrack), 285px 0 0 -5px var(--wTrack), 286px 0 0 -5px var(--wTrack), 287px 0 0 -5px var(--wTrack), 288px 0 0 -5px var(--wTrack), 289px 0 0 -5px var(--wTrack), 290px 0 0 -5px var(--wTrack), 291px 0 0 -5px var(--wTrack), 292px 0 0 -5px var(--wTrack), 293px 0 0 -5px var(--wTrack), 294px 0 0 -5px var(--wTrack), 295px 0 0 -5px var(--wTrack), 296px 0 0 -5px var(--wTrack), 297px 0 0 -5px var(--wTrack), 298px 0 0 -5px var(--wTrack), 299px 0 0 -5px var(--wTrack), 300px 0 0 -5px var(--wTrack), 301px 0 0 -5px var(--wTrack), 302px 0 0 -5px var(--wTrack), 303px 0 0 -5px var(--wTrack), 304px 0 0 -5px var(--wTrack), 305px 0 0 -5px var(--wTrack), 306px 0 0 -5px var(--wTrack), 307px 0 0 -5px var(--wTrack), 308px 0 0 -5px var(--wTrack), 309px 0 0 -5px var(--wTrack), 310px 0 0 -5px var(--wTrack), 311px 0 0 -5px var(--wTrack), 312px 0 0 -5px var(--wTrack), 313px 0 0 -5px var(--wTrack), 314px 0 0 -5px var(--wTrack), 315px 0 0 -5px var(--wTrack), 316px 0 0 -5px var(--wTrack), 317px 0 0 -5px var(--wTrack), 318px 0 0 -5px var(--wTrack), 319px 0 0 -5px var(--wTrack), 320px 0 0 -5px var(--wTrack), 321px 0 0 -5px var(--wTrack), 322px 0 0 -5px var(--wTrack), 323px 0 0 -5px var(--wTrack), 324px 0 0 -5px var(--wTrack), 325px 0 0 -5px var(--wTrack), 326px 0 0 -5px var(--wTrack), 327px 0 0 -5px var(--wTrack), 328px 0 0 -5px var(--wTrack), 329px 0 0 -5px var(--wTrack), 330px 0 0 -5px var(--wTrack), 331px 0 0 -5px var(--wTrack), 332px 0 0 -5px var(--wTrack), 333px 0 0 -5px var(--wTrack), 334px 0 0 -5px var(--wTrack), 335px 0 0 -5px var(--wTrack), 336px 0 0 -5px var(--wTrack), 337px 0 0 -5px var(--wTrack), 338px 0 0 -5px var(--wTrack), 339px 0 0 -5px var(--wTrack), 340px 0 0 -5px var(--wTrack), 341px 0 0 -5px var(--wTrack), 342px 0 0 -5px var(--wTrack), 343px 0 0 -5px var(--wTrack), 344px 0 0 -5px var(--wTrack), 345px 0 0 -5px var(--wTrack), 346px 0 0 -5px var(--wTrack), 347px 0 0 -5px var(--wTrack), 348px 0 0 -5px var(--wTrack), 349px 0 0 -5px var(--wTrack), 350px 0 0 -5px var(--wTrack), 351px 0 0 -5px var(--wTrack), 352px 0 0 -5px var(--wTrack), 353px 0 0 -5px var(--wTrack), 354px 0 0 -5px var(--wTrack), 355px 0 0 -5px var(--wTrack), 356px 0 0 -5px var(--wTrack), 357px 0 0 -5px var(--wTrack), 358px 0 0 -5px var(--wTrack), 359px 0 0 -5px var(--wTrack), 360px 0 0 -5px var(--wTrack), 361px 0 0 -5px var(--wTrack), 362px 0 0 -5px var(--wTrack), 363px 0 0 -5px var(--wTrack), 364px 0 0 -5px var(--wTrack), 365px 0 0 -5px var(--wTrack), 366px 0 0 -5px var(--wTrack), 367px 0 0 -5px var(--wTrack), 368px 0 0 -5px var(--wTrack), 369px 0 0 -5px var(--wTrack), 370px 0 0 -5px var(--wTrack), 371px 0 0 -5px var(--wTrack), 372px 0 0 -5px var(--wTrack), 373px 0 0 -5px var(--wTrack), 374px 0 0 -5px var(--wTrack), 375px 0 0 -5px var(--wTrack), 376px 0 0 -5px var(--wTrack), 377px 0 0 -5px var(--wTrack), 378px 0 0 -5px var(--wTrack), 379px 0 0 -5px var(--wTrack), 380px 0 0 -5px var(--wTrack), 381px 0 0 -5px var(--wTrack), 382px 0 0 -5px var(--wTrack), 383px 0 0 -5px var(--wTrack), 384px 0 0 -5px var(--wTrack), 385px 0 0 -5px var(--wTrack), 386px 0 0 -5px var(--wTrack), 387px 0 0 -5px var(--wTrack), 388px 0 0 -5px var(--wTrack), 389px 0 0 -5px var(--wTrack), 390px 0 0 -5px var(--wTrack), 391px 0 0 -5px var(--wTrack), 392px 0 0 -5px var(--wTrack), 393px 0 0 -5px var(--wTrack), 394px 0 0 -5px var(--wTrack), 395px 0 0 -5px var(--wTrack), 396px 0 0 -5px var(--wTrack), 397px 0 0 -5px var(--wTrack), 398px 0 0 -5px var(--wTrack), 399px 0 0 -5px var(--wTrack), 400px 0 0 -5px var(--wTrack), 401px 0 0 -5px var(--wTrack), 402px 0 0 -5px var(--wTrack), 403px 0 0 -5px var(--wTrack), 404px 0 0 -5px var(--wTrack), 405px 0 0 -5px var(--wTrack), 406px 0 0 -5px var(--wTrack), 407px 0 0 -5px var(--wTrack), 408px 0 0 -5px var(--wTrack), 409px 0 0 -5px var(--wTrack), 410px 0 0 -5px var(--wTrack), 411px 0 0 -5px var(--wTrack), 412px 0 0 -5px var(--wTrack), 413px 0 0 -5px var(--wTrack), 414px 0 0 -5px var(--wTrack), 415px 0 0 -5px var(--wTrack), 416px 0 0 -5px var(--wTrack), 417px 0 0 -5px var(--wTrack), 418px 0 0 -5px var(--wTrack), 419px 0 0 -5px var(--wTrack), 420px 0 0 -5px var(--wTrack), 421px 0 0 -5px var(--wTrack), 422px 0 0 -5px var(--wTrack), 423px 0 0 -5px var(--wTrack), 424px 0 0 -5px var(--wTrack), 425px 0 0 -5px var(--wTrack), 426px 0 0 -5px var(--wTrack), 427px 0 0 -5px var(--wTrack), 428px 0 0 -5px var(--wTrack), 429px 0 0 -5px var(--wTrack), 430px 0 0 -5px var(--wTrack), 431px 0 0 -5px var(--wTrack), 432px 0 0 -5px var(--wTrack), 433px 0 0 -5px var(--wTrack), 434px 0 0 -5px var(--wTrack), 435px 0 0 -5px var(--wTrack), 436px 0 0 -5px var(--wTrack), 437px 0 0 -5px var(--wTrack), 438px 0 0 -5px var(--wTrack), 439px 0 0 -5px var(--wTrack), 440px 0 0 -5px var(--wTrack), 441px 0 0 -5px var(--wTrack), 442px 0 0 -5px var(--wTrack), 443px 0 0 -5px var(--wTrack), 444px 0 0 -5px var(--wTrack), 445px 0 0 -5px var(--wTrack), 446px 0 0 -5px var(--wTrack), 447px 0 0 -5px var(--wTrack), 448px 0 0 -5px var(--wTrack), 449px 0 0 -5px var(--wTrack), 450px 0 0 -5px var(--wTrack), 451px 0 0 -5px var(--wTrack), 452px 0 0 -5px var(--wTrack), 453px 0 0 -5px var(--wTrack), 454px 0 0 -5px var(--wTrack), 455px 0 0 -5px var(--wTrack), 456px 0 0 -5px var(--wTrack), 457px 0 0 -5px var(--wTrack), 458px 0 0 -5px var(--wTrack), 459px 0 0 -5px var(--wTrack), 460px 0 0 -5px var(--wTrack), 461px 0 0 -5px var(--wTrack), 462px 0 0 -5px var(--wTrack), 463px 0 0 -5px var(--wTrack), 464px 0 0 -5px var(--wTrack), 465px 0 0 -5px var(--wTrack), 466px 0 0 -5px var(--wTrack), 467px 0 0 -5px var(--wTrack), 468px 0 0 -5px var(--wTrack), 469px 0 0 -5px var(--wTrack), 470px 0 0 -5px var(--wTrack), 471px 0 0 -5px var(--wTrack), 472px 0 0 -5px var(--wTrack), 473px 0 0 -5px var(--wTrack), 474px 0 0 -5px var(--wTrack), 475px 0 0 -5px var(--wTrack), 476px 0 0 -5px var(--wTrack), 477px 0 0 -5px var(--wTrack), 478px 0 0 -5px var(--wTrack), 479px 0 0 -5px var(--wTrack), 480px 0 0 -5px var(--wTrack), 481px 0 0 -5px var(--wTrack), 482px 0 0 -5px var(--wTrack), 483px 0 0 -5px var(--wTrack), 484px 0 0 -5px var(--wTrack), 485px 0 0 -5px var(--wTrack), 486px 0 0 -5px var(--wTrack), 487px 0 0 -5px var(--wTrack), 488px 0 0 -5px var(--wTrack), 489px 0 0 -5px var(--wTrack), 490px 0 0 -5px var(--wTrack), 491px 0 0 -5px var(--wTrack), 492px 0 0 -5px var(--wTrack), 493px 0 0 -5px var(--wTrack), 494px 0 0 -5px var(--wTrack), 495px 0 0 -5px var(--wTrack), 496px 0 0 -5px var(--wTrack), 497px 0 0 -5px var(--wTrack), 498px 0 0 -5px var(--wTrack), 499px 0 0 -5px var(--wTrack), 500px 0 0 -5px var(--wTrack), 501px 0 0 -5px var(--wTrack), 502px 0 0 -5px var(--wTrack), 503px 0 0 -5px var(--wTrack), 504px 0 0 -5px var(--wTrack), 505px 0 0 -5px var(--wTrack), 506px 0 0 -5px var(--wTrack), 507px 0 0 -5px var(--wTrack), 508px 0 0 -5px var(--wTrack), 509px 0 0 -5px var(--wTrack), 510px 0 0 -5px var(--wTrack), 511px 0 0 -5px var(--wTrack), 512px 0 0 -5px var(--wTrack), 513px 0 0 -5px var(--wTrack), 514px 0 0 -5px var(--wTrack), 515px 0 0 -5px var(--wTrack), 516px 0 0 -5px var(--wTrack), 517px 0 0 -5px var(--wTrack), 518px 0 0 -5px var(--wTrack), 519px 0 0 -5px var(--wTrack), 520px 0 0 -5px var(--wTrack), 521px 0 0 -5px var(--wTrack), 522px 0 0 -5px var(--wTrack), 523px 0 0 -5px var(--wTrack), 524px 0 0 -5px var(--wTrack), 525px 0 0 -5px var(--wTrack), 526px 0 0 -5px var(--wTrack), 527px 0 0 -5px var(--wTrack), 528px 0 0 -5px var(--wTrack), 529px 0 0 -5px var(--wTrack), 530px 0 0 -5px var(--wTrack), 531px 0 0 -5px var(--wTrack), 532px 0 0 -5px var(--wTrack), 533px 0 0 -5px var(--wTrack), 534px 0 0 -5px var(--wTrack), 535px 0 0 -5px var(--wTrack), 536px 0 0 -5px var(--wTrack), 537px 0 0 -5px var(--wTrack), 538px 0 0 -5px var(--wTrack), 539px 0 0 -5px var(--wTrack), 540px 0 0 -5px var(--wTrack), 541px 0 0 -5px var(--wTrack), 542px 0 0 -5px var(--wTrack), 543px 0 0 -5px var(--wTrack), 544px 0 0 -5px var(--wTrack), 545px 0 0 -5px var(--wTrack), 546px 0 0 -5px var(--wTrack), 547px 0 0 -5px var(--wTrack), 548px 0 0 -5px var(--wTrack), 549px 0 0 -5px var(--wTrack), 550px 0 0 -5px var(--wTrack), 551px 0 0 -5px var(--wTrack), 552px 0 0 -5px var(--wTrack), 553px 0 0 -5px var(--wTrack), 554px 0 0 -5px var(--wTrack), 555px 0 0 -5px var(--wTrack), 556px 0 0 -5px var(--wTrack), 557px 0 0 -5px var(--wTrack), 558px 0 0 -5px var(--wTrack), 559px 0 0 -5px var(--wTrack), 560px 0 0 -5px var(--wTrack), 561px 0 0 -5px var(--wTrack), 562px 0 0 -5px var(--wTrack), 563px 0 0 -5px var(--wTrack), 564px 0 0 -5px var(--wTrack), 565px 0 0 -5px var(--wTrack), 566px 0 0 -5px var(--wTrack), 567px 0 0 -5px var(--wTrack), 568px 0 0 -5px var(--wTrack), 569px 0 0 -5px var(--wTrack), 570px 0 0 -5px var(--wTrack), 571px 0 0 -5px var(--wTrack), 572px 0 0 -5px var(--wTrack), 573px 0 0 -5px var(--wTrack), 574px 0 0 -5px var(--wTrack), 575px 0 0 -5px var(--wTrack), 576px 0 0 -5px var(--wTrack), 577px 0 0 -5px var(--wTrack), 578px 0 0 -5px var(--wTrack), 579px 0 0 -5px var(--wTrack), 580px 0 0 -5px var(--wTrack), 581px 0 0 -5px var(--wTrack), 582px 0 0 -5px var(--wTrack), 583px 0 0 -5px var(--wTrack), 584px 0 0 -5px var(--wTrack), 585px 0 0 -5px var(--wTrack), 586px 0 0 -5px var(--wTrack), 587px 0 0 -5px var(--wTrack), 588px 0 0 -5px var(--wTrack), 589px 0 0 -5px var(--wTrack), 590px 0 0 -5px var(--wTrack), 591px 0 0 -5px var(--wTrack), 592px 0 0 -5px var(--wTrack), 593px 0 0 -5px var(--wTrack), 594px 0 0 -5px var(--wTrack), 595px 0 0 -5px var(--wTrack), 596px 0 0 -5px var(--wTrack), 597px 0 0 -5px var(--wTrack), 598px 0 0 -5px var(--wTrack), 599px 0 0 -5px var(--wTrack), 600px 0 0 -5px var(--wTrack), 601px 0 0 -5px var(--wTrack), 602px 0 0 -5px var(--wTrack), 603px 0 0 -5px var(--wTrack), 604px 0 0 -5px var(--wTrack), 605px 0 0 -5px var(--wTrack), 606px 0 0 -5px var(--wTrack), 607px 0 0 -5px var(--wTrack), 608px 0 0 -5px var(--wTrack), 609px 0 0 -5px var(--wTrack), 610px 0 0 -5px var(--wTrack), 611px 0 0 -5px var(--wTrack), 612px 0 0 -5px var(--wTrack), 613px 0 0 -5px var(--wTrack), 614px 0 0 -5px var(--wTrack), 615px 0 0 -5px var(--wTrack), 616px 0 0 -5px var(--wTrack), 617px 0 0 -5px var(--wTrack), 618px 0 0 -5px var(--wTrack), 619px 0 0 -5px var(--wTrack), 620px 0 0 -5px var(--wTrack), 621px 0 0 -5px var(--wTrack), 622px 0 0 -5px var(--wTrack), 623px 0 0 -5px var(--wTrack), 624px 0 0 -5px var(--wTrack), 625px 0 0 -5px var(--wTrack), 626px 0 0 -5px var(--wTrack), 627px 0 0 -5px var(--wTrack), 628px 0 0 -5px var(--wTrack), 629px 0 0 -5px var(--wTrack), 630px 0 0 -5px var(--wTrack), 631px 0 0 -5px var(--wTrack), 632px 0 0 -5px var(--wTrack), 633px 0 0 -5px var(--wTrack), 634px 0 0 -5px var(--wTrack), 635px 0 0 -5px var(--wTrack), 636px 0 0 -5px var(--wTrack), 637px 0 0 -5px var(--wTrack), 638px 0 0 -5px var(--wTrack), 639px 0 0 -5px var(--wTrack), 640px 0 0 -5px var(--wTrack), 641px 0 0 -5px var(--wTrack), 642px 0 0 -5px var(--wTrack), 643px 0 0 -5px var(--wTrack), 644px 0 0 -5px var(--wTrack), 645px 0 0 -5px var(--wTrack), 646px 0 0 -5px var(--wTrack), 647px 0 0 -5px var(--wTrack), 648px 0 0 -5px var(--wTrack), 649px 0 0 -5px var(--wTrack), 650px 0 0 -5px var(--wTrack), 651px 0 0 -5px var(--wTrack), 652px 0 0 -5px var(--wTrack), 653px 0 0 -5px var(--wTrack), 654px 0 0 -5px var(--wTrack), 655px 0 0 -5px var(--wTrack), 656px 0 0 -5px var(--wTrack), 657px 0 0 -5px var(--wTrack), 658px 0 0 -5px var(--wTrack), 659px 0 0 -5px var(--wTrack), 660px 0 0 -5px var(--wTrack), 661px 0 0 -5px var(--wTrack), 662px 0 0 -5px var(--wTrack), 663px 0 0 -5px var(--wTrack), 664px 0 0 -5px var(--wTrack), 665px 0 0 -5px var(--wTrack), 666px 0 0 -5px var(--wTrack), 667px 0 0 -5px var(--wTrack), 668px 0 0 -5px var(--wTrack), 669px 0 0 -5px var(--wTrack), 670px 0 0 -5px var(--wTrack), 671px 0 0 -5px var(--wTrack), 672px 0 0 -5px var(--wTrack), 673px 0 0 -5px var(--wTrack), 674px 0 0 -5px var(--wTrack), 675px 0 0 -5px var(--wTrack), 676px 0 0 -5px var(--wTrack), 677px 0 0 -5px var(--wTrack), 678px 0 0 -5px var(--wTrack), 679px 0 0 -5px var(--wTrack), 680px 0 0 -5px var(--wTrack), 681px 0 0 -5px var(--wTrack), 682px 0 0 -5px var(--wTrack), 683px 0 0 -5px var(--wTrack), 684px 0 0 -5px var(--wTrack), 685px 0 0 -5px var(--wTrack), 686px 0 0 -5px var(--wTrack), 687px 0 0 -5px var(--wTrack), 688px 0 0 -5px var(--wTrack), 689px 0 0 -5px var(--wTrack), 690px 0 0 -5px var(--wTrack), 691px 0 0 -5px var(--wTrack), 692px 0 0 -5px var(--wTrack), 693px 0 0 -5px var(--wTrack), 694px 0 0 -5px var(--wTrack), 695px 0 0 -5px var(--wTrack), 696px 0 0 -5px var(--wTrack), 697px 0 0 -5px var(--wTrack), 698px 0 0 -5px var(--wTrack), 699px 0 0 -5px var(--wTrack), 700px 0 0 -5px var(--wTrack), 701px 0 0 -5px var(--wTrack), 702px 0 0 -5px var(--wTrack), 703px 0 0 -5px var(--wTrack), 704px 0 0 -5px var(--wTrack), 705px 0 0 -5px var(--wTrack), 706px 0 0 -5px var(--wTrack), 707px 0 0 -5px var(--wTrack), 708px 0 0 -5px var(--wTrack), 709px 0 0 -5px var(--wTrack), 710px 0 0 -5px var(--wTrack), 711px 0 0 -5px var(--wTrack), 712px 0 0 -5px var(--wTrack), 713px 0 0 -5px var(--wTrack), 714px 0 0 -5px var(--wTrack), 715px 0 0 -5px var(--wTrack), 716px 0 0 -5px var(--wTrack), 717px 0 0 -5px var(--wTrack), 718px 0 0 -5px var(--wTrack), 719px 0 0 -5px var(--wTrack), 720px 0 0 -5px var(--wTrack), 721px 0 0 -5px var(--wTrack), 722px 0 0 -5px var(--wTrack), 723px 0 0 -5px var(--wTrack), 724px 0 0 -5px var(--wTrack), 725px 0 0 -5px var(--wTrack), 726px 0 0 -5px var(--wTrack), 727px 0 0 -5px var(--wTrack), 728px 0 0 -5px var(--wTrack), 729px 0 0 -5px var(--wTrack), 730px 0 0 -5px var(--wTrack), 731px 0 0 -5px var(--wTrack), 732px 0 0 -5px var(--wTrack), 733px 0 0 -5px var(--wTrack), 734px 0 0 -5px var(--wTrack), 735px 0 0 -5px var(--wTrack), 736px 0 0 -5px var(--wTrack), 737px 0 0 -5px var(--wTrack), 738px 0 0 -5px var(--wTrack), 739px 0 0 -5px var(--wTrack), 740px 0 0 -5px var(--wTrack), 741px 0 0 -5px var(--wTrack), 742px 0 0 -5px var(--wTrack), 743px 0 0 -5px var(--wTrack), 744px 0 0 -5px var(--wTrack), 745px 0 0 -5px var(--wTrack), 746px 0 0 -5px var(--wTrack), 747px 0 0 -5px var(--wTrack), 748px 0 0 -5px var(--wTrack), 749px 0 0 -5px var(--wTrack), 750px 0 0 -5px var(--wTrack), 751px 0 0 -5px var(--wTrack), 752px 0 0 -5px var(--wTrack), 753px 0 0 -5px var(--wTrack), 754px 0 0 -5px var(--wTrack), 755px 0 0 -5px var(--wTrack), 756px 0 0 -5px var(--wTrack), 757px 0 0 -5px var(--wTrack), 758px 0 0 -5px var(--wTrack), 759px 0 0 -5px var(--wTrack), 760px 0 0 -5px var(--wTrack), 761px 0 0 -5px var(--wTrack), 762px 0 0 -5px var(--wTrack), 763px 0 0 -5px var(--wTrack), 764px 0 0 -5px var(--wTrack), 765px 0 0 -5px var(--wTrack), 766px 0 0 -5px var(--wTrack), 767px 0 0 -5px var(--wTrack), 768px 0 0 -5px var(--wTrack), 769px 0 0 -5px var(--wTrack), 770px 0 0 -5px var(--wTrack), 771px 0 0 -5px var(--wTrack), 772px 0 0 -5px var(--wTrack), 773px 0 0 -5px var(--wTrack), 774px 0 0 -5px var(--wTrack), 775px 0 0 -5px var(--wTrack), 776px 0 0 -5px var(--wTrack), 777px 0 0 -5px var(--wTrack), 778px 0 0 -5px var(--wTrack), 779px 0 0 -5px var(--wTrack), 780px 0 0 -5px var(--wTrack), 781px 0 0 -5px var(--wTrack), 782px 0 0 -5px var(--wTrack), 783px 0 0 -5px var(--wTrack), 784px 0 0 -5px var(--wTrack), 785px 0 0 -5px var(--wTrack), 786px 0 0 -5px var(--wTrack), 787px 0 0 -5px var(--wTrack), 788px 0 0 -5px var(--wTrack), 789px 0 0 -5px var(--wTrack), 790px 0 0 -5px var(--wTrack), 791px 0 0 -5px var(--wTrack), 792px 0 0 -5px var(--wTrack), 793px 0 0 -5px var(--wTrack), 794px 0 0 -5px var(--wTrack), 795px 0 0 -5px var(--wTrack), 796px 0 0 -5px var(--wTrack), 797px 0 0 -5px var(--wTrack), 798px 0 0 -5px var(--wTrack), 799px 0 0 -5px var(--wTrack), 800px 0 0 -5px var(--wTrack), 801px 0 0 -5px var(--wTrack), 802px 0 0 -5px var(--wTrack), 803px 0 0 -5px var(--wTrack), 804px 0 0 -5px var(--wTrack), 805px 0 0 -5px var(--wTrack), 806px 0 0 -5px var(--wTrack), 807px 0 0 -5px var(--wTrack), 808px 0 0 -5px var(--wTrack), 809px 0 0 -5px var(--wTrack), 810px 0 0 -5px var(--wTrack), 811px 0 0 -5px var(--wTrack), 812px 0 0 -5px var(--wTrack), 813px 0 0 -5px var(--wTrack), 814px 0 0 -5px var(--wTrack), 815px 0 0 -5px var(--wTrack), 816px 0 0 -5px var(--wTrack), 817px 0 0 -5px var(--wTrack), 818px 0 0 -5px var(--wTrack), 819px 0 0 -5px var(--wTrack), 820px 0 0 -5px var(--wTrack), 821px 0 0 -5px var(--wTrack), 822px 0 0 -5px var(--wTrack), 823px 0 0 -5px var(--wTrack), 824px 0 0 -5px var(--wTrack), 825px 0 0 -5px var(--wTrack), 826px 0 0 -5px var(--wTrack), 827px 0 0 -5px var(--wTrack), 828px 0 0 -5px var(--wTrack), 829px 0 0 -5px var(--wTrack), 830px 0 0 -5px var(--wTrack), 831px 0 0 -5px var(--wTrack), 832px 0 0 -5px var(--wTrack), 833px 0 0 -5px var(--wTrack), 834px 0 0 -5px var(--wTrack), 835px 0 0 -5px var(--wTrack), 836px 0 0 -5px var(--wTrack), 837px 0 0 -5px var(--wTrack), 838px 0 0 -5px var(--wTrack), 839px 0 0 -5px var(--wTrack), 840px 0 0 -5px var(--wTrack), 841px 0 0 -5px var(--wTrack), 842px 0 0 -5px var(--wTrack), 843px 0 0 -5px var(--wTrack), 844px 0 0 -5px var(--wTrack), 845px 0 0 -5px var(--wTrack), 846px 0 0 -5px var(--wTrack), 847px 0 0 -5px var(--wTrack), 848px 0 0 -5px var(--wTrack), 849px 0 0 -5px var(--wTrack), 850px 0 0 -5px var(--wTrack), 851px 0 0 -5px var(--wTrack), 852px 0 0 -5px var(--wTrack), 853px 0 0 -5px var(--wTrack), 854px 0 0 -5px var(--wTrack), 855px 0 0 -5px var(--wTrack), 856px 0 0 -5px var(--wTrack), 857px 0 0 -5px var(--wTrack), 858px 0 0 -5px var(--wTrack), 859px 0 0 -5px var(--wTrack), 860px 0 0 -5px var(--wTrack), 861px 0 0 -5px var(--wTrack), 862px 0 0 -5px var(--wTrack), 863px 0 0 -5px var(--wTrack), 864px 0 0 -5px var(--wTrack), 865px 0 0 -5px var(--wTrack), 866px 0 0 -5px var(--wTrack), 867px 0 0 -5px var(--wTrack), 868px 0 0 -5px var(--wTrack), 869px 0 0 -5px var(--wTrack), 870px 0 0 -5px var(--wTrack), 871px 0 0 -5px var(--wTrack), 872px 0 0 -5px var(--wTrack), 873px 0 0 -5px var(--wTrack), 874px 0 0 -5px var(--wTrack), 875px 0 0 -5px var(--wTrack), 876px 0 0 -5px var(--wTrack), 877px 0 0 -5px var(--wTrack), 878px 0 0 -5px var(--wTrack), 879px 0 0 -5px var(--wTrack), 880px 0 0 -5px var(--wTrack), 881px 0 0 -5px var(--wTrack), 882px 0 0 -5px var(--wTrack), 883px 0 0 -5px var(--wTrack), 884px 0 0 -5px var(--wTrack), 885px 0 0 -5px var(--wTrack), 886px 0 0 -5px var(--wTrack), 887px 0 0 -5px var(--wTrack), 888px 0 0 -5px var(--wTrack), 889px 0 0 -5px var(--wTrack), 890px 0 0 -5px var(--wTrack), 891px 0 0 -5px var(--wTrack), 892px 0 0 -5px var(--wTrack), 893px 0 0 -5px var(--wTrack), 894px 0 0 -5px var(--wTrack), 895px 0 0 -5px var(--wTrack), 896px 0 0 -5px var(--wTrack), 897px 0 0 -5px var(--wTrack), 898px 0 0 -5px var(--wTrack), 899px 0 0 -5px var(--wTrack), 900px 0 0 -5px var(--wTrack), 901px 0 0 -5px var(--wTrack), 902px 0 0 -5px var(--wTrack), 903px 0 0 -5px var(--wTrack), 904px 0 0 -5px var(--wTrack), 905px 0 0 -5px var(--wTrack), 906px 0 0 -5px var(--wTrack), 907px 0 0 -5px var(--wTrack), 908px 0 0 -5px var(--wTrack), 909px 0 0 -5px var(--wTrack), 910px 0 0 -5px var(--wTrack), 911px 0 0 -5px var(--wTrack), 912px 0 0 -5px var(--wTrack), 913px 0 0 -5px var(--wTrack), 914px 0 0 -5px var(--wTrack), 915px 0 0 -5px var(--wTrack), 916px 0 0 -5px var(--wTrack), 917px 0 0 -5px var(--wTrack), 918px 0 0 -5px var(--wTrack), 919px 0 0 -5px var(--wTrack), 920px 0 0 -5px var(--wTrack), 921px 0 0 -5px var(--wTrack), 922px 0 0 -5px var(--wTrack), 923px 0 0 -5px var(--wTrack), 924px 0 0 -5px var(--wTrack), 925px 0 0 -5px var(--wTrack), 926px 0 0 -5px var(--wTrack), 927px 0 0 -5px var(--wTrack), 928px 0 0 -5px var(--wTrack), 929px 0 0 -5px var(--wTrack), 930px 0 0 -5px var(--wTrack), 931px 0 0 -5px var(--wTrack), 932px 0 0 -5px var(--wTrack), 933px 0 0 -5px var(--wTrack), 934px 0 0 -5px var(--wTrack), 935px 0 0 -5px var(--wTrack), 936px 0 0 -5px var(--wTrack), 937px 0 0 -5px var(--wTrack), 938px 0 0 -5px var(--wTrack), 939px 0 0 -5px var(--wTrack), 940px 0 0 -5px var(--wTrack), 941px 0 0 -5px var(--wTrack), 942px 0 0 -5px var(--wTrack), 943px 0 0 -5px var(--wTrack), 944px 0 0 -5px var(--wTrack), 945px 0 0 -5px var(--wTrack), 946px 0 0 -5px var(--wTrack), 947px 0 0 -5px var(--wTrack), 948px 0 0 -5px var(--wTrack), 949px 0 0 -5px var(--wTrack), 950px 0 0 -5px var(--wTrack), 951px 0 0 -5px var(--wTrack), 952px 0 0 -5px var(--wTrack), 953px 0 0 -5px var(--wTrack), 954px 0 0 -5px var(--wTrack), 955px 0 0 -5px var(--wTrack), 956px 0 0 -5px var(--wTrack), 957px 0 0 -5px var(--wTrack), 958px 0 0 -5px var(--wTrack), 959px 0 0 -5px var(--wTrack), 960px 0 0 -5px var(--wTrack), 961px 0 0 -5px var(--wTrack), 962px 0 0 -5px var(--wTrack), 963px 0 0 -5px var(--wTrack), 964px 0 0 -5px var(--wTrack), 965px 0 0 -5px var(--wTrack), 966px 0 0 -5px var(--wTrack), 967px 0 0 -5px var(--wTrack), 968px 0 0 -5px var(--wTrack), 969px 0 0 -5px var(--wTrack), 970px 0 0 -5px var(--wTrack), 971px 0 0 -5px var(--wTrack), 972px 0 0 -5px var(--wTrack), 973px 0 0 -5px var(--wTrack), 974px 0 0 -5px var(--wTrack), 975px 0 0 -5px var(--wTrack), 976px 0 0 -5px var(--wTrack), 977px 0 0 -5px var(--wTrack), 978px 0 0 -5px var(--wTrack), 979px 0 0 -5px var(--wTrack), 980px 0 0 -5px var(--wTrack), 981px 0 0 -5px var(--wTrack), 982px 0 0 -5px var(--wTrack), 983px 0 0 -5px var(--wTrack), 984px 0 0 -5px var(--wTrack), 985px 0 0 -5px var(--wTrack), 986px 0 0 -5px var(--wTrack), 987px 0 0 -5px var(--wTrack), 988px 0 0 -5px var(--wTrack), 989px 0 0 -5px var(--wTrack), 990px 0 0 -5px var(--wTrack), 991px 0 0 -5px var(--wTrack), 992px 0 0 -5px var(--wTrack), 993px 0 0 -5px var(--wTrack), 994px 0 0 -5px var(--wTrack), 995px 0 0 -5px var(--wTrack), 996px 0 0 -5px var(--wTrack), 997px 0 0 -5px var(--wTrack), 998px 0 0 -5px var(--wTrack), 999px 0 0 -5px var(--wTrack), 1000px 0 0 -5px var(--wTrack);
  -webkit-transition: background-color 150ms;
  transition: background-color 150ms;
}

.e-range::-moz-range-track,
.e-range::-moz-range-progress {
  width: 100%;
  height: 30px;
  /*background: linear-gradient(to bottom, #cfcfcf, #cfcfcf) 100% 50%/100% 3px no-repeat transparent;*/
  /*background: transparent;*/
  background: linear-gradient(to bottom, #f2c94c, #f2c94c) 100% 50%/100% 3px no-repeat transparent;
}

.e-range::-moz-range-progress {
  background: linear-gradient(to bottom, #f2c94c, #f2c94c) 100% 50%/100% 3px no-repeat transparent;
}

.e-range::-moz-range-thumb {
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  height: 13px;
  width: 13px;
  background: #f2c94c;
  border-radius: 100%;
  border: 0;
  -moz-transition: background-color 150ms;
  transition: background-color 150ms;
}

.e-range::-ms-track {
  width: 100%;
  height: 30px;
  border: 0;
  color: transparent;
  background: transparent;
}

.e-range::-ms-fill-lower {
  background: linear-gradient(to bottom, #f2c94c, #f2c94c) 100% 50%/100% 3px no-repeat transparent;
}

.e-range::-ms-fill-upper {
  /*background: linear-gradient(to bottom, #cfcfcf, #cfcfcf) 100% 50%/100% 3px no-repeat transparent; */
  background: linear-gradient(to bottom, #f2c94c, #f2c94c) 100% 50%/100% 3px no-repeat transparent;
}

.e-range::-ms-thumb {
  appearance: none;
  height: 13px;
  width: 13px;
  background: #f2c94c;
  border-radius: 100%;
  border: 0;
  -ms-transition: background-color 150ms;
  transition: background-color 150ms;
  top: 0;
  margin: 0;
  box-shadow: none;
}

.e-range:hover::-webkit-slider-thumb,
.e-range:focus::-webkit-slider-thumb {
  background-color: #FFFFFF;
}
.e-range:hover::-moz-range-thumb,
.e-range:focus::-moz-range-thumb {
  background-color: #FFFFFF;
}
.e-range:hover::-ms-thumb,
.e-range:focus::-ms-thumb {
  background-color: #FFFFFF;
}
</style>
<style scoped>

#btnRow {
  display: flex;
  position: relative;
  bottom: -20px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
  z-index: 1;
}

#btnRow div {
  display: flex;
  flex-direction: row;
  width: 34vw;
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


.full-time, .current-time {
  font-size: 12px;
  font-weight: 300;
}

.full-time {
  color: #000000CC;
}

.current-time {
  color: #ffffff;
}


.lyric-container:before {
  display: block;
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8%;
  background: linear-gradient(180deg, var(--lyricBackColor) 0%, rgba(0, 0, 0, 0) 100%);
  z-index: 0;

}

#artistInfo {
  width: 100%;
  overflow: hidden;
}

#artistInfo .track-name {
  font-size: 18px;
  font-weight: 500;
  color: var(--Gray-6);
  margin-bottom: 8px;
}

.bullet {
  margin: 0px 10px;
}

#info {
  font-size: 12px;
  font-weight: 500;
  color: var(--Gray-3);
  width: auto !important;
  display: inline-flex !important;
  margin: 0 !important;
  /*transition: opacity 3s  1s ease-in-out !important;*/
  overflow: visible;
}


#lyric-top {
  position: relative;
  top: 16px;
  direction: rtl;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
}

#lyric-top span {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.lyric-top-image img {
  width: 55px;
  height: auto;
  border-radius: 5px;
}

.lyric-top-info {
  flex-direction: column;
  width: 100%;
  overflow: hidden;
}

.lyric-top-info p {
  width: 100%;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.white-line {
  color: white !important;
  font-weight: 500 !important;
}

.player-btn {
  z-index: 100000;
  max-width: 90px;
  top: 10px;
  position: relative;
}

.lyric-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: var(--Gray-7);
}

.lyric-header {
  position: relative;
  width: 100%;
  top: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -6vh;
}

.lyric-header-title {
  position: absolute;
  font-size: 16px;
  font-weight: 700;
  top: 3px;
}

.lyric-header-hashtag {
  position: absolute;
  top: 25px;
  direction: rtl;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: .5;;
}

.lyric-content-list {
  min-height: 58vh;
}

.lyric-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transform: translateZ(0);
  /*background-color: #885555;*/
  /*background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);*/
  border-radius: 20px;
  overflow-x: hidden;
  min-height: 70vh;

}

.lyric-content:after {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8vh;
  border-radius: 20px 20px 0 0;
  background: linear-gradient(180deg, var(--lyricBackColor) 0%, var(--lyricBackColor) 65%, rgba(0, 0, 0, 0) 115%);
  z-index: 1;
  transform: translateZ(0);
}

.lyric-content:before {
  display: block;
  content: "";
  position: absolute;
  bottom: 15vh;
  left: 0;
  width: 100%;
  height: 8vh;
  border-radius: 0px 0px 20px 20px;
  background: linear-gradient(0deg, var(--lyricBackColor) 65%, rgba(51, 51, 51, 0) 115%);
  z-index: 1;
  transform: translateZ(0);
}

@supports (-webkit-touch-callout: none) {
  .lyric-content {
    border-radius: 30px;
  }

  .lyric-content-list:after {
    border-radius: 30px 30px 0 0;
  }

  .lyric-content-list:before {
    border-radius: 0px 0px 30px 30px;
  }

  .lyric-demoLimit {
    border-radius: 30px;
  }
}

.lyric-shareBtn {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 2;
  cursor: pointer;
}

.lyric-shareBtn svg {
  position: relative;
  left: -1px;
}

.lyric-lines-container {
  position: relative;
  width: 100%;
  /* height: 523px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* background-color: #409B65; */
  margin-top: 5px;
  overflow-y: scroll;
  max-height: 55vh;
}

.lyric-lines-container span:first-child {
  margin-top: 55px;
}

.lyric-lines-container span:last-child {
  padding-bottom: 75px;
}


.lyric-line {
  width: 95%;
  font-size: 16px;
  font-weight: 400;
  line-height: 37px;
  color: #000000;
}

.lyric-line li {
  list-style: none;
}

.seeked {
  color: #FFFFFF;
}

.lyric-demoLimit {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  /* height: 328px; */
  padding-bottom: 20px;
  /* top: 50px; */
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 20%, var(--Accent) 140%);
  border-radius: 20px;
  z-index: 2;
  transform: translateZ(10px);
  height: 70%;
  bottom: 130px;
  left: 5%;
}

.lyric-demoLimit img {
  margin-top: 10px;
  margin-bottom: 10px;
}

.demoLimit-title {
  font-size: 14px;
  font-weight: 400;
  direction: rtl;
  padding: 0px 10px;
  color: #fff;
  text-shadow: 0px 0px 4px black;
  margin-bottom: 5px;
}

.player-btnContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  z-index: 10;
}

#lyric-seekTime {
  width: 100%;
  margin-top: 15px;
  padding-top: 0 !important;
}

.duration-container {
  width: 100%;
  /*background: #409B65;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 10px;
  position: relative;
}

.lyric-footer {
  position: relative;
  top: -30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.lyric-btnContainer {
  width: 90%;
  /*background: #409B65;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lyric-toggleBtn {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 6px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 300;
  z-index: 1000;
  cursor: pointer;
}

.lyric-flagBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 30px; */
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.3);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  padding: 3px 10px;
  z-index: 1000;

}

.lyric-flagBtn svg {
  font-size: 12px;
  font-weight: 600;
}

.lyric-flagBtn img {
  width: 25px;
  margin-left: 5px;
}

.lyric-footer-limitBanner {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(242, 201, 76, 0.3);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  border-radius: 15px;
  z-index: 100000000;
  margin-top: 20px;
}

.limitBanner-title {
  color: #fff;
  font-size: 12px;
  text-align: right;
  direction: rtl;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 1);

}

@media screen and (max-width: 321px) {
  .lyric-demoLimit {
    bottom: 130px;
  }

  .lyric-demoLimit img {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 130px;
  }

  .demoLimit-title {
    margin-bottom: 0px;
  }

  .demoLimit-title {
    font-size: 0.8rem;
  }

  .lyric-content-list {
    min-height: 56vh;
  }

  .lyric-content:before {
    bottom: 22vh;
  }
}


@media screen and (max-width: 321px) {
  .inLyricBB {
    width: 95%;
    top: 10px;
  }
}

</style>
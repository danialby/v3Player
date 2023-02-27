<template>
  <div class="advPlayerBox">
    <audio id="advertiseAudio"
           @loadeddata="getAdvMeta"
           @timeupdate="getAdvTime"
           @play="isPlaying = true"
           @pause="isPlaying = false"
           @ended="resumePlaying"
           :src="advTrack"
           ref="advTrack"
    >
    </audio>
    <vue-range-slider
        v-if="advTrack"
        ref="slider"
        v-model="advTime"
        :min="0"
        :max="advDuration"
        :step="1"
        :speed="0"
        :height="3"
        class="fit-48 m-auto"
        style="padding:10px;"
        :dot-size="13"
        :processStyle="sliderCustomize.processStyle"
        :bg-style="sliderCustomize.bgStyle"
        :clickable="false"
        stop-propagation>
    </vue-range-slider>
    <div v-if="advTrack" class="lowItems d-flex justify-between fit-64 m5-auto">
					<span>
						{{ $utils.formatTime(advTime) }}
					</span>
      <span>
						{{ $utils.formatTime(advDuration) === "NaN:NaN" ? '00:00' : $utils.convertTime(advDuration) }}
					</span>
    </div>
    <div class="controlBox">
      <svg @pointerup="togglePlay()"
           class="play"
           v-show="!isPlaying"
           width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 35C70 54.33 54.33 70 35 70C15.67 70 0 54.33 0 35C0 15.67 15.67 0 35 0C54.33 0 70 15.67 70 35Z"
              fill="#F2C94C"/>
        <path
            d="M48 33.268C49.3333 34.0378 49.3333 35.9623 48 36.7321L30 47.1244C28.6667 47.8942 27 46.9319 27 45.3923V24.6077C27 23.0681 28.6667 22.1058 30 22.8756L48 33.268Z"
            fill="#212121"/>
      </svg>
      <svg @pointerup="togglePlay()"
           class="pause"
           v-show="isPlaying"
           width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 35C70 54.33 54.33 70 35 70C15.67 70 0 54.33 0 35C0 15.67 15.67 0 35 0C54.33 0 70 15.67 70 35Z"
              fill="#F2C94C"/>
        <rect x="24" y="21" width="8.38095" height="27.2381" rx="4.19048" fill="#212121"/>
        <rect x="37.619" y="21" width="8.38095" height="27.2381" rx="4.19048" fill="#212121"/>
      </svg>
    </div>
  </div>
</template>

<script>
import VueRangeSlider from 'vue-range-component'

export default {
  name: "advPlayer",
  props: {
    advTrack: String
  },
  components: {
    VueRangeSlider
  },
  data() {
    return {
      isPlaying: false,
      advDuration: 0,
      advTime: 0,
      sliderCustomize: {
        processStyle: {
          backgroundColor: 'var(--Accent)',
          pointerEvents: 'none'
        },
        bgStyle: {
          backgroundColor: 'rgba(0,0,0,0.2)'
        },
        dotStyle: {
          opacity: 0
        }
      }
    }
  },
  computed: {
    advertise_data() {
      return JSON.parse(localStorage.getItem("advertise_data"))
    }
  },
  methods: {
    getAdvMeta() {
      this.advDuration = this.$refs.advTrack.duration
      this.$refs.advTrack.play()
    },
    getAdvTime() {
      this.advTime = this.$refs.advTrack.currentTime
    },
    resumePlaying() {
      this.$refs.advTrack.pause()
      this.$root.$refs.thePlayer.goTop()
      let advCount = this.$store.state.playerAdvertiseData.advertises.length
      this.$store.dispatch('setClosePlayer', false)
      if (this.$store.state.playerAdvertiseData.advertises[advCount - 1].close_player === true) {
        this.$store.dispatch('setClosePlayer', true)
      }

      console.log('adertiseIndex : ', this.$store.state.advertiseIndex)
      console.log('advCount : ', advCount)


      // if ((0 < this.$store.state.advertiseIndex + 1) // To Check
      //     &&
      //     (this.$store.state.advertiseIndex + 1 !== advCount)) {
      if (this.$store.state.advertiseIndex === advCount - 1) {
        this.$store.dispatch('calcAdvertiseIndex')
      }
      if (this.$store.state.advertiseIndex <= advCount - 1) // To Check
      {
        this.$store.dispatch('calcAdvertiseIndex')
        this.$refs.advTrack.play()
      } else {
        this.$store.commit('setPlayerAdvertiseData', null)
        this.$store.dispatch('calcAdvertiseIndex', 0)

        if (this.$store.state.should_close_player === true || this.$root.$refs.app.should_close_player) {
          this.$store.commit('setPlayerTracks', null)
          this.$store.commit('setPlayerData', null)
          this.$store.commit('setPlayerAdvData', null)
          this.$store.commit('setPlayerLyrics', null)
          this.$store.dispatch('setClosePlayer', false)
          this.$store.commit('setPlayerAdvertiseData', null)
          this.$root.$refs.app.should_close_player = false
          this.$root.$refs.player.close()
          this.$root.$refs.BigPlayer.advTrack = null
        } else {
          this.$store.commit('setPlayerAdvertiseData', null)
          this.$store.commit('setPlayerAdvData', null)
          this.isChanging = false
          this.$store.dispatch('setMediaSessionData')
          this.$root.$refs.thePlayer.playingElement = null
          this.$root.$refs.BigPlayer.advTrack = null
          this.$store.dispatch('setLastListenedTrack', null)
          this.$root.$refs.thePlayer.stopPlaying = false
          this.$root.$refs.thePlayer.playItem(
              this.$store.state.playerParams.tracks,
              this.$store.state.playerParams.item,
              this.$store.state.playerParams.index,
              this.$store.state.playerParams.query,
              this.$store.state.playerParams.queryParams,
              this.$store.state.playerParams.meta,
              this.$store.state.playerParams.from
          )
        }
      }
      this.$store.dispatch('setListenCount', {command: 'reset'})
    },
    async togglePlay() {
      if (!this.$refs.advTrack.paused) {
        await this.$refs.advTrack.pause()
        this.isPlaying = false
      } else {
        await this.$refs.advTrack.play()
        this.isPlaying = true
      }
      // }
    },
  }

}
</script>

<style scoped>
.lowItems {
  position: relative;
}

.controlBox {
  display: flex;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
  width: calc(100% - 64px);
  margin: 0 auto;
  height: auto;
}
</style>
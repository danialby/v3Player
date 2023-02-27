<template>
  <div id="miniPlayer" v-touch:swipe="cleanPlayer"
       :style="$store.state.playerData && $store.state.playerAdvertiseData?'height:35px;':''"
       @click="$utils.openSheet($root.$refs.player)">
		<span v-if="$store.state.playerData && !$store.state.playerAdvertiseData" id="theMiniplayer">
			<img draggable="false" class="playingImage" :src="$store.state.imgUrl+$store.state.playerData.image"/>

      <div id="titleContainer">
        	<span id="miniPlayerTitle">
            {{ $store.state.playerData.title }}
          </span>


        <div id="miniPlayerArtistName">
          <span
              id="miniPlayerArtistContainer"
              class="miniPlayerArtistContainer"
          >
          <span
              id="miniPlayerArtist"
              :key="index"
              v-for="(artist,index) in	$store.state.playerData.artists" class="playingArtist grayedText"
          >
            {{ artist.name }}

            <span :class="{last:index === ($store.state.playerData.artists.length - 1)}">،</span>
          </span>
        </span>
        </div>



      </div>



			<img draggable="false" v-if="!$root.$refs.thePlayer.isPlaying"
           class="miniPlayBtn"
           src="@/assets/icons/newPlayY.svg"
           @click="togglePlay($event,'play')"/>
			
			<img draggable="false" v-if="$root.$refs.thePlayer.isPlaying"
           class="miniPlayBtn"
           src="@/assets/icons/miniPause.svg"
           @click="togglePlay($event,'pause')"/>
<!--		      		<VueSlideBar class="miniSlider"-->
<!--                           v-model="$root.$refs.BigPlayer.playbackTime"-->
<!--                           :min="0"-->
<!--                           :max="$root.$refs.BigPlayer.rawDuration"-->
<!--                           paddingless-->
<!--                           :processStyle="sliderCustomize.processStyle"-->
<!--                           :show-tooltip="false"-->
<!--                           :is-disabled="true"-->
<!--              >-->
<!--		</VueSlideBar>-->
<!--          <vue-range-slider-->
<!--              class="miniSlider fit"-->
<!--              ref="miniSlider"-->
<!--              v-model="$root.$refs.thePlayer.playbackTime"-->
<!--              :max="Number($root.$refs.thePlayer.rawDuration.toPrecision(5))"-->
<!--              :tooltip="'none'"-->
<!--              :interval="0.00001"-->
<!--              :speed="0"-->
<!--              :contained="true"-->
<!--              :drag-on-click="false"-->
<!--              :clickable="false"-->
<!--              :fixed="true"-->
<!--              :height="2"-->
<!--              :dot-size="0"-->
<!--              :processStyle="sliderCustomize.processStyle"-->
<!--              :rail-style="sliderCustomize.bgStyle"-->
<!--              stop-propagation>-->
<!--    </vue-range-slider>-->
          <input class="e-range miniSlider fit"
                 type="range"
                 ref="slider"
                 min="0"
                 step="0.01"
                 disabled
                 :max="Number($root.$refs.thePlayer.rawDuration.toPrecision(2))"
                 :value="$root.$refs.thePlayer.playbackTime">
		</span>

    <span v-if="($store.state.advertiseIndex < 1) && $store.state.playerAdvertiseData"
          id="advMiniPlayer" @click="openAdvNPlay()">
			<img draggable="false" class="playingImage"
           :src="$store.state.imgUrl+$store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].image"/>
			<p class="playingTitle d-flex align-item-center">
			{{ $store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].bottom_player_text }}
		</p>
		<p class="miniPlayBtn" @click.stop="$router.push({name:'plans'})">
			<span class="importantText">
				{{ $store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].btn_text }}
			</span>
				<img draggable="false" :src="require('@/assets/icons/chevron-rightY.svg')"/>
		</p>
                            <vue-range-slider
                                class="miniSlider"
                                ref="miniSlider"
                                v-model="$root.$refs.thePlayer.playbackTime"
                                :min="0"
                                :max="$root.$refs.thePlayer.rawDuration"
                                :step="0.01"
                                :speed="0"
                                :height="2"
                                :processStyle="sliderCustomize.processStyle"
                                :bg-style="sliderCustomize.bgStyle"
                                disabled
                                :disabled-style="sliderCustomize.disabledStyle"
                                :disabled-dot-style="sliderCustomize.disabledDotStyle"
                                :dot-size="0"
                                :clickable="false"
                            >
                      </vue-range-slider>
		</span>


  </div>
</template>

<script>
// import VueSlideBar from 'vue-slide-bar'
// import VueRangeSlider from 'vue-slider-component'

export default {
  name: "miniPlayer",
  components: {
    // VueSlideBar,
    // VueRangeSlider
  },
  props: {
    advertise: Boolean
  },
  data() {
    return {
      rawDuration: 0,
      playbackTime: 0,
      sliderCustomize: {
        processStyle: {
          backgroundColor: 'var(--Accent)'
        },
        bgStyle: {
          backgroundColor: 'rgba(0,0,0,0.2)'
        },
        disabledStyle: {
          padding:0,
          opacity:1,
          backgroundColor: 'rgba(0,0,0,0.2)'
        },
        disabledDotStyle: {
          opacity:0
        }
      },
    }
  },
  mounted() {

    if (this.$store.state.playerAdvertiseData) {
      this.$store.commit('setMiddleState', {miniPlayerHeight: 35})
    } else {
      this.$store.commit('setMiddleState', {miniPlayerHeight: 55})
    }


  },

  destroyed() {
    this.$store.commit('setMiddleState', {miniPlayerHeight: 0})
  },

  methods: {
    cleanPlayer() {
      if (!this.advertise) {
        if (this.$root.$refs.thePlayer.playingElement) {
          this.$root.$refs.thePlayer.playingElement.pause()
        }
        this.$store.commit('setPlayerTracks', null)
        this.$store.commit('setPlayerData', null)
      }
    },
    togglePlay(e, action) {
      e.stopPropagation()
      if (action === 'play') {
        this.$root.$refs.thePlayer.playingElement.play()
		this.$root.$refs.thePlayer.isPlaying = true
      } else if (action === 'pause') {
        this.$root.$refs.thePlayer.playingElement.pause()
		this.$root.$refs.thePlayer.isPlaying = false
      }
    },
    openAdvNPlay() {
      this.$utils.openSheet(this.$root.$refs.player)
      // this.$root.$refs.player.open()
	  // this.$root.$refs.thePlayer.src = this.$root.$refs.BigPlayer.advAudio
		  this.$root.$refs.thePlayer.playingElement.play()
    }
  },
  watch: {
    advertise() {
      if (this.advertise) {
        this.$store.commit('setMiddleState', {miniPlayerHeight: 35})
      } else {
        this.$store.commit('setMiddleState', {miniPlayerHeight: 55})
      }
    },
    playbackTime() {
      let diff = Math.abs(this.playbackTime - this.$root.$refs.thePlayer.playingElement.currentTime);
      //Throttle synchronization to prevent infinite loop between playback listener and this watcher
      if (diff > 0.01)
        this.$root.$refs.thePlayer.playingElement.currentTime = this.playbackTime;
    },


  },


}
</script>

<style id="miniRange" scoped>
.e-range {
  position: relative;
  display: block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  /* height: 3px; */
  overflow: hidden;
  cursor: pointer;
  /* padding: 10px 0; */
  background: transparent;
  z-index: 1;
  left: -2px;
}

.e-range:focus {
  outline: none;
}

.e-range::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  background: linear-gradient(to bottom, #f2c94c, #f2c94c) 100% 50%/100% 3px no-repeat transparent;
  border-radius: 100px;
}

.e-range::-webkit-slider-thumb {
  position: relative;
  -webkit-appearance: none;
  appearance: none;
  height: 13px;
  width: 13px;
  background: #f2c94c;
  border-radius: 100%;
  border: 0;
  top: 50%;
  margin-top: -6.5px;
  margin-left:-13px;
  box-shadow: 1px 0 0 -5px var(--Track), 2px 0 0 -5px var(--Track), 3px 0 0 -5px var(--Track), 4px 0 0 -5px var(--Track), 5px 0 0 -5px var(--Track), 6px 0 0 -5px var(--Track), 7px 0 0 -5px var(--Track), 8px 0 0 -5px var(--Track), 9px 0 0 -5px var(--Track), 10px 0 0 -5px var(--Track), 11px 0 0 -5px var(--Track), 12px 0 0 -5px var(--Track), 13px 0 0 -5px var(--Track), 14px 0 0 -5px var(--Track), 15px 0 0 -5px var(--Track), 16px 0 0 -5px var(--Track), 17px 0 0 -5px var(--Track), 18px 0 0 -5px var(--Track), 19px 0 0 -5px var(--Track), 20px 0 0 -5px var(--Track), 21px 0 0 -5px var(--Track), 22px 0 0 -5px var(--Track), 23px 0 0 -5px var(--Track), 24px 0 0 -5px var(--Track), 25px 0 0 -5px var(--Track), 26px 0 0 -5px var(--Track), 27px 0 0 -5px var(--Track), 28px 0 0 -5px var(--Track), 29px 0 0 -5px var(--Track), 30px 0 0 -5px var(--Track), 31px 0 0 -5px var(--Track), 32px 0 0 -5px var(--Track), 33px 0 0 -5px var(--Track), 34px 0 0 -5px var(--Track), 35px 0 0 -5px var(--Track), 36px 0 0 -5px var(--Track), 37px 0 0 -5px var(--Track), 38px 0 0 -5px var(--Track), 39px 0 0 -5px var(--Track), 40px 0 0 -5px var(--Track), 41px 0 0 -5px var(--Track), 42px 0 0 -5px var(--Track), 43px 0 0 -5px var(--Track), 44px 0 0 -5px var(--Track), 45px 0 0 -5px var(--Track), 46px 0 0 -5px var(--Track), 47px 0 0 -5px var(--Track), 48px 0 0 -5px var(--Track), 49px 0 0 -5px var(--Track), 50px 0 0 -5px var(--Track), 51px 0 0 -5px var(--Track), 52px 0 0 -5px var(--Track), 53px 0 0 -5px var(--Track), 54px 0 0 -5px var(--Track), 55px 0 0 -5px var(--Track), 56px 0 0 -5px var(--Track), 57px 0 0 -5px var(--Track), 58px 0 0 -5px var(--Track), 59px 0 0 -5px var(--Track), 60px 0 0 -5px var(--Track), 61px 0 0 -5px var(--Track), 62px 0 0 -5px var(--Track), 63px 0 0 -5px var(--Track), 64px 0 0 -5px var(--Track), 65px 0 0 -5px var(--Track), 66px 0 0 -5px var(--Track), 67px 0 0 -5px var(--Track), 68px 0 0 -5px var(--Track), 69px 0 0 -5px var(--Track), 70px 0 0 -5px var(--Track), 71px 0 0 -5px var(--Track), 72px 0 0 -5px var(--Track), 73px 0 0 -5px var(--Track), 74px 0 0 -5px var(--Track), 75px 0 0 -5px var(--Track), 76px 0 0 -5px var(--Track), 77px 0 0 -5px var(--Track), 78px 0 0 -5px var(--Track), 79px 0 0 -5px var(--Track), 80px 0 0 -5px var(--Track), 81px 0 0 -5px var(--Track), 82px 0 0 -5px var(--Track), 83px 0 0 -5px var(--Track), 84px 0 0 -5px var(--Track), 85px 0 0 -5px var(--Track), 86px 0 0 -5px var(--Track), 87px 0 0 -5px var(--Track), 88px 0 0 -5px var(--Track), 89px 0 0 -5px var(--Track), 90px 0 0 -5px var(--Track), 91px 0 0 -5px var(--Track), 92px 0 0 -5px var(--Track), 93px 0 0 -5px var(--Track), 94px 0 0 -5px var(--Track), 95px 0 0 -5px var(--Track), 96px 0 0 -5px var(--Track), 97px 0 0 -5px var(--Track), 98px 0 0 -5px var(--Track), 99px 0 0 -5px var(--Track), 100px 0 0 -5px var(--Track), 101px 0 0 -5px var(--Track), 102px 0 0 -5px var(--Track), 103px 0 0 -5px var(--Track), 104px 0 0 -5px var(--Track), 105px 0 0 -5px var(--Track), 106px 0 0 -5px var(--Track), 107px 0 0 -5px var(--Track), 108px 0 0 -5px var(--Track), 109px 0 0 -5px var(--Track), 110px 0 0 -5px var(--Track), 111px 0 0 -5px var(--Track), 112px 0 0 -5px var(--Track), 113px 0 0 -5px var(--Track), 114px 0 0 -5px var(--Track), 115px 0 0 -5px var(--Track), 116px 0 0 -5px var(--Track), 117px 0 0 -5px var(--Track), 118px 0 0 -5px var(--Track), 119px 0 0 -5px var(--Track), 120px 0 0 -5px var(--Track), 121px 0 0 -5px var(--Track), 122px 0 0 -5px var(--Track), 123px 0 0 -5px var(--Track), 124px 0 0 -5px var(--Track), 125px 0 0 -5px var(--Track), 126px 0 0 -5px var(--Track), 127px 0 0 -5px var(--Track), 128px 0 0 -5px var(--Track), 129px 0 0 -5px var(--Track), 130px 0 0 -5px var(--Track), 131px 0 0 -5px var(--Track), 132px 0 0 -5px var(--Track), 133px 0 0 -5px var(--Track), 134px 0 0 -5px var(--Track), 135px 0 0 -5px var(--Track), 136px 0 0 -5px var(--Track), 137px 0 0 -5px var(--Track), 138px 0 0 -5px var(--Track), 139px 0 0 -5px var(--Track), 140px 0 0 -5px var(--Track), 141px 0 0 -5px var(--Track), 142px 0 0 -5px var(--Track), 143px 0 0 -5px var(--Track), 144px 0 0 -5px var(--Track), 145px 0 0 -5px var(--Track), 146px 0 0 -5px var(--Track), 147px 0 0 -5px var(--Track), 148px 0 0 -5px var(--Track), 149px 0 0 -5px var(--Track), 150px 0 0 -5px var(--Track), 151px 0 0 -5px var(--Track), 152px 0 0 -5px var(--Track), 153px 0 0 -5px var(--Track), 154px 0 0 -5px var(--Track), 155px 0 0 -5px var(--Track), 156px 0 0 -5px var(--Track), 157px 0 0 -5px var(--Track), 158px 0 0 -5px var(--Track), 159px 0 0 -5px var(--Track), 160px 0 0 -5px var(--Track), 161px 0 0 -5px var(--Track), 162px 0 0 -5px var(--Track), 163px 0 0 -5px var(--Track), 164px 0 0 -5px var(--Track), 165px 0 0 -5px var(--Track), 166px 0 0 -5px var(--Track), 167px 0 0 -5px var(--Track), 168px 0 0 -5px var(--Track), 169px 0 0 -5px var(--Track), 170px 0 0 -5px var(--Track), 171px 0 0 -5px var(--Track), 172px 0 0 -5px var(--Track), 173px 0 0 -5px var(--Track), 174px 0 0 -5px var(--Track), 175px 0 0 -5px var(--Track), 176px 0 0 -5px var(--Track), 177px 0 0 -5px var(--Track), 178px 0 0 -5px var(--Track), 179px 0 0 -5px var(--Track), 180px 0 0 -5px var(--Track), 181px 0 0 -5px var(--Track), 182px 0 0 -5px var(--Track), 183px 0 0 -5px var(--Track), 184px 0 0 -5px var(--Track), 185px 0 0 -5px var(--Track), 186px 0 0 -5px var(--Track), 187px 0 0 -5px var(--Track), 188px 0 0 -5px var(--Track), 189px 0 0 -5px var(--Track), 190px 0 0 -5px var(--Track), 191px 0 0 -5px var(--Track), 192px 0 0 -5px var(--Track), 193px 0 0 -5px var(--Track), 194px 0 0 -5px var(--Track), 195px 0 0 -5px var(--Track), 196px 0 0 -5px var(--Track), 197px 0 0 -5px var(--Track), 198px 0 0 -5px var(--Track), 199px 0 0 -5px var(--Track), 200px 0 0 -5px var(--Track), 201px 0 0 -5px var(--Track), 202px 0 0 -5px var(--Track), 203px 0 0 -5px var(--Track), 204px 0 0 -5px var(--Track), 205px 0 0 -5px var(--Track), 206px 0 0 -5px var(--Track), 207px 0 0 -5px var(--Track), 208px 0 0 -5px var(--Track), 209px 0 0 -5px var(--Track), 210px 0 0 -5px var(--Track), 211px 0 0 -5px var(--Track), 212px 0 0 -5px var(--Track), 213px 0 0 -5px var(--Track), 214px 0 0 -5px var(--Track), 215px 0 0 -5px var(--Track), 216px 0 0 -5px var(--Track), 217px 0 0 -5px var(--Track), 218px 0 0 -5px var(--Track), 219px 0 0 -5px var(--Track), 220px 0 0 -5px var(--Track), 221px 0 0 -5px var(--Track), 222px 0 0 -5px var(--Track), 223px 0 0 -5px var(--Track), 224px 0 0 -5px var(--Track), 225px 0 0 -5px var(--Track), 226px 0 0 -5px var(--Track), 227px 0 0 -5px var(--Track), 228px 0 0 -5px var(--Track), 229px 0 0 -5px var(--Track), 230px 0 0 -5px var(--Track), 231px 0 0 -5px var(--Track), 232px 0 0 -5px var(--Track), 233px 0 0 -5px var(--Track), 234px 0 0 -5px var(--Track), 235px 0 0 -5px var(--Track), 236px 0 0 -5px var(--Track), 237px 0 0 -5px var(--Track), 238px 0 0 -5px var(--Track), 239px 0 0 -5px var(--Track), 240px 0 0 -5px var(--Track), 241px 0 0 -5px var(--Track), 242px 0 0 -5px var(--Track), 243px 0 0 -5px var(--Track), 244px 0 0 -5px var(--Track), 245px 0 0 -5px var(--Track), 246px 0 0 -5px var(--Track), 247px 0 0 -5px var(--Track), 248px 0 0 -5px var(--Track), 249px 0 0 -5px var(--Track), 250px 0 0 -5px var(--Track), 251px 0 0 -5px var(--Track), 252px 0 0 -5px var(--Track), 253px 0 0 -5px var(--Track), 254px 0 0 -5px var(--Track), 255px 0 0 -5px var(--Track), 256px 0 0 -5px var(--Track), 257px 0 0 -5px var(--Track), 258px 0 0 -5px var(--Track), 259px 0 0 -5px var(--Track), 260px 0 0 -5px var(--Track), 261px 0 0 -5px var(--Track), 262px 0 0 -5px var(--Track), 263px 0 0 -5px var(--Track), 264px 0 0 -5px var(--Track), 265px 0 0 -5px var(--Track), 266px 0 0 -5px var(--Track), 267px 0 0 -5px var(--Track), 268px 0 0 -5px var(--Track), 269px 0 0 -5px var(--Track), 270px 0 0 -5px var(--Track), 271px 0 0 -5px var(--Track), 272px 0 0 -5px var(--Track), 273px 0 0 -5px var(--Track), 274px 0 0 -5px var(--Track), 275px 0 0 -5px var(--Track), 276px 0 0 -5px var(--Track), 277px 0 0 -5px var(--Track), 278px 0 0 -5px var(--Track), 279px 0 0 -5px var(--Track), 280px 0 0 -5px var(--Track), 281px 0 0 -5px var(--Track), 282px 0 0 -5px var(--Track), 283px 0 0 -5px var(--Track), 284px 0 0 -5px var(--Track), 285px 0 0 -5px var(--Track), 286px 0 0 -5px var(--Track), 287px 0 0 -5px var(--Track), 288px 0 0 -5px var(--Track), 289px 0 0 -5px var(--Track), 290px 0 0 -5px var(--Track), 291px 0 0 -5px var(--Track), 292px 0 0 -5px var(--Track), 293px 0 0 -5px var(--Track), 294px 0 0 -5px var(--Track), 295px 0 0 -5px var(--Track), 296px 0 0 -5px var(--Track), 297px 0 0 -5px var(--Track), 298px 0 0 -5px var(--Track), 299px 0 0 -5px var(--Track), 300px 0 0 -5px var(--Track), 301px 0 0 -5px var(--Track), 302px 0 0 -5px var(--Track), 303px 0 0 -5px var(--Track), 304px 0 0 -5px var(--Track), 305px 0 0 -5px var(--Track), 306px 0 0 -5px var(--Track), 307px 0 0 -5px var(--Track), 308px 0 0 -5px var(--Track), 309px 0 0 -5px var(--Track), 310px 0 0 -5px var(--Track), 311px 0 0 -5px var(--Track), 312px 0 0 -5px var(--Track), 313px 0 0 -5px var(--Track), 314px 0 0 -5px var(--Track), 315px 0 0 -5px var(--Track), 316px 0 0 -5px var(--Track), 317px 0 0 -5px var(--Track), 318px 0 0 -5px var(--Track), 319px 0 0 -5px var(--Track), 320px 0 0 -5px var(--Track), 321px 0 0 -5px var(--Track), 322px 0 0 -5px var(--Track), 323px 0 0 -5px var(--Track), 324px 0 0 -5px var(--Track), 325px 0 0 -5px var(--Track), 326px 0 0 -5px var(--Track), 327px 0 0 -5px var(--Track), 328px 0 0 -5px var(--Track), 329px 0 0 -5px var(--Track), 330px 0 0 -5px var(--Track), 331px 0 0 -5px var(--Track), 332px 0 0 -5px var(--Track), 333px 0 0 -5px var(--Track), 334px 0 0 -5px var(--Track), 335px 0 0 -5px var(--Track), 336px 0 0 -5px var(--Track), 337px 0 0 -5px var(--Track), 338px 0 0 -5px var(--Track), 339px 0 0 -5px var(--Track), 340px 0 0 -5px var(--Track), 341px 0 0 -5px var(--Track), 342px 0 0 -5px var(--Track), 343px 0 0 -5px var(--Track), 344px 0 0 -5px var(--Track), 345px 0 0 -5px var(--Track), 346px 0 0 -5px var(--Track), 347px 0 0 -5px var(--Track), 348px 0 0 -5px var(--Track), 349px 0 0 -5px var(--Track), 350px 0 0 -5px var(--Track), 351px 0 0 -5px var(--Track), 352px 0 0 -5px var(--Track), 353px 0 0 -5px var(--Track), 354px 0 0 -5px var(--Track), 355px 0 0 -5px var(--Track), 356px 0 0 -5px var(--Track), 357px 0 0 -5px var(--Track), 358px 0 0 -5px var(--Track), 359px 0 0 -5px var(--Track), 360px 0 0 -5px var(--Track), 361px 0 0 -5px var(--Track), 362px 0 0 -5px var(--Track), 363px 0 0 -5px var(--Track), 364px 0 0 -5px var(--Track), 365px 0 0 -5px var(--Track), 366px 0 0 -5px var(--Track), 367px 0 0 -5px var(--Track), 368px 0 0 -5px var(--Track), 369px 0 0 -5px var(--Track), 370px 0 0 -5px var(--Track), 371px 0 0 -5px var(--Track), 372px 0 0 -5px var(--Track), 373px 0 0 -5px var(--Track), 374px 0 0 -5px var(--Track), 375px 0 0 -5px var(--Track), 376px 0 0 -5px var(--Track), 377px 0 0 -5px var(--Track), 378px 0 0 -5px var(--Track), 379px 0 0 -5px var(--Track), 380px 0 0 -5px var(--Track), 381px 0 0 -5px var(--Track), 382px 0 0 -5px var(--Track), 383px 0 0 -5px var(--Track), 384px 0 0 -5px var(--Track), 385px 0 0 -5px var(--Track), 386px 0 0 -5px var(--Track), 387px 0 0 -5px var(--Track), 388px 0 0 -5px var(--Track), 389px 0 0 -5px var(--Track), 390px 0 0 -5px var(--Track), 391px 0 0 -5px var(--Track), 392px 0 0 -5px var(--Track), 393px 0 0 -5px var(--Track), 394px 0 0 -5px var(--Track), 395px 0 0 -5px var(--Track), 396px 0 0 -5px var(--Track), 397px 0 0 -5px var(--Track), 398px 0 0 -5px var(--Track), 399px 0 0 -5px var(--Track), 400px 0 0 -5px var(--Track), 401px 0 0 -5px var(--Track), 402px 0 0 -5px var(--Track), 403px 0 0 -5px var(--Track), 404px 0 0 -5px var(--Track), 405px 0 0 -5px var(--Track), 406px 0 0 -5px var(--Track), 407px 0 0 -5px var(--Track), 408px 0 0 -5px var(--Track), 409px 0 0 -5px var(--Track), 410px 0 0 -5px var(--Track), 411px 0 0 -5px var(--Track), 412px 0 0 -5px var(--Track), 413px 0 0 -5px var(--Track), 414px 0 0 -5px var(--Track), 415px 0 0 -5px var(--Track), 416px 0 0 -5px var(--Track), 417px 0 0 -5px var(--Track), 418px 0 0 -5px var(--Track), 419px 0 0 -5px var(--Track), 420px 0 0 -5px var(--Track), 421px 0 0 -5px var(--Track), 422px 0 0 -5px var(--Track), 423px 0 0 -5px var(--Track), 424px 0 0 -5px var(--Track), 425px 0 0 -5px var(--Track), 426px 0 0 -5px var(--Track), 427px 0 0 -5px var(--Track), 428px 0 0 -5px var(--Track), 429px 0 0 -5px var(--Track), 430px 0 0 -5px var(--Track), 431px 0 0 -5px var(--Track), 432px 0 0 -5px var(--Track), 433px 0 0 -5px var(--Track), 434px 0 0 -5px var(--Track), 435px 0 0 -5px var(--Track), 436px 0 0 -5px var(--Track), 437px 0 0 -5px var(--Track), 438px 0 0 -5px var(--Track), 439px 0 0 -5px var(--Track), 440px 0 0 -5px var(--Track), 441px 0 0 -5px var(--Track), 442px 0 0 -5px var(--Track), 443px 0 0 -5px var(--Track), 444px 0 0 -5px var(--Track), 445px 0 0 -5px var(--Track), 446px 0 0 -5px var(--Track), 447px 0 0 -5px var(--Track), 448px 0 0 -5px var(--Track), 449px 0 0 -5px var(--Track), 450px 0 0 -5px var(--Track), 451px 0 0 -5px var(--Track), 452px 0 0 -5px var(--Track), 453px 0 0 -5px var(--Track), 454px 0 0 -5px var(--Track), 455px 0 0 -5px var(--Track), 456px 0 0 -5px var(--Track), 457px 0 0 -5px var(--Track), 458px 0 0 -5px var(--Track), 459px 0 0 -5px var(--Track), 460px 0 0 -5px var(--Track), 461px 0 0 -5px var(--Track), 462px 0 0 -5px var(--Track), 463px 0 0 -5px var(--Track), 464px 0 0 -5px var(--Track), 465px 0 0 -5px var(--Track), 466px 0 0 -5px var(--Track), 467px 0 0 -5px var(--Track), 468px 0 0 -5px var(--Track), 469px 0 0 -5px var(--Track), 470px 0 0 -5px var(--Track), 471px 0 0 -5px var(--Track), 472px 0 0 -5px var(--Track), 473px 0 0 -5px var(--Track), 474px 0 0 -5px var(--Track), 475px 0 0 -5px var(--Track), 476px 0 0 -5px var(--Track), 477px 0 0 -5px var(--Track), 478px 0 0 -5px var(--Track), 479px 0 0 -5px var(--Track), 480px 0 0 -5px var(--Track), 481px 0 0 -5px var(--Track), 482px 0 0 -5px var(--Track), 483px 0 0 -5px var(--Track), 484px 0 0 -5px var(--Track), 485px 0 0 -5px var(--Track), 486px 0 0 -5px var(--Track), 487px 0 0 -5px var(--Track), 488px 0 0 -5px var(--Track), 489px 0 0 -5px var(--Track), 490px 0 0 -5px var(--Track), 491px 0 0 -5px var(--Track), 492px 0 0 -5px var(--Track), 493px 0 0 -5px var(--Track), 494px 0 0 -5px var(--Track), 495px 0 0 -5px var(--Track), 496px 0 0 -5px var(--Track), 497px 0 0 -5px var(--Track), 498px 0 0 -5px var(--Track), 499px 0 0 -5px var(--Track), 500px 0 0 -5px var(--Track), 501px 0 0 -5px var(--Track), 502px 0 0 -5px var(--Track), 503px 0 0 -5px var(--Track), 504px 0 0 -5px var(--Track), 505px 0 0 -5px var(--Track), 506px 0 0 -5px var(--Track), 507px 0 0 -5px var(--Track), 508px 0 0 -5px var(--Track), 509px 0 0 -5px var(--Track), 510px 0 0 -5px var(--Track), 511px 0 0 -5px var(--Track), 512px 0 0 -5px var(--Track), 513px 0 0 -5px var(--Track), 514px 0 0 -5px var(--Track), 515px 0 0 -5px var(--Track), 516px 0 0 -5px var(--Track), 517px 0 0 -5px var(--Track), 518px 0 0 -5px var(--Track), 519px 0 0 -5px var(--Track), 520px 0 0 -5px var(--Track), 521px 0 0 -5px var(--Track), 522px 0 0 -5px var(--Track), 523px 0 0 -5px var(--Track), 524px 0 0 -5px var(--Track), 525px 0 0 -5px var(--Track), 526px 0 0 -5px var(--Track), 527px 0 0 -5px var(--Track), 528px 0 0 -5px var(--Track), 529px 0 0 -5px var(--Track), 530px 0 0 -5px var(--Track), 531px 0 0 -5px var(--Track), 532px 0 0 -5px var(--Track), 533px 0 0 -5px var(--Track), 534px 0 0 -5px var(--Track), 535px 0 0 -5px var(--Track), 536px 0 0 -5px var(--Track), 537px 0 0 -5px var(--Track), 538px 0 0 -5px var(--Track), 539px 0 0 -5px var(--Track), 540px 0 0 -5px var(--Track), 541px 0 0 -5px var(--Track), 542px 0 0 -5px var(--Track), 543px 0 0 -5px var(--Track), 544px 0 0 -5px var(--Track), 545px 0 0 -5px var(--Track), 546px 0 0 -5px var(--Track), 547px 0 0 -5px var(--Track), 548px 0 0 -5px var(--Track), 549px 0 0 -5px var(--Track), 550px 0 0 -5px var(--Track), 551px 0 0 -5px var(--Track), 552px 0 0 -5px var(--Track), 553px 0 0 -5px var(--Track), 554px 0 0 -5px var(--Track), 555px 0 0 -5px var(--Track), 556px 0 0 -5px var(--Track), 557px 0 0 -5px var(--Track), 558px 0 0 -5px var(--Track), 559px 0 0 -5px var(--Track), 560px 0 0 -5px var(--Track), 561px 0 0 -5px var(--Track), 562px 0 0 -5px var(--Track), 563px 0 0 -5px var(--Track), 564px 0 0 -5px var(--Track), 565px 0 0 -5px var(--Track), 566px 0 0 -5px var(--Track), 567px 0 0 -5px var(--Track), 568px 0 0 -5px var(--Track), 569px 0 0 -5px var(--Track), 570px 0 0 -5px var(--Track), 571px 0 0 -5px var(--Track), 572px 0 0 -5px var(--Track), 573px 0 0 -5px var(--Track), 574px 0 0 -5px var(--Track), 575px 0 0 -5px var(--Track), 576px 0 0 -5px var(--Track), 577px 0 0 -5px var(--Track), 578px 0 0 -5px var(--Track), 579px 0 0 -5px var(--Track), 580px 0 0 -5px var(--Track), 581px 0 0 -5px var(--Track), 582px 0 0 -5px var(--Track), 583px 0 0 -5px var(--Track), 584px 0 0 -5px var(--Track), 585px 0 0 -5px var(--Track), 586px 0 0 -5px var(--Track), 587px 0 0 -5px var(--Track), 588px 0 0 -5px var(--Track), 589px 0 0 -5px var(--Track), 590px 0 0 -5px var(--Track), 591px 0 0 -5px var(--Track), 592px 0 0 -5px var(--Track), 593px 0 0 -5px var(--Track), 594px 0 0 -5px var(--Track), 595px 0 0 -5px var(--Track), 596px 0 0 -5px var(--Track), 597px 0 0 -5px var(--Track), 598px 0 0 -5px var(--Track), 599px 0 0 -5px var(--Track), 600px 0 0 -5px var(--Track), 601px 0 0 -5px var(--Track), 602px 0 0 -5px var(--Track), 603px 0 0 -5px var(--Track), 604px 0 0 -5px var(--Track), 605px 0 0 -5px var(--Track), 606px 0 0 -5px var(--Track), 607px 0 0 -5px var(--Track), 608px 0 0 -5px var(--Track), 609px 0 0 -5px var(--Track), 610px 0 0 -5px var(--Track), 611px 0 0 -5px var(--Track), 612px 0 0 -5px var(--Track), 613px 0 0 -5px var(--Track), 614px 0 0 -5px var(--Track), 615px 0 0 -5px var(--Track), 616px 0 0 -5px var(--Track), 617px 0 0 -5px var(--Track), 618px 0 0 -5px var(--Track), 619px 0 0 -5px var(--Track), 620px 0 0 -5px var(--Track), 621px 0 0 -5px var(--Track), 622px 0 0 -5px var(--Track), 623px 0 0 -5px var(--Track), 624px 0 0 -5px var(--Track), 625px 0 0 -5px var(--Track), 626px 0 0 -5px var(--Track), 627px 0 0 -5px var(--Track), 628px 0 0 -5px var(--Track), 629px 0 0 -5px var(--Track), 630px 0 0 -5px var(--Track), 631px 0 0 -5px var(--Track), 632px 0 0 -5px var(--Track), 633px 0 0 -5px var(--Track), 634px 0 0 -5px var(--Track), 635px 0 0 -5px var(--Track), 636px 0 0 -5px var(--Track), 637px 0 0 -5px var(--Track), 638px 0 0 -5px var(--Track), 639px 0 0 -5px var(--Track), 640px 0 0 -5px var(--Track), 641px 0 0 -5px var(--Track), 642px 0 0 -5px var(--Track), 643px 0 0 -5px var(--Track), 644px 0 0 -5px var(--Track), 645px 0 0 -5px var(--Track), 646px 0 0 -5px var(--Track), 647px 0 0 -5px var(--Track), 648px 0 0 -5px var(--Track), 649px 0 0 -5px var(--Track), 650px 0 0 -5px var(--Track), 651px 0 0 -5px var(--Track), 652px 0 0 -5px var(--Track), 653px 0 0 -5px var(--Track), 654px 0 0 -5px var(--Track), 655px 0 0 -5px var(--Track), 656px 0 0 -5px var(--Track), 657px 0 0 -5px var(--Track), 658px 0 0 -5px var(--Track), 659px 0 0 -5px var(--Track), 660px 0 0 -5px var(--Track), 661px 0 0 -5px var(--Track), 662px 0 0 -5px var(--Track), 663px 0 0 -5px var(--Track), 664px 0 0 -5px var(--Track), 665px 0 0 -5px var(--Track), 666px 0 0 -5px var(--Track), 667px 0 0 -5px var(--Track), 668px 0 0 -5px var(--Track), 669px 0 0 -5px var(--Track), 670px 0 0 -5px var(--Track), 671px 0 0 -5px var(--Track), 672px 0 0 -5px var(--Track), 673px 0 0 -5px var(--Track), 674px 0 0 -5px var(--Track), 675px 0 0 -5px var(--Track), 676px 0 0 -5px var(--Track), 677px 0 0 -5px var(--Track), 678px 0 0 -5px var(--Track), 679px 0 0 -5px var(--Track), 680px 0 0 -5px var(--Track), 681px 0 0 -5px var(--Track), 682px 0 0 -5px var(--Track), 683px 0 0 -5px var(--Track), 684px 0 0 -5px var(--Track), 685px 0 0 -5px var(--Track), 686px 0 0 -5px var(--Track), 687px 0 0 -5px var(--Track), 688px 0 0 -5px var(--Track), 689px 0 0 -5px var(--Track), 690px 0 0 -5px var(--Track), 691px 0 0 -5px var(--Track), 692px 0 0 -5px var(--Track), 693px 0 0 -5px var(--Track), 694px 0 0 -5px var(--Track), 695px 0 0 -5px var(--Track), 696px 0 0 -5px var(--Track), 697px 0 0 -5px var(--Track), 698px 0 0 -5px var(--Track), 699px 0 0 -5px var(--Track), 700px 0 0 -5px var(--Track), 701px 0 0 -5px var(--Track), 702px 0 0 -5px var(--Track), 703px 0 0 -5px var(--Track), 704px 0 0 -5px var(--Track), 705px 0 0 -5px var(--Track), 706px 0 0 -5px var(--Track), 707px 0 0 -5px var(--Track), 708px 0 0 -5px var(--Track), 709px 0 0 -5px var(--Track), 710px 0 0 -5px var(--Track), 711px 0 0 -5px var(--Track), 712px 0 0 -5px var(--Track), 713px 0 0 -5px var(--Track), 714px 0 0 -5px var(--Track), 715px 0 0 -5px var(--Track), 716px 0 0 -5px var(--Track), 717px 0 0 -5px var(--Track), 718px 0 0 -5px var(--Track), 719px 0 0 -5px var(--Track), 720px 0 0 -5px var(--Track), 721px 0 0 -5px var(--Track), 722px 0 0 -5px var(--Track), 723px 0 0 -5px var(--Track), 724px 0 0 -5px var(--Track), 725px 0 0 -5px var(--Track), 726px 0 0 -5px var(--Track), 727px 0 0 -5px var(--Track), 728px 0 0 -5px var(--Track), 729px 0 0 -5px var(--Track), 730px 0 0 -5px var(--Track), 731px 0 0 -5px var(--Track), 732px 0 0 -5px var(--Track), 733px 0 0 -5px var(--Track), 734px 0 0 -5px var(--Track), 735px 0 0 -5px var(--Track), 736px 0 0 -5px var(--Track), 737px 0 0 -5px var(--Track), 738px 0 0 -5px var(--Track), 739px 0 0 -5px var(--Track), 740px 0 0 -5px var(--Track), 741px 0 0 -5px var(--Track), 742px 0 0 -5px var(--Track), 743px 0 0 -5px var(--Track), 744px 0 0 -5px var(--Track), 745px 0 0 -5px var(--Track), 746px 0 0 -5px var(--Track), 747px 0 0 -5px var(--Track), 748px 0 0 -5px var(--Track), 749px 0 0 -5px var(--Track), 750px 0 0 -5px var(--Track), 751px 0 0 -5px var(--Track), 752px 0 0 -5px var(--Track), 753px 0 0 -5px var(--Track), 754px 0 0 -5px var(--Track), 755px 0 0 -5px var(--Track), 756px 0 0 -5px var(--Track), 757px 0 0 -5px var(--Track), 758px 0 0 -5px var(--Track), 759px 0 0 -5px var(--Track), 760px 0 0 -5px var(--Track), 761px 0 0 -5px var(--Track), 762px 0 0 -5px var(--Track), 763px 0 0 -5px var(--Track), 764px 0 0 -5px var(--Track), 765px 0 0 -5px var(--Track), 766px 0 0 -5px var(--Track), 767px 0 0 -5px var(--Track), 768px 0 0 -5px var(--Track), 769px 0 0 -5px var(--Track), 770px 0 0 -5px var(--Track), 771px 0 0 -5px var(--Track), 772px 0 0 -5px var(--Track), 773px 0 0 -5px var(--Track), 774px 0 0 -5px var(--Track), 775px 0 0 -5px var(--Track), 776px 0 0 -5px var(--Track), 777px 0 0 -5px var(--Track), 778px 0 0 -5px var(--Track), 779px 0 0 -5px var(--Track), 780px 0 0 -5px var(--Track), 781px 0 0 -5px var(--Track), 782px 0 0 -5px var(--Track), 783px 0 0 -5px var(--Track), 784px 0 0 -5px var(--Track), 785px 0 0 -5px var(--Track), 786px 0 0 -5px var(--Track), 787px 0 0 -5px var(--Track), 788px 0 0 -5px var(--Track), 789px 0 0 -5px var(--Track), 790px 0 0 -5px var(--Track), 791px 0 0 -5px var(--Track), 792px 0 0 -5px var(--Track), 793px 0 0 -5px var(--Track), 794px 0 0 -5px var(--Track), 795px 0 0 -5px var(--Track), 796px 0 0 -5px var(--Track), 797px 0 0 -5px var(--Track), 798px 0 0 -5px var(--Track), 799px 0 0 -5px var(--Track), 800px 0 0 -5px var(--Track), 801px 0 0 -5px var(--Track), 802px 0 0 -5px var(--Track), 803px 0 0 -5px var(--Track), 804px 0 0 -5px var(--Track), 805px 0 0 -5px var(--Track), 806px 0 0 -5px var(--Track), 807px 0 0 -5px var(--Track), 808px 0 0 -5px var(--Track), 809px 0 0 -5px var(--Track), 810px 0 0 -5px var(--Track), 811px 0 0 -5px var(--Track), 812px 0 0 -5px var(--Track), 813px 0 0 -5px var(--Track), 814px 0 0 -5px var(--Track), 815px 0 0 -5px var(--Track), 816px 0 0 -5px var(--Track), 817px 0 0 -5px var(--Track), 818px 0 0 -5px var(--Track), 819px 0 0 -5px var(--Track), 820px 0 0 -5px var(--Track), 821px 0 0 -5px var(--Track), 822px 0 0 -5px var(--Track), 823px 0 0 -5px var(--Track), 824px 0 0 -5px var(--Track), 825px 0 0 -5px var(--Track), 826px 0 0 -5px var(--Track), 827px 0 0 -5px var(--Track), 828px 0 0 -5px var(--Track), 829px 0 0 -5px var(--Track), 830px 0 0 -5px var(--Track), 831px 0 0 -5px var(--Track), 832px 0 0 -5px var(--Track), 833px 0 0 -5px var(--Track), 834px 0 0 -5px var(--Track), 835px 0 0 -5px var(--Track), 836px 0 0 -5px var(--Track), 837px 0 0 -5px var(--Track), 838px 0 0 -5px var(--Track), 839px 0 0 -5px var(--Track), 840px 0 0 -5px var(--Track), 841px 0 0 -5px var(--Track), 842px 0 0 -5px var(--Track), 843px 0 0 -5px var(--Track), 844px 0 0 -5px var(--Track), 845px 0 0 -5px var(--Track), 846px 0 0 -5px var(--Track), 847px 0 0 -5px var(--Track), 848px 0 0 -5px var(--Track), 849px 0 0 -5px var(--Track), 850px 0 0 -5px var(--Track), 851px 0 0 -5px var(--Track), 852px 0 0 -5px var(--Track), 853px 0 0 -5px var(--Track), 854px 0 0 -5px var(--Track), 855px 0 0 -5px var(--Track), 856px 0 0 -5px var(--Track), 857px 0 0 -5px var(--Track), 858px 0 0 -5px var(--Track), 859px 0 0 -5px var(--Track), 860px 0 0 -5px var(--Track), 861px 0 0 -5px var(--Track), 862px 0 0 -5px var(--Track), 863px 0 0 -5px var(--Track), 864px 0 0 -5px var(--Track), 865px 0 0 -5px var(--Track), 866px 0 0 -5px var(--Track), 867px 0 0 -5px var(--Track), 868px 0 0 -5px var(--Track), 869px 0 0 -5px var(--Track), 870px 0 0 -5px var(--Track), 871px 0 0 -5px var(--Track), 872px 0 0 -5px var(--Track), 873px 0 0 -5px var(--Track), 874px 0 0 -5px var(--Track), 875px 0 0 -5px var(--Track), 876px 0 0 -5px var(--Track), 877px 0 0 -5px var(--Track), 878px 0 0 -5px var(--Track), 879px 0 0 -5px var(--Track), 880px 0 0 -5px var(--Track), 881px 0 0 -5px var(--Track), 882px 0 0 -5px var(--Track), 883px 0 0 -5px var(--Track), 884px 0 0 -5px var(--Track), 885px 0 0 -5px var(--Track), 886px 0 0 -5px var(--Track), 887px 0 0 -5px var(--Track), 888px 0 0 -5px var(--Track), 889px 0 0 -5px var(--Track), 890px 0 0 -5px var(--Track), 891px 0 0 -5px var(--Track), 892px 0 0 -5px var(--Track), 893px 0 0 -5px var(--Track), 894px 0 0 -5px var(--Track), 895px 0 0 -5px var(--Track), 896px 0 0 -5px var(--Track), 897px 0 0 -5px var(--Track), 898px 0 0 -5px var(--Track), 899px 0 0 -5px var(--Track), 900px 0 0 -5px var(--Track), 901px 0 0 -5px var(--Track), 902px 0 0 -5px var(--Track), 903px 0 0 -5px var(--Track), 904px 0 0 -5px var(--Track), 905px 0 0 -5px var(--Track), 906px 0 0 -5px var(--Track), 907px 0 0 -5px var(--Track), 908px 0 0 -5px var(--Track), 909px 0 0 -5px var(--Track), 910px 0 0 -5px var(--Track), 911px 0 0 -5px var(--Track), 912px 0 0 -5px var(--Track), 913px 0 0 -5px var(--Track), 914px 0 0 -5px var(--Track), 915px 0 0 -5px var(--Track), 916px 0 0 -5px var(--Track), 917px 0 0 -5px var(--Track), 918px 0 0 -5px var(--Track), 919px 0 0 -5px var(--Track), 920px 0 0 -5px var(--Track), 921px 0 0 -5px var(--Track), 922px 0 0 -5px var(--Track), 923px 0 0 -5px var(--Track), 924px 0 0 -5px var(--Track), 925px 0 0 -5px var(--Track), 926px 0 0 -5px var(--Track), 927px 0 0 -5px var(--Track), 928px 0 0 -5px var(--Track), 929px 0 0 -5px var(--Track), 930px 0 0 -5px var(--Track), 931px 0 0 -5px var(--Track), 932px 0 0 -5px var(--Track), 933px 0 0 -5px var(--Track), 934px 0 0 -5px var(--Track), 935px 0 0 -5px var(--Track), 936px 0 0 -5px var(--Track), 937px 0 0 -5px var(--Track), 938px 0 0 -5px var(--Track), 939px 0 0 -5px var(--Track), 940px 0 0 -5px var(--Track), 941px 0 0 -5px var(--Track), 942px 0 0 -5px var(--Track), 943px 0 0 -5px var(--Track), 944px 0 0 -5px var(--Track), 945px 0 0 -5px var(--Track), 946px 0 0 -5px var(--Track), 947px 0 0 -5px var(--Track), 948px 0 0 -5px var(--Track), 949px 0 0 -5px var(--Track), 950px 0 0 -5px var(--Track), 951px 0 0 -5px var(--Track), 952px 0 0 -5px var(--Track), 953px 0 0 -5px var(--Track), 954px 0 0 -5px var(--Track), 955px 0 0 -5px var(--Track), 956px 0 0 -5px var(--Track), 957px 0 0 -5px var(--Track), 958px 0 0 -5px var(--Track), 959px 0 0 -5px var(--Track), 960px 0 0 -5px var(--Track), 961px 0 0 -5px var(--Track), 962px 0 0 -5px var(--Track), 963px 0 0 -5px var(--Track), 964px 0 0 -5px var(--Track), 965px 0 0 -5px var(--Track), 966px 0 0 -5px var(--Track), 967px 0 0 -5px var(--Track), 968px 0 0 -5px var(--Track), 969px 0 0 -5px var(--Track), 970px 0 0 -5px var(--Track), 971px 0 0 -5px var(--Track), 972px 0 0 -5px var(--Track), 973px 0 0 -5px var(--Track), 974px 0 0 -5px var(--Track), 975px 0 0 -5px var(--Track), 976px 0 0 -5px var(--Track), 977px 0 0 -5px var(--Track), 978px 0 0 -5px var(--Track), 979px 0 0 -5px var(--Track), 980px 0 0 -5px var(--Track), 981px 0 0 -5px var(--Track), 982px 0 0 -5px var(--Track), 983px 0 0 -5px var(--Track), 984px 0 0 -5px var(--Track), 985px 0 0 -5px var(--Track), 986px 0 0 -5px var(--Track), 987px 0 0 -5px var(--Track), 988px 0 0 -5px var(--Track), 989px 0 0 -5px var(--Track), 990px 0 0 -5px var(--Track), 991px 0 0 -5px var(--Track), 992px 0 0 -5px var(--Track), 993px 0 0 -5px var(--Track), 994px 0 0 -5px var(--Track), 995px 0 0 -5px var(--Track), 996px 0 0 -5px var(--Track), 997px 0 0 -5px var(--Track), 998px 0 0 -5px var(--Track), 999px 0 0 -5px var(--Track), 1000px 0 0 -5px var(--Track);
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
  display: none;
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
  display: none;
}
</style>

<style>
root {
  --miniPlayerTitle-scroll-start: 0px;
  --miniPlayerTitle-scroll-out: 0px;
  --miniPlayerArtist-scroll-start: 0px;
  --miniPlayerArtist-scroll-out: 0px;
}

.animateMiniPlayerTitle {
  animation: miniPlayerTitleAnimation 30s linear infinite;
}

@keyframes miniPlayerTitleAnimation {
  0% {
    transform: translateX(var(--miniPlayerTitle-scroll-start))
  }
  100% {
    transform: translateX(var(--miniPlayerTitle-scroll-out))
  }
}

.animateMiniPlayerArtist {
  animation: MiniPlayerArtistAnimation 30s linear infinite;
}

@keyframes MiniPlayerArtistAnimation {
  0% {
    transform: translateX(var(--miniPlayerArtist-scroll-start))
  }
  100% {
    transform: translateX(var(--miniPlayerArtist-scroll-out))
  }
}

</style>

<style scoped>

.last{
  opacity: 0;
}

#titleContainer {
  box-sizing: border-box;
  padding-top: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: calc(100% - 110px);
  height: 100%;
  float: left;
  margin: 0 auto;
  overflow: hidden;
}


#titleContainer:after{
  content: "";
  display: block;
  position: absolute;
  width: 10%;
  height: 90%;
  background: linear-gradient(90deg, rgba(21,21,21,0) 0%, rgba(21,21,21,0.8) 46%, rgba(21,21,21,1) 100%);
  top: 0;
  right: -1px;
  z-index: 1000;
}

#titleContainer:before{
  content: "";
  display: block;
  position: absolute;
  width: 10%;
  height: 90%;
  background: linear-gradient(90deg, rgba(40,40,40,1) 5%, rgba(40,40,40,0.7) 51%, rgba(40,40,40,0) 100%);
  top: 0;
  left: -1px;
  z-index: 1000;
}


#miniPlayerTitle {
  font-size: 18px;
  font-weight: 300;
  width: auto;
  white-space: nowrap;
}

#miniPlayerArtistName {
  width: auto;
}

.miniPlayerArtistContainer {
  width: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#miniPlayerArtist {
  width: auto;
  display: inline;
  white-space: nowrap;
  color: var(--Gray-3);
}


#miniPlayer {
  height: 56px;
  width: 100%;
  max-width: 523px;
  position: absolute;
  background:linear-gradient(270deg, #151515 33%, #282828 86.53%);
  z-index: 9000;
  bottom: calc((env(safe-area-inset-bottom) + 61px) );
}

#miniPlayer > span {
  position: absolute;
  height: inherit;
  width: 100%;
  display: block;

}

#miniPlayer span .playingImage {
  width: auto;
  height: inherit;
  max-width: 56px;
  max-height: 56px;
  float: left;
  position: relative;
}

.playingTitle, .playingArtist {
  text-align: center;
  position: relative;
  width: calc(100% - 110px);
  float: left;
  margin: 0 auto;
}


#advMiniPlayer .playingTitle {
  height: 100%;
  justify-content: left;
  margin-left: 10px;
  font-size: 0.8em;
  color: var(--Gray-3);
}

#advMiniPlayer .miniPlayBtn {
  top: -100%;
  width: 100px;
  right: 0px;
  float: right;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

#theMiniplayer .playingTitle {
  margin-top: 5px;
}

#advMiniPlayer .miniPlayBtn {
  height: inherit;
}

#advMiniPlayer .miniPlayBtn img {
  margin-left: 8px;
  width: 6px;
}

.miniPlayBtn {
  position: relative;
  top: 5px;
  height: 45px;
  z-index: 101;
}


</style>
<style>
.miniSlider {
  position: absolute;
  bottom: 0px;
}

.miniSlider .vue-slide-bar {
  height: 2px !important;
  background-color: #171717 !important;
}
</style>
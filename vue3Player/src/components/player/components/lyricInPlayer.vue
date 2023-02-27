<template>
  <div id="lyric-container" class="lyric-container" :style="lyricStyle">

    <div class="lyric-header kalameh" >
      <svg width="141" height="43" viewBox="0 0 141 43" fill="none" xmlns="http://www.w3.org/2000/svg"
           >
        <path
            d="M0 43H140.542C127.318 43 115.854 34.054 108.483 23.0744C100.931 11.8261 88.6263 0 70.2712 0C51.9162 0 39.6118 11.8261 32.0598 23.0744C24.6884 34.054 13.2246 43 0 43Z" fill="var(--lyricBackColor"/>
      </svg>
      <span class="lyric-header-title" :class="{noSyncHeader:!trackData.lyric.type_title}"  @click="scrollToLyrics">
        متن</span>
      <span class="lyric-header-hashtag">{{trackData.lyric.type_title?trackData.lyric
          .type_title:''}}</span>
      <div class="lyric-shareBtn" @click="shareLyrics">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.6485 10.2968C11.9216 10.2968 11.2708 10.6283 10.8391 11.1481L9.00926 10.238C8.73886 10.1036 8.41057 10.2136 8.27609 10.4841C8.14159 10.7545 8.25178 11.0828 8.52221 11.2173L10.3548 12.1287C10.3169 12.296 10.297 12.4699 10.297 12.6484C10.297 13.9451 11.3519 15 12.6485 15C13.9452 15 15.0001 13.9451 15.0001 12.6484C15.0001 11.3517 13.9452 10.2968 12.6485 10.2968ZM12.6485 13.9062C11.955 13.9062 11.3907 13.3419 11.3907 12.6484C11.3907 12.4764 11.4254 12.3124 11.4882 12.1629C11.5016 12.143 11.5139 12.122 11.5249 12.0999C11.5366 12.0765 11.5464 12.0525 11.5545 12.0283C11.771 11.6478 12.1803 11.3906 12.6485 11.3906C13.3421 11.3906 13.9063 11.9548 13.9063 12.6484C13.9063 13.3419 13.3421 13.9062 12.6485 13.9062Z" fill="#E0E0E0" stroke="#E0E0E0" stroke-width="0.2"/>
          <path d="M12.6485 1C11.3518 1 10.2969 2.0549 10.2969 3.35157C10.2969 3.53277 10.3175 3.70925 10.3565 3.87878L5.15188 6.48875C4.72018 5.97531 4.07333 5.64844 3.35157 5.64844C2.05492 5.64844 1 6.70334 1 8.00001C1 9.29668 2.05492 10.3516 3.35157 10.3516C4.07022 10.3516 4.7146 10.0275 5.14628 9.51792L6.02929 9.96731C6.10875 10.0078 6.19343 10.0269 6.27689 10.0269C6.47611 10.0269 6.66818 9.91768 6.76473 9.72797C6.90172 9.45877 6.79459 9.12953 6.52539 8.99253L5.64008 8.54199C5.68131 8.36795 5.70313 8.18647 5.70313 8.00001C5.70313 7.81656 5.68202 7.63795 5.64207 7.4665L10.844 4.85788C11.2757 5.37419 11.9244 5.70313 12.6485 5.70313C13.9451 5.70313 15 4.64824 15 3.35157C15 2.0549 13.9451 1 12.6485 1ZM3.35157 9.25782C2.65802 9.25782 2.09375 8.69356 2.09375 8.00001C2.09375 7.30646 2.65802 6.74219 3.35157 6.74219C4.04511 6.74219 4.60938 7.30646 4.60938 8.00001C4.60938 8.69356 4.04511 9.25782 3.35157 9.25782ZM12.6485 4.60938C11.9549 4.60938 11.3906 4.04511 11.3906 3.35157C11.3906 2.65802 11.9549 2.09375 12.6485 2.09375C13.342 2.09375 13.9063 2.65802 13.9063 3.35157C13.9063 4.04511 13.342 4.60938 12.6485 4.60938Z" fill="#E0E0E0" stroke="#E0E0E0" stroke-width="0.2"/>
        </svg>
      </div>
    </div>


    <div id="llc" class="lyric-content"
         :style="{backgroundColor:backColor,height:trackData.is_demo?'320px':'250px'}"
         @scroll.prevent
         @click.stop="openLyricUI"
    >


<div class="lyric-content-list" v-if="data && !isLoadingLyrics">
  <ul id="sync-ul" class="lyric-lines-container kalameh" v-if="data.sync" ref="lyricListPlayer">
<!--    <span v-for="(line,index) in nonSynced" class="lyric-line"  :key="index">-->
<!--      <li  v-if="line.trim().length > 0" >{{ line }}</li>-->
<!--    </span>-->
    <span v-for="(line,index) in synced" :id="'line-'+index" class="lyric-line"
          :class="synced_line(line)?'white-line':''"
          :key="index">
    <li >
      {{ line.text }}
    </li>
      </span>
  </ul>

  <ul class="lyric-lines-container kalameh" v-if="data.text">
    <span v-for="(line,index) in nonSynced" class="lyric-line whiteText"  :key="index">
      <li  v-if="line.trim().length > 0" >{{ line }}</li>
    </span>
  </ul>
</div>

      <lyrics-in-player-s-k :count="1" v-if="!data && isLoadingLyrics"></lyrics-in-player-s-k>
      <div v-if="!data && !isLoadingLyrics" style="min-height: 205px; width: 100%;"></div>



      <div class="lyric-footer">
        <div class="lyric-btnContainer">
          <div class="lyric-flagBtn dir-rtl kalameh" @click.stop="$utils.openSheet('lyricReportSheet',$root.$refs.app)">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.75 16.5C3.3 16.5 3 16.2 3 15.75V3.75C3 3.3 3.3 3 3.75 3H14.25C14.55 3 14.85 3.15 14.925 3.45C15.075 3.75 15 4.05 14.775 4.275L11.925 7.125L14.775 9.975C15 10.2 15.075 10.5 14.925 10.8C14.85 11.1 14.55 11.25 14.25 11.25H4.5V15.75C4.5 16.2 4.2 16.5 3.75 16.5ZM4.5 9.75H12.45L10.35 7.65C10.05 7.35 10.05 6.9 10.35 6.6L12.45 4.5H4.5V9.75Z" fill="#F2F2F2"/>
            </svg>
            <span>گزارش خطا</span>
          </div>


          <div class="lyric-toggleBtn" @click.stop="openLyricUI">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.29167 0.90625H2.26042C1.90127 0.90625 1.55683 1.04892 1.30288 1.30288C1.04892 1.55683 0.90625 1.90127 0.90625 2.26042V4.29167M13.0938 4.29167V2.26042C13.0938 1.90127 12.9511 1.55683 12.6971 1.30288C12.4432 1.04892 12.0987 0.90625 11.7396 0.90625H9.70833M9.70833 13.0938H11.7396C12.0987 13.0938 12.4432 12.9511 12.6971 12.6971C12.9511 12.4432 13.0938 12.0987 13.0938 11.7396V9.70833M0.90625 9.70833V11.7396C0.90625 12.0987 1.04892 12.4432 1.30288 12.6971C1.55683 12.9511 1.90127 13.0938 2.26042 13.0938H4.29167" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

      </div>
      <div  v-if="trackData.is_demo && $store.state.playerLyrics" class="lyric-footer-limitBanner  fit-48 m-auto">
        <ButtonClickable
            id=""
            :hasIcon="false"
            @click.native="$utils.limitAction('playerOpened')"
            class="filled m-auto"
            style="width:150px; height:35px; box-shadow: 0px 1px 4px var(--Gray-3);"
            text="ویژه شوید">
        </ButtonClickable>
        <span class="limitBanner-title">{{ limitation_data.player_text }}
            .</span>
      </div>
    </div>

  </div>
</template>

<script>
let whites
import ButtonClickable from "@/components/includes/Elements/ButtonClickable.vue";
import LyricsInPlayerSK from "@/components/includes/Elements/Skeletons/lyricsInPlayerSK.vue";
export default {
  name: "lyricInPlayer",
  components: {LyricsInPlayerSK,  ButtonClickable},
  props: {
    trackData:Object,
    data: Object,
    isPlaying:Boolean,
    currentTime: Number,
    seekTime: String,
    rawDuration: Number,
    backColor:String,
    duration: {
      type:String,
      default: '00:00'
    },
    limitation_data:Object,
    isLoadingLyrics:Boolean
  },
  data() {
    return {
      cTime:null,
      sliderCustomize: {
        lineHeight: 2,
        showTooltip: true,
        processStyle: {
          backgroundColor: 'white'
        },
      },
    }

  },
  mounted() {
    this.$root.$refs.lyricReportSheet = this.$root.$refs.app.$refs.lyricReportSheet
  },
  watch:{
    cTime() {
      // let syncUL = document.getElementById('sync-ul')
      // let whites = syncUL.getElementsByClassName('white-line')
      whites = this.$refs.lyricListPlayer.getElementsByClassName('white-line')
      let lastWhite = whites[whites.length - 1]
      this.activeLineToPosition(lastWhite)
    }
  },
  computed: {
    whites() {
      return this.$refs.lyricListPlayer.getElementsByClassName('white-line')
    },
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
    scrollToLyrics() {
          let tracksTop = document.getElementById('playerData').offsetTop -
          document.getElementById('lyric-container').offsetTop - document.querySelector('.bottomBox').offsetHeight + 5
          document.getElementById('Player').scrollTo({top:tracksTop,left:0,behavior:'smooth'})
    },
    shareLyrics() {
      let toShare = ''
      if(this.data.text) {
        toShare = this.data.text
      }
      else {
        for(let line in this.data.sync)
        {
          toShare = toShare + this.data.sync[line].text + '\n'
        }
      }
      window.navigator.share({
        title: 'اشتراک متن آهنگ',
        text:
        this.trackData.title + '\n'+ toShare
      })
          .then(() =>
              console.log('Yay, you shared it :)'))
          .catch(error => console.log('Oh noh! You couldn\'t share it! :\'(\n', error));
    },
    synced_line(line) {
      this.cTime = this.currentTime
      return this.currentTime >= line.time;
    },
    setTimeFromLine(line) {
      this.cTime = line.time
    },
    play() {
      this.$root.$refs.BigPlayer.togglePlay()
    },
    pause() {
      this.$root.$refs.BigPlayer.togglePlay()
    },
    activeLineToPosition(lastWhite) {
      // let activeLineRect = document.getElementById('line-'+index)
      if(lastWhite) {
        let topPos = lastWhite.offsetTop - 90;
        document.querySelector('#sync-ul').scrollTo({
          top: topPos,
          left: 0,
          behavior: 'smooth'
        });
      }
    else {
      document.querySelector('#sync-ul').scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    },
    openLyricUI(){
      if(this.$root.$refs.BigPlayer.lyricOpenable) {
        // this.$root.$refs.lyricUISheet = this.$root.$refs.BigPlayer.$refs.lyricUISheet
        // this.$root.$refs.lyricUISheet.open()
        //
        this.$root.$refs.BigPlayer.lyricFS = true
        setTimeout(() => {
          this.$root.$refs.BigPlayer.pointerDisabled = true
          this.$root.$refs.BigPlayer.lyricOpenable = false
        },500)
      }

    }
  }
}
</script>

<style scoped>
.white-line {
  color:white !important;
}
.player-btn {
  z-index:100000;
  max-width: 90px;
}
.lyric-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  top: -50px;
  min-height: 300px;
  overflow-y: hidden;
}


@media screen and (min-width: 450px) and (max-height: 850px) {
  .lyric-container {
    top:-55px;
  }
}
.lyric-header {
  position: relative;
  width: 100%;
  top: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lyric-header-title {
  position: absolute;
  font-size: 16px;
  font-weight: 700;
  top:3px;
  z-index: 10000;
}
.noSyncHeader {
  top:10px !important;
}
.lyric-header-hashtag {
  position: absolute;
  top: 25px;
  direction: rtl;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: .5;
  z-index: 1;
}

.lyric-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transform: translateZ(0);
  /* background-color: #885555; */
  /* background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%); */
  border-radius: 20px;
  overflow-x: hidden;
  width: 100%;
  overflow-y: hidden;
  /*height: 250px;*/
}



.lyric-content-list:after{
  display: block;
  content: "";
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 50%;
  border-radius: 20px 20px 0 0;
  background: linear-gradient(180deg, var(--lyricBackColor) 20%, rgba(51,51,51,0) 100%);
  z-index: 1;
}
.lyric-content-list:before{
  display: block;
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 50%;
  border-radius: 0px 0px 20px 20px;
  background: linear-gradient(0deg, var(--lyricBackColor) 20%, rgba(51,51,51,0) 100%);
  z-index: 1;
}




.lyric-shareBtn {
  position: absolute;
  top: 55px;
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
  max-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* background-color: #409B65; */
  /*margin-top: 55px;*/
  overflow-y: scroll;
  top: -1px;

}
.lyric-lines-container span:first-child {
  margin-top:55px;
}
.lyric-lines-container span:last-child {
padding-bottom:75px;
}


.lyric-line {
  width: 95%;
  font-size: 18px;
  font-weight: 400;
  line-height: 48px;
  color: #000000;
}
.lyric-line li{
  list-style:none;
}

.seeked {
  color: #FFFFFF;
}

.lyric-demoLimit {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  width: 90%;
  height: 328px;
  top: 182px;
  background: rgba(242, 201, 76, 0.2);
  backdrop-filter: blur(5px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 20px;
  z-index: 2;
}

.lyric-demoLimit img {
  margin-top: 10px;
  margin-bottom: 10px;
}

.demoLimit-title {
  font-size: 14px;
  font-weight: 400;
  direction: rtl;
  padding: 5px;
  color: var(--Accent);
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.7);
  margin-bottom: 15px;
}

.player-btnContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
}

#lyric-seekTime  {
  width: 100%;
  margin-top: 15px;
  padding-top: 0 !important;
}

.duration-container{
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
}

.lyric-btnContainer {
  width: 92.5%;
  /* background: #409B65; */
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
  padding: 7px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 300;
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
  padding: 2.5px 15px;
  font-size: 14px;
  cursor: pointer;
}

.lyric-flagBtn svg {
  margin-left: 5px;
}

.lyric-footer-limitBanner {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(242, 201, 76, 0.3);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  border-radius: 15px;
  z-index: 1;
  margin-top: 15px;
}

.limitBanner-title {
  padding: 0px 10px;
  color: #fff;
  font-size: 12px;
  text-align: right;
  direction: rtl;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.7);

}
@media screen and (max-width: 375px) {
  .lyric-container {
    top: -55px;
  }
}
@media screen and (max-width: 321px) {
  .noSyncHeader {
    top: 5px !important;
  }
  .lyric-container {
    top: -40px;
  }
  .lyric-header svg{
    height:32px;
  }
  .lyric-header-hashtag{
    top: 18px;
    font-size: 8px;
  }
  .lyric-header-title{
    font-size: 13px;
    top: 0px;
  }
}
@supports (-webkit-touch-callout: none) {
  .lyric-container {
    top: calc(-25px - env(safe-area-inset-bottom)) !important;
  }
  .lyric-content {
    border-radius: 30px;
  }
  .lyric-content-list:after{
    border-radius: 30px 30px 0 0;
  }
  .lyric-content-list:before{
    border-radius: 0px 0px 30px 30px;
  }
  .lyric-demoLimit {
    border-radius: 30px;
  }
}
</style>
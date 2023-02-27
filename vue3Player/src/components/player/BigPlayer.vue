<template>
  <div id="playerContainer" class="playerContainer">
    <div class="fit-16 m-auto" id="Player">
      <div class="topBoxContainer" id="PlayerTopBox">
<!--        <div class="playerBack"></div>-->
<!--        <div :style="{backgroundColor:$store.state.playerData?$store.state.playerData.background_color:null}" class="back"></div>-->
<!--        <span class="header" id="header">-->
<!--          <img draggable="false" @click="closeSheet"-->
<!--               src="@/assets/icons/playerTopBtn.svg"/>-->
<!--        </span>-->


        <div class="playerWrapper fit-16 m-auto">

<!--          <advertise-top-box-->
<!--              v-if="$store.state.playerAdvertiseData"-->
<!--              :data="$store.state.playerAdvertiseData && !lyricFS">-->
<!--          </advertise-top-box>-->
<!--          <player-top-box-->
<!--              v-if="$store.state.playerData && !$store.state.playerAdvertiseData  && !lyricFS"-->
<!--              :data="$store.state.playerData">-->
<!--          </player-top-box>-->


<!--          <adv-player ref="advPlayer"-->
<!--                      v-if="advTrack"-->
<!--                      :advTrack="advTrack">-->
<!--          </adv-player>-->
          <the-player ref="thePlayer"
                      v-show="!$store.state.playerAdvertiseData">
          </the-player>

        </div>

<!--        <bottom-box-->
<!--            v-if="$store.state.playerData && !$store.state.playerAdvertiseData  && !lyricFS"-->
<!--            :data="$store.state.playerData"-->
<!--            :sleep-time="sleepTime">-->
<!--        </bottom-box>-->
<!--        <advertise-bottom-box-->
<!--            v-if="$store.state.playerAdvertiseData  && !lyricFS"-->
<!--            :data="$store.state.playerAdvertiseData" />-->
<!--        <lyric-in-player-->
<!--            v-if="$store.state.playerData && $store.state.playerData.lyric.has_lyric &&-->
<!--                    !$store.state.playerAdvertiseData && !lyricFS"-->
<!--            ref="lyricInPlayer"-->
<!--            :key="$store.state.playerData?$store.state.playerData.id:0"-->
<!--            :track-data="$store.state.playerData"-->
<!--            :data="$store.state.playerLyrics"-->
<!--            :seek-time="$refs.thePlayer.playerCurrentTime"-->
<!--            :current-time="$refs.thePlayer.playbackTime"-->
<!--            :duration="$refs.thePlayer.playerDuration"-->
<!--            :rawDuration="$refs.thePlayer.rawDuration"-->
<!--            :isPlaying="$refs.thePlayer.isPlaying"-->
<!--            :back-color="$store.state.playerData.background_color"-->
<!--            :limitation_data="$store.state.lyric_limitation_data"-->
<!--            :isLoadingLyrics="$store.state.isLoadingLyrics">-->
<!--        </lyric-in-player>-->
<!--        <lyric-ui-->
<!--            v-if="$store.state.playerData && $store.state.playerData.lyric.has_lyric  &&-->
<!--                    !$store.state.playerAdvertiseData && lyricFS"-->
<!--            :key="Math.round($refs.thePlayer.rawDuration)"-->
<!--            ref="lyricUI"-->
<!--            :track-data="$store.state.playerData"-->
<!--            :data="$store.state.playerLyrics"-->
<!--            :seek-time="$refs.thePlayer.playerCurrentTime"-->
<!--            :current-time="$refs.thePlayer.playbackTime"-->
<!--            :duration="$refs.thePlayer.playerDuration"-->
<!--            :rawDuration="$refs.thePlayer.rawDuration"-->
<!--            :isPlaying="$refs.thePlayer.isPlaying"-->
<!--            :playerDisabled="$refs.thePlayer.playerDisabled"-->
<!--            :back-color="$store.state.playerData.background_color"-->
<!--            :limitation_data="$store.state.lyric_limitation_data"-->
<!--            :sleep-time="sleepTime"-->
<!--            :isLoadingLyrics="$store.state.isLoadingLyrics">-->
<!--        </lyric-ui>-->
        <Recycler id="playerData"
                  ref="playerData"
                  :checked_items="$store.state.playerCheckedItems"
                  :data="$store.state.playerTracks.tracks"
                  :end="$store.state.playerTracks?$store.state.playerTracks.end:true"
                  :meta="$store.state.playerTracks"
                  :playingIndex="$store.state.playerIndex"
                  :query="$store.state.playerQuery"
                  :queryParams="$store.state.playerQueryParams"
                  class="playerData"
                  from="player"
                  storeCommand="setPlayerTracks"
                  theComponent="Music"
                  v-if="$store.state.playerData && $store.state.playerTracks  && !lyricFS"
                  :style="'top:35vh;'"
        >
        </Recycler>
      </div>
<!--      <VueBottomSheet id="lyricUISheet"-->
<!--                      v-if="$store.state.playerData &&  !$store.state.playerAdvertiseData"-->
<!--                      ref="lyricUISheet"-->
<!--                      :click-to-close="false"-->
<!--                      :swipe-able="false"-->
<!--                      :is-full-screen="true"-->
<!--                      :overlay="true"-->
<!--                      max-height="100vh"-->
<!--                      overlay-color="#0000004D"-->
<!--                      @closed="closeLyrics">-->
<!--        <lyric-ui-->
<!--            v-if="$store.state.playerData.lyric.has_lyric"-->
<!--            :key="Math.round($refs.thePlayer.rawDuration)"-->
<!--            ref="lyricUI"-->
<!--            :track-data="$store.state.playerData"-->
<!--            :data="$store.state.playerLyrics"-->
<!--            :seek-time="$refs.thePlayer.playerCurrentTime"-->
<!--            :current-time="$refs.thePlayer.playbackTime"-->
<!--            :duration="$refs.thePlayer.playerDuration"-->
<!--            :rawDuration="$refs.thePlayer.rawDuration"-->
<!--            :isPlaying="$refs.thePlayer.isPlaying"-->
<!--            :playerDisabled="$refs.thePlayer.playerDisabled"-->
<!--            :back-color="$store.state.playerData.background_color"-->
<!--            :limitation_data="$store.state.lyric_limitation_data"-->
<!--            :sleep-time="sleepTime">-->
<!--        </lyric-ui>-->
<!--      </VueBottomSheet>-->

<!--      <m-dialog-->
<!--          ref="downloadLimitDialog"-->
<!--          :data="downloadLimitDialogData"-->
<!--          :styleObject="downloadLimitDialogData.styleObject"-->
<!--          @whatToDo="downloadLimitDialogAction"-->
<!--      >-->
<!--      </m-dialog>-->
    </div>
  </div>
</template>

<script>
    // import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
    import Recycler from "@/components/includes/Elements/Recycler.vue";
    // import GotoTopBtn from "../includes/Elements/GotoTopBtn.vue";
    // import lyricUi from "@/components/player/components/lyricUi.vue";
    // import lyricInPlayer from "@/components/player/components/lyricInPlayer.vue";
    // import AdvertiseBox from "@/components/player/components/advertiseBox.vue";
    // import PlayerTopBox from "@/components/player/components/playerTopBox.vue";
    import ThePlayer from "@/components/player/components/thePlayer.vue";
    // import BottomBox from "@/components/player/components/bottomBox.vue";
    // import ButtonClickable from "@/components/includes/Elements/ButtonClickable.vue";
    // import MDialog from "@/components/includes/Elements/mDialog";
    // import AdvertiseTopBox from "@/components/player/components/Advertise/advertiseTopBox.vue";
    // import AdvPlayer from "@/components/player/components/Advertise/advPlayer.vue";
    // import AdvertiseBottomBox from "@/components/player/components/Advertise/advertiseBottomBox.vue";
    // let middle
    // let Player
    // let goToTopPlayer
    export default {
      name: "BigPlayer",
      components: {
        // AdvertiseBottomBox,
        // AdvPlayer,
        // AdvertiseTopBox,
        // MDialog,
        // ButtonClickable,
        // BottomBox,
        ThePlayer,
        // PlayerTopBox,
        // AdvertiseBox,
        // GotoTopBtn,
        Recycler,
        // lyricUi,
        // lyricInPlayer,
        // VueBottomSheet
      },
      // mixins: [VueHowler],
      props: {
        data: {
          type:Object
        },
        lyricLimitationData: Object
      },
      data: () => {
        return {
          advTrack:null,
          retryCount: 0,
          advData: null,
          advAudio: null,
          historyTouchY: [],
          historyTouchStart: null,
          isShowLyrics: false,
          isMinimized: false,
          slideBar: 0,
          progress: 0,
          nextAudio: null,
          nextAudioElement: null,
          userRangeClicked: false,
          fetchUrl: null,
          lyricFS: false,
          lyricOpenable: true,
          pointerDisabled: false,
          sleepTime: 0,
          downloadLimitDialogData: {
            headerText: 'ویژه شوید',
            styleObject: {
              backColor: 'linear-gradient(180deg, #3D3D3D 0%, #282828 100%)',
            },
            bodyContent: {
              text: 'ظرفیت دانلود روزانه ی شما به اتمام رسیده است (7 دانلود برای کاربران عادی).برای دانلود نامحدود ویژه شوید.',
              image: 'downloadLimit.svg',
              imageSize: '150px',
              downloadLimitTitle : true
            },
            Buttons: [
              {
                text: 'ویژه شوید',
                type: 'filled',
                action: {
                  actionType: 'emit'
                }
              }
            ],
          },
        }
      },
      watch: {
        lyricFS() {
          if(this.lyricFS === false) {
            this.closeLyrics()
          }
        }
      },
      methods: {
        // downloadLimitDialogAction() {
        //   this.$refs.downloadLimitDialog.close()
        //   let backState
        //   if(this.$root.$refs.lyricUI) backState = 'lyricsOpened'
        //   else backState = 'playerOpened'
        //   this.$utils.limitAction(backState)
        // },
        // toggleLyrics() {
        //   this.$store.commit('setPlayerLyrics', null)
        //   Promise.all([this.getLyrics()])
        //       .then(() => {
        //         this.$store.dispatch('setLyricsLoading',false)
        //       })
        // },
        // async getLyrics() {
        //   await this.$store.dispatch('setLyricsLoading',true)
        //   await this.$store.dispatch('get_Data', {
        //     api_version: 'v7/',
        //     api_command: 'getTrackLyrics',
        //     params: {
        //       track_id: this.$store.state.playerData.id,
        //       is_demo: this.$store.state.playerData.is_demo ? 1 : 0
        //     },
        //     store_command: {
        //       "command": 'setPlayerLyrics',
        //       "addedParams": this.$store.state.user.id + '-' + this.$store.state.playerData.id
        //     }
        //   })
        // },
        // toggleScrollBtn() {
        //   let heightDif = middle.offsetHeight - (middle.offsetHeight - Player.scrollTop).toPrecision(2)
        //   if (heightDif > 600 && goToTopPlayer.classList.contains('hide'))
        //       {
        //         goToTopPlayer.classList.remove('hide')
        //       } else if (heightDif < 600 && !goToTopPlayer.classList.contains('hide'))
        //       {
        //         goToTopPlayer.classList.add('hide')
        //       }
        // },
        //
        // isInViewport(el) {
        //   const rect = el.getBoundingClientRect();
        //   return (
        //       rect.top >= 0 &&
        //       rect.left >= 0 &&
        //       rect.bottom <= (window.innerHeight + 50
        //           ||
        //           document.documentElement.clientHeight + 50) &&
        //       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        //
        //   );
        // },
        // loadMoreHandler(container) {
        //   middle = document.getElementById('Middle')
        //   Player = document.getElementById("Player")
        //   goToTopPlayer = document.getElementById("goToTopPlayer")
        //   if (document.getElementById('Player').scrollTop > 10 && (!this.$store.state.playerLyrics && !this.$store.state.isLoadingLyrics)) {
        //     if (this.$store.state.playerData.lyric.has_lyric) {
        //       this.toggleLyrics()
        //     }
        //   }
        //   if (document.getElementById('Player').scrollTop > 600)
        //   {
        //     this.toggleScrollBtn()
        //     if(this.$refs.playerData) this.$refs.playerData.loadMoreHandler(container)
        //   }
        //
        // },
        // closeSheet() {
        //   this.isMinimized = true
        //   this.$utils.closeSheet(this.$root.$refs.player)
        // },
        // closeLyrics() {
        //   setTimeout(() => {
        //     this.lyricOpenable = true
        //     this.pointerDisabled = false
        //   }, 500)
        // },
        //Telegram
        // async checkTGStatus() {
        //   await this.$store.dispatch('get_Data',
        //       {
        //         api_command: 'checkIfTelegramConnected',
        //         params: {},
        //         store_command: {
        //           "command": 'setTGStatus',
        //         }
        //       })
        // },
        // async startTGProcess(no_track, change) {
        //   if (!this.$store.state.initialData.telegram_data.has_connected) {
        //     // Need Telegram Check
        //     this.$root.$refs.vToaster.openToast('در حال انتقال به تلگرام... لطفاً صبور باشید')
        //     this.isCheckingStatus = true
        //     await this.$store.dispatch('get_Data',
        //         {
        //           api_command: 'generateTelegramLink',
        //           params: {
        //             track_id: no_track ? null : this.$store.state.playerData.id,
        //             quality: this.$store.state.user.streaming_quality
        //           },
        //           store_command: {
        //             "command": 'goTGLink',
        //           }
        //         }).then(() => {
        //       setTimeout(() => {
        //         if (this.$device.isIOS) {
        //           window.open(this.$store.state.tgLink.link, '_top')
        //         } else {
        //           window.open(this.$store.state.tgLink.link, '_blank')
        //         }
        //       }, 50)
        //       this.isCheckingStatus = false
        //       this.$utils.closeSheet(this.$refs.connectTelegramSheet)
        //     })
        //         .catch((error) => {
        //           this.isCheckingStatus = false
        //           console.log(error)
        //         })
        //   } else {
        //     if (change) {
        //       this.isCheckingStatus = true
        //       await this.$store.dispatch('get_Data',
        //           {
        //             api_command: 'unlinkTelegram',
        //             params: {},
        //             store_command: {
        //               "command": '',
        //             }
        //           }).then(() => {
        //         this.$store.commit('unsetTGStatus', null)
        //         Promise.all([this.startTGProcess(true, false)]).then(() => {
        //           this.$store.commit('setTGUnlinked', true)
        //           this.isCheckingStatus = false
        //           this.$utils.closeSheet(this.$refs.connectTelegramSheet)
        //         })
        //       })
        //           .catch((error) => {
        //             this.isCheckingStatus = false
        //             console.log(error)
        //           })
        //     } else {
        //       this.isCheckingStatus = true
        //       this.isSendingToTelegram = true
        //       await this.$store.dispatch('get_Data',
        //           {
        //             api_command: 'sendMusicToTelegram',
        //             params: {
        //               track_id: this.$store.state.playerData.id,
        //               quality: this.$store.state.download_quality
        //             },
        //             store_command: {
        //               "command": 'musicSentToTelegram',
        //             }
        //           }).then(() => {
        //         if (this.$store.state.telegramLimitationObj) {
        //           this.downloadLimitDialogData.bodyContent.text = this.$store.state.telegramLimitationObj.message
        //           this.openDownloadLimitDialog()
        //         } else {
        //           this.isSendingToTelegram = false
        //           this.$utils.closeSheet(this.$root.$refs.downloadSheet)
        //           this.$root.$refs.vToaster.openToast('موزیک به تلگرام ارسال شد...')
        //         }
        //
        //         this.$store.commit('musicSentToTelegram', null)
        //         this.isCheckingStatus = false
        //         this.$utils.closeSheet(this.$root.$refs.downloadSheet)
        //       })
        //     }
        //
        //   }
        //
        // },
        // async openDownloadSheet() {
        //   let DQisSet = localStorage.getItem('download_quality')
        //   if (!this.$store.state.playerData.is_demo) {
        //     if (!DQisSet) {
        //       this.$utils.openSheet('userDownloadQualitySheet',this.$root.$refs.app)
        //     } else {
        //       this.$utils.openSheet(this.$refs.downloadSheet)
        //       if (!this.$store.state.initialData.telegram_data.has_connected) {
        //         await this.checkTGStatus()
        //       } else {
        //         console.log('telegram is connected')
        //       }
        //     }
        //
        //   } else {
        //     this.$root.$refs.vToaster.openToast(
        //         'برای دانلود این آهنگ باید کاربر ویژه شوید!'
        //     )
        //   }
        // },
        // openDownloadLimitDialog() {
        //   let downloadLimitations = JSON.parse(localStorage.getItem("limitations")).filter(item => item.limitation_key.includes('download_per_day')).reverse()[0]
        //   this.downloadLimitDialogData.bodyContent.text = downloadLimitations.limitation_data.message
        //   this.$refs.downloadLimitDialog.openDialog()
        // },
      }
    }

</script>


<style>
.playerWrapper, .advertiseWrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  height: auto;
  transform: translateZ(0);
  top: 0px;
  z-index: 10000000000000;
  background-color: black;
  border-radius: 0px 0px 20px 20px;
  border-bottom: 1px solid white;
}
@media screen and (max-width: 321px) {
.header img {
  height:32px;
}
}
    root {
        --title-scroll-out: 0px;
        --title-scroll-start: 0px;
        --info-scroll-start: 0px;
        --info-scroll-out: 0px;
    }


    /*.animateInfo {*/
    /*    position: relative;*/
    /*    animation: infoAnimation 30s linear infinite;*/
    /*}*/

    #lyricUISheet {
      z-index: 10000000000;
      overflow-y: hidden;
    }

    /*@keyframes infoAnimation {*/
    /*    0% {*/
    /*        transform: translateX(var(--info-scroll-start))*/
    /*    }*/
    /*    100% {*/
    /*        transform: translateX(var(--info-scroll-out))*/
    /*    }*/
    /*}*/

    /*.animateTitleText {*/
    /*    animation: titleAnimation 30s linear infinite;*/
    /*}*/

    /*@keyframes titleAnimation {*/
    /*    0% {*/
    /*        transform: translateX(var(--title-scroll-start))*/
    /*    }*/
    /*    100% {*/
    /*        transform: translateX(var(--title-scroll-out))*/
    /*    }*/
    /*}*/


</style>

<style scoped id="bigPlayerStyles">
    .hasGradient {
        width: 100%;
        position: relative;
    }

    .hasGradient:after {
        content: "";
        display: block;
        position: absolute;
        width: 10%;
        height: 95%;
        background: linear-gradient(270deg, rgba(33, 33, 33, 1) 5%, rgba(33, 33, 33, 0.7) 51%, rgba(33, 33, 33, 0) 100%);
        top: 0;
        right: -1px;
        z-index: 1000;
    }

    .hasGradient:before {
        content: "";
        display: block;
        position: absolute;
        width: 10%;
        height: 95%;
        background: linear-gradient(90deg, rgba(33, 33, 33, 1) 5%, rgba(33, 33, 33, 0.7) 51%, rgba(33, 33, 33, 0) 100%);
        top: 0;
        left: -1px;
        z-index: 1000;
    }

    #infoContainer {
        width: 100%;
        overflow: hidden;
    }

    #info {
        width: auto !important;
        display: inline-block !important;
        margin: 0 !important;
        /*transition: opacity 3s  1s ease-in-out !important;*/
        overflow: visible;
    }

    #playerDataTitleContainer {
        width: 100%;
        overflow: hidden;
    }

    #playerDataTitle {
        width: auto !important;
        display: inline-block !important;
        overflow: visible !important;
        /*transition: opacity 3s 1s ease-in-out !important;*/
    }


.playerContainer {
  position: relative;
  left: -1px;
  width: 100vw;
  max-width: 523px;
  z-index: 9999999000000000000000;
  transform: translate3d(0, 0, 400px);
  height: 100vh;
  /*overflow: scroll;*/
  background: var(--black);
  overflow: hidden;
}

    .downloadProgress {
        width: 30px;
        height: 30px;
        overflow: visible;
        position: absolute;
    }

    .lyricsLoading {
        min-height: 145px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .lyricsLoading .spinner div {
        background-color: var(--Accent);
    }

    .vue-slide-bar-component {
        width: calc(100% - 64px);
        padding-top: 0px;
        padding-bottom: 10px;
        margin: 10px auto 0;
    }

    #Player .vue-slide-bar-component .vue-slide-bar {
        height: 3px !important;
    }

#Player {
  height: 100%;
  position: relative;
  z-index: 1000000;
  overflow: scroll;
}

    #Player .playerData {
      height: auto;
      position: relative;
      transform: translate3d(0, 0, 200px);
      z-index: 2;
      padding-bottom: calc(10px + env(safe-area-inset-bottom));
    }
    #Player .advText {
      font-size: 18px;
      opacity: 0.5;
    }
    .topBoxContainer {
        width: 100%;
        height: calc(100vh - env(safe-area-inset-bottom));
    }

    .playerBack {
      width: 100%;
      top: 0px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: calc(91vh - env(safe-area-inset-bottom));
      overflow: hidden;
      position: absolute;
      /* padding-bottom: 15px; */
      border-radius: 0px 0px 50px 50px;
      box-shadow: 0px 0px 20px rgb(0 0 0 / 35%);
      background: linear-gradient(180deg, rgba(33, 33, 33, 0.3) 0.5%, rgba(33, 33, 33, 0.3) 20%, rgba(33, 33, 33, 0.7) 30%, rgba(33, 33, 33, 0.9) 40%, #212121 49%);
    }

    /*.topBox:after{*/
    /*  content: "";*/
    /*  display: block;*/
    /*  position: absolute;*/
    /*  width: 100%;*/
    /*  height: 50px;*/
    /*  background-color:#212121;*/
    /*  bottom: 0;*/
    /*  left: 0;*/
    /*}*/

    .back {
        width: 100%;
        height: 50vh;
        position: absolute;
        transform: scale(.998);
        top: 0;
        left: 0;
        z-index: -1;
        /*filter: blur(5px);*/
        /*background-repeat: no-repeat;*/
        /*background-size: 150%;*/
        /*background-position: top center;*/
    }

    .header {
      position: relative;
      top: 0;
      left: 0;
      z-index: 2;
    }

    .lyrics {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 54vh;
        overflow-y: hidden;
        /*background: #409B65;*/
    }


    .lyric-lines-container {
        position: relative;
        width: 100%;
        height: 54vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        /*background-color: #409B65;*/
        padding-top: 50px;
        overflow-y: scroll;
        z-index: 1;
    }

    .lyrics:after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 83px;
        bottom: 0;
        left: 0;
        background: linear-gradient(0deg, rgba(33, 33, 33, 0.9870119922969187) 3%, rgba(0, 0, 0, 0) 100%);
        z-index: 3;
    }

    .lyric-line {
        width: 95%;
        font-size: 14px;
        font-weight: 200;
        line-height: 37px;
        color: #fcfcfc;
        white-space: pre-line;
    }

    .lyric-limitation {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 300px;
        align-items: center;
        width: 70%;
        border-radius: 10px;
        background: rgba(33, 33, 33, 0.5);
        margin-top: 10px;
        margin-bottom: 200px;
        padding: 10px;
        padding-top: 30px;
    }

    .lyric-limitation-text {
        direction: rtl;
    }

    #lyric-limitation-btn {
        width: 90%;
        border-radius: 40px;
        height: 35px;
        margin-top: 10px;
        font-size: 14px;

    }


    .lyric-btn-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 150px;
    }

    .lyric-limitation-text {
        font-size: 12px;
        font-weight: 200;
    }

    #lyric-btn-one {
        font-size: 12px;
        font-weight: 200;
        width: 111px;
        height: 20px;
        margin: 20px 5px 20px 20px;
        border: 1px solid #FFFFFF;
        color: #FFFFFF;
    }

    #lyric-btn-two {
        font-size: 12px;
        font-weight: 200;
        width: 111px;
        height: 20px;
        margin: 20px 20px 20px 5px;
        border: 1px solid #FFFFFF;
        color: #FFFFFF;
    }




    .artistInfo-container
    {
        height: 70px;
    }



    #Player .MusicName {
        display: flex;
        font-size: 1.4em;
        font-weight: 500;
        text-overflow: ellipsis;
        width: 270px;
        white-space: nowrap;
        overflow: hidden;
    }

    #Player .mel-logo {
        margin-top: -60px;
        z-index: 1000;
        position: relative;
        right: -5px;
    }

    @media screen and (max-width: 320px) {
        #Player .mel-logo {
            max-width: 80px;
        }

        #Player .advTitle > span {
            margin-top: -10px;
            margin-bottom: 5px;
        }

    }

    #Player .advTitle {
        font-size: 1.4em;
        font-weight: 500;
        text-overflow: ellipsis;
        width: 270px;
        white-space: nowrap;
        overflow: hidden;
    }

    #Player .ArtistsName {
        font-size: 1.2em;
        color: var(--Accent);
        text-overflow: ellipsis;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
    }

    #Player .advDesc {
        position: relative;
        top: -10px;
        font-size: 1em;
        color: var(--Accent);
    }

    .playerBox {
        display: flex;
        width: 100%;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 0.5rem;
        padding-bottom: 30px;
    }

    .upItems, .lowItems {
        width: calc(100% - 64px);
        display: inline-flex;
    }
    .lowItems {
      margin: 0 auto 5px;
    }
    .upItems {
      margin: 10px auto;
    }

    #Player .playerBox .upItems span, #Player .playerBox .lowItems span {
        display: inherit;
    }

    #Player .playerBox .upItems span:first-of-type, #Player .playerBox .lowItems span:first-of-type {
        justify-content: flex-start;
    }

    #Player .playerBox .upItems span:last-of-type, #Player .playerBox .lowItems span:last-of-type {
        justify-content: flex-end;
    }

    #Player .playerBox .upItems .repeatOneNum {
        position: absolute;
        display: block;
        width: 10px;
        height: 10px;
        background-color: var(--Accent);
        color: black;
        border-radius: 30px;
        font-size: 10px;
        left: 48px;
        margin-top: 8px;
    }

    .playerBox audio {
        display: flex;
        width: calc(100% - 64px);
        margin: 0 auto;
    }

    .controlBox {
        display: inline-flex;
        position: relative;
        top: -15px;
        justify-content: center;
        align-items: center;
        width: calc(100% - 64px);
        margin: 0 auto;
        /* min-height: 200px; */
        height: auto;
        /* padding: 20px 0px; */
    }


    #Player .controlBox .prev,#Player .controlBox .next,#Player .controlBox .play ,#Player .controlBox .pause {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .controlBox #play img, .controlBox #pause img {
        box-shadow: -4px 4px 5px rgba(0, 0, 0, 0.5);
        border-radius: 100px;
        vertical-align: middle;
        min-height: 70px;
        height: 65%;
    }


    #Player .controlBox .next img, #Player .controlBox .prev img
    {
        width: 30%;
    }
    #Player .controlBox .play img, #Player .controlBox .pause img
    {
        width: 60%;
    }
    .controlBox span:nth-of-type(even) img {
        width: 75%;
    }



    .prev {
        position: relative;
        right: -30px;
    }

    .next {
        position: relative;
        left: -30px;
    }

    /*@media screen and (max-height: 568px ) {*/
    /*  .controlBox span:nth-of-type(odd) img {*/
    /*    margin-top: 15px;*/
    /*  }*/
    /*}*/
    @media (max-width: 359px) {

        #Player .MusicName {
            font-size: 1.2em;
        }

        #Player .ArtistsName {
            font-size: 1em;
        }

        #sortRight span:first-of-type {
            font-size: 0.7em;
        }
    }




    @media (max-width: 540px) and (max-height: 668px) {
        #playerBox {
            margin-top: 0.5em;
        }
    }

    .goToTop {
        position: absolute;
        z-index: 9000000000000000000;
        bottom: calc(40px + env(safe-area-inset-bottom)) ;
        left: 20px;
        transition: all .1s ease-in-out;
    }


    .onTop {
        transform: translate3d(0, 0, 523px);
    }

    .hide {
        transition: all .1s ease-in-out;
        transform: translate3d(0, 0, 500px) scale(0);
    }
    .behind {
      transition: transform ease 0.3s;
      transform:translate3d(0,100vh,0);
      z-index: 10000000000000;
      pointer-events: none;
      position: absolute;
    }
    .front {
      transition: transform ease 0.3s;
      transform:translate3d(0,0,0);
      z-index: 10000000000000;
      position: relative;
    }
    .adv {
        width:auto !important;
    }
    .advImg {
        min-width: 70px;
        width: 23% !important;
        max-width: 80px;
        margin-top: -10px;
    }



</style >



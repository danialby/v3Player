
<script setup>
import Recycler from "@/components/Recycler.vue";
import ThePlayer from "@/components/player/components/thePlayer.vue";
import {ref, provide, onMounted} from "vue";
      defineProps({
        data: {
          type: Object
        }
      })
      const advTrack = ref(null)
      const retryCount = ref(0)
      const advData = ref(null)
      const advAudio = ref(null)
      const historyTouchY = ref([])
      const historyTouchStart = ref(null)
      const isShowLyrics = ref(false)
      const isMinimized = ref(false)
      const slideBar = ref(0)
      const progress = ref(0)
      const nextAudio = ref(null)
      const nextAudioElement = ref(null)
      const userRangeClicked = ref(false)
      const fetchUrl = ref(null)
      const lyricFS = ref(null)
      const lyricOpenable = ref(true)
      const pointerDisabled = ref(false)
      const sleepTime = ref(0)
      const downloadLimitDialogData = ref(
          {
        headerText: 'ویژه شوید',
        styleObject: {
          backColor: 'linear-gradient(180deg, #3D3D3D 0%, #282828 100%)',
        },
        bodyContent: {
          text: 'ظرفیت دانلود روزانه ی شما به اتمام رسیده است (7 دانلود برای کاربران عادی).برای دانلود نامحدود ویژه شوید.',
          image: 'downloadLimit.svg',
          imageSize: '150px',
          downloadLimitTitle: true
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
      }
      )


import {storeToRefs} from "pinia";
import {melodify} from "@/store";
const melodifyStore = melodify()
const {
  playerData,playerCheckedItems,playerTracks,playerIndex,playerQuery,playerQueryParams

} = storeToRefs(melodifyStore)
provide('thePlayer',ThePlayer)
</script>

<template>
  <div id="playerContainer" class="playerContainer">
    <div class="fit-16 m-auto" id="Player">
      <div class="topBoxContainer" id="PlayerTopBox">
        <div class="playerWrapper fit-16 m-auto">
          <the-player ref="thePlayer">
          </the-player>
        </div>
        <Recycler id="playerData"
                  ref="playerData"
                  :checked_items="playerCheckedItems"
                  :data="playerTracks.tracks"
                  :end="playerTracks?playerTracks.end:true"
                  :meta="playerTracks"
                  :playingIndex="playerIndex"
                  :query="playerQuery"
                  :queryParams="playerQueryParams"
                  class="playerData"
                  from="player"
                  storeCommand="setPlayerTracks"
                  theComponent="Music"
                  v-if="playerData && playerTracks  && !lyricFS"
                  :style="'top:35vh;'"
        >
        </Recycler>
      </div>
    </div>
  </div>
</template>


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



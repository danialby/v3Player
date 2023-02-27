<template>
  <section>
  <!--              advertise Box-->
  <div class="topBox">
    <div
        :style="{backgroundImage: $store.state.imgUrl+$store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].image}"
        class="back"></div>
    <span><img draggable="false" @click="closeSheet()"
               src="@/assets/icons/playerTopBtn.svg"
    /></span>
    <div>

      <div class="Cover">
        <img draggable="false" class="advImage coverPicture" id="advImage"
             :src="$store.state.imgUrl+$store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].image"/>
      </div>
      <img draggable="false" :src="require(`@/assets/img/splash-logo.png`)" class="mel-logo">
      <span class="advTitle infoSpan fit-64 m-auto t-c dir-rtl">

					<span>{{ $store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].title }}</span>
				</span>
      <span class="advDesc infoSpan fit-64 m-auto t-c dir-rtl">
					<span class="infoSpan">
						<span>
							{{ $store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].description }}
							</span>
						</span>

					</span>

    </div>
    <ButtonClickable
        :text="$store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].btn_text"
        @click.native="advButton"
        class="filled m5-auto"
        style="width:200px;   min-height: 45px;">
    </ButtonClickable>
  </div>
  <div class="d-flex align-item-center" id="advBox" v-if="$store.state.playerAdvertiseData">
				<span class="advText kalameh">
					{{ $store.state.playerAdvertiseData.advertises[0].bottom_text }}
				</span>
  </div>
  <!--              advertise Box-->
  </section>
</template>

<script>
import ButtonClickable from "@/components/includes/Elements/ButtonClickable.vue";
export default {
  name: "advertiseBox",
  components: {
    ButtonClickable,
  },
  props: {
    rawDuration:Number,
    playbackTime:Number,
    playerCurrentTime:String,
    playerDuration:String,
    isPlaying:Boolean
  },
  data() {
    return {
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
  methods: {
    advButton() {
      this.$root.$refs.app.isFromLimitCover = true
      this.$root.$refs.player.close()
      this.$store.dispatch('handleAction', {target_type: this.$store.state.playerAdvertiseData.advertises[this.$store.state.advertiseIndex].btn_action.target_type})
    }
  }
}
</script>

<style scoped>



.downLoadContainer p {
  font-size: 20px !important;
  font-weight: 600 !important;
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 10px;
  margin: 10px;
}

.downLoadContainer p:hover {
  cursor: pointer;
}


.downLoadContainer img {
  width: 30px;
  margin-bottom: -10px;
  margin-left: 5px;
}

.downLoadContainer span {
  color: #29a6da;
  white-space: nowrap;
}


/*.bottom-sheet.opened.bottom-sheet__content {*/
/*  height: 100% !important;*/
/*  overflow: hidden !important;*/
/*  background: var(--black) !important;*/
/*}*/

/*.bottom-sheet.opened {*/
/*  overflow-y: hidden !important;*/
/*  height: 100vh !important;*/
/*  background: var(--black) !important;*/
/*}*/
/*.bottom-sheet .opened .bottom-sheet__card{*/
/*  height: 100% !important;*/
/*  overflow-y: hidden !important;*/
/*  background: var(--black) !important;*/
/*}*/

/*.bottom-sheet .opened .bottom-sheet__card{*/
/*  height: 100% !important;*/
/*  overflow-y: hidden !important;*/
/*  background: var(--black) !important;*/
/*}*/

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

.topBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(91vh - env(safe-area-inset-bottom));
  overflow: hidden;
  position: relative;
  /*padding-bottom: 15px;*/
  border-radius: 0px 0px 50px 50px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
  background: linear-gradient(180deg, rgba(33, 33, 33, 0.3) 0.5%, rgba(33, 33, 33, 0.3) 20%, rgba(33, 33, 33, 0.7) 30%, rgba(33, 33, 33, 0.9) 40%, #212121 49%)
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



#bottomBox {
  position: relative;
  z-index:10;
  height:8vh;
  display: flex;
  align-items: center;
}

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


.cover-container {
  position: relative;
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /*background: greenyellow;*/
  top: 0;
  left: 0;
  z-index: 2;
}

.Cover {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: calc(100% - 50px);
  margin: 0 auto 0.5em;
  min-width: 260px;
}

.Cover .coverPicture {
  width: 80vw;
  max-width: 352px;
  height: calc(100vw - 20vw);
  max-height: 352px;
  margin: 0 auto 7px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
}

.coverPlaceHolder {
  position: absolute;

}


.limit-cover {
  width: 80vw;
  max-width: 352px;
  display: flex;
  background: rgba(21, 21, 21, 0.5);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  border-radius: 20px 20px 0 0;
  position: absolute;
  z-index: 1;
}

.artistInfo-container
{
  height: 70px;
}

@media screen and (min-width: 352px) and (max-height: 668px) {
  .Cover .coverPicture {
    width: 105vw;
    max-width: 250px;
    height: 105vw;
    max-height: 250px;
  }
  .limit-cover {
    width: 105vw;
    max-width: 250px;
  }
  .Cover .advImage {
    width: 105vw;
    max-width: 250px;
    height: 105vw;
    max-height: 250px;
  }
  .controlBox span:nth-of-type(even) img{
    width: 60%;
  }
}

@media screen and (min-width: 414px) and (max-height: 736px) {
  .Cover .coverPicture {
    width: 105vw;
    max-width: 320px;
    height: 105vw;
    max-height: 320px;
  }
  .limit-cover {
    width: 105vw;
    max-width: 320px;
  }
  .Cover .advImage {
    width: 105vw;
    max-width: 250px;
    height: 105vw;
    max-height: 250px;
  }
  .controlBox span:nth-of-type(even) img{
    width: 60%;
  }
}

@media screen and (max-height: 568px ) {
  .limit-cover {
    width: 73vw;
  }
}

.limit-cover span {
  width: 100%;
  direction: rtl;
  font-size: 12px;
  margin-bottom: 10px;
}

.limit-cover span:nth-of-type(1) {
  font-size: 14px;
}


.limit-cover-btn {
  width: 90%;
}


@media screen and (max-height: 568px ) {
  .Cover .coverPicture {

    width: 73vw;
    height: 73vw;
    margin: 0 auto 2px;
  }
}

.artistInfo-container {
  position: relative;
  z-index: 3;

}


#Player span {
  width: 100%;
  display: block;
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


@media (max-width: 359px) {
  /*.Cover img {*/
  /*	height: 28vh;*/
  /*}*/
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
  /*.playerBox .controlBox {*/
  /*	height: 5em;*/
  /*	width: calc(100% - 24px);*/
  /*	padding: 5px 0px;*/
  /*}*/
  /*.controlBox span:nth-of-type(even) img {*/
  /*	width:75%;*/
  /*}*/
  /*.controlBox span:nth-of-type(odd) img {*/
  /*	width:40%;*/
  /*}*/
  #playerBox {
    margin-top: 0.5em;
  }


  /*#btnRow {*/
  /*  height: 34px;*/
  /*}*/
  .topBox .Cover {
    margin: 0 auto 5px;
    min-width: 240px;
    width: calc(100% - 90px);
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

@media screen  and (max-width: 475px) and (max-height: 768px ) {
  .Cover .advImage {
    width: 45vw;
    height: calc(100vw - 55vw);
  }

  #Player .mel-logo{
    width: 80px ;
  }


  .adv {
    margin-top: -21px;
  }


  .playerBox .controlBox {

    height: 5em;
    width: calc(100% - 24px);
    padding: 0;
  }
}

@media screen and (min-width: 450px) and (max-height: 850px) {
  #Player .mel-logo {
    margin-top: -80px;
  }
  .Cover .coverPicture {
    width: 105vw;
    max-width: 385px;
    height: 105vw;
    max-height: 385px;
  }
  .limit-cover {
    width: 105vw;
    max-width: 385px;
  }
  .Cover .advImage {
    width: 105vw;
    max-width: 370px;
    height: 105vw;
    max-height: 370px;
  }
  .artistInfo-container {

    margin-top: -5px;
  }
  .upItems {
    margin-top: 25px;
  }
  .topBox{
    height: calc(92vh - env(safe-area-inset-bottom));
  }
  #Player .advTitle{
    margin-top: -11px !important;
    margin-bottom: 10px !important;
  }
  .controlBox{
    top: 0;
  }
}


@media screen and (min-width: 450px) and (max-height: 828px) {
  .Cover .advImage {
    width: 105vw;
    max-width: 385px;
    height: 105vw;
    max-height: 385px;
  }
}

@media screen and (min-width: 450px) and (max-height: 828px) {
  .Cover .advImage {
    width: 105vw;
    max-width: 385px;
    height: 105vw;
    max-height: 385px;
  }

}
@media screen and (min-width: 450px) and (max-height: 818px) {



  .advImg{
    margin-top: -20px;
  }
}

@media screen and (min-width: 450px) and (max-height: 808px) {

  .advImg{
    margin-top: -25px;
  }
}

@media screen and (min-width: 450px) and (max-height: 808px) {

  .advImg{
    margin-top: -25px;
  }
}


@media screen and (min-width: 450px) and (max-height: 798px) {
  #Player .mel-logo {
    margin-top: -80px;
  }
  .Cover .coverPicture {
    width: 105vw;
    max-width: 380px;
    height: 105vw;
    max-height: 380px;
  }
  .limit-cover {
    width: 105vw;
    max-width: 385px;
  }
  .Cover .advImage {
    width: 105vw;
    max-width: 375px;
    height: 105vw;
    max-height: 375px;
  }
  .artistInfo-container {

    margin-top: -5px;
  }
  .upItems {
    margin-top: 25px;
  }
  .topBox{
    height: calc(92vh - env(safe-area-inset-bottom));
  }
  #Player .advTitle{
    margin-top: -11px !important;
    margin-bottom: 10px !important;
  }
  .controlBox{
    top: 0;
  }
}

@media screen and (min-width: 450px) and (max-height: 788px) {
  .Cover .coverPicture {
    width: 105vw;
    max-width: 375px;
    height: 105vw;
    max-height: 375px;
  }
  .limit-cover {
    width: 105vw;
    max-width: 375px;
  }
  .Cover .advImage {
    width: 105vw;
    max-width: 365px;
    height: 105vw;
    max-height: 365px;
  }
}

@media screen and (min-width: 450px) and (max-height: 778px) {
  .Cover .coverPicture {
    width: 105vw;
    max-width: 370px;
    height: 105vw;
    max-height: 370px;
  }
  .limit-cover {
    width: 105vw;
    max-width: 370px;
  }
  .Cover .advImage {
    width: 105vw;
    max-width: 355px;
    height: 105vw;
    max-height: 355px;
  }
}

@media screen and (min-width: 450px) and (max-height: 768px) {
  .Cover .coverPicture {
    width: 105vw;
    max-width: 365px;
    height: 105vw;
    max-height: 365px;
  }
  .limit-cover {
    width: 105vw;
    max-width: 365px;
  }
  .Cover .advImage {
    width: 105vw;
    max-width: 345px;
    height: 105vw;
    max-height: 345px;
  }
}

@media screen and (min-width: 450px) and (max-height: 758px) {
  .Cover .coverPicture {
    width: 105vw;
    max-width: 360px;
    height: 105vw;
    max-height: 360px;
  }
  .limit-cover {
    width: 105vw;
    max-width: 360px;
  }
  .Cover .advImage {
    width: 105vw;
    max-width: 335px;
    height: 105vw;
    max-height: 335px;
  }
}

@media screen and (min-width: 450px) and (max-height: 748px) {
  .Cover .coverPicture {
    width: 105vw;
    max-width: 355px;
    height: 105vw;
    max-height: 355px;
  }
  .limit-cover {
    width: 105vw;
    max-width: 355px;
  }
  .Cover .advImage {
    width: 105vw;
    max-width: 325px;
    height: 105vw;
    max-height: 325px;
  }
}

@media screen and (min-width: 450px) and (max-height: 738px) {
  .Cover .coverPicture {
    width: 105vw;
    max-width: 345px;
    height: 105vw;
    max-height: 345px;
  }
  .limit-cover {
    width: 105vw;
    max-width: 345px;
  }
  .Cover .advImage {
    width: 105vw;
    max-width: 320px;
    height: 105vw;
    max-height: 320px;
  }
}
@media screen and (min-width: 450px) and (max-height: 728px) {
  .Cover .coverPicture {
    width: 105vw;
    max-width: 340px;
    height: 105vw;
    max-height: 340px;
  }
  .limit-cover {
    width: 105vw;
    max-width: 340px;
  }
  .Cover .advImage {
    width: 105vw;
    max-width: 315px;
    height: 105vw;
    max-height: 315px;
  }

  .controlBox{
    top: -10px;
  }
}

@media screen and (min-width: 450px) and (max-height: 718px) {
  .Cover .coverPicture {
    width: 105vw;
    max-width: 330px;
    height: 105vw;
    max-height: 330px;
  }

  .limit-cover {
    width: 105vw;
    max-width: 330px;
  }

  .Cover .advImage {
    width: 105vw;
    max-width: 305px;
    height: 105vw;
    max-height: 305px;
  }
}
@media screen and (min-width: 450px) and (max-height: 708px) {
  .Cover .coverPicture {
    width: 105vw;
    max-width: 320px;
    height: 105vw;
    max-height: 320px;
  }

  .limit-cover {
    width: 105vw;
    max-width: 320px;
  }

  .Cover .advImage {
    width: 105vw;
    max-width: 300px;
    height: 105vw;
    max-height: 300px;
  }

  .controlBox{
    top: -15px;
  }
  .advImg{
    margin-top: -20px;
  }

}
@media screen and (min-width: 450px) and (max-height: 698px) {
  .Cover .coverPicture {
    width: 105vw;
    max-width: 315px;
    height: 105vw;
    max-height: 315px;
  }

  .limit-cover {
    width: 105vw;
    max-width: 315px;
  }

  .Cover .advImage {
    width: 330vw;
    max-width: 295px;
    height: 105vw;
    max-height: 295px;
  }
  .advImg{
    margin-top: -20px;
  }

  .controlBox{
    top: -15px;
  }

}

@media screen and (min-width: 450px) and (max-height: 698px) {
  .Cover .advImage {
    width: 330vw;
    max-width: 290px;
    height: 105vw;
    max-height: 290px;
  }

  @media screen and (min-width: 450px) and (max-height: 697px) {
    .Cover .coverPicture {
      width: 105vw;
      max-width: 250px;
      height: 105vw;
      max-height: 250px;
    }
    .limit-cover {
      width: 105vw;
      max-width: 250px;
    }
    .Cover .advImage {
      width: 105vw;
      max-width: 250px;
      height: 105vw;
      max-height: 250px;
    }
    .controlBox span:nth-of-type(even) img{
      width: 60%;
    }

  }


  .advImg{
    margin-top: -4px;
  }

  .controlBox{
    top: -30px;
  }

}

</style>
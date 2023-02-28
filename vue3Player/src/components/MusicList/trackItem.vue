<script setup>
import {ref,inject} from 'vue'
defineProps({
  index: Number,
  item:Object,
  itemData: Object,
  isRecycling:Boolean
})


import {storeToRefs} from "pinia";
import {melodify, playerStore} from "@/store";
import ThePlayer from "@/components/player/components/thePlayer.vue";
const player = playerStore()
const {
  imgUrl,playerCheckedItems,musicListCheckedItems
} = storeToRefs(melodifyStore)

const { playItem } = player()

const optionsOpened = ref(false)
function playTrack(data, theData, index, query, queryParams, meta, from) {
  playItem(data, theData, index, query, queryParams, meta, from)
}
function toggleMoreOptions() {
  optionsOpened.value = !optionsOpened.value
  this.$root.$refs.currentTrackItem = this
}
function   isCheckedItem(theItem) {
  if (itemData.value.from !== undefined && itemData.value.from === 'player') {
    return !!playerCheckedItems.find((item) => item.id === theItem.id);
  } else {
    return !!musicListCheckedItems.find((item) => item.id === theItem.id);
  }
}
function    closeAndEmit(emit) {
  optionsOpened.value = false
  emit(emit)
}

</script>


<template>
  <div class="trackItemContainer" @pointerdown.prevent="$emit('getCurrentTrackID',item)">
    <div class="trackItemBox" :class="{isLimitedBack:item.track_limit}">
      <div
          :class="{is_limited:item.track_limit,isPlaying:(playerData && item.id === playerData.id),noBottomRadius:optionsOpened}"
          :id="'track_'+item.id"
          class="trackContainer"
      >
        <div class="isPlayingBack"
             v-if="playerData && item.id === playerData.id"></div>
<!--        <div class="isOfflineTrack"-->
<!--             v-if="$utils.isInDownloadedTracks(item.id)"></div>-->



        <li v-if="index ===	itemData.data.length-1"
            class="trigger"
            @pointerdown.prevent="$emit('getCurrentTrackID',item)">

          <div
              @click.prevent="playTrack(itemData.data,item,index,itemData.query,itemData.queryParams,itemData.meta,itemData.from)"
              class="trackContent">
            <div :class="{limitWidth:item.track_limit}"
                 class="musicDet">
              <p :class="$utils.isLetter(item.title) ? 'en dir-ltr':''"
                 v-if="item.title">{{ item.title }}</p>
              <p :class="$utils.isLetter(item.name) ?  'en dir-ltr':''"
                 v-if="item.name">{{ item.name }}</p>
              <p class="artistNames">
                                <span
                                    :class="$utils.isLetter(artist.name) ? 'en':'per'"
                                    :key="index" v-for="(artist,index) in item.artists">
                                  {{ artist.name }}
                                  <span>, </span>
                                </span>
              </p>
            </div>

            <div class="trackImageContainer">


              <img draggable="false" :class="!itemData.hasNumber?'left-8':'left-0'"
                   class="image"
                   :src="imgUrl+item.image"
              />
            </div>


            <span class="trackNumber" v-if="itemData.hasNumber">{{ index + 1 }}</span>


          </div>


        </li>
        <li v-else
            @pointerdown.prevent="$emit('getCurrentTrackID',item)">
          <div
              @click.prevent="playTrack(itemData.data,item,index,itemData.query,itemData.queryParams,itemData.meta,itemData.from)"
              class="trackContent">
            <div :class="{limitWidth:item.track_limit}"
                 class="musicDet">
              <p :class="$utils.isLetter(item.title) ? 'en dir-ltr':''"
                 v-if="item.title">{{ item.title }}</p>
              <p :class="$utils.isLetter(item.name) ?  'en dir-ltr':''"
                 v-if="item.name">{{ item.name }}</p>
              <p class="artistNames">
                                <span
                                    :class="$utils.isLetter(artist.name) ? 'en':'per'"
                                    :key="index" v-for="(artist,index) in item.artists">
                                  {{ artist.name }}
                                  <span>, </span>
                                </span>
              </p>
            </div>

            <div class="trackImageContainer">


              <img draggable="false" :class="!itemData.hasNumber?'left-8':'left-0'"
                   class="image"
                   :src="imgUrl+item.image"
              />
            </div>


            <span class="trackNumber" v-if="itemData.hasNumber">{{ index + 1 }}</span>


          </div>


        </li>

<!--        <btn-group @toggleOptions="toggleMoreOptions" :from="itemData.from" :item="item"-->
<!--                   @checkItem="$emit('checkItem')"></btn-group>-->
<!--        <context-menu ref="contextMenu" :is-open="optionsOpened" :itemData="item"-->
<!--                      @addPlaylist="closeAndEmit('goSelectionMode')"></context-menu>-->
<!--        <span class="contextCover" v-if="optionsOpened" tabindex="0" @click="toggleMoreOptions"></span>-->
      </div>


    </div>

    <!--    <more-options :is-open="optionsOpened" :itemData="item" @addPlaylist="$emit('goSelectionMode')"></more-options>-->
  </div>

</template>



<style scoped>
.contextCover {
  position: fixed;
  width: 1000vw;
  height: 10000vh;
  right: -500vw;
  top: -100vw;
  z-index: 1000000;
}

.reorderIcon {
  padding: 22px;
}

.reorderIcon img {
  vertical-align: middle;
}

.trackNumber {
  margin-left: 10px;
}


.trackItemContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.trackItemBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}


.editingPlaylist .trackContainer {
  position: relative;
  background: #409B65;
  width: 95%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px auto;
  z-index: 1;
}


.trashIcon {
  width: 55px !important;
  height: 60px;
  /*padding: 18px 0px;*/
  box-sizing: border-box;
  justify-content: center;
}


.trashIcon img {
  padding: 18px;
}

.trackContainer {
  position: relative;
  background: #409B65;
  width: 95%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px 0;
  border-radius: 5px;
}

.noBottomRadius {
  border-radius: 5px 5px 0px 0px !important;
}

.isPlayingBack {
  position: absolute;
  width: 99.9%;
  border: 1px solid var(--Accent);
  height: 69px;
  top: 0;

  transition: all .2s ease-in-out;
  border-radius: 7px;
  z-index: 1;
}

.isOfflineTrack {
  position: absolute;
  width: 99.9%;
  border: 1px solid var(--Accent);
  height: 69px;
  top: 0;

  transition: all .2s ease-in-out;
  border-radius: 7px;
  z-index: 2;
}

.theList ul div:nth-child(even) div .trackContainer {
  background: linear-gradient(270deg, #151515 1.22%,
  #242424 100%);
}

.theList ul div:nth-child(odd) div .trackContainer {
  background: linear-gradient(90deg, #151515 1.22%,
  #242424 100%);

}


.trackImageContainer {
  width: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #409B65;
  position: relative;
}

.image {
  position: absolute;
  max-width: 50px;
  border-radius: 5px;
  min-width: 50px;
  min-height: 50px;
  max-height: 50px;
  background-position: center center;
  background-size: 40%;
  background-repeat: no-repeat;
  background-image: url("~@/assets/img/musicPlaceHolder.svg");
  background-color: #303030;
}


.place_holder {
  height: 25px;
  margin-top: 0px;
  width: 50px;
  position: absolute;
}


.bottomBtnRow {
  transform: translateY(128px);
  position: fixed;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-evenly;
  bottom: 70px;
  transition: all .3s ease-out;
  direction: rtl;
  max-width: 483px;
  padding: 0px 20px;
}

.playerBottomBtnRow {
  transform: translateY(128px);
  position: fixed;
  width: 100%;
  z-index: 10000;
  display: flex;
  justify-content: space-evenly;
  bottom: 20px;
  transition: all .3s ease-out;
  direction: rtl;
  max-width: 523px;
  /*padding: 0px 20px;*/
}

.bottomBtnRowOpen {
  transform: translateY(0px);
  transition: all .3s ease-out;
}

.bottomBtnRowPlayedOpen {
  transform: translateY(-56px);
  transition: all .3s ease-out;
}

.playerBottomBtnRowOpen {
  transform: translateY(0px);
  transition: all .3s ease-out;
}

.btnSaveEdit {
  /* position: fixed; */
  /* z-index: 100; */
  width: 79vw;
  max-width: 523px;
  /* bottom: 72px; */
  font-size: 20px;
  font-weight: 600;
  background: var(--Accent);
  border: none;
  padding: 10px 15px;
  border-radius: 50px;
  margin-right: 20px;
  right: 17.5vw;
}

.btnCloseEdit {
  /* position: fixed; */
  z-index: 100;
  width: 45px;
  height: 45px;
  /* bottom: 72px; */
  background: var(--Gray-1);
  box-sizing: border-box;
  border: none;
  padding: 10px;
  border-radius: 40px;
  transition: all .3s ease-out;
  left: 17.5vw;
  margin-right: 20px;
  /*margin-left:20px;*/
}

.checkBox {
  margin-right: 16px;
}

.trackCheckBox {
  height: 17.5px;

  width: 17.5px;
}


.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: grabbing;
}

.list-group-item i {
  cursor: pointer;
}


.theList {
  width: 100%;
  position: relative;
  /*height: var(--middleHeight);*/
  /*overflow: scroll;*/
}

.selectionModeList {
  margin-bottom: 70px;
}

.theList ul {

  padding: 0;

  /*height: var(--middleHeight);*/
  /*overflow: scroll;*/
  /*margin-bottom: 60px;*/
}


.theList ul li {
  display: flex;
  direction: rtl;
  justify-content: center;

  margin: 3.5px 0;
  /*background: linear-gradient(90deg, #151515 1.22%, #242424 100%);*/
  border-radius: 5px;
  width: 70%;
  flex-grow: 1;
}


.theList ul .isPlaying {

  background: linear-gradient(90deg, #f2c94c6e 0.22%, #242424 100%) !important;


}

.trackContent {

  width: 100%;
}

.theList .musicDet .artistNames span {
  font-size: 1.1em;
  font-weight: 400;
}

/*.theList ul .isPlaying::before {*/
/*	content: "";*/
/*	position: absolute;*/
/*	right: 0;*/
/*	left: 0px;*/
/*	z-index: -1;*/
/*	border-radius: inherit;*/
/*	background: linear-gradient(to right, #f2c94c, transparent);*/
/*	height: 70px;*/
/*	width: 100%;*/
/*	margin-top: -10px;*/
/*}*/

.isLimitedBack {
  width: 100%;
  display: flex;
  background: var(--Gray-7);
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: -3px 0px;
}


#musicList {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.theList #musicList .is_limited {
  background: black;
  width: 98%;
}


.theList #musicList .is_limited .isPlayingBack {
  justify-self: center;
  width: 98%;
  right: .5%;
}


.theList ul:last-child {
  margin-bottom: 20px;
}

.theList ul li > div {
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 90;
  position: relative;
}


.theList ul li div:first-of-type span {
  font-size: 0.8em;
  width: 29px;
  text-align: center;
}


.left-0 {
  left: 0px;
}

.left-8 {
  left: 8px;
}

.theList ul .place {
  margin-left: -50px;
  background-color: #5b5b5b;
  /* z-index: 5; */
  /* position: relative; */
  max-width: 50px;
  border-radius: 5px;
  min-width: 50px;
  min-height: 50px;
  max-height: 50px;
  background-size: 40%;
  background-position: center;
  background-repeat: no-repeat;
}


.theList ul li div:nth-child(2) span {
  min-width: 40px;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  font-size: 10px;
}


.musicDet {
  width: 52%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

}

@media screen and (min-width: 355px) {

  .musicDet {
    width: 60%;
  }

}

@media screen and (min-width: 474px) {

  .musicDet {
    width: 80%;
  }

}

.musicDet p {
  text-align: left;
  margin: 0 5px;
  font-size: 0.8em;

  direction: ltr;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}


.musicDet p:first-of-type {
  font-size: 0.8em;
  margin-bottom: 6px;
}

.musicDet p:last-of-type {
  font-size: 0.7em;
  font-weight: 200;
  color: #e0e0e0;
}


.artistNames span:last-child span {
  display: none;
}

/*@media (min-width: 320px) and (max-width: 360px) {*/
/*  .musicDet p {*/
/*    max-width: 127px;*/
/*  }*/

/*  .limitWidth p {*/
/*    max-width: 80px;*/
/*  }*/


/*  .isDemoContainer img {*/
/*    width: 20px;*/
/*  }*/
/*}*/

/*@media (min-width: 430px) {*/
/*  .musicDet p {*/
/*    max-width: 220px;*/
/*  }*/
/*}*/
</style>
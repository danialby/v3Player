
<script setup>
// import draggable from 'vuedraggable'
// import trackLimit from "@/components/includes/Elements/MusicList/trackLimit.vue";
// import BannerInList from "@/components/includes/Elements/MusicList/bannerInList.vue";
// import MDialog from "@/components/includes/Elements/mDialog.vue";
import {ref, onMounted} from 'vue'
  import TrackItem from "@/components/MusicList/trackItem.vue";

defineProps ({
    itemData:Object,
    data: Array,
    hasNumber: Boolean,
    meta: Object,
    end: Boolean,
    query: String,
    queryParams: Object,
    from: String,
    is_draggable: {
      type: Boolean,
      default: false
    },
    checked_items:Array
  })

const optionsOpened = ref(false);
const isSelectMode = ref(false);
const listHeight = ref(null);
const list = ref([]);
const drag = ref(false);
const toEditList = ref([]);
const playOnSelectedMode = ref(false);
const isInLikeProcess = ref(false);
const currentFocusedTrack = ref(null);
const dldTracks = ref(null);
const downloadConfirmDialogData = ref({"headerText":"ذخیره فایل","iconSize":"","styleObject":{"backColor":"linear-gradient(180deg, #3D3D3D 0%, #282828 100%)","height":"auto"},"bodyContent":{"icon":"Lamp.svg","title":"فایل را ذخیره می کنید؟","text":""},"Buttons":[{"text":"بلی","type":"filled","action":{"actionType":"emit"}},{"text":"خیر","type":"bordered","action":"close"}]});


import {storeToRefs} from "pinia";
import {melodify} from "@/store";
const melodifyStore = melodify()
const {
  playerData,playerTracks,musicListEditMode,playerSelectionMode

} = storeToRefs(melodifyStore)
  onMounted(() => {
    // this.key = this.$parent.$el.ref
    // let self = this
    // let parent = this.$parent.$el
    // parent.addEventListener('long-press', function (e) {
    //     self.goSelectionMode(e)
    // })
    // $app.$refs.currentPointedList = this
  })

   function goSelectionMode(item){
      if(!item.is_demo) {
        // stop the event from bubbling up
        if (this.checked_items.length === 0) {
          this.selectMode(0)
          this.$root.$refs.currentMusicList = this
          this.selectMode()
        }
      }
      else {
        this.$root.$refs.vToaster.openToast('برای انتخاب این آهنگ باید ویژه شوید!')
      }
    }
    // toggleMoreOptions() {
    //   this.optionsOpened = !this.optionsOpened
    // },
    // isCheckedItem(theItem) {
    //   if(this.from !== undefined && this.from === 'player')
    //   {
    //     return !!this.$store.state.playerCheckedItems.find((item) => item.id === theItem.id);
    //   }
    //   else {
    //     return !!this.$store.state.musicListCheckedItems.find((item) => item.id === theItem.id);
    //   }
    // },
function advButton(action) {
      if(this.$root.$refs.player.opened) {
        this.$utils.limitAction('playerOpened',action)
      }
      else {
        this.$utils.limitAction(null,action)
      }
    }
function  er() {
      console.log('Listener Removed')
    }
function openAddtoPlaylistSheet() {
      this.$root.$refs.app.OpenAddToPlaylistSheet()
    }
function  getCurrentTrackID(item) {
      this.currentFocusedTrack = item
      this.$store.dispatch('setPointedTrackID',item.id)
      this.$root.$refs.currentPointedList = this
    }

function  playTrack(data, theData, index, query, queryParams, meta, from) {
      this.$root.$refs.thePlayer.playItem(data, theData, index, query, queryParams, meta, from)
    }
function   playInSelectMode(data, theData, index, query, queryParams, meta, from) {
      this.$root.$refs.thePlayer.playItem(data, theData, index, query, queryParams, meta, from)
    }
function  swipeFalse() {
      this.$root.$refs.player.swipeAble = false
    }
function    swipeTrue() {
      this.$root.$refs.player.swipeAble = true
    }
function    selectMode(s) {
      if (s === 0) {
        this.$store.dispatch('setMusicListEditMode', false)
        this.$store.dispatch('setMusicListCheckedItems', null)
        this.$store.dispatch('setPlayerSelectionMode', false)
        this.$store.dispatch('setPlayerCheckedItems', null)
      }
      else
      {
        if (this.$parent.$props.from === 'player') {
          if(!this.$store.state.playerSelectionMode)
          {
            this.playOnSelectedMode = false
            this.$store.dispatch('setMusicListCheckedItems', null)
            this.$store.dispatch('setPlayerCheckedItems', null)
            this.$store.dispatch('setPlayerCheckedItems', this.currentFocusedTrack)
            this.$store.dispatch('setMusicListEditMode', false)
            this.$store.dispatch('setPlayerSelectionMode', true)
          }
        }
        else {
          if(!this.$store.state.musicListEditMode)
          {
            this.playOnSelectedMode = false
            this.$store.dispatch('setMusicListCheckedItems', null)
            this.$store.dispatch('setPlayerCheckedItems', null)
            this.$store.dispatch('setMusicListCheckedItems', this.currentFocusedTrack)
            this.$store.dispatch('setPlayerSelectionMode', false)
            this.$store.dispatch('setMusicListEditMode', true)
          }
        }
      }
    }
function   toggleCheck(theItem) {
      if(this.$parent.$props.from === 'player') {
        if (this.checked_items) {
          let checkingItem = this.checked_items.filter(item => item.id === theItem.id)
          if (checkingItem.length !== 0) {
            let checks = this.checked_items.filter(item => item.id !== theItem.id)
            this.$store.dispatch('setPlayerCheckedItems',checks)
            if (this.$store.state.playerCheckedItems.length === 0) {
              this.selectMode(0)
            }
          } else {
            this.$store.dispatch('setPlayerCheckedItems',theItem)
          }
        }
      }
      else {
        if (this.checked_items) {
          let checkingItem = this.checked_items.filter(item => item.id === theItem.id)
          if (checkingItem.length !== 0) {
            let checks = this.checked_items.filter(item => item.id !== theItem.id)
            this.$store.dispatch('setMusicListCheckedItems',checks)
            if (this.$store.state.musicListCheckedItems.length === 0) {
              this.selectMode(0)
            }
          } else {
            this.$store.dispatch('setMusicListCheckedItems',theItem)
          }
        }
      }
    }
function    removeTrack(index) {
      this.list.splice(index, 1)

    }
</script>



<template>
    <div class="theList"  ref="theList"
         :class="{selectionModeList:musicListEditMode || playerSelectionMode || is_draggable}">
<!--        <draggable @end="drag = false"-->
<!--                   class="musicList list-group editingPlaylist"-->
<!--                   tag="ul"-->
<!--                   handle=".reorderIcon"-->
<!--                   v-bind="dragOptions"-->
<!--                   v-if="is_draggable && data"-->
<!--                   v-model="list"-->
<!--        ref="dList" id="draggableList">-->
<!--            <transition-group :name="!drag ? 'flip-list' : null" type="transition">-->
<!--                <div :key="index" v-for="(item,index) in	list" >-->

<!--                    <div>-->


<!--                        <div :class="{is_limited:item.track_limit,isPlaying:($store.state.playerData && item.id == $store.state.playerData.id)}"-->
<!--                             :id="'track_'+item.id"-->
<!--                             class="trackContainer"-->
<!--                        >-->
<!--                            <div class="isPlayingBack"-->
<!--                                 v-if="$store.state.playerData && item.id == $store.state.playerData.id"></div>-->

<!--                            <li :class="{trigger: (index ==	data.length-1)}">-->


<!--                                <div-->
<!--                                     class="trackContent">-->
<!--                                    &lt;!&ndash;                   v-longclick.stop="selectMode">&ndash;&gt;-->
<!--                                    <div class="reorderIcon">-->
<!--                                        <img draggable="false" src="@/assets/icons/reorder.svg"/>-->
<!--                                    </div>-->
<!--                                    <div :class="{limitWidth:item.track_limit}"-->
<!--                                         class="musicDet"-->
<!--                                    >-->
<!--                                        <p :class="$utils.isLetter(item.title) ? 'en dir-ltr':''"-->
<!--                                           v-if="item.title">{{ item.title }}</p>-->
<!--                                        <p :class="$utils.isLetter(item.name) ?  'en dir-ltr':''"-->
<!--                                           v-if="item.name">{{ item.name }}</p>-->
<!--                                        <p class="artistNames">-->
<!--							<span-->
<!--                                    :class="$utils.isLetter(artist.name) ? 'en':'per'"-->
<!--                                    :key="index" v-for="(artist,index) in item.artists"-->
<!--                            >-->
<!--								{{ artist.name }}-->
<!--								<span>, </span>-->
<!--							</span>-->
<!--                                        </p>-->
<!--                                    </div>-->

<!--                                    <div class="trackImageContainer">-->


<!--                                        <img draggable="false" :class="!hasNumber?'left-8':'left-0'"-->
<!--                                             class="image"-->
<!--                                             v-lazy.once="$store.state.imgUrl+item.image"-->
<!--                                        />-->
<!--                                    </div>-->


<!--                                    <span class="d-flex trashIcon">-->
<!--            <img draggable="false" @click.stop="removeTrack(index)" src="@/assets/icons/trash-2.svg"/>-->
<!--          </span>-->


<!--                                </div>-->


<!--                            </li>-->


<!--                        </div>-->


<!--                    </div>-->


<!--                </div>-->
<!--                &lt;!&ndash;        <div :key="index" v-for="(item,index) in list">&ndash;&gt;-->


<!--                &lt;!&ndash;          <li :id="'track_'+item.id">&ndash;&gt;-->
<!--                &lt;!&ndash;            <div>&ndash;&gt;-->
<!--                &lt;!&ndash;              <img draggable="false" src="@/assets/icons/reorder.svg" style="margin-right:10px;"/>&ndash;&gt;-->
<!--                &lt;!&ndash;            </div>&ndash;&gt;-->
<!--                &lt;!&ndash;            <div>&ndash;&gt;-->
<!--                &lt;!&ndash;              <div class="musicDet"&ndash;&gt;-->

<!--                &lt;!&ndash;              >&ndash;&gt;-->
<!--                &lt;!&ndash;                <p :class="isLetter(item.title) ? 'en dir-ltr':''"&ndash;&gt;-->
<!--                &lt;!&ndash;                   v-if="item.title">{{ item.title }}</p>&ndash;&gt;-->
<!--                &lt;!&ndash;                <p :class="isLetter(item.name) ?  'en dir-ltr':''"&ndash;&gt;-->
<!--                &lt;!&ndash;                   v-if="item.name">{{ item.name }}</p>&ndash;&gt;-->
<!--                &lt;!&ndash;                <p class="artistNames">&ndash;&gt;-->
<!--                &lt;!&ndash;							<span&ndash;&gt;-->
<!--                &lt;!&ndash;                  :class="isLetter(artist.name) ? 'en':'per'"&ndash;&gt;-->
<!--                &lt;!&ndash;                  :key="index" v-for="(artist,index) in item.artists">&ndash;&gt;-->
<!--                &lt;!&ndash;								{{ artist.name }}&ndash;&gt;-->
<!--                &lt;!&ndash;								<span>, </span>&ndash;&gt;-->
<!--                &lt;!&ndash;							</span>&ndash;&gt;-->
<!--                &lt;!&ndash;                </p>&ndash;&gt;-->
<!--                &lt;!&ndash;              </div>&ndash;&gt;-->
<!--                &lt;!&ndash;              <img draggable="false" :src="$store.state.imgUrl+item.image" class="image"/>&ndash;&gt;-->
<!--                &lt;!&ndash;              <span class="d-flex">&ndash;&gt;-->
<!--                &lt;!&ndash;            <img draggable="false" src="@/assets/icons/trash-2.svg" @click="removeTrack(index)"/>&ndash;&gt;-->
<!--                &lt;!&ndash;          </span>&ndash;&gt;-->

<!--                &lt;!&ndash;            </div>&ndash;&gt;-->
<!--                &lt;!&ndash;          </li>&ndash;&gt;-->


<!--                &lt;!&ndash;        </div>&ndash;&gt;-->
<!--            </transition-group>-->
<!--        </draggable>-->
        <ul id="musicList" v-if="itemData.data" >
            <div :key="index" v-for="(item,index) in itemData.data">
            <track-item
                :index="index"
                :from="from"
                :item="item"
                :itemData="itemData"
                :isRecycling="$parent.isRecycling"
                @getCurrentTrackID="getCurrentTrackID"
                @goSelectionMode="goSelectionMode(item)"
                @checkItem="toggleCheck(item)"
                :ref="'trackItem'+index"
            ></track-item>
<!--            <track-limit v-if="item.track_limit && item.track_limit.message" :item-data="item"></track-limit>-->
<!--            <banner-in-list v-if="item.add_on" :item-data="item"></banner-in-list>-->
            </div>
        </ul>
<!--      <m-dialog-->
<!--          ref="downloadConfirmDialog"-->
<!--          :data="downloadConfirmDialogData"-->
<!--          :styleObject="downloadConfirmDialogData.styleObject"-->
<!--          :close-on-mask="true"-->
<!--          :close-on-esc="true"-->
<!--          @whatToDo="$root.$refs.downloadBtn.saveTrackToDevice($store.state.currentPointedTrackID,data[$store.state.currentPointedTrackID.download_title])">-->
<!--      </m-dialog>-->
    </div>
</template>

<style scoped>
    .reorderIcon {
        padding: 22px;
    }
    .reorderIcon img {
        vertical-align: middle;
    }
    .trackNumber {
        margin-left: 10px;
    }



    #musicList > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    #musicList > div > div {
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


    .theList ul div:nth-child(even) div .trackContainer {
        background: linear-gradient(270deg, #151515 1.22%,
        #242424 100%);
        border-radius: 5px;
    }

    .theList ul div:nth-child(odd) div .trackContainer {
        background: linear-gradient(90deg, #151515 1.22%,
        #242424 100%);
        border-radius: 5px;
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
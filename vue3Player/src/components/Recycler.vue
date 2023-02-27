
<script setup>
import {ref} from "vue"
import NewMusicList from "@/components/MusicList/newMusicList.vue";

defineProps({
  data: Array,
  meta: Object,
  end: Boolean,
  query: String,
  queryParams: Object,
  theComponent: String,
  storeCommand: String,
  hasNumber: Boolean,
  from: String,
  is_draggable: Boolean,
  parentKey: String,
  checked_items: Array
})
const isRecycling = ref(false)

//   onDestroyed(() => {
//     this.$store.commit('setRecyclingObject', null)
//   })
//   onBeforeMount(()=>  {
//
//   })
//   onMounted(() => {
//   this.$store.commit('setRecyclingObject', this)
// })
function   swipeFalse() {
  this.$root.$refs.player.swipeAble = false
}
function    swipeTrue() {
  this.$root.$refs.player.swipeAble = true
}
function     openPlaylist(item) {
  this.$router.push({name: 'thePlaylist', params: {item}})
}
function     openArtist(item) {
  this.$router.push({name: 'TheArtist', params: {item}, query: {artist_id: item.id}})
}
function     isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight + 50
          ||
          document.documentElement.clientHeight + 50) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}
async function loadMoreHandler(container) {
  console.log(container)
  // let isObserved = this.isObserved(document.querySelector('.' + container + ' .trigger'))
  // if (this.end !== true) {
  //   console.log('end', this.end)
  //   if (this.isRecycling === false) {
  //     this.isRecycling = true
  //     if (!isObserved) {
  //       this.isRecycling = false
  //     } else {
  //       await this.$store.dispatch('get_Data',
  //           {
  //
  //             api_command: this.query,
  //             params: this.queryParams,
  //             store_command: {
  //               "command": this.storeCommand,
  //               "action": "loadmore",
  //               "addOn": {
  //                 "offset":
  //                 this.queryParams.offset,
  //                 "type": this.queryParams.type,
  //                 "language": this.queryParams.language
  //               }
  //             }
  //           }).then(() => {
  //         this.isRecycling = false
  //       })
  //     }
  //   }
  // }
}
</script>

<template>
  <div>
<!--      @scroll="loadMoreHandler($el.id)">-->
    <section class="listSection">
      <new-music-list
          @touchstart="swipeFalse" @touchend="swipeTrue"
          ref="music_list"
          :itemData="$props"
          :query="query"
          :hasNumber="hasNumber"
          :meta="meta"
          :end="end"
          :queryParams="queryParams"
          :from="from"
          :key="parentKey"
          :is_draggable="is_draggable"
          :checked_items="checked_items">
      </new-music-list>
    </section>
  </div>

</template>

<style scoped>

.listSection {
  width: 100%;
}

.data-wrapper {
  flex-direction: column;
  display: inline-block;
  width: 100%;
  overflow-x: hidden;
}

#html-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid whitesmoke;
  border-top: 3px solid transparent;
  border-radius: 50%;
  top: -13.5px;
  position: relative;
  left: calc(50% - 12.5px);
}

.rightPosition {
  right: calc(50% - 12.5px);
}

.leftPosition {
  left: calc(50% - 12.5px);
}

#html-spinner, #svg-spinner {
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 0.5s;
  -webkit-animation-name: rotate;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;

  -moz-transition-property: -moz-transform;
  -moz-animation-name: rotate;
  -moz-animation-duration: 0.5s;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;

  transition-property: transform;
  animation-name: rotate;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
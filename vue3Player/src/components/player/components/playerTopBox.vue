<template>
    <div class="cover-container">

<Cover :data="$store.state.playerData"/>

<artist-info :data="$store.state.playerData" />


    </div>
</template>

<script>
import Cover from "@/components/player/components/Cover.vue";
import ArtistInfo from "@/components/player/components/artistInfo.vue";

export default {
  name: "playerTopBox",
components: {
  ArtistInfo,
  Cover,
},
  props: {
    data:Object
  },
  data() {
    return {
      isShowLyrics: false,
    }
  },
}
</script>

<style scoped>


.cover-container {
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
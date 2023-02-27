<template>
  <div class="cover-container">
    <advertise-cover :data="$store.state.playerAdvertiseData"/>
    <advertise-details :data="$store.state.playerAdvertiseData" />
  </div>
    <!--              advertise Box-->
<!--    <div class="topBox">-->
<!--      <div-->
<!--          :style="{backgroundImage: $store.state.imgUrl+$store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].image}"-->
<!--          class="back"></div>-->
<!--      <span><img draggable="false" @click="closeSheet()"-->
<!--                 src="@/assets/icons/playerTopBtn.svg"-->
<!--      /></span>-->
<!--      <div>-->

<!--        <div class="Cover">-->
<!--          <img draggable="false" class="advImage coverPicture" id="advImage"-->
<!--               :src="$store.state.imgUrl+$store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].image"/>-->
<!--        </div>-->
<!--        <img draggable="false" :src="require(`@/assets/img/splash-logo.png`)" class="mel-logo">-->
<!--        <span class="advTitle infoSpan fit-64 m-auto t-c dir-rtl">-->

<!--					<span>{{ $store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].title }}</span>-->
<!--				</span>-->
<!--        <span class="advDesc infoSpan fit-64 m-auto t-c dir-rtl">-->
<!--					<span class="infoSpan">-->
<!--						<span>-->
<!--							{{ $store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].description }}-->
<!--							</span>-->
<!--						</span>-->

<!--					</span>-->

<!--      </div>-->

    <!--              advertise Box-->
<!--  </section>-->
</template>

<script>
import AdvertiseCover from "@/components/player/components/Advertise/advertiseCover.vue";
import AdvertiseDetails from "@/components/player/components/Advertise/advertiseDetails.vue";
export default {
  name: "advertiseTopBox",
  components: {
    AdvertiseDetails,
    AdvertiseCover
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
      this.$utils.closeSheet(this.$root.$refs.player)
      this.$utils.limitAction('playerOpened',this.$store.state.playerAdvertiseData.advertises[this.$store.state.advertiseIndex].btn_action.target_type)
    }
  }
}
</script>

<style scoped>


.cover-container {
  position: relative;
  width: 100%;
  left: 0;
  z-index: 2;
}
</style>
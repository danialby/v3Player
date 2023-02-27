<template>
  <div class="advDetails">
    <span class="advTitle infoSpan fit-64 m-auto t-c dir-rtl">

					<span>{{ $store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].title }}</span>
				</span>
    <span class="advDesc infoSpan fit-64 m-auto t-c dir-rtl">
					<span class="infoSpan">
						<span class="fit-16 m-auto">
							<v-text-marquee>
                {{ $store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].description }}
              </v-text-marquee>
							</span>
						</span>

					</span>
    <ButtonClickable
        :text="$store.state.playerAdvertiseData.advertises[$store.state.advertiseIndex].btn_text"
        @click.native="advButton"
        class="filled m5-auto"
        style="width:200px;   min-height: 45px;">
    </ButtonClickable>
    <!--    </div>-->

  </div>
</template>

<script>
import ButtonClickable from "@/components/includes/Elements/ButtonClickable.vue";
import {VTextMarquee} from "vue-text-marquee";
export default {
  name: "advertiseDetails",
  components: {
    ButtonClickable,
    VTextMarquee
  },
  props: {
    data:Object
  },
  methods : {
    advButton() {
      this.$utils.closeSheet(this.$root.$refs.player)
      this.$utils.limitAction('playerOpened',this.$store.state.playerAdvertiseData.advertises[this.$store.state.advertiseIndex].btn_action.target_type)
    }
  }
}
</script>

<style scoped>
.advDetails {
  position: relative;
}
.advTitle {
  font-size: 1.4em;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
}
</style>
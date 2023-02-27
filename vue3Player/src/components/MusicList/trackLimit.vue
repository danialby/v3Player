<template>
  <section>
  <div class="limit-crwon-back">
    <img draggable="false" src="@/assets/icons/crownBack.svg">
  </div>

  <div class="limit-header" v-if="itemData.track_limit && itemData.track_limit.message">

    <div class="limit-icon" v-if="itemData.track_limit.message">
      <img draggable="false" src="@/assets/icons/crown.svg"/>
    </div>


    <div class="limit-title" v-if="itemData.track_limit.message">
      {{ itemData.track_limit.message }}
    </div>


    <ButtonClickable @click.native="advButton('plans')" class="filled"
                     id="limit-btn" text="ویژه شوید"
                     v-if="itemData.track_limit.message">
    </ButtonClickable>
  </div>
  </section>
</template>

<script>
import ButtonClickable from "@/components/includes/Elements/ButtonClickable.vue";

export default {
  name: "track_limit",
  components: {ButtonClickable},
  props:{
    itemData:Object
  },
  methods: {
    advButton(action) {
      if(this.$root.$refs.player.opened) {
        this.$root.$refs.app.isFromLimitCover = true
      }
      this.$root.$refs.player.close()
      this.$store.dispatch('handleAction',{target_type:action})
    },
  }
}
</script>

<style scoped>

.limit-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--Gray-7);
  border-radius: 10px 10px 0 0;
}

.limit-crwon-back {
  position: relative;
  top: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.limit-icon {
  position: relative;
  top: -10px;
}

.limit-icon img {
  width: 25px;
}

.limit-title {
  direction: rtl;
  position: relative;
  top: -20px;
  padding: 15px;
  line-height: 30px;
  font-size: 12px;
  color: var(--Accent);
}

#limit-btn {
  position: relative;
  top: -28px;
  width: 40%;
  margin-bottom: -17px;
}
</style>
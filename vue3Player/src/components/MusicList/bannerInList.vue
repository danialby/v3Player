<template>
  <section
      :style="{backgroundImage:'url('+$store.state.imgUrl + itemData.add_on.background_image+')'}"
      @click="advButton(itemData.add_on.action.target_type)"
      class="banner-container "
  >
    <img draggable="false" :src="$store.state.imgUrl+itemData.add_on.cover_image" class="banner-icon">
    <div class="banner-content">
        <span class="banner-text">
            {{ itemData.add_on.description }}
        </span>
      <div
          class="banner-link">
        <img draggable="false" class="banner-link-icon" src="@/assets/icons/banner-link-icon.svg">
        <span :style="{color:itemData.add_on.btn_color}" class="banner-link-text">{{ itemData.add_on.btn_text }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "bannerInList",
  props: {
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
.banner-container {
  box-sizing: border-box;
  width: 95%;
  margin: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  background-size: cover;
  background-position: center;
}

.banner-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.banner-text {
  direction: rtl;
  display: flex;
  text-align: right;
  font-size: 15px;
  line-height: 18px;
}

.banner-icon {
  max-width: 55px;
}

.banner-link-text {
  white-space: nowrap;
  color: var(--Accent);
  margin-left: 5px;
}

@media screen and (min-width: 375px) {
  .banner-text {
    font-size: 12px;
    font-weight: 400;
  }

  .banner-link-text {
    white-space: nowrap;
    font-size: 12px;
  }
}


@media screen and (min-width: 320px) and (max-width: 374px) {
  .banner-text {
    font-size: 10px;
    font-weight: 400;
  }

  .banner-link-text {
    white-space: nowrap;
    font-size: 10px;
  }
}


.banner-link {
  display: flex;
  margin-top: 5px;
}
</style>
<template>
  <div class="Cover" v-if="!isShowLyrics">
    <div class="limit-cover" v-if="!isShowLyrics && data.is_demo">
      <span>نسخه دمو (30ثانیه)</span>
      <span>این آهنگ مخصوص کاربران ویژه است.<br>برای دانلود و پخش نسخه کامل ویژه شوید.</span>
      <ButtonClickable
          @click.native="$utils.limitAction('playerOpened')"
          class="filled limit-cover-btn"
          text="ویژه شوید"
      >
      </ButtonClickable>
    </div>
    <img draggable="false" class="coverPicture coverPlaceHolder" src="@/assets/img/playerCoverPlaceHolder.svg">
    <img draggable="false" class="coverPicture  coverImage"
         src="data?$store.state.imgUrl+data.image_large:''"/>
  </div>
</template>

<script>

export default {
  name: "Cover",
  props: {
    data:Object,
  },
  data() {
    return {
      isShowLyrics: false,
    }
  },
}
</script>

<style scoped>

.Cover {
  position: relative;
  max-width: 450px;
  margin: 0 auto 0.5em;
  min-width: 260px;
}
.coverImage {
  position: relative;
  margin-left: -82.5%;
}
.Cover .coverPicture {
  max-height: 90vw;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgb(0 0 0 / 15%);
  aspect-ratio: 1 / 1;
  height: auto;
  min-width: 82.5%;
  max-width: 82.5%;
}


.limit-cover {
  width: 82.5%;
  display: flex;
  background: rgba(21, 21, 21, 0.5);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  border-radius: 20px 20px 0 0;
  position: absolute;
  z-index: 1;
  max-width: 82.5%;
  margin: 0 auto;
  left: 8.75%;
}

.limit-cover .mButton {
  width:70%;
  height: 35px;
}
.limit-cover span {
  font-size: 1rem;
  direction: rtl;
}
@media screen and (max-width: 375px) {
  .Cover .coverPicture {
    max-width: 75%;
    min-width: 75%;
  }
  .limit-cover {
    max-width: 75%;
    left: 12.5%;
  }
  .Cover .coverImage {
    min-width: 75%;
    margin-left: -75%;
  }
}
@media screen and (max-width: 321px) {
  .Cover .coverPicture {
    max-width: 65%;
    min-width: 60%;
  }
  .Cover .coverImage {
    min-width: 65%;
    margin-left: -65%;
  }
  .limit-cover {
    max-width: 65%;
    left: 17.5%;
  }
  .limit-cover span {
    font-size: 0.75rem;
  }
}
.coverPlaceHolder {
  position: relative;
  width: 100%;
}


</style>
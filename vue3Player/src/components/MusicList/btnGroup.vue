<template>
  <div               @focusout="$emit('closeOptions')"
                     tabindex="0">
      <div class="isDemoContainer" v-if="item.is_demo">
        <span class="importantText" style="padding-right: 5px;">پخش دمو</span>
        <img draggable="false"  src="@/assets/icons/playbtn.svg"/>
      </div>
      <div class="btnGroup" :class="{mr20:!$store.state.musicListEditMode && !$store.state.playerSelectionMode}" v-else>
                        <span   :class="$utils.isTrackInUserLikedTracks(item.id)?'liked':null"
                                @click.stop="$utils.toggleLike(item,$event,from)"
                                class="notLiked">
                        </span>
                        <span class="more"  @click.stop="$emit('toggleOptions')"
                              v-if="!$store.state.musicListEditMode && from  !== 'player'">
                              <img draggable="false" src="@/assets/icons/more-verticalg.svg"/>
                        </span>
                        <span class="more"  @click.stop="$emit('toggleOptions')"
                              v-if="!$store.state.playerSelectionMode && from  === 'player'">
                              <img draggable="false" src="@/assets/icons/more-verticalg.svg"/>
                        </span>
        <!--                          <img draggable="false"   src="@/assets/icons/downloads.svg" @click.stop="downloadItem"/>-->

        <span class="checkBox" v-if="$store.state.musicListEditMode || $store.state.playerSelectionMode" @click.stop="$emit('checkItem')">
                                <img draggable="false"
                                     class="trackCheckBox"
                                     src="@/assets/icons/checked.svg"
                                     v-if="$parent.isCheckedItem(item) && $store.state.musicListEditMode && from  !== 'player'"/>
                                <img draggable="false"
                                     class="trackCheckBox"
                                     src="@/assets/icons/checkBox.svg"
                                     v-if="!$parent.isCheckedItem(item) && $store.state.musicListEditMode && from  !== 'player'"/>


                                <img draggable="false"
                                     class="trackCheckBox"
                                     src="@/assets/icons/checked.svg"
                                     v-if="$parent.isCheckedItem(item) && $store.state.playerSelectionMode && from  === 'player'"/>
                                <img draggable="false"
                                     class="trackCheckBox"
                                     src="@/assets/icons/checkBox.svg"
                                     v-if="!$parent.isCheckedItem(item) && $store.state.playerSelectionMode && from  === 'player'"/>

                        </span>
  </div>
  </div>
</template>

<script>
export default {
  name: "btnGroup",
  props: {
    item:Object,
    from:String
  },
  methods: {

  }
}
</script>

<style scoped>

.theList .btnGroup {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  height: 100%;
  /*background: #409B65;*/
  z-index: 100;
  direction: initial;
  transition: .2s all ease;
}

.mr20 {
  margin-right:20px;
}
.mr50 {
  margin-right: 50px;
}

.btnGroup span {
  max-width: 20px;
  height: 17px;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: 10px;
}

.btnGroup .liked, .btnGroup .notLiked {
  width: 100%;
  background-size: contain;
}

.btnGroup .notLiked {
  background-image: url('~@/assets/icons/like.svg');
  width: 20px;
  display: block;
}

.btnGroup .liked {
  background-image: url('~@/assets/icons/liked.svg');
}


.more img {
  height:100%;
}



.isDemoContainer {
  width: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*background: #409B65;*/
  font-size: 12px;
  margin-right: 15px;

}

.isDemoContainer img {
  width: 30px;
}


.importantText {
  white-space: nowrap;
}
.checkBox {
  margin-right: 16px;
}
.trackCheckBox {
  height: 17.5px;

  width: 17.5px;
}
</style>
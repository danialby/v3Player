<template>
  <div class="buffered fit-64 m-auto">
    <span class="buffered-amount" :style="'width:'+amount.toString()+'%;'"></span>
  </div>
</template>

<script>
export default {
  name: "buffered",
  props: {
    amount:Number
  }
}
</script>

<style scoped>

.buffered {
  border-radius: 50px;
  overflow: hidden;
  height: 3px;
  position: relative;
  top: -13px;
}

.buffered-amount {
  border-radius: 50px;
  display: block;
  height: 100%;
  background-color: #777;
  width: 0;
}
</style>
<template>
  <div class="d-flex justify-center align-item-center fit m-auto" id="advBox">
				<span class="advText kalameh">
					{{ data.advertises[0].bottom_text }}
				</span>
  </div>
</template>

<script>
export default {
  name: "advertiseBottomBox",
  props: {
    data:Object
  }
}
</script>

<style scoped>
#advBox {
  height: 9vh;
}
</style>
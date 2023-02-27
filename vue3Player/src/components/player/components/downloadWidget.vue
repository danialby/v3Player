<template>
                          <span>
                            <vue-ellipse-progress
                                :legend="false"
                                :progress="progress"
                                :size="28"
                                :thickness="3"
                                animation="default 0 0"
                                class="downloadProgress"
                                color="#F2C94C"
                                v-if="$store.state.playerData.isDownloading && !$store.state.playerData.isDownloaded"
                            >
                            </vue-ellipse-progress>
                                        <img draggable="false"
                                             @click="$root.$refs.BigPlayer.openDownloadSheet"
                                             src="@/assets/icons/downloads.svg"
                                             v-if="!$store.state.playerData.isDownloading && !$store.state.playerData.isDownloaded"    />
                                        <img draggable="false" src="@/assets/icons/tickW.svg"
                                             v-if="!$store.state.playerData.isDownloading && $store.state.playerData.isDownloaded" />
                          </span>
</template>

<script>
import { VueEllipseProgress } from "vue-ellipse-progress";
import {saveAs} from 'file-saver';
import axios from "axios";
export default {
  name: "downloadWidget",
  data() {
    return {
     progress: 0,
    }
  },
  components: {
    VueEllipseProgress
  },
  methods: {
    async downloadItem() {
      let self = this
      self.$utils.closeSheet(self.$root.$refs.downloadSheet)
      self.progress = 0
      self.$store.state.playerData.isDownloading = true
      let theMp3
      theMp3 = self.$store.state.playerData.mp3s.filter(el => el.quality === this.$store.state.download_quality)
      console.log(self.$store.state.cdnUrl + theMp3[0].name)
      let userObject = JSON.parse(localStorage.getItem('userObject'))
      const client = axios.create({
        baseURL: self.$store.state.cdnUrl,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          "device_id": localStorage.getItem('device_id'),
          "device_name": localStorage.getItem('device_name'),
          'user-id': userObject.user.id,
          'authorization': userObject.token,
          'device_token': localStorage.getItem('device_token'),
          'platform': this.$device.os_name.name,
          'pwa-version': this.$store.state.pwa_version
        }
      })

      await client.get(
          theMp3[0].name + '?type=download', {
            responseType: 'arraybuffer',
            onDownloadProgress: progressEvent => {
              let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100)
              // console.log('completed: ', percentCompleted)
              self.progress = percentCompleted
            }
          })
          .then(res => {
            const blob = new Blob([res.data], {
              type: 'audio/mp3',
            });
            saveAs(blob, self.$store.state.playerData.download_title + '.mp3');
            if (self.progress === 100) {
              self.$store.state.playerData.isDownloading = false
              self.$store.state.playerData.isDownloaded = true
            }
            if (!self.$device.isIOS) {
              self.$root.$refs.vToaster.openToast(
                  'در پوشه Downloads ذخیره شد'
              )
            }
          })
          .catch((error) => {
            if (error.response.status > 480 && error.response.status < 489) {
              self.progress = 0
              self.$store.state.playerData.isDownloading = false
              self.$store.state.playerData.isDownloaded = false
              self.$root.$refs.BigPlayer.openDownloadLimitDialog()
            }
          })

    },
  }
}
</script>

<style scoped>

</style>
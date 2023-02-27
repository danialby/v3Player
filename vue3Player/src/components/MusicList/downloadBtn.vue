<template>
        <span>
          <vue-ellipse-progress
              :legend="false"
              :progress="progress"
              :size="24"
              :thickness="3"
              animation="default 0 0"
              class="downloadProgress"
              color="#F2C94C"
              v-if="isDownloading && !$utils.isInDownloadedTracks(itemData.id)"
          >
          </vue-ellipse-progress>
          <vue-ellipse-progress
                        :legend="false"
                        :loading="true"
                        :size="24"
                        :thickness="3"
                        animation="default 0 0"
                        class="downloadProgress"
                        color="#F2C94C"
                        v-if="isTrying && !isDownloading"
                    >
          </vue-ellipse-progress>
                          <img draggable="false" @click="abortDownload" class="closeX"
                               v-if="(isDownloading && !$utils.isInDownloadedTracks(itemData.id)) || (isTrying && !isDownloading)"
                               src="@/assets/icons/xw.svg"/>
<svg @click="openDownloadSheet" v-if="!isTrying && !isDownloading && !$utils.isInDownloadedTracks(itemData.id)"
     width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6412 2.0935C11.5217 1.9675 12.4771 1.9675 13.3581 2.0935C13.4066 2.1005 13.4536 2.104 13.5011 2.104C13.9906 2.104 14.4181 1.744 14.4896 1.2455C14.5676 0.6985 14.1877 0.192 13.6417 0.114C12.5732 -0.038 11.4262 -0.038 10.3587 0.114C9.81215 0.192 9.43215 0.6985 9.51015 1.2455C9.58815 1.792 10.0957 2.173 10.6412 2.0935Z" fill="#828282"/>
<path d="M17.455 1.30508C16.963 1.05358 16.361 1.24908 16.1095 1.74008C15.8585 2.23208 16.0535 2.83408 16.545 3.08558C19.9095 4.80608 22 8.22008 22 11.9956C22 17.5096 17.514 21.9956 12 21.9956C6.486 21.9956 2 17.5096 2 11.9956C2 8.22008 4.0905 4.80608 7.4555 3.08608C7.947 2.83458 8.142 2.23208 7.8905 1.74058C7.639 1.24858 7.036 1.05408 6.545 1.30558C2.508 3.36908 0 7.46508 0 11.9956C0 18.6121 5.383 23.9956 12 23.9956C18.6165 23.9956 24 18.6121 24 11.9956C24 7.46508 21.492 3.36908 17.455 1.30508Z" fill="#828282"/>
<path d="M7.29287 14.2852C6.90237 14.6757 6.90237 15.3087 7.29287 15.6992L11.2929 19.6992C11.4879 19.8947 11.7439 19.9922 11.9999 19.9922C12.2559 19.9922 12.5114 19.8947 12.7069 19.6992L16.7069 15.6992C17.0974 15.3087 17.0974 14.6757 16.7069 14.2852C16.3164 13.8947 15.6834 13.8947 15.2929 14.2852L12.9999 16.5782V4.99219C12.9999 4.44019 12.5519 3.99219 11.9999 3.99219C11.4479 3.99219 10.9999 4.44019 10.9999 4.99219V16.5782L8.70687 14.2852C8.31687 13.8947 7.68287 13.8947 7.29287 14.2852V14.2852Z" fill="#828282"/>
</svg>
          <svg @click="openDownloadConfirmDialog(itemData.id)"
               v-if="!isDownloading && $utils.isInDownloadedTracks(itemData.id)"
               width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6412 2.0935C11.5217 1.9675 12.4771 1.9675 13.3581 2.0935C13.4066 2.1005 13.4536 2.104 13.5011 2.104C13.9906 2.104 14.4181 1.744 14.4896 1.2455C14.5676 0.6985 14.1877 0.192 13.6417 0.114C12.5732 -0.038 11.4262 -0.038 10.3587 0.114C9.81215 0.192 9.43215 0.6985 9.51015 1.2455C9.58815 1.792 10.0957 2.173 10.6412 2.0935Z" fill="#F2C94C"/>
<path d="M17.455 1.30508C16.963 1.05358 16.361 1.24908 16.1095 1.74008C15.8585 2.23208 16.0535 2.83408 16.545 3.08558C19.9095 4.80608 22 8.22008 22 11.9956C22 17.5096 17.514 21.9956 12 21.9956C6.486 21.9956 2 17.5096 2 11.9956C2 8.22008 4.0905 4.80608 7.4555 3.08608C7.947 2.83458 8.142 2.23208 7.8905 1.74058C7.639 1.24858 7.036 1.05408 6.545 1.30558C2.508 3.36908 0 7.46508 0 11.9956C0 18.6121 5.383 23.9956 12 23.9956C18.6165 23.9956 24 18.6121 24 11.9956C24 7.46508 21.492 3.36908 17.455 1.30508Z" fill="#F2C94C"/>
<path d="M7.29287 14.2852C6.90237 14.6757 6.90237 15.3087 7.29287 15.6992L11.2929 19.6992C11.4879 19.8947 11.7439 19.9922 11.9999 19.9922C12.2559 19.9922 12.5114 19.8947 12.7069 19.6992L16.7069 15.6992C17.0974 15.3087 17.0974 14.6757 16.7069 14.2852C16.3164 13.8947 15.6834 13.8947 15.2929 14.2852L12.9999 16.5782V4.99219C12.9999 4.44019 12.5519 3.99219 11.9999 3.99219C11.4479 3.99219 10.9999 4.44019 10.9999 4.99219V16.5782L8.70687 14.2852C8.31687 13.8947 7.68287 13.8947 7.29287 14.2852V14.2852Z" fill="#F2C94C"/>
</svg>

          <!--          <img draggable="false" src="@/assets/icons/tickW.svg"-->
<!--               -->
<!--          />-->
				</span>
</template>

<script>
import {VueEllipseProgress} from "vue-ellipse-progress";
import axios from "axios";
import {saveAs} from 'file-saver';
import {get} from "idb-keyval";
// import {dlTracks} from "@/constants/constants";
import { db } from '@/db'
let self
let controller
export default {
  name: "downloadBtn",
  components:{
    VueEllipseProgress
  },
  props: {
    itemData:Object
  },
  mounted() {
    self = this
  },
  data(){
    return {
      progress:0,
      isDownloading:false,
      isTrying:false
    }
  },
  methods: {
    openDownloadConfirmDialog(id) {
      this.$root.$refs.downloadBtn = this
      this.$store.dispatch('setPointedTrackID',id)
      this.$root.$refs.downloadConfirmDialog.openDialog()
    },
    async openDownloadSheet() {
      this.$root.$refs.downloadBtn = this
      let DQisSet = localStorage.getItem('download_quality')
      if (!this.itemData.is_demo) {
        if (!DQisSet) {
          this.$root.$refs.currentTrackItem.optionsOpened = false
          this.$root.$refs.app.$refs.userDownloadQualitySheet.open()
        } else {
          this.$root.$refs.downloadSheet.open()
          if (!this.$store.state.initialData.telegram_data.has_connected) {
            await this.$root.$refs.BigPlayer.checkTGStatus()
          } else {
            console.log('telegram is connected')
          }
        }

      } else {
        this.$root.$refs.vToaster.openToast(
            'برای دانلود این آهنگ باید کاربر ویژه شوید!'
        )
      }
    },
    saveTrackToDevice(id) {
      get(id).then((file) => {
        saveAs(file, self.itemData.download_title + '.mp3');
      })
      this.$root.$refs.vToaster.openToast(
          'در پوشه Downloads ذخیره شد'
      )
      this.$root.$refs.downloadConfirmDialog.close()
    },
    async downloadItem() {
      let self = this
      this.$root.$refs.downloadSheet.close()
      self.progress = 0
      this.isTrying = true
      // console.log(id)
      let theMp3
      theMp3 = self.itemData.mp3s.filter(el => el.quality === this.$store.state.download_quality)
      console.log(self.$store.state.cdnUrl + theMp3[0].name)
      let userObject = JSON.parse(localStorage.getItem('userObject'))
      controller = new AbortController();
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
          theMp3[0].name + '?type=download',
          {
            signal: controller.signal,
            responseType: 'arraybuffer',
            onDownloadProgress: progressEvent => {
              if(!self.isDownloading)
              {
                self.isTrying = false
                self.isDownloading = true
              }
              // console.log('completed: ', percentCompleted)
              self.progress = Math.floor(progressEvent.loaded / progressEvent.total * 100)
            }
          })
          .then(async (res) => {
            const blob = new Blob([res.data], {
              type: 'audio/mp3',
            });
            try {
              // Add the new friend!
              await db.dlTracks.add({
                id:self.itemData.id,
                item: self.itemData,
                file: blob
              });
              this.$store.state.downloadedTracks.push(self.itemData)
            } catch (error) {
              console.log(`Failed to add: ${error}`)
            }
            // set(self.itemData.id,{item:self.itemData,file:blob},dlTracks).then(() => {
            //   this.$store.state.downloadedTracks.push(self.itemData)
            // })
            // let downloadedTracksList = localStorage.getItem('downloadedTracksList') ? JSON.parse(localStorage.getItem('downloadedTracksList')) : []
            // let updatedDownloadedTracksList = downloadedTracksList.filter((item) => item.id !== self.itemData.id)
            // updatedDownloadedTracksList.unshift(self.itemData)
            // localStorage.setItem('downloadedTracksList', JSON.stringify(updatedDownloadedTracksList))
            if (self.progress === 100) {
              self.isDownloading = false
              self.isDownloaded = true
            }
            if (!self.$device.isIOS) {
              saveAs(blob, self.itemData.download_title + '.mp3');
              self.$root.$refs.vToaster.openToast(
                  'در پوشه Downloads ذخیره شد'
              )
            }
          })
          .catch((error) => {
            if(error.response) {
              if (error.response.status > 480 && error.response.status < 489) {
                self.progress = 0
                self.isDownloading = false
                self.isDownloaded = false
                self.$root.$refs.app.openDownloadLimitDialog()
              }
            }
            else {
                console.log('Request aborted', error.message);
            }
          })


    },
    abortDownload() {
      controller.abort();
      this.isTrying = false
      this.isDownloading = false
    }
  },
}
</script>

<style scoped>
img {
  height: 100%;
}
.closeX {
  margin-right: -20px;
  margin-left: 4px;
  top: 0px;
  width: 16px;
  position: relative;
}
</style>
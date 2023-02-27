
<script setup>
import {ref,onMounted} from "vue"
import axios from "axios";
import {db} from "@/db";
import {Howl} from 'howler';
let self
let userObject
let seek
let navTimer
let retryTimer
let animationFrame

  defineProps({
    data:Object
  })


const isDragging = ref(false);
const isDistrupted = ref(false);
const retryCount = ref(0);
const advData = ref(null);
const advAudio = ref(null);
const historyTouchY = ref([]);
const historyTouchStart = ref(null);
const isShowLyrics = ref(false);
const isMinimized = ref(false);
const repeatOne = ref(false);
const repeatAll = ref(false);
const shuffleEnabled = ref(false);
const startOfPlaylist = ref(false);
const endOfPlaylist = ref(false);
const isChanging = ref(false);
const isPlaying = ref(false);
const rawDuration = ref(0);
const playingObject = ref({});
const playingElement = ref(null);
const playingData = ref(null);
const playerDuration = ref("00:00");
const playerCurrentTime = ref("00:00");
const bufferedAudio = ref(0);
const playerDisabled = ref(false);
const playerDraggable = ref(false);
const stopPlaying = ref(false);
const playbackTime = ref(0);
const navigateTimer = ref(false);
const slideBar = ref(0);
const nextAudio = ref(null);
const nextAudioElement = ref(null);
const sliderCustomize = ref({"processStyle":{"backgroundColor":"var(--Accent)"},"bgStyle":{"backgroundColor":"rgba(0,0,0,0.2)"},"dotStyle":{"backgroundColor":"var(--Accent)","zIndex":10000},"disabledStyle":{"padding":0,"opacity":1,"backgroundColor":"rgba(0,0,0,0.2)"}});
const userRangeClicked = ref(false);
const fetchUrl = ref(null);


import {getCurrentInstance} from "vue";
const app = getCurrentInstance()
onMounted(() => {
  let userObject = storeToRefs(devUserObject["09353264254"])
})




import {storeToRefs} from "pinia";
import {melodify} from "@/store";
const melodifyStore = melodify()
const {
  playerIndex,playerMeta, playerTracks, playerData, playerAdvertiseData, playerLyrics,listenedTracks,cdnUrl,devUserObject
} = storeToRefs(melodifyStore)
const {
setFetchUrl
} = melodifyStore


async function downloadItem(id,src) {
      const client = axios.create({
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

      await client.get(src, {
        responseType: 'arraybuffer',
      })
          .then(async(res) => {
            const blob = new Blob([res.data], {
              type: 'audio/mp3',
            });
            try {
              // Add listened track!
              await db.lsTracks.add({
                id:id,
                item: self.itemData,
                file: blob
              });
              listenedTracks.push(self.itemData)
            } catch (error) {
              console.log(`Failed to add: ${error}`)
            }
            // set(id,{item:this.$store.state.playerData,file:blob},lsTracks).then(() => {
            //   // this.$store.state.listenedTracks.push(id)
            // })
            // let listenedTracksList = localStorage.getItem('listenedTracksList') ? JSON.parse(localStorage.getItem('listenedTracksList')) : []
            // let updatedListenedTracksList = listenedTracksList.filter((item) => item.id !== id)
            // updatedListenedTracksList.unshift(this.$store.state.playerData)
            // localStorage.setItem('listenedTracksList', JSON.stringify(updatedListenedTracksList))
            // console.log(id+' is in listenedTracksList now')
          })
          .catch((error) => {
            console.log('there is a problem', error)
          })

    }
function processNext() {
      if(playerTracks.tracks[playerIndex + 1] &&
          this.$store.state.listenCount !== this.advertise_data.ads_limit_counts) {
        let nextTrackElement = document.getElementById(playingObject.value.next)
        let nextTrackNeeded = nextTrackElement === null
        if (!this.nextAudio && !this.isChanging && nextTrackNeeded && !playerAdvertiseData) {
          let theMp3 =
              !playerTracks.tracks[playerIndex + 1].is_demo ?
                  playerTracks.tracks[playerIndex + 1].mp3s.filter(el => el.quality === this.$store.state.user.streaming_quality)
                  : playerTracks.tracks[playerIndex + 1].mp3s[0].name
          setFetchUrl(cdnUrl + theMp3[0].name + '?type=pwa&melodify_token=' + userObject.user.id + '&download_token=' + userObject.token)
          if (!playerTracks.tracks[playerIndex + 1].is_demo) {
            if (!this.shuffleEnabled) {
              console.log('nextAudio :' + theMp3[0].name)
              this.nextAudio = theMp3[0].name
              nextAudioElement.value = document.createElement('audio')
              nextAudioElement.value.setAttribute('id', playingObject.value.next)
              nextAudioElement.value.setAttribute('crossorigin', 'anonymous')
              nextAudioElement.value.src = this.$store.state.cdnUrl + theMp3[0].name + '?type=pwa&melodify_token=' + userObject.user.id + '&download_token=' + userObject.token
              nextAudioElement.value.setAttribute('preload', 'metadata')
              nextAudioElement.value.setAttribute('crossorigin', 'anonymous')
              // let body =
              nextAudioElement.value.load()
              document.body.appendChild(nextAudioElement.value)
            }
          }
        }
      }
    }
async function togglePlay() {
      // if(!this.playerDisabled) {
      if (this.playingElement) {
        if (this.playingElement.playing()) {
          await this.playingElement.pause()
          this.isPlaying = false
        } else {
          if (!playerAdvertiseData) await this.$store.dispatch('setMediaSessionData')
          await this.playingElement.play()
          this.isPlaying = true
        }
      } else {

        await this.playItem(
            this.$store.state.playerParams.tracks,
            this.$store.state.playerParams.item,
            this.$store.state.playerParams.index,
            this.$store.state.playerParams.query,
            this.$store.state.playerParams.queryParams,
            this.$store.state.playerParams.meta,
            this.$store.state.playerParams.from
        )
      }
      // }
    }
function setTextAnimation() {

      //big player elements
      let playerDataTitle = document.getElementById('playerDataTitle')
      let playerDataTitleContainer = document.getElementById('playerDataTitleContainer')
      let infoContainer = document.getElementById('infoContainer')
      let info = document.getElementById('info')

      //mini player elements
      let titleContainer = document.getElementById('titleContainer')
      let miniPlayerTitle = document.getElementById('miniPlayerTitle')
      let miniPlayerArtistName = document.getElementById('miniPlayerArtistName')


      //lyric player elements
      // let lyricTitleContainer = document.getElementById('lyricTrackTitle')
      // let miniPlayerTitle = document.getElementById('miniPlayerTitle')
      // let lyricArtistName = document.getElementById('miniPlayerArtistName')



      // console.log('big-title :','parent:',playerDataTitleContainer.offsetWidth,'child:',playerDataTitle.offsetWidth)
      // console.log('big-info:','parent:',infoContainer.offsetWidth,'child:',info.offsetWidth)
      // console.log('mini-title :','parent:',titleContainer.offsetWidth,'child:',miniPlayerTitle.offsetWidth)
      // console.log('mini-artist:','parent:',titleContainer.offsetWidth,'child:',miniPlayerArtistName.offsetWidth)

      //mini player check widths
      if ((titleContainer.offsetWidth - 30) < miniPlayerTitle.offsetWidth) {
        miniPlayerTitle.style.setProperty('--miniPlayerTitle-scroll-start', miniPlayerTitle.offsetWidth + "px")
        miniPlayerTitle.style.setProperty('--miniPlayerTitle-scroll-out', -miniPlayerTitle.offsetWidth + "px")
        miniPlayerTitle.classList.add('animateMiniPlayerTitle')
        // console.log('mini-Title-scroll-out:',info.style.getPropertyValue('--miniPlayerTitle-scroll-out'))
      } else if (miniPlayerTitle.classList.contains('animateMiniPlayerTitle')) {
        miniPlayerTitle.classList.remove('animateMiniPlayerTitle')
      }

      if ((titleContainer.offsetWidth - 30) < miniPlayerArtistName.offsetWidth) {
        miniPlayerArtistName.style.setProperty('--miniPlayerArtist-scroll-start', miniPlayerArtistName.offsetWidth + "px")
        miniPlayerArtistName.style.setProperty('--miniPlayerArtist-scroll-out', -miniPlayerArtistName.offsetWidth + "px")
        miniPlayerArtistName.classList.add('animateMiniPlayerArtist')
        // console.log('mini-artist-scroll-out:',info.style.getPropertyValue('--miniPlayerArtist-scroll-out'))
      } else if (miniPlayerArtistName.classList.contains('animateMiniPlayerArtist')) {
        miniPlayerArtistName.classList.remove('animateMiniPlayerArtist')
      }


      //big player check widths
      if (infoContainer.offsetWidth <= info.offsetWidth) {
        info.style.setProperty('--info-scroll-out', -info.offsetWidth + "px")
        info.style.setProperty('--info-scroll-start', info.offsetWidth + "px")
        info.classList.add('animateInfo')
        info.style.opacity = 1
        infoContainer.classList.add('hasGradient')
        // console.log(info.style.getPropertyValue('--info-scroll-out'))
      } else if (infoContainer.offsetWidth > info.offsetWidth) {
        info.classList.remove('animateInfo')
        info.style.opacity = 1
        infoContainer.classList.remove('hasGradient')
      } else {
        info.style.opacity = 1
      }


      if (playerDataTitleContainer.offsetWidth <= playerDataTitle.offsetWidth) {
        playerDataTitle.style.setProperty('--title-scroll-out', -playerDataTitle.offsetWidth + "px")
        playerDataTitle.style.setProperty('--title-scroll-start', playerDataTitle.offsetWidth + "px")
        playerDataTitleContainer.classList.add('hasGradient')
        playerDataTitle.classList.add('animateTitleText')
        playerDataTitle.style.opacity = 1
        // console.log(playerDataTitle.style.getPropertyValue('--title-scroll-out'))
      } else if (playerDataTitleContainer.offsetWidth > playerDataTitle.offsetWidth) {
        playerDataTitleContainer.classList.remove('hasGradient')
        playerDataTitle.classList.remove('animateTitleText')
        playerDataTitle.style.opacity = 1
      } else {
        playerDataTitle.style.opacity = 1
      }
    }
function setEventListeners(track) {
      const actionHandlers = [
        ['play', async() => {
          await self.playingElement.play()
        }],
        ['pause', async () => {
          await self.playingElement.pause()
        }],
        ['previoustrack', () => {
          if (!self.$store.state.playerAdvertiseData) {
            if (!self.startOfPlaylist) {
              self.navigate('prev')
            }
          }
        }],
        ['nexttrack', () => {
          if (!self.$store.state.playerAdvertiseData) {
            if (!self.endOfPlaylist) {
              self.navigate('next')
            }
          }
        }],
        ['stop', () => {
          self.cleanPlayer()
        }],
        ['seekto', (details) => {
          if (!self.$store.state.playerAdvertiseData) {
            self.playingElement.currentTime = details.seekTime;
            if ('setPositionState' in navigator.mediaSession) {
              navigator.mediaSession.setPositionState({
                duration: self.playingElement.duration,
                playbackRate: self.playingElement.playbackRate,
                position: self.playingElement.currentTime
              });
            }
          } else {
            navigator.mediaSession.setPositionState({
              duration: 0,
              playbackRate: self.playingElement.playbackRate,
              position: 0
            });
          }
        }],
      ];
      for (const [action, handler] of actionHandlers) {
        try {
          navigator.mediaSession.setActionHandler(action, handler);
        } catch (error) {
          console.log(`The media session action "${action}" is not supported yet.`);
        }
      }
      // this.playingElement.addEventListener('play', () => {
      //   if(playerAdvertiseData && this.$root.$refs.BigPlayer.lyricFS)
      //   {
      //     this.$root.$refs.BigPlayer.$refs.lyricFS = false
      //     this.$root.$refs.BigPlayer.$refs.lyricUI.opened = false
      //     this.$store.commit('setPlayerLyrics', null)
      //     this.$utils.closeSheet(this.$root.$refs.playerOptionsBottomSheet)
      //   }
      //   /* Play & Pause */
      //   navigator.mediaSession.playbackState = 'playing';
      //
      //
      //   let lastPlayedList = localStorage.getItem('lastPlayedList') ? JSON.parse(localStorage.getItem('lastPlayedList')) : []
      //   let updatedLastPlayedList = lastPlayedList.filter((item) => item.id !== this.playingData.id)
      //   updatedLastPlayedList.unshift(this.playingData)
      //   localStorage.setItem('lastPlayedList', JSON.stringify(updatedLastPlayedList))
      // });
      // this.playingElement.addEventListener('progress', () => {
      //
      //   if(this.playingElement.networkState === 2)
      //   {
      //     if(!this.isOnline) {
      //       if(!this.isDistrupted) {
      //         this.$root.$refs.vToaster.openToast('عدم اتصال به اینترنت!')
      //         this.isDistrupted = true
      //       }
      //     }
      //     else {
      //       this.isDistrupted = false
      //     }
      //   }
      // })
      track.onload = function() {
        this.playerDisabled = false
        this.playerDraggable = true
        this.isPlaying = true
        track.play();
      }
      track.onplay = function() {
        this.playerDuration = this.$utils.formatTime(track.duration()).toString()
      }
      //     this.playingElement.addEventListener('canplay', () => {
      //         this.playerDisabled = false
      //         this.playerDraggable = true
      //         this.isPlaying = true
      //         this.playingElement.play()
      // })
      // this.playingElement.addEventListener('timeupdate', () => {
      //   if(!this.$store.state.playerData)
      //   {
      //     this.removeAllAudios()
      //   }
      //   else {
      //     this.playbackTime = this.playingElement.currentTime
      //   }
      // });
      let stopPauseEvent = false
      track.onpause = (() => {
        if(!stopPauseEvent)
        {this.isPlaying = false
          navigator.mediaSession.playbackState = 'paused';}
      });
      // track.onseek = (() => {
      //   if(!stopPauseEvent)
      //   {this.isPlaying = false
      //     navigator.mediaSession.playbackState = 'paused';}
      // });
      // this.playingElement.addEventListener('seeking', async() => {
      //   stopPauseEvent = true
      //   await this.playingElement.pause()
      // });
      // this.playingElement.addEventListener('seeked', () => {
      //   stopPauseEvent = false
      //   this.playingElement.play()
      // });
      // this.playingElement.addEventListener('canplaythrough', () => {
      //   // this.downloadItem(+this.playingElement.id,this.playingElement.src)
      // });
      // this.playingElement.addEventListener('loadedmetadata', async (event) => {
      //   // this.$refs.emptyPlayer.pause()
      //   if (event.target.id === self.playingElement.id) {
      //     console.log(event)
      //     for (const [action, handler] of actionHandlers) {
      //       try {
      //         navigator.mediaSession.setActionHandler(action, handler);
      //       } catch (error) {
      //         console.log(`The media session action "${action}" is not supported yet.`);
      //       }
      //     }
      //     if (!this.isChanging) {
      //       this.playerDuration = this.$utils.convertTime(this.playingElement.duration).toString()
      //       this.rawDuration = this.playingElement.duration
      //     } else {
      //       this.rawDuration = 0
      //       this.playerDuration = this.$utils.convertTime(this.playingElement.duration).toString()
      //     }
      //     console.log(this.playerDuration)
      //   }
      //   // this.playerDisabled = false
      //   // this.playerDraggable = true
      //   console.log(this.playerDuration)
      // });
      // this.playingElement.addEventListener('error', (event) => {
      //   console.log(event)
      //   // console.log(e.target.error)
      //   if(this.isOnline) {
      //     this.isDistrupted = false
      //     this.playerDecision()
      //     // self.setAdvertise(this.$store.state.lastAdvData)
      //   }
      //   else {
      //     // if (this.isAudioPlaying) {
      //     //   this.playingElement.pause()
      //     //     this.playingElement.setAttribute('preload','none')
      //     //     this.playingElement.autoplay = false
      //     //
      //     //
      //     // }
      //     if(!this.isDistrupted) {
      //       this.$root.$refs.vToaster.openToast('عدم اتصال به اینترنت!')
      //       this.isDistrupted = true
      //     }
      //   }
      //
      // })
      // this.playingElement.addEventListener('loaded', () => {
      //     this.playingElement.play()
      // })
      // this.playingElement.addEventListener('ended', () => {
      //   this.removeOtherEventListeners(this.playingData.id)
      //   if (!playerAdvertiseData) {
      //     if (!this.endOfPlaylist) {
      //       if (this.repeatOne) {
      //         this.playingElement.play()
      //       } else {
      //         this.navigate('next')
      //       }
      //     } else {
      //       if (this.repeatOne) {
      //         this.togglePlay()
      //         this.playbackTime = 0
      //         this.playingElement.currentTime  = this.playbackTime
      //         this.togglePlay()
      //       }
      //       if (this.repeatAll) {
      //         this.playItem(playerTracks.tracks,playerTracks.tracks[0],0, this.$store.state.playerQuery, this.$store.state.playerQueryParams,this.$store.state.playerMeta,'player')
      //       } else {
      //         this.$root.$refs.lyricUI.close()
      //         this.playingElement.pause()
      //       }
      //     }
      //   }
      //   else {
      //     this.goTop()
      //     this.$root.$refs.lyricUI.close()
      //     navigator.mediaSession.setPositionState({
      //       duration: 0,
      //       playbackRate: this.playingElement.playbackRate,
      //       position: 0
      //     });
      //     this.playingElement.pause()
      //     let advCount = playerAdvertiseData.advertises.length
      //     this.$store.dispatch('setClosePlayer', false)
      //     if (playerAdvertiseData.advertises[advCount - 1].close_player === true) {
      //       this.$store.dispatch('setClosePlayer', true)
      //     }
      //
      //     console.log('adertiseIndex : ', this.$store.state.advertiseIndex)
      //     console.log('advCount : ', advCount)
      //
      //
      //     // if ((0 < this.$store.state.advertiseIndex + 1) // To Check
      //     //     &&
      //     //     (this.$store.state.advertiseIndex + 1 !== advCount)) {
      //     if(this.$store.state.advertiseIndex === advCount - 1)
      //     {
      //       this.$store.dispatch('calcAdvertiseIndex')
      //     }
      //     if (this.$store.state.advertiseIndex <= advCount - 1) // To Check
      //     {
      //       this.$store.dispatch('calcAdvertiseIndex')
      //       this.playingElement.play()
      //     } else {
      //       this.$store.commit('setPlayerAdvertiseData', null)
      //       this.$store.dispatch('calcAdvertiseIndex', 0)
      //
      //       if (this.$store.state.should_close_player === true || this.$root.$refs.app.should_close_player) {
      //         this.$store.commit('setPlayerTracks', null)
      //         this.$store.commit('setPlayerData', null)
      //         this.$store.commit('setPlayerLyrics', null)
      //         this.$store.dispatch('setClosePlayer', false)
      //         this.$store.commit('setPlayerAdvertiseData', null)
      //         this.$root.$refs.app.should_close_player = false
      //         this.$root.$refs.player.close()
      //         this.playingElement = null
      //
      //       } else
      //       {
      //         this.$store.commit('setPlayerAdvertiseData', null)
      //         this.$store.commit('setPlayerAdvData', null)
      //         this.isChanging = false
      //         this.$store.dispatch('setMediaSessionData')
      //         this.playingElement = null
      //         this.$store.dispatch('setLastListenedTrack',null)
      //         this.playItem(
      //             this.$store.state.playerParams.tracks,
      //             this.$store.state.playerParams.item,
      //             this.$store.state.playerParams.index,
      //             this.$store.state.playerParams.query,
      //             this.$store.state.playerParams.queryParams,
      //             this.$store.state.playerParams.meta,
      //             this.$store.state.playerParams.from
      //         )
      //       }
      //     }
      //     this.$store.dispatch('setListenCount',{command:'reset'})
      //   }
      //
      //   // }
      // });
      // this.playingElement.setAttribute('preload', 'metadata')
    }
function   removeOtherEventListeners(id) {
      for (let i = 0; i < this.$store.state.lastListenedTracksArray.length; i++) {
        let audio =  document.getElementById(this.$store.state.lastListenedTracksArray[i].track_id)
        if(audio && (audio.id !== id)) {
          audio.outerHTML = audio.outerHTML // eslint-disable-line
        }
      }
    }
function    removeAllEventListeners() {
      let audios = Array.from(document.getElementsByTagName('audio'))
      let audioList = audios.map((audio,index) => {return audios[index].id})
      for (let audio in audioList) {
        let toRemove = document.getElementById(audioList[audio])
        toRemove.outerHTML = toRemove.outerHTML // eslint-disable-line
      }
    }
function   resetPlayerTimer() {
      if(this.playingElement && !playerAdvertiseData) {
        this.isPlaying = false
        // this.playingElement.pause()
        this.playbackTime = 0
        this.playingElement.currentTime = 0
        this.playerCurrentTime = '00:00'
        this.playerDuration = '00:00'
      }
    }
function  timeUpdate() {
      if (this.playingElement) {
        if (!this.isChanging) {
          this.playbackTime = this.playingElement.currentTime
          let s = parseInt(this.playingElement.currentTime % 60);
          let m = parseInt((this.playingElement.currentTime / 60) % 60);
          this.playerCurrentTime = (this.$utils.prependZero(m) + ':' + this.$utils.prependZero(s))
        } else {
          let s = parseInt(this.playingElement.currentTime % 60);
          let m = parseInt((this.playingElement.currentTime / 60) % 60);
          this.playerCurrentTime = (this.this.$utils.prependZero(m) + ':' + this.this.$utils.prependZero(s))
        }
      }
    }

function  goTop() {
      document.getElementById('Player').scrollTo({
        top: 0
      })
    }
function   changeTime() {
      this.playingElement.seek(this.$refs.slider.value)
    }
function   setIsDragging() {
      this.isDragging = true
    }
function   clearDragging() {
      this.isDragging = false
    }

function   next() {
      if (!this.endOfPlaylist) {
        this.navigate('next')
      }
    }
function    prev() {
      if (!this.startOfPlaylist) {
        this.navigate('prev')
      }
    }
function   toggleShuffle() {
      return this.shuffleEnabled ? this.shuffleEnabled = false : this.shuffleEnabled = true
    }
function  toggleRepeat() {
      if (this.repeatOne) {
        this.repeatOne = false
        this.repeatAll = true
      } else if (this.repeatAll) {
        this.repeatOne = false
        this.repeatAll = false
      } else {
        this.repeatOne = true
        this.repeatAll = false
      }
    }
function   navigate(action) {
      this.isChanging = true
      // if(this.playingElement.)
      // if(this.playingElement && (this.playingElement.networkState === 1 || this.playingElement.networkState === 2)) {
      //   this.playingElement.setAttribute('preload', 'none')
      //   this.playingElement.src = this.playingElement.src // eslint-disable-line
      // }
      // this.removeOtherEventListeners(this.playingElement.id)
      // this.resetPlayerTimer()
      // this.nextAudio = null
      this.$store.commit('setPlayerLyrics',null)
      // let playerDataTitle = document.getElementById('playerDataTitle')
      // let info = document.getElementById('info')
      // playerDataTitle.style.opacity = 0
      // info.style.opacity = 0
      let playerIndex = playerIndex
      if (action === 'next') {

        if (playerIndex > playerTracks.tracks.length - 5 &&
            (this.$store.state.playerMeta && this.$store.state.playerMeta.end !== true)) {
          this.$store.dispatch('get_Data',
              {

                api_command: this.$refs.playerData.query,
                params: this.$refs.playerData.queryParams,
                store_command: {
                  "command": this.$refs.playerData.storeCommand,
                  "action": "loadmore"
                }
              })
        }
        if (this.shuffleEnabled) {
          playerIndex = Math.floor(Math.random() * playerTracks.tracks.length)
          this.playingData = playerTracks.tracks[playerIndex]
        } else {
          this.playingData = playerTracks.tracks[playerIndex + 1]
          playerIndex++
        }

      } else if (action === 'prev') {
        this.playingData = playerTracks.tracks[playerIndex - 1]
        playerIndex--
      }

      this.$store.commit('setPlayerData', {
        'item': this.playingData,
        'index': playerIndex,
        'query': this.$store.state.playerQuery,
        'queryParams': this.$store.state.playerQueryParams,
        'meta': this.$store.state.playerMeta,
        'from':this.$store.state.playerFrom})
      if(!this.$store.state.playerData.lyric.has_lyric)
      {
        if(this.$root.$refs.BigPlayer.lyricFS) {
          this.$root.$refs.lyricFS = false
          this.$root.$refs.BigPlayer.$refs.lyricUI.opened = false
        }
      }
      this.$store.commit('collectPlayerParams',{
        'tracks':playerTracks.tracks,
        'item':this.playingData,
        'index':playerIndex,
        'query':this.$store.state.playerQuery,
        'queryParams':this.$store.state.playerQueryParams,
        'meta':this.$store.state.playerMeta,
        'from':this.$store.state.playerFrom})
      if(navTimer) {
        // this.playingElement.pause()
        // this.resetPlayerTimer()
        clearTimeout(navTimer)
      }
      navTimer = setTimeout(() => {
        this.initPlayingObject(playerIndex,this.playingData)
        // if(!playerAdvertiseData) {
        //     Promise.all([this.playerDecision()]).then(() => {
        //         this.updatePositionState(this.playingData)
        //     })
        //
        // }
        // this.updatePositionState()
        // // if(this.$store.state.listenCount > this.advertise_data.advertise_limit_counts) {
        // //     this.setAdvertise(this.advData)
        // // }
        // // else {
        // //     this.playerDecision()
        // // }
      },600)

      this.isChanging = false
    }
function   selectTrack(tracks, item, index, query, queryParams, meta, from) {
      let defTracks = playerTracks
      this.$store.commit('collectPlayerParams',{tracks,item, index, query, queryParams, meta, from})
      if (playerTracks && playerTracks.tracks) {
        let playerTracks = playerTracks
        let playerIndex = playerIndex + 1
        if (query) {
          if (playerIndex >= playerTracks.tracks.length - 5 &&
              (this.$store.state.playerMeta && meta.end !== true)) {
            this.$store.dispatch('get_Data', {
              api_command: query,
              params: queryParams,
              store_command: {
                "command": this.$refs.playerData.storeCommand,
                "action": "loadmore"
              }
            }).then(() => {
              this.endOfPlaylist = index === tracks.length - 1
              this.startOfPlaylist = index === 0
            })
          }
        }
      }
      this.endOfPlaylist = index === tracks.length - 1
      this.startOfPlaylist = index === 0
      let playerCurrent_id = this.$store.state.playerQueryParams ? this.$store.state.playerQueryParams[from + '_id'] : null
      if (from !== 'player')
      {this.goTop()}

      // check if track selected from player track list
      if (from === 'player') {
        if (playerTracks.tracks) {
          this.$store.commit('setPlayerData', {
            item,
            index,
            query,
            queryParams,
            meta,
            from
          })
        } else {
          this.$store.commit('setPlayerData', {
            item,
            index,
            meta,
            from
          })
        }
      } else if (from === 'carousel' || from === ' suggestions') {
        // this.$store.commit('setPlayerTracks',
        //     {
        //       'result': {tracks: tracks, end: true, remaining: 0},
        //       'action': 'default'
        //     })
        this.$store.commit('setPlayerData', {
          item,
          index,
          meta,
          from
        })
        // this.$root.$refs.player.open()
      } else {
        if (playerCurrent_id) {
          if (queryParams[from + '_id'] === playerCurrent_id && queryParams.sort_by ===
              this.$store.state.playerQueryParams.sort_by && queryParams.offset ===
              this.$store.state.playerQueryParams.offset) {
            this.$store.commit('setPlayerData',
                {
                  item,
                  index,
                  query,
                  queryParams,
                  meta,
                  from
                })
          } else {
            // this.$store.commit('setPlayerTracks',
            //     {
            //       'result': meta,
            //       'action': 'default'
            //     })
            this.$store.commit('setPlayerData', {
              item,
              index,
              query,
              queryParams,
              meta,
              from
            })
          }
        } else {
          // this.$store.commit('setPlayerTracks',
          //     {
          //       'result': meta,
          //       'action': 'default'
          //     })
          this.$store.commit('setPlayerData', {
            item,
            index,
            query,
            queryParams,
            meta,
            from
          })
        }
        this.$store.commit('setTrackDownloadFlags')
        // this.$root.$refs.player.open()
      }
      this.$store.commit('setPlayerTracks',
          {
            'result': defTracks,
            'action': 'default'
          })
      this.playingData = this.$store.state.playerData
      if (this.$root.$refs.currentMusicList) {
        let hashedParams = sha1(JSON.stringify(this.$root.$refs.currentMusicList.queryParams))
        let hashedQueryParams = sha1(JSON.stringify(queryParams))
        if (hashedParams !== hashedQueryParams) {
          this.$root.$refs.currentMusicList.selectMode(0)
        }
      }
    }
function    playItem(tracks, item, index, query, queryParams, meta, from) {
      if(!this.stopPlaying) {
        this.$store.commit('setPlayerLyrics',null)
        //init selected Track
        this.selectTrack(tracks, item, index, query, queryParams, meta, from)

        if(!playerAdvertiseData)
        {
          this.initPlayingObject(index,item)
        }
      }
    }
function    initPlayingObject(PlayerIndex,playingData)    {
      this.rawDuration = 0
      this.playbackTime = 0
      this.bufferedAudio = 0
      this.endOfPlaylist = PlayerIndex === playerTracks.tracks.length - 1
      this.startOfPlaylist = PlayerIndex === 0
      if(this.playingElement) {
        this.playingElement.stop()
        this.playingElement.unload()
        URL.revokeObjectURL(this.playingElement.src)
        // this.removeAllAudios()
      }
      // this.playingElement = null

      // this.playingElement = document.createElement('audio')
      // this.playingElement.setAttribute('id', playingData.id)
      // this.playingElement.setAttribute('preload', 'none')
      // this.playingElement.setAttribute('crossorigin', 'anonymous')
      // document.body.appendChild(this.playingElement)

      // this.initListenCount()
      let theMp3
      if (playingData.is_demo)
        theMp3 = playingData.mp3s
      else {
        theMp3 = playingData.mp3s.filter(el => el.quality === '160')
      }
      console.log(theMp3)
      this.$store.commit('setFetchUrl', this.$store.state.cdnUrl + theMp3[0].name +
          '?type=pwa&melodify_token=' + userObject.user.id + '&download_token=' + userObject.token)


      if (document.getElementById('Player').scrollTop > 10 && (!this.$store.state.playerLyrics && !this.$store.state.isLoadingLyrics)) {
        if (this.$store.state.playerData.lyric.has_lyric) {
          this.toggleLyrics()
        }
      }
      this.updateMetadata(playingData)
    }
function   initListenCount() {
      let ads_limitations = this.advertise_data.limitations
      let fileWeight
      if(this.playingData.is_demo) {
        if(ads_limitations.demo_track_ads.enable) {
          fileWeight = ads_limitations.demo_track_ads.weight
        }
      }
      else {
        if(ads_limitations.track_ads.enable) {
          fileWeight = ads_limitations.track_ads.weight
        }
      }
      this.$store.dispatch('setListenCount',{size:fileWeight})
    }
function    setPlayingElement(src) {
      let __this = this
      this.playingElement = new Howl({
        src: [src],
        autoplay:true,
        preload:'metadata',
        html5:true,
        onplay: function () {
          __this.playerDisabled = false
          __this.playerDraggable = true
          __this.isPlaying = true
          // Display the duration.
          let d = this.duration()
          __this.rawDuration = d
          __this.playerDuration = __this.$utils.formatTime(d).toString()
          // Start updating the progress of the track.
          animationFrame =  requestAnimationFrame(__this.step.bind(this));
        },
        onend: function () {
          //   // Stop the wave animation.
          //   wave.container.style.display = 'none';
          //   bar.style.display = 'block';
          //   self.skip('next');
          __this.playerDuration = '00:00'
          if (!__playerAdvertiseData) {
            if (!__this.endOfPlaylist) {
              if (__this.repeatOne) {
                __this.playingElement.play()
              } else {
                __this.navigate('next')
              }
            } else {
              if (__this.repeatOne) {
                __this.togglePlay()
                __this.playbackTime = 0
                __this.playingElement.currentTime  = this.playbackTime
                __this.togglePlay()
              }
              if (__this.repeatAll) {
                __this.playItem(__playerTracks.tracks,__playerTracks.tracks[0],0, __this.$store.state.playerQuery, __this.$store.state.playerQueryParams,__this.$store.state.playerMeta,'player')
              } else {
                __this.$root.$refs.lyricUI.close()
                __this.playingElement.pause()
              }
            }
          }
          else {
            __this.goTop()
            __this.$root.$refs.lyricUI.close()
            navigator.mediaSession.setPositionState({
              duration: 0,
              playbackRate: __this.playingElement.playbackRate,
              position: 0
            });
            __this.playingElement.pause()
            let advCount = __playerAdvertiseData.advertises.length
            __this.$store.dispatch('setClosePlayer', false)
            if (__playerAdvertiseData.advertises[advCount - 1].close_player === true) {
              __this.$store.dispatch('setClosePlayer', true)
            }

            console.log('adertiseIndex : ', __this.$store.state.advertiseIndex)
            console.log('advCount : ', advCount)


            // if ((0 < this.$store.state.advertiseIndex + 1) // To Check
            //     &&
            //     (this.$store.state.advertiseIndex + 1 !== advCount)) {
            if(__this.$store.state.advertiseIndex === advCount - 1)
            {
              __this.$store.dispatch('calcAdvertiseIndex')
            }
            if (__this.$store.state.advertiseIndex <= advCount - 1) // To Check
            {
              __this.$store.dispatch('calcAdvertiseIndex')
              __this.playingElement.play()
            } else {
              this.$store.commit('setPlayerAdvertiseData', null)
              __this.$store.dispatch('calcAdvertiseIndex', 0)

              if (__this.$store.state.should_close_player === true || __this.$root.$refs.app.should_close_player) {
                __this.$store.commit('setPlayerTracks', null)
                __this.$store.commit('setPlayerData', null)
                __this.$store.commit('setPlayerLyrics', null)
                __this.$store.dispatch('setClosePlayer', false)
                __this.$store.commit('setPlayerAdvertiseData', null)
                __this.$root.$refs.app.should_close_player = false
                __this.$root.$refs.player.close()
                // __this.playingElement = null

              } else
              {
                __this.$store.commit('setPlayerAdvertiseData', null)
                __this.$store.commit('setPlayerAdvData', null)
                __this.isChanging = false
                // __this.$store.dispatch('setMediaSessionData')
                // __this.playingElement = null
                __this.$store.dispatch('setLastListenedTrack',null)
                __this.playItem(
                    __this.$store.state.playerParams.tracks,
                    __this.$store.state.playerParams.item,
                    __this.$store.state.playerParams.index,
                    __this.$store.state.playerParams.query,
                    __this.$store.state.playerParams.queryParams,
                    __this.$store.state.playerParams.meta,
                    __this.$store.state.playerParams.from
                )
              }
            }
            __this.$store.dispatch('setListenCount',{command:'reset'})
          }

          // }


        },
        onloaderror: async function (error) {
          console.log(error)
          if(this.$online) {
            __this.isDistrupted = false
            if(!src.includes('blob')) {
              console.log('player is deciding')
              await __this.playerDecision()
            }
            else {
              console.log('offline track')
            }
            // self.setAdvertise(this.$store.state.lastAdvData)
          }
          else {
            // if (this.isAudioPlaying) {
            //   this.playingElement.pause()
            //     this.playingElement.setAttribute('preload','none')
            //     this.playingElement.autoplay = false
            //
            //
            // }
            if(!__this.isDistrupted) {
              // __this.$root.$refs.vToaster.openToast('عدم اتصال به اینترنت!')
              __this.isDistrupted = true
            }
          }
        },
        onpause: function () {
          //   // Stop the wave animation.
          //   wave.container.style.display = 'none';
          //   bar.style.display = 'block';
          cancelAnimationFrame(animationFrame)
        },
        onstop: function () {
          //   // Stop the wave animation.
          //   wave.container.style.display = 'none';
          //   bar.style.display = 'block';
          cancelAnimationFrame(animationFrame)
        },
        onseek: function () {
          cancelAnimationFrame(animationFrame)
          // let seek = __this.playingElement.seek()
          // __this.playerCurrentTime = __this.$utils.convertTime(Number(seek.toPrecision(2)))
          // Start updating the progress of the track.
          animationFrame = requestAnimationFrame(__this.step.bind(__this));
        },
        onload: function () {
          // __this.handleLoad(__this.playingElement)
          animationFrame =  requestAnimationFrame(__this.step.bind(this));
        }
      })
    }
function    handleLoad(audio) {
      const node = audio._sounds[0]._node;
      // const node:HTMLAudioElement = (audio as any)._sounds[0]._node; // For Typescript

      node.onloadstart = ((evt) => {
        console.log(evt)
      })
      node.onloadeddata = ((evt) => {
        console.log(evt)
      })
      // node.addEventListener('progress', () => {
      //   const duration = audio.duration();
      //   // https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/buffering_seeking_time_ranges#Creating_our_own_Buffering_Feedback
      //   if (duration > 0) {
      //     for (let i = 0; i < node.buffered.length; i++) {
      //       if (node.buffered.start(node.buffered.length - 1 - i) < node.currentTime) {
      //         self.bufferedAudio = (node.buffered.end(node.buffered.length - 1 - i) / duration) * 100
      //         if (self.playingElement.playing()) {
      //           cancelAnimationFrame(animationFrame)
      //           animationFrame =  requestAnimationFrame(self.step.bind(self));
      //         }
      //         // do what you will with it. I.E - store.set({ bufferProgress });
      //         break;
      //       }
      //     }
      //   }
      // })
    }

function   step() {
      cancelAnimationFrame(animationFrame)
      seek = null
      seek = self.playingElement.seek() || 0
      // Determine our current seek position.
      self.playerCurrentTime = self.$utils.formatTime(Math.round(seek));
      self.playbackTime = seek
      // this.bufferedAudio = (((seek / self.playingElement.duration()) * 100) || 0) + '%';
      // console.log('muted :', self.playingElement.muted)
      // If the sound is still playing, continue stepping.
      if (self.playingElement.playing()) {
        animationFrame = requestAnimationFrame(this.step.bind(this));
      }
    }
async function updateMetadata() {
      // Decide what to do before loadingTrack
      this.retryCount = 0
      if (!playerAdvertiseData) {
        // if(this.$utils.isInDownloadedTracks(playingData.id)) {
        //   let idTrack = await db.dlTracks
        //       .where('id')
        //       .equals(playingData.id)
        //       .toArray()
        //   let idbSrc
        //   idbSrc = URL.createObjectURL(idTrack[0].file)
        //   this.setPlayingElement(idbSrc)
        // }
        // else {
        this.setPlayingElement(this.$store.state.fetchUrl)
        // }

        if(!this.playingElement._src[0].includes('blob')) {
          console.log('player is deciding')
          await this.playerDecision()
        }
        else {
          console.log('offline track')
        }


        // this.setMediaSessionHandlers()
        this.playingElement.play()
        // this.setEventListeners(this.playingElement)
        this.updatePositionState()
        this.playingElement.muted = false
        // if(!this.$store.state.user.is_premium) {console.error(this.$store.state.listenCount)}
      }

      if(!this.$store.state.playerData.lyric.has_lyric) {
        this.$root.$refs.BigPlayer.lyricFS = false
        if(this.$root.$refs.lyricUI) this.$root.$refs.lyricUI.opened = false
        this.$root.$refs.BigPlayer.pointerDisabled = false
      }
      console.log(this.playingElement)
    }
function    setMediaSessionHandlers() {
      const actionHandlers = [
        ['play', async() => {
          await self.playingElement.play()
        }],
        ['pause', async () => {
          await self.playingElement.pause()
        }],
        ['previoustrack', () => {
          if (!self.$store.state.playerAdvertiseData) {
            if (!self.startOfPlaylist) {
              self.navigate('prev')
            }
          }
        }],
        ['nexttrack', () => {
          if (!self.$store.state.playerAdvertiseData) {
            if (!self.endOfPlaylist) {
              self.navigate('next')
            }
          }
        }],
        ['stop', () => {
          self.cleanPlayer()
        }],
        ['seekto', (details) => {
          if (!self.$store.state.playerAdvertiseData) {
            self.playingElement.currentTime = details.seekTime;
            if ('setPositionState' in navigator.mediaSession) {
              navigator.mediaSession.setPositionState({
                duration: self.playingElement.duration,
                playbackRate: self.playingElement.playbackRate,
                position: self.playingElement.currentTime
              });
            }
          } else {
            navigator.mediaSession.setPositionState({
              duration: 0,
              playbackRate: self.playingElement.playbackRate,
              position: 0
            });
          }
        }],
      ];
      for (const [action, handler] of actionHandlers) {
        try {
          navigator.mediaSession.setActionHandler(action, handler);
        } catch (error) {
          console.log(`The media session action "${action}" is not supported yet.`);
        }
      }
    }
async  function  playerDecision() {
      clearTimeout(retryTimer)
      await fetch(this.$store.state.fetchUrl,{
        headers: {
          'range': `bytes=0-0`
        }})
          .then((response) => {
            if(response.status >= 480 && response.status <= 499)
            {
              switch (response.status) {
                case 481: {
                  if (!this.advData) {
                    Promise.all([this.getAdvertise()]).then(() => {
                      this.setAdvertise(this.advData,true)
                    })
                        .catch(() => {
                          console.log('there is a problem : last advertise filled')
                          this.setAdvertise(this.$store.state.lastAdvData)
                        })
                  } else {
                    console.log('advData : Let`s see Advertises - ', this.advData)
                    this.setAdvertise(this.advData)
                  }
                }
              }
            }
            // Command to player
          })
          .catch((error) => {
            console.log('other Network Error', error)
            this.playingElement.pause()
            // this.$root.$refs.vToaster.openToast('مشکل در ارتباط با سرور')
            retryTimer = setTimeout((self=this)=> {
              self.playingElement.load()
            },10000)
          })
      // .catch((error) => {
      // Retry to decide
      // alert(error)
      // this.retryCount++
      // while(this.retryCount < 3)
      // {
      //     this.playerDecision()
      // }
      // })
    }
function    updatePositionState() {
      if ('setPositionState' in navigator.mediaSession) {
        navigator.mediaSession.setPositionState({
          duration: isNaN(this.playingElement.duration) ? 0 : this.playingElement.duration,
          playbackRate: this.playingElement.playbackRate,
          position: this.playingElement.currentTime
        });
      }
    }

function   isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight + 50
              ||
              document.documentElement.clientHeight + 50) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)

      );
    }
function   removeAllAudios() {
      // let audios = Array.from(document.getElementsByTagName('audio'))
      // let audioList = audios.map((audio,index) => {return audios[index].id})
      // for (let audio in audioList) {
      //   let toRemove = document.getElementById(audioList[audio])
      //   toRemove.src = ''
      //   document.body.removeChild(toRemove)
      // }
      // this.playingElement = null
      this.$store.dispatch('setLastListenedTrack',null)
    }
function   checkForNext() {
      if (this.nextAudio) {
        if (!this.isChanging) {
          this.playerDuration = this.$utils.formatTime(this.$refs.thePlayer.duration).toString()
          this.rawDuration = this.$refs.thePlayer.duration
        } else {
          this.rawDuration = 0
          this.playerDuration = this.$utils.formatTime(this.$refs.thePlayer.duration).toString()
        }
        this.nextAudio = null
      }
    }
function   advButton() {
      this.$root.$refs.app.isFromLimitCover = true
      this.$root.$refs.player.close()
      this.$store.dispatch('handleAction', {target_type: playerAdvertiseData.advertises[this.$store.state.advertiseIndex].btn_action.target_type})
    }
function   isAudioPlaying() {
      return (this.playingElement.currentTime > 0 && !this.playingElement.paused && !this.playingElement.ended && this.playingElement.readyState > 2)
    }
function    toggleScrollBtn() {
      let middle = document.getElementById('Middle')
      let Player = document.getElementById("Player")
      let goToTopPlayer = document.getElementById("goToTopPlayer")

      let heightDif = middle.offsetHeight - (middle.offsetHeight - Player.scrollTop).toPrecision(2)


      if (heightDif > 600 && goToTopPlayer.classList.contains('hide')) {
        goToTopPlayer.classList.remove('hide')

      } else if (heightDif < 600 && !goToTopPlayer.classList.contains('hide')) {
        goToTopPlayer.classList.add('hide')

      }
    }
function   swipeFalse() {
      this.$root.$refs.player.swipeAble = false
    }
function    swipeTrue() {
      this.$root.$refs.player.swipeAble = true
    }
function   toggleLyrics() {
      this.$store.commit('setPlayerLyrics', null)
      Promise.all([this.getLyrics()])
          .then(() => {
            this.$store.dispatch('setLyricsLoading',false)
          })
    }
    async function getLyrics() {
      await this.$store.dispatch('setLyricsLoading',true)
      await this.$store.dispatch('get_Data', {

        api_version: 'v7/',
        api_command: 'getTrackLyrics',
        params: {
          track_id: this.$store.state.playerData.id,
          is_demo: this.$store.state.playerData.is_demo ? 1 : 0
        },
        store_command: {
          "command": 'setPlayerLyrics',
          "addedParams": this.$store.state.user.id + '-' + this.$store.state.playerData.id
        }
      })
    }
function   copyToClipboard() {
      navigator.clipboard.writeText(this.$store.state.playerLyrics.lyrics.text);
      this.$root.$refs.vToaster.openToast(
          'کپی شد'
      )
    }
function   shareLyrics() {
      window.navigator.share({
        title: 'اشتراک',
        text:
        this.$store.state.playerLyrics.lyrics.text,
      })
          .then(() =>
              console.log('Yay, you shared it :)'))
          .catch(error => console.log('Oh noh! You couldn\'t share it! :\'(\n', error));
    }
    async function getAdvertise() {
      await this.$store.dispatch('calcAdvertiseIndex', 0)
      await this.$store.dispatch(
          'get_Data',
          {
            api_command: 'getAdvertise',
            params: {
              type: this.advertise_data.advertise_type
            },
            store_command: {"command": 'setPlayerAdvData'}
          }
      ).then(async () => {
        console.log(this.$store.state.playerAdvData.advertises[this.$store.state.advertiseIndex])
        console.log(this.$store.state.advertiseIndex)
        const client = axios.create({
          baseURL: this.$store.state.cdnUrl,
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
            this.$store.state.cdnUrl +
            this.$store.state.playerAdvData.advertises[this.$store.state.advertiseIndex].ads_track +
            '?timestamp=' + Date.now(),
            {
              responseType: "arraybuffer"
            }
        )
            .then(res => {
              const blob = new Blob([res.data], {
                type: 'audio/mp3',
              });
              console.log(window.URL.createObjectURL(blob))
              this.advData = {
                getAdvertiseData: this.$store.state.playerAdvData,
                advAudio: window.URL.createObjectURL(blob)
              }
              this.$store.dispatch('setLastAdvData',this.advData)
            })
            .catch((error) => {
              // console.log(error.status.code)
              console.log(error)
            })
      })
    }
    async function handleAdvertise(errorCode) {
      if(errorCode === 4) {
        try {
          if (this.$online) {
            if (this.$store.state.fetchUrl) {
              await  fetch(this.$store.state.fetchUrl, {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
                  .then(async (response) => {
                    // await this.$store.dispatch('calcAdvertiseIndex', 0)
                    // let userObject = JSON.parse(localStorage.getItem('userObject'))
                    if ((480 < response.status) && (response.status < 499)) {
                      if(!this.advData)
                      {
                        await this.getAdvertise()
                      }
                      // await this.$store.dispatch(
                      //     'get_Data',
                      //     {
                      //         api_command: 'getAdvertise',
                      //         params: {
                      //             type: response.status
                      //         },
                      //         store_command: {"command": 'setPlayerAdvData'}
                      //     }
                      // ).then(async () => {
                      //     console.log(this.$store.state.advData.advertises[this.$store.state.advertiseIndex])
                      //     console.log(this.$store.state.advertiseIndex)
                      //     const client = axios.create({
                      //         baseURL: this.$store.state.cdnUrl,
                      //         headers: {
                      //             'Accept': 'application/json',
                      //             'Content-Type': 'application/json',
                      //             'Access-Control-Allow-Origin': '*',
                      //             "device_id": localStorage.getItem('device_id'),
                      //             "device_name": localStorage.getItem('device_name'),
                      //             'user-id': userObject.user.id,
                      //             'authorization': userObject.token,
                      //             'device_token': localStorage.getItem('device_token'),
                      //             'platform': this.$device.os_name.name
                      //         }
                      //     })
                      //     await client.get(
                      //         this.$store.state.cdnUrl + this.$store.state.advData.advertises[this.$store.state.advertiseIndex].ads_track + '?timestamp=' + Date.now(),
                      //         {
                      //             responseType: "arraybuffer"
                      //         }
                      //     )
                      //         .then(res => {
                      //             const blob = new Blob([res.data], {
                      //                 type: 'audio/mp3',
                      //             });
                      //             console.log(window.URL.createObjectURL(blob))
                      //             this.advData = {
                      //                 getAdvertiseData: this.$store.state.advData,
                      //                 advAudio: window.URL.createObjectURL(blob)
                      //             }
                      //         })
                      //         .catch((error) => {
                      //             // console.log(error.status.code)
                      //             console.log(error)
                      //         })
                      // })
                      // nextAudioElement.value.removeAllListeners()
                    }
                  })
                  .catch((error) => {
                    // console.log(error.status.code)
                    console.log(error)
                  })
            }
          } else {
            // this.getDuration()
            if (this.isAudioPlaying) {
              this.playingElement.pause()
            }
            this.$root.$refs.vToaster.openToast('عدم اتصال به اینترنت!')
            // window.alert('you are offline')
          }
        }
        catch
        {
          console.log('error')
        }
      }
    }
    async function setAdvertise(adv) {
      this.$store.commit('setPlayerAdvertiseData', adv.getAdvertiseData)
      navigator.mediaSession.metadata = new MediaMetadata({ // eslint-disable-line
        title: adv.getAdvertiseData.advertises[this.$store.state.advertiseIndex].title,
        artist: adv.getAdvertiseData.advertises[this.$store.state.advertiseIndex].bottom_player_text,
        album: adv.getAdvertiseData.advertises[this.$store.state.advertiseIndex].description,
        artwork: [
          {
            src: this.$store.state.imgUrl +
                adv.getAdvertiseData.advertises[this.$store.state.advertiseIndex].image,
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: this.$store.state.imgUrl + adv.getAdvertiseData.advertises[this.$store.state.advertiseIndex].image,
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: this.$store.state.imgUrl + adv.getAdvertiseData.advertises[this.$store.state.advertiseIndex].image,
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: this.$store.state.imgUrl + adv.getAdvertiseData.advertises[this.$store.state.advertiseIndex].image,
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: this.$store.state.imgUrl + adv.getAdvertiseData.advertises[this.$store.state.advertiseIndex].image,
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: this.$store.state.imgUrl + adv.getAdvertiseData.advertises[this.$store.state.advertiseIndex].image,
            sizes: '512x512',
            type: 'image/png'
          },
        ]
      });
      this.$root.$refs.BigPlayer.advTrack = adv.advAudio
      // this.playingElement = null
      this.advData = null
    }


function   closeSheet() {
      this.isMinimized = true
      this.$root.$refs.player.close()
    }
function  scrollUp() {
      document.getElementById('Player').scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
function   cleanPlayer() {
      if (playingElement && playingElement.value) {
        playingElement.value.pause()
      }
      // this.$store.commit('setPlayerTracks', null)
      // this.$store.commit('setPlayerData', null)
      // this.$root.$refs.player.close()
    }

</script>


<template>
  <div class="playerBox">
    <div class="upItems">
					<span class="d-flex">
						<span :style="(repeatOne === false)?'display: none !important;':'display: block !important;'"
                  class="repeatOneNum en">1</span>
						<img draggable="false" @click.stop="toggleRepeat"
                 src="@/assets/icons/repeatY.svg"
                 v-if="repeatOne"/>
						<img draggable="false" @click.stop="toggleRepeat"
                 src="@/assets/icons/repeatY.svg"
                 v-else-if="repeatAll"/>
						<img draggable="false" @click.stop="toggleRepeat"
                 src="@/assets/icons/repeatG.svg"
                 v-else/>
					</span>
      <span class="d-flex">
						<img draggable="false" @click.stop="toggleShuffle"
                 src="@/assets/icons/shuffleY.svg"
                 v-if="shuffleEnabled"/>
						<img draggable="false" @click.stop="toggleShuffle"
                 src="@/assets/icons/shuffleG.svg"
                 v-else/>
					</span>
    </div>
<!--    <vue-range-slider-->
<!--        ref="slider"-->
<!--        v-if="rawDuration === 0"-->
<!--        :height="3"-->
<!--        :tooltip="'none'"-->
<!--        class="fit-64 m-auto"-->
<!--        style="padding:10px;"-->
<!--        :dot-style="sliderCustomize.dotStyle"-->
<!--        :disabledStyle="sliderCustomize.disabledStyle"-->
<!--        :rail-style="sliderCustomize.bgStyle"-->
<!--        :dot-size="13"-->
<!--        :processStyle="sliderCustomize.processStyle"-->
<!--        :disabled="true">-->
<!--    </vue-range-slider>-->
<!--    <vue-range-slider-->
<!--        ref="slider"-->
<!--        v-if="rawDuration !== 0 && $root.$refs.player.opened && !$parent.lyricFS"-->
<!--        v-model="playbackTime"-->
<!--        :max="Number(rawDuration.toPrecision(5))"-->
<!--        :tooltip="'none'"-->
<!--        :interval="0.00001"-->
<!--        :speed="0"-->
<!--        :contained="true"-->
<!--        :drag-on-click="true"-->
<!--        :height="3"-->
<!--        class="fit-64 m-auto"-->
<!--        style="padding:10px;"-->
<!--        :dot-size="13"-->
<!--        :dot-style="sliderCustomize.dotStyle"-->
<!--        :processStyle="sliderCustomize.processStyle"-->
<!--        :rail-style="sliderCustomize.bgStyle"-->
<!--        :lazy="true"-->
<!--        @change="changeTime"-->
<!--        @drag-start="setIsDragging"-->
<!--        @drag-end="clearDragging"-->
<!--        stop-propagation>-->
<!--    </vue-range-slider>-->

    <input class="e-range fit-64 m-auto"
           type="range"
           ref="slider"
           min="0"
           step="0.01"
           :max="Number(rawDuration.toPrecision(2))"
           :value="playbackTime"
           @input="changeTime">

<!--    <buffered :amount="bufferedAudio"></buffered>-->
    <div class="lowItems">
					<span>
						{{ playerCurrentTime }}
					</span>
      <span>
						{{ playerDuration === "NaN:NaN" ? '00:00' : playerDuration }}
					</span>
    </div>

    <div class="controlBox">



      <svg class="prev"
           @pointerup="prev"
           v-show="!startOfPlaylist"
           width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.2919 2.74724C24.2919 1.90873 23.322 1.44256 22.6673 1.96637L9.85137 12.219C9.35097 12.6194 9.35097 13.3804 9.85137 13.7808L22.6673 24.0335C23.322 24.5573 24.2919 24.0911 24.2919 23.2526V2.74724Z" fill="#F2C94C" stroke="#F2C94C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.70801 2.20837V23.7917" stroke="#F2C94C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg class="prev"
           style="opacity:0.5"
           v-show="startOfPlaylist"
           width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.2919 2.74724C24.2919 1.90873 23.322 1.44256 22.6673 1.96637L9.85137 12.219C9.35097 12.6194 9.35097 13.3804 9.85137 13.7808L22.6673 24.0335C23.322 24.5573 24.2919 24.0911 24.2919 23.2526V2.74724Z" fill="#F2C94C" stroke="#F2C94C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.70801 2.20837V23.7917" stroke="#F2C94C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>



      <svg @pointerup="togglePlay()"
           class="play"
           v-show="!isPlaying"
           width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 35C70 54.33 54.33 70 35 70C15.67 70 0 54.33 0 35C0 15.67 15.67 0 35 0C54.33 0 70 15.67 70 35Z" fill="#F2C94C"/>
        <path d="M48 33.268C49.3333 34.0378 49.3333 35.9623 48 36.7321L30 47.1244C28.6667 47.8942 27 46.9319 27 45.3923V24.6077C27 23.0681 28.6667 22.1058 30 22.8756L48 33.268Z" fill="#212121"/>
      </svg>
      <svg @pointerup="togglePlay()"
           class="pause"
           v-show="isPlaying"
           width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 35C70 54.33 54.33 70 35 70C15.67 70 0 54.33 0 35C0 15.67 15.67 0 35 0C54.33 0 70 15.67 70 35Z" fill="#F2C94C"/>
        <rect x="24" y="21" width="8.38095" height="27.2381" rx="4.19048" fill="#212121"/>
        <rect x="37.619" y="21" width="8.38095" height="27.2381" rx="4.19048" fill="#212121"/>
      </svg>



      <svg @pointerup="next"
           class="next"
           v-show="!endOfPlaylist"
           width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 3.08062C1 2.24212 1.96993 1.77595 2.6247 2.29976L15.4406 12.5525C15.941 12.9528 15.941 13.7139 15.4406 14.1142L2.62469 24.3669C1.96993 24.8907 1 24.4245 1 23.586V3.08062Z" fill="#F2C94C" stroke="#F2C94C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22.583 2.70837V24.2917" stroke="#F2C94C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg
          class="next"
          style="opacity:0.5"
          v-show="endOfPlaylist"
          width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 3.08062C1 2.24212 1.96993 1.77595 2.6247 2.29976L15.4406 12.5525C15.941 12.9528 15.941 13.7139 15.4406 14.1142L2.62469 24.3669C1.96993 24.8907 1 24.4245 1 23.586V3.08062Z" fill="#F2C94C" stroke="#F2C94C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22.583 2.70837V24.2917" stroke="#F2C94C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>
  </div>
</template>


<style id="rangeInPlayer" scoped>
.e-range {
  position: relative;
  display: block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 3px;
  overflow: hidden;
  cursor: pointer;
  padding: 10px 0;
  background: transparent;
  z-index: 1;
}
.e-range:focus {
  outline: none;
}

.e-range::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  background: linear-gradient(to bottom, #f2c94c, #f2c94c) 100% 50%/100% 3px no-repeat transparent;
  border-radius: 100px;
}

.e-range::-webkit-slider-thumb {
  position: relative;
  -webkit-appearance: none;
  appearance: none;
  height: 13px;
  width: 13px;
  background: #f2c94c;
  border-radius: 100%;
  border: 0;
  top: 50%;
  margin-top: -6.5px;
  box-shadow: 1px 0 0 -5px var(--Track), 2px 0 0 -5px var(--Track), 3px 0 0 -5px var(--Track), 4px 0 0 -5px var(--Track), 5px 0 0 -5px var(--Track), 6px 0 0 -5px var(--Track), 7px 0 0 -5px var(--Track), 8px 0 0 -5px var(--Track), 9px 0 0 -5px var(--Track), 10px 0 0 -5px var(--Track), 11px 0 0 -5px var(--Track), 12px 0 0 -5px var(--Track), 13px 0 0 -5px var(--Track), 14px 0 0 -5px var(--Track), 15px 0 0 -5px var(--Track), 16px 0 0 -5px var(--Track), 17px 0 0 -5px var(--Track), 18px 0 0 -5px var(--Track), 19px 0 0 -5px var(--Track), 20px 0 0 -5px var(--Track), 21px 0 0 -5px var(--Track), 22px 0 0 -5px var(--Track), 23px 0 0 -5px var(--Track), 24px 0 0 -5px var(--Track), 25px 0 0 -5px var(--Track), 26px 0 0 -5px var(--Track), 27px 0 0 -5px var(--Track), 28px 0 0 -5px var(--Track), 29px 0 0 -5px var(--Track), 30px 0 0 -5px var(--Track), 31px 0 0 -5px var(--Track), 32px 0 0 -5px var(--Track), 33px 0 0 -5px var(--Track), 34px 0 0 -5px var(--Track), 35px 0 0 -5px var(--Track), 36px 0 0 -5px var(--Track), 37px 0 0 -5px var(--Track), 38px 0 0 -5px var(--Track), 39px 0 0 -5px var(--Track), 40px 0 0 -5px var(--Track), 41px 0 0 -5px var(--Track), 42px 0 0 -5px var(--Track), 43px 0 0 -5px var(--Track), 44px 0 0 -5px var(--Track), 45px 0 0 -5px var(--Track), 46px 0 0 -5px var(--Track), 47px 0 0 -5px var(--Track), 48px 0 0 -5px var(--Track), 49px 0 0 -5px var(--Track), 50px 0 0 -5px var(--Track), 51px 0 0 -5px var(--Track), 52px 0 0 -5px var(--Track), 53px 0 0 -5px var(--Track), 54px 0 0 -5px var(--Track), 55px 0 0 -5px var(--Track), 56px 0 0 -5px var(--Track), 57px 0 0 -5px var(--Track), 58px 0 0 -5px var(--Track), 59px 0 0 -5px var(--Track), 60px 0 0 -5px var(--Track), 61px 0 0 -5px var(--Track), 62px 0 0 -5px var(--Track), 63px 0 0 -5px var(--Track), 64px 0 0 -5px var(--Track), 65px 0 0 -5px var(--Track), 66px 0 0 -5px var(--Track), 67px 0 0 -5px var(--Track), 68px 0 0 -5px var(--Track), 69px 0 0 -5px var(--Track), 70px 0 0 -5px var(--Track), 71px 0 0 -5px var(--Track), 72px 0 0 -5px var(--Track), 73px 0 0 -5px var(--Track), 74px 0 0 -5px var(--Track), 75px 0 0 -5px var(--Track), 76px 0 0 -5px var(--Track), 77px 0 0 -5px var(--Track), 78px 0 0 -5px var(--Track), 79px 0 0 -5px var(--Track), 80px 0 0 -5px var(--Track), 81px 0 0 -5px var(--Track), 82px 0 0 -5px var(--Track), 83px 0 0 -5px var(--Track), 84px 0 0 -5px var(--Track), 85px 0 0 -5px var(--Track), 86px 0 0 -5px var(--Track), 87px 0 0 -5px var(--Track), 88px 0 0 -5px var(--Track), 89px 0 0 -5px var(--Track), 90px 0 0 -5px var(--Track), 91px 0 0 -5px var(--Track), 92px 0 0 -5px var(--Track), 93px 0 0 -5px var(--Track), 94px 0 0 -5px var(--Track), 95px 0 0 -5px var(--Track), 96px 0 0 -5px var(--Track), 97px 0 0 -5px var(--Track), 98px 0 0 -5px var(--Track), 99px 0 0 -5px var(--Track), 100px 0 0 -5px var(--Track), 101px 0 0 -5px var(--Track), 102px 0 0 -5px var(--Track), 103px 0 0 -5px var(--Track), 104px 0 0 -5px var(--Track), 105px 0 0 -5px var(--Track), 106px 0 0 -5px var(--Track), 107px 0 0 -5px var(--Track), 108px 0 0 -5px var(--Track), 109px 0 0 -5px var(--Track), 110px 0 0 -5px var(--Track), 111px 0 0 -5px var(--Track), 112px 0 0 -5px var(--Track), 113px 0 0 -5px var(--Track), 114px 0 0 -5px var(--Track), 115px 0 0 -5px var(--Track), 116px 0 0 -5px var(--Track), 117px 0 0 -5px var(--Track), 118px 0 0 -5px var(--Track), 119px 0 0 -5px var(--Track), 120px 0 0 -5px var(--Track), 121px 0 0 -5px var(--Track), 122px 0 0 -5px var(--Track), 123px 0 0 -5px var(--Track), 124px 0 0 -5px var(--Track), 125px 0 0 -5px var(--Track), 126px 0 0 -5px var(--Track), 127px 0 0 -5px var(--Track), 128px 0 0 -5px var(--Track), 129px 0 0 -5px var(--Track), 130px 0 0 -5px var(--Track), 131px 0 0 -5px var(--Track), 132px 0 0 -5px var(--Track), 133px 0 0 -5px var(--Track), 134px 0 0 -5px var(--Track), 135px 0 0 -5px var(--Track), 136px 0 0 -5px var(--Track), 137px 0 0 -5px var(--Track), 138px 0 0 -5px var(--Track), 139px 0 0 -5px var(--Track), 140px 0 0 -5px var(--Track), 141px 0 0 -5px var(--Track), 142px 0 0 -5px var(--Track), 143px 0 0 -5px var(--Track), 144px 0 0 -5px var(--Track), 145px 0 0 -5px var(--Track), 146px 0 0 -5px var(--Track), 147px 0 0 -5px var(--Track), 148px 0 0 -5px var(--Track), 149px 0 0 -5px var(--Track), 150px 0 0 -5px var(--Track), 151px 0 0 -5px var(--Track), 152px 0 0 -5px var(--Track), 153px 0 0 -5px var(--Track), 154px 0 0 -5px var(--Track), 155px 0 0 -5px var(--Track), 156px 0 0 -5px var(--Track), 157px 0 0 -5px var(--Track), 158px 0 0 -5px var(--Track), 159px 0 0 -5px var(--Track), 160px 0 0 -5px var(--Track), 161px 0 0 -5px var(--Track), 162px 0 0 -5px var(--Track), 163px 0 0 -5px var(--Track), 164px 0 0 -5px var(--Track), 165px 0 0 -5px var(--Track), 166px 0 0 -5px var(--Track), 167px 0 0 -5px var(--Track), 168px 0 0 -5px var(--Track), 169px 0 0 -5px var(--Track), 170px 0 0 -5px var(--Track), 171px 0 0 -5px var(--Track), 172px 0 0 -5px var(--Track), 173px 0 0 -5px var(--Track), 174px 0 0 -5px var(--Track), 175px 0 0 -5px var(--Track), 176px 0 0 -5px var(--Track), 177px 0 0 -5px var(--Track), 178px 0 0 -5px var(--Track), 179px 0 0 -5px var(--Track), 180px 0 0 -5px var(--Track), 181px 0 0 -5px var(--Track), 182px 0 0 -5px var(--Track), 183px 0 0 -5px var(--Track), 184px 0 0 -5px var(--Track), 185px 0 0 -5px var(--Track), 186px 0 0 -5px var(--Track), 187px 0 0 -5px var(--Track), 188px 0 0 -5px var(--Track), 189px 0 0 -5px var(--Track), 190px 0 0 -5px var(--Track), 191px 0 0 -5px var(--Track), 192px 0 0 -5px var(--Track), 193px 0 0 -5px var(--Track), 194px 0 0 -5px var(--Track), 195px 0 0 -5px var(--Track), 196px 0 0 -5px var(--Track), 197px 0 0 -5px var(--Track), 198px 0 0 -5px var(--Track), 199px 0 0 -5px var(--Track), 200px 0 0 -5px var(--Track), 201px 0 0 -5px var(--Track), 202px 0 0 -5px var(--Track), 203px 0 0 -5px var(--Track), 204px 0 0 -5px var(--Track), 205px 0 0 -5px var(--Track), 206px 0 0 -5px var(--Track), 207px 0 0 -5px var(--Track), 208px 0 0 -5px var(--Track), 209px 0 0 -5px var(--Track), 210px 0 0 -5px var(--Track), 211px 0 0 -5px var(--Track), 212px 0 0 -5px var(--Track), 213px 0 0 -5px var(--Track), 214px 0 0 -5px var(--Track), 215px 0 0 -5px var(--Track), 216px 0 0 -5px var(--Track), 217px 0 0 -5px var(--Track), 218px 0 0 -5px var(--Track), 219px 0 0 -5px var(--Track), 220px 0 0 -5px var(--Track), 221px 0 0 -5px var(--Track), 222px 0 0 -5px var(--Track), 223px 0 0 -5px var(--Track), 224px 0 0 -5px var(--Track), 225px 0 0 -5px var(--Track), 226px 0 0 -5px var(--Track), 227px 0 0 -5px var(--Track), 228px 0 0 -5px var(--Track), 229px 0 0 -5px var(--Track), 230px 0 0 -5px var(--Track), 231px 0 0 -5px var(--Track), 232px 0 0 -5px var(--Track), 233px 0 0 -5px var(--Track), 234px 0 0 -5px var(--Track), 235px 0 0 -5px var(--Track), 236px 0 0 -5px var(--Track), 237px 0 0 -5px var(--Track), 238px 0 0 -5px var(--Track), 239px 0 0 -5px var(--Track), 240px 0 0 -5px var(--Track), 241px 0 0 -5px var(--Track), 242px 0 0 -5px var(--Track), 243px 0 0 -5px var(--Track), 244px 0 0 -5px var(--Track), 245px 0 0 -5px var(--Track), 246px 0 0 -5px var(--Track), 247px 0 0 -5px var(--Track), 248px 0 0 -5px var(--Track), 249px 0 0 -5px var(--Track), 250px 0 0 -5px var(--Track), 251px 0 0 -5px var(--Track), 252px 0 0 -5px var(--Track), 253px 0 0 -5px var(--Track), 254px 0 0 -5px var(--Track), 255px 0 0 -5px var(--Track), 256px 0 0 -5px var(--Track), 257px 0 0 -5px var(--Track), 258px 0 0 -5px var(--Track), 259px 0 0 -5px var(--Track), 260px 0 0 -5px var(--Track), 261px 0 0 -5px var(--Track), 262px 0 0 -5px var(--Track), 263px 0 0 -5px var(--Track), 264px 0 0 -5px var(--Track), 265px 0 0 -5px var(--Track), 266px 0 0 -5px var(--Track), 267px 0 0 -5px var(--Track), 268px 0 0 -5px var(--Track), 269px 0 0 -5px var(--Track), 270px 0 0 -5px var(--Track), 271px 0 0 -5px var(--Track), 272px 0 0 -5px var(--Track), 273px 0 0 -5px var(--Track), 274px 0 0 -5px var(--Track), 275px 0 0 -5px var(--Track), 276px 0 0 -5px var(--Track), 277px 0 0 -5px var(--Track), 278px 0 0 -5px var(--Track), 279px 0 0 -5px var(--Track), 280px 0 0 -5px var(--Track), 281px 0 0 -5px var(--Track), 282px 0 0 -5px var(--Track), 283px 0 0 -5px var(--Track), 284px 0 0 -5px var(--Track), 285px 0 0 -5px var(--Track), 286px 0 0 -5px var(--Track), 287px 0 0 -5px var(--Track), 288px 0 0 -5px var(--Track), 289px 0 0 -5px var(--Track), 290px 0 0 -5px var(--Track), 291px 0 0 -5px var(--Track), 292px 0 0 -5px var(--Track), 293px 0 0 -5px var(--Track), 294px 0 0 -5px var(--Track), 295px 0 0 -5px var(--Track), 296px 0 0 -5px var(--Track), 297px 0 0 -5px var(--Track), 298px 0 0 -5px var(--Track), 299px 0 0 -5px var(--Track), 300px 0 0 -5px var(--Track), 301px 0 0 -5px var(--Track), 302px 0 0 -5px var(--Track), 303px 0 0 -5px var(--Track), 304px 0 0 -5px var(--Track), 305px 0 0 -5px var(--Track), 306px 0 0 -5px var(--Track), 307px 0 0 -5px var(--Track), 308px 0 0 -5px var(--Track), 309px 0 0 -5px var(--Track), 310px 0 0 -5px var(--Track), 311px 0 0 -5px var(--Track), 312px 0 0 -5px var(--Track), 313px 0 0 -5px var(--Track), 314px 0 0 -5px var(--Track), 315px 0 0 -5px var(--Track), 316px 0 0 -5px var(--Track), 317px 0 0 -5px var(--Track), 318px 0 0 -5px var(--Track), 319px 0 0 -5px var(--Track), 320px 0 0 -5px var(--Track), 321px 0 0 -5px var(--Track), 322px 0 0 -5px var(--Track), 323px 0 0 -5px var(--Track), 324px 0 0 -5px var(--Track), 325px 0 0 -5px var(--Track), 326px 0 0 -5px var(--Track), 327px 0 0 -5px var(--Track), 328px 0 0 -5px var(--Track), 329px 0 0 -5px var(--Track), 330px 0 0 -5px var(--Track), 331px 0 0 -5px var(--Track), 332px 0 0 -5px var(--Track), 333px 0 0 -5px var(--Track), 334px 0 0 -5px var(--Track), 335px 0 0 -5px var(--Track), 336px 0 0 -5px var(--Track), 337px 0 0 -5px var(--Track), 338px 0 0 -5px var(--Track), 339px 0 0 -5px var(--Track), 340px 0 0 -5px var(--Track), 341px 0 0 -5px var(--Track), 342px 0 0 -5px var(--Track), 343px 0 0 -5px var(--Track), 344px 0 0 -5px var(--Track), 345px 0 0 -5px var(--Track), 346px 0 0 -5px var(--Track), 347px 0 0 -5px var(--Track), 348px 0 0 -5px var(--Track), 349px 0 0 -5px var(--Track), 350px 0 0 -5px var(--Track), 351px 0 0 -5px var(--Track), 352px 0 0 -5px var(--Track), 353px 0 0 -5px var(--Track), 354px 0 0 -5px var(--Track), 355px 0 0 -5px var(--Track), 356px 0 0 -5px var(--Track), 357px 0 0 -5px var(--Track), 358px 0 0 -5px var(--Track), 359px 0 0 -5px var(--Track), 360px 0 0 -5px var(--Track), 361px 0 0 -5px var(--Track), 362px 0 0 -5px var(--Track), 363px 0 0 -5px var(--Track), 364px 0 0 -5px var(--Track), 365px 0 0 -5px var(--Track), 366px 0 0 -5px var(--Track), 367px 0 0 -5px var(--Track), 368px 0 0 -5px var(--Track), 369px 0 0 -5px var(--Track), 370px 0 0 -5px var(--Track), 371px 0 0 -5px var(--Track), 372px 0 0 -5px var(--Track), 373px 0 0 -5px var(--Track), 374px 0 0 -5px var(--Track), 375px 0 0 -5px var(--Track), 376px 0 0 -5px var(--Track), 377px 0 0 -5px var(--Track), 378px 0 0 -5px var(--Track), 379px 0 0 -5px var(--Track), 380px 0 0 -5px var(--Track), 381px 0 0 -5px var(--Track), 382px 0 0 -5px var(--Track), 383px 0 0 -5px var(--Track), 384px 0 0 -5px var(--Track), 385px 0 0 -5px var(--Track), 386px 0 0 -5px var(--Track), 387px 0 0 -5px var(--Track), 388px 0 0 -5px var(--Track), 389px 0 0 -5px var(--Track), 390px 0 0 -5px var(--Track), 391px 0 0 -5px var(--Track), 392px 0 0 -5px var(--Track), 393px 0 0 -5px var(--Track), 394px 0 0 -5px var(--Track), 395px 0 0 -5px var(--Track), 396px 0 0 -5px var(--Track), 397px 0 0 -5px var(--Track), 398px 0 0 -5px var(--Track), 399px 0 0 -5px var(--Track), 400px 0 0 -5px var(--Track), 401px 0 0 -5px var(--Track), 402px 0 0 -5px var(--Track), 403px 0 0 -5px var(--Track), 404px 0 0 -5px var(--Track), 405px 0 0 -5px var(--Track), 406px 0 0 -5px var(--Track), 407px 0 0 -5px var(--Track), 408px 0 0 -5px var(--Track), 409px 0 0 -5px var(--Track), 410px 0 0 -5px var(--Track), 411px 0 0 -5px var(--Track), 412px 0 0 -5px var(--Track), 413px 0 0 -5px var(--Track), 414px 0 0 -5px var(--Track), 415px 0 0 -5px var(--Track), 416px 0 0 -5px var(--Track), 417px 0 0 -5px var(--Track), 418px 0 0 -5px var(--Track), 419px 0 0 -5px var(--Track), 420px 0 0 -5px var(--Track), 421px 0 0 -5px var(--Track), 422px 0 0 -5px var(--Track), 423px 0 0 -5px var(--Track), 424px 0 0 -5px var(--Track), 425px 0 0 -5px var(--Track), 426px 0 0 -5px var(--Track), 427px 0 0 -5px var(--Track), 428px 0 0 -5px var(--Track), 429px 0 0 -5px var(--Track), 430px 0 0 -5px var(--Track), 431px 0 0 -5px var(--Track), 432px 0 0 -5px var(--Track), 433px 0 0 -5px var(--Track), 434px 0 0 -5px var(--Track), 435px 0 0 -5px var(--Track), 436px 0 0 -5px var(--Track), 437px 0 0 -5px var(--Track), 438px 0 0 -5px var(--Track), 439px 0 0 -5px var(--Track), 440px 0 0 -5px var(--Track), 441px 0 0 -5px var(--Track), 442px 0 0 -5px var(--Track), 443px 0 0 -5px var(--Track), 444px 0 0 -5px var(--Track), 445px 0 0 -5px var(--Track), 446px 0 0 -5px var(--Track), 447px 0 0 -5px var(--Track), 448px 0 0 -5px var(--Track), 449px 0 0 -5px var(--Track), 450px 0 0 -5px var(--Track), 451px 0 0 -5px var(--Track), 452px 0 0 -5px var(--Track), 453px 0 0 -5px var(--Track), 454px 0 0 -5px var(--Track), 455px 0 0 -5px var(--Track), 456px 0 0 -5px var(--Track), 457px 0 0 -5px var(--Track), 458px 0 0 -5px var(--Track), 459px 0 0 -5px var(--Track), 460px 0 0 -5px var(--Track), 461px 0 0 -5px var(--Track), 462px 0 0 -5px var(--Track), 463px 0 0 -5px var(--Track), 464px 0 0 -5px var(--Track), 465px 0 0 -5px var(--Track), 466px 0 0 -5px var(--Track), 467px 0 0 -5px var(--Track), 468px 0 0 -5px var(--Track), 469px 0 0 -5px var(--Track), 470px 0 0 -5px var(--Track), 471px 0 0 -5px var(--Track), 472px 0 0 -5px var(--Track), 473px 0 0 -5px var(--Track), 474px 0 0 -5px var(--Track), 475px 0 0 -5px var(--Track), 476px 0 0 -5px var(--Track), 477px 0 0 -5px var(--Track), 478px 0 0 -5px var(--Track), 479px 0 0 -5px var(--Track), 480px 0 0 -5px var(--Track), 481px 0 0 -5px var(--Track), 482px 0 0 -5px var(--Track), 483px 0 0 -5px var(--Track), 484px 0 0 -5px var(--Track), 485px 0 0 -5px var(--Track), 486px 0 0 -5px var(--Track), 487px 0 0 -5px var(--Track), 488px 0 0 -5px var(--Track), 489px 0 0 -5px var(--Track), 490px 0 0 -5px var(--Track), 491px 0 0 -5px var(--Track), 492px 0 0 -5px var(--Track), 493px 0 0 -5px var(--Track), 494px 0 0 -5px var(--Track), 495px 0 0 -5px var(--Track), 496px 0 0 -5px var(--Track), 497px 0 0 -5px var(--Track), 498px 0 0 -5px var(--Track), 499px 0 0 -5px var(--Track), 500px 0 0 -5px var(--Track), 501px 0 0 -5px var(--Track), 502px 0 0 -5px var(--Track), 503px 0 0 -5px var(--Track), 504px 0 0 -5px var(--Track), 505px 0 0 -5px var(--Track), 506px 0 0 -5px var(--Track), 507px 0 0 -5px var(--Track), 508px 0 0 -5px var(--Track), 509px 0 0 -5px var(--Track), 510px 0 0 -5px var(--Track), 511px 0 0 -5px var(--Track), 512px 0 0 -5px var(--Track), 513px 0 0 -5px var(--Track), 514px 0 0 -5px var(--Track), 515px 0 0 -5px var(--Track), 516px 0 0 -5px var(--Track), 517px 0 0 -5px var(--Track), 518px 0 0 -5px var(--Track), 519px 0 0 -5px var(--Track), 520px 0 0 -5px var(--Track), 521px 0 0 -5px var(--Track), 522px 0 0 -5px var(--Track), 523px 0 0 -5px var(--Track), 524px 0 0 -5px var(--Track), 525px 0 0 -5px var(--Track), 526px 0 0 -5px var(--Track), 527px 0 0 -5px var(--Track), 528px 0 0 -5px var(--Track), 529px 0 0 -5px var(--Track), 530px 0 0 -5px var(--Track), 531px 0 0 -5px var(--Track), 532px 0 0 -5px var(--Track), 533px 0 0 -5px var(--Track), 534px 0 0 -5px var(--Track), 535px 0 0 -5px var(--Track), 536px 0 0 -5px var(--Track), 537px 0 0 -5px var(--Track), 538px 0 0 -5px var(--Track), 539px 0 0 -5px var(--Track), 540px 0 0 -5px var(--Track), 541px 0 0 -5px var(--Track), 542px 0 0 -5px var(--Track), 543px 0 0 -5px var(--Track), 544px 0 0 -5px var(--Track), 545px 0 0 -5px var(--Track), 546px 0 0 -5px var(--Track), 547px 0 0 -5px var(--Track), 548px 0 0 -5px var(--Track), 549px 0 0 -5px var(--Track), 550px 0 0 -5px var(--Track), 551px 0 0 -5px var(--Track), 552px 0 0 -5px var(--Track), 553px 0 0 -5px var(--Track), 554px 0 0 -5px var(--Track), 555px 0 0 -5px var(--Track), 556px 0 0 -5px var(--Track), 557px 0 0 -5px var(--Track), 558px 0 0 -5px var(--Track), 559px 0 0 -5px var(--Track), 560px 0 0 -5px var(--Track), 561px 0 0 -5px var(--Track), 562px 0 0 -5px var(--Track), 563px 0 0 -5px var(--Track), 564px 0 0 -5px var(--Track), 565px 0 0 -5px var(--Track), 566px 0 0 -5px var(--Track), 567px 0 0 -5px var(--Track), 568px 0 0 -5px var(--Track), 569px 0 0 -5px var(--Track), 570px 0 0 -5px var(--Track), 571px 0 0 -5px var(--Track), 572px 0 0 -5px var(--Track), 573px 0 0 -5px var(--Track), 574px 0 0 -5px var(--Track), 575px 0 0 -5px var(--Track), 576px 0 0 -5px var(--Track), 577px 0 0 -5px var(--Track), 578px 0 0 -5px var(--Track), 579px 0 0 -5px var(--Track), 580px 0 0 -5px var(--Track), 581px 0 0 -5px var(--Track), 582px 0 0 -5px var(--Track), 583px 0 0 -5px var(--Track), 584px 0 0 -5px var(--Track), 585px 0 0 -5px var(--Track), 586px 0 0 -5px var(--Track), 587px 0 0 -5px var(--Track), 588px 0 0 -5px var(--Track), 589px 0 0 -5px var(--Track), 590px 0 0 -5px var(--Track), 591px 0 0 -5px var(--Track), 592px 0 0 -5px var(--Track), 593px 0 0 -5px var(--Track), 594px 0 0 -5px var(--Track), 595px 0 0 -5px var(--Track), 596px 0 0 -5px var(--Track), 597px 0 0 -5px var(--Track), 598px 0 0 -5px var(--Track), 599px 0 0 -5px var(--Track), 600px 0 0 -5px var(--Track), 601px 0 0 -5px var(--Track), 602px 0 0 -5px var(--Track), 603px 0 0 -5px var(--Track), 604px 0 0 -5px var(--Track), 605px 0 0 -5px var(--Track), 606px 0 0 -5px var(--Track), 607px 0 0 -5px var(--Track), 608px 0 0 -5px var(--Track), 609px 0 0 -5px var(--Track), 610px 0 0 -5px var(--Track), 611px 0 0 -5px var(--Track), 612px 0 0 -5px var(--Track), 613px 0 0 -5px var(--Track), 614px 0 0 -5px var(--Track), 615px 0 0 -5px var(--Track), 616px 0 0 -5px var(--Track), 617px 0 0 -5px var(--Track), 618px 0 0 -5px var(--Track), 619px 0 0 -5px var(--Track), 620px 0 0 -5px var(--Track), 621px 0 0 -5px var(--Track), 622px 0 0 -5px var(--Track), 623px 0 0 -5px var(--Track), 624px 0 0 -5px var(--Track), 625px 0 0 -5px var(--Track), 626px 0 0 -5px var(--Track), 627px 0 0 -5px var(--Track), 628px 0 0 -5px var(--Track), 629px 0 0 -5px var(--Track), 630px 0 0 -5px var(--Track), 631px 0 0 -5px var(--Track), 632px 0 0 -5px var(--Track), 633px 0 0 -5px var(--Track), 634px 0 0 -5px var(--Track), 635px 0 0 -5px var(--Track), 636px 0 0 -5px var(--Track), 637px 0 0 -5px var(--Track), 638px 0 0 -5px var(--Track), 639px 0 0 -5px var(--Track), 640px 0 0 -5px var(--Track), 641px 0 0 -5px var(--Track), 642px 0 0 -5px var(--Track), 643px 0 0 -5px var(--Track), 644px 0 0 -5px var(--Track), 645px 0 0 -5px var(--Track), 646px 0 0 -5px var(--Track), 647px 0 0 -5px var(--Track), 648px 0 0 -5px var(--Track), 649px 0 0 -5px var(--Track), 650px 0 0 -5px var(--Track), 651px 0 0 -5px var(--Track), 652px 0 0 -5px var(--Track), 653px 0 0 -5px var(--Track), 654px 0 0 -5px var(--Track), 655px 0 0 -5px var(--Track), 656px 0 0 -5px var(--Track), 657px 0 0 -5px var(--Track), 658px 0 0 -5px var(--Track), 659px 0 0 -5px var(--Track), 660px 0 0 -5px var(--Track), 661px 0 0 -5px var(--Track), 662px 0 0 -5px var(--Track), 663px 0 0 -5px var(--Track), 664px 0 0 -5px var(--Track), 665px 0 0 -5px var(--Track), 666px 0 0 -5px var(--Track), 667px 0 0 -5px var(--Track), 668px 0 0 -5px var(--Track), 669px 0 0 -5px var(--Track), 670px 0 0 -5px var(--Track), 671px 0 0 -5px var(--Track), 672px 0 0 -5px var(--Track), 673px 0 0 -5px var(--Track), 674px 0 0 -5px var(--Track), 675px 0 0 -5px var(--Track), 676px 0 0 -5px var(--Track), 677px 0 0 -5px var(--Track), 678px 0 0 -5px var(--Track), 679px 0 0 -5px var(--Track), 680px 0 0 -5px var(--Track), 681px 0 0 -5px var(--Track), 682px 0 0 -5px var(--Track), 683px 0 0 -5px var(--Track), 684px 0 0 -5px var(--Track), 685px 0 0 -5px var(--Track), 686px 0 0 -5px var(--Track), 687px 0 0 -5px var(--Track), 688px 0 0 -5px var(--Track), 689px 0 0 -5px var(--Track), 690px 0 0 -5px var(--Track), 691px 0 0 -5px var(--Track), 692px 0 0 -5px var(--Track), 693px 0 0 -5px var(--Track), 694px 0 0 -5px var(--Track), 695px 0 0 -5px var(--Track), 696px 0 0 -5px var(--Track), 697px 0 0 -5px var(--Track), 698px 0 0 -5px var(--Track), 699px 0 0 -5px var(--Track), 700px 0 0 -5px var(--Track), 701px 0 0 -5px var(--Track), 702px 0 0 -5px var(--Track), 703px 0 0 -5px var(--Track), 704px 0 0 -5px var(--Track), 705px 0 0 -5px var(--Track), 706px 0 0 -5px var(--Track), 707px 0 0 -5px var(--Track), 708px 0 0 -5px var(--Track), 709px 0 0 -5px var(--Track), 710px 0 0 -5px var(--Track), 711px 0 0 -5px var(--Track), 712px 0 0 -5px var(--Track), 713px 0 0 -5px var(--Track), 714px 0 0 -5px var(--Track), 715px 0 0 -5px var(--Track), 716px 0 0 -5px var(--Track), 717px 0 0 -5px var(--Track), 718px 0 0 -5px var(--Track), 719px 0 0 -5px var(--Track), 720px 0 0 -5px var(--Track), 721px 0 0 -5px var(--Track), 722px 0 0 -5px var(--Track), 723px 0 0 -5px var(--Track), 724px 0 0 -5px var(--Track), 725px 0 0 -5px var(--Track), 726px 0 0 -5px var(--Track), 727px 0 0 -5px var(--Track), 728px 0 0 -5px var(--Track), 729px 0 0 -5px var(--Track), 730px 0 0 -5px var(--Track), 731px 0 0 -5px var(--Track), 732px 0 0 -5px var(--Track), 733px 0 0 -5px var(--Track), 734px 0 0 -5px var(--Track), 735px 0 0 -5px var(--Track), 736px 0 0 -5px var(--Track), 737px 0 0 -5px var(--Track), 738px 0 0 -5px var(--Track), 739px 0 0 -5px var(--Track), 740px 0 0 -5px var(--Track), 741px 0 0 -5px var(--Track), 742px 0 0 -5px var(--Track), 743px 0 0 -5px var(--Track), 744px 0 0 -5px var(--Track), 745px 0 0 -5px var(--Track), 746px 0 0 -5px var(--Track), 747px 0 0 -5px var(--Track), 748px 0 0 -5px var(--Track), 749px 0 0 -5px var(--Track), 750px 0 0 -5px var(--Track), 751px 0 0 -5px var(--Track), 752px 0 0 -5px var(--Track), 753px 0 0 -5px var(--Track), 754px 0 0 -5px var(--Track), 755px 0 0 -5px var(--Track), 756px 0 0 -5px var(--Track), 757px 0 0 -5px var(--Track), 758px 0 0 -5px var(--Track), 759px 0 0 -5px var(--Track), 760px 0 0 -5px var(--Track), 761px 0 0 -5px var(--Track), 762px 0 0 -5px var(--Track), 763px 0 0 -5px var(--Track), 764px 0 0 -5px var(--Track), 765px 0 0 -5px var(--Track), 766px 0 0 -5px var(--Track), 767px 0 0 -5px var(--Track), 768px 0 0 -5px var(--Track), 769px 0 0 -5px var(--Track), 770px 0 0 -5px var(--Track), 771px 0 0 -5px var(--Track), 772px 0 0 -5px var(--Track), 773px 0 0 -5px var(--Track), 774px 0 0 -5px var(--Track), 775px 0 0 -5px var(--Track), 776px 0 0 -5px var(--Track), 777px 0 0 -5px var(--Track), 778px 0 0 -5px var(--Track), 779px 0 0 -5px var(--Track), 780px 0 0 -5px var(--Track), 781px 0 0 -5px var(--Track), 782px 0 0 -5px var(--Track), 783px 0 0 -5px var(--Track), 784px 0 0 -5px var(--Track), 785px 0 0 -5px var(--Track), 786px 0 0 -5px var(--Track), 787px 0 0 -5px var(--Track), 788px 0 0 -5px var(--Track), 789px 0 0 -5px var(--Track), 790px 0 0 -5px var(--Track), 791px 0 0 -5px var(--Track), 792px 0 0 -5px var(--Track), 793px 0 0 -5px var(--Track), 794px 0 0 -5px var(--Track), 795px 0 0 -5px var(--Track), 796px 0 0 -5px var(--Track), 797px 0 0 -5px var(--Track), 798px 0 0 -5px var(--Track), 799px 0 0 -5px var(--Track), 800px 0 0 -5px var(--Track), 801px 0 0 -5px var(--Track), 802px 0 0 -5px var(--Track), 803px 0 0 -5px var(--Track), 804px 0 0 -5px var(--Track), 805px 0 0 -5px var(--Track), 806px 0 0 -5px var(--Track), 807px 0 0 -5px var(--Track), 808px 0 0 -5px var(--Track), 809px 0 0 -5px var(--Track), 810px 0 0 -5px var(--Track), 811px 0 0 -5px var(--Track), 812px 0 0 -5px var(--Track), 813px 0 0 -5px var(--Track), 814px 0 0 -5px var(--Track), 815px 0 0 -5px var(--Track), 816px 0 0 -5px var(--Track), 817px 0 0 -5px var(--Track), 818px 0 0 -5px var(--Track), 819px 0 0 -5px var(--Track), 820px 0 0 -5px var(--Track), 821px 0 0 -5px var(--Track), 822px 0 0 -5px var(--Track), 823px 0 0 -5px var(--Track), 824px 0 0 -5px var(--Track), 825px 0 0 -5px var(--Track), 826px 0 0 -5px var(--Track), 827px 0 0 -5px var(--Track), 828px 0 0 -5px var(--Track), 829px 0 0 -5px var(--Track), 830px 0 0 -5px var(--Track), 831px 0 0 -5px var(--Track), 832px 0 0 -5px var(--Track), 833px 0 0 -5px var(--Track), 834px 0 0 -5px var(--Track), 835px 0 0 -5px var(--Track), 836px 0 0 -5px var(--Track), 837px 0 0 -5px var(--Track), 838px 0 0 -5px var(--Track), 839px 0 0 -5px var(--Track), 840px 0 0 -5px var(--Track), 841px 0 0 -5px var(--Track), 842px 0 0 -5px var(--Track), 843px 0 0 -5px var(--Track), 844px 0 0 -5px var(--Track), 845px 0 0 -5px var(--Track), 846px 0 0 -5px var(--Track), 847px 0 0 -5px var(--Track), 848px 0 0 -5px var(--Track), 849px 0 0 -5px var(--Track), 850px 0 0 -5px var(--Track), 851px 0 0 -5px var(--Track), 852px 0 0 -5px var(--Track), 853px 0 0 -5px var(--Track), 854px 0 0 -5px var(--Track), 855px 0 0 -5px var(--Track), 856px 0 0 -5px var(--Track), 857px 0 0 -5px var(--Track), 858px 0 0 -5px var(--Track), 859px 0 0 -5px var(--Track), 860px 0 0 -5px var(--Track), 861px 0 0 -5px var(--Track), 862px 0 0 -5px var(--Track), 863px 0 0 -5px var(--Track), 864px 0 0 -5px var(--Track), 865px 0 0 -5px var(--Track), 866px 0 0 -5px var(--Track), 867px 0 0 -5px var(--Track), 868px 0 0 -5px var(--Track), 869px 0 0 -5px var(--Track), 870px 0 0 -5px var(--Track), 871px 0 0 -5px var(--Track), 872px 0 0 -5px var(--Track), 873px 0 0 -5px var(--Track), 874px 0 0 -5px var(--Track), 875px 0 0 -5px var(--Track), 876px 0 0 -5px var(--Track), 877px 0 0 -5px var(--Track), 878px 0 0 -5px var(--Track), 879px 0 0 -5px var(--Track), 880px 0 0 -5px var(--Track), 881px 0 0 -5px var(--Track), 882px 0 0 -5px var(--Track), 883px 0 0 -5px var(--Track), 884px 0 0 -5px var(--Track), 885px 0 0 -5px var(--Track), 886px 0 0 -5px var(--Track), 887px 0 0 -5px var(--Track), 888px 0 0 -5px var(--Track), 889px 0 0 -5px var(--Track), 890px 0 0 -5px var(--Track), 891px 0 0 -5px var(--Track), 892px 0 0 -5px var(--Track), 893px 0 0 -5px var(--Track), 894px 0 0 -5px var(--Track), 895px 0 0 -5px var(--Track), 896px 0 0 -5px var(--Track), 897px 0 0 -5px var(--Track), 898px 0 0 -5px var(--Track), 899px 0 0 -5px var(--Track), 900px 0 0 -5px var(--Track), 901px 0 0 -5px var(--Track), 902px 0 0 -5px var(--Track), 903px 0 0 -5px var(--Track), 904px 0 0 -5px var(--Track), 905px 0 0 -5px var(--Track), 906px 0 0 -5px var(--Track), 907px 0 0 -5px var(--Track), 908px 0 0 -5px var(--Track), 909px 0 0 -5px var(--Track), 910px 0 0 -5px var(--Track), 911px 0 0 -5px var(--Track), 912px 0 0 -5px var(--Track), 913px 0 0 -5px var(--Track), 914px 0 0 -5px var(--Track), 915px 0 0 -5px var(--Track), 916px 0 0 -5px var(--Track), 917px 0 0 -5px var(--Track), 918px 0 0 -5px var(--Track), 919px 0 0 -5px var(--Track), 920px 0 0 -5px var(--Track), 921px 0 0 -5px var(--Track), 922px 0 0 -5px var(--Track), 923px 0 0 -5px var(--Track), 924px 0 0 -5px var(--Track), 925px 0 0 -5px var(--Track), 926px 0 0 -5px var(--Track), 927px 0 0 -5px var(--Track), 928px 0 0 -5px var(--Track), 929px 0 0 -5px var(--Track), 930px 0 0 -5px var(--Track), 931px 0 0 -5px var(--Track), 932px 0 0 -5px var(--Track), 933px 0 0 -5px var(--Track), 934px 0 0 -5px var(--Track), 935px 0 0 -5px var(--Track), 936px 0 0 -5px var(--Track), 937px 0 0 -5px var(--Track), 938px 0 0 -5px var(--Track), 939px 0 0 -5px var(--Track), 940px 0 0 -5px var(--Track), 941px 0 0 -5px var(--Track), 942px 0 0 -5px var(--Track), 943px 0 0 -5px var(--Track), 944px 0 0 -5px var(--Track), 945px 0 0 -5px var(--Track), 946px 0 0 -5px var(--Track), 947px 0 0 -5px var(--Track), 948px 0 0 -5px var(--Track), 949px 0 0 -5px var(--Track), 950px 0 0 -5px var(--Track), 951px 0 0 -5px var(--Track), 952px 0 0 -5px var(--Track), 953px 0 0 -5px var(--Track), 954px 0 0 -5px var(--Track), 955px 0 0 -5px var(--Track), 956px 0 0 -5px var(--Track), 957px 0 0 -5px var(--Track), 958px 0 0 -5px var(--Track), 959px 0 0 -5px var(--Track), 960px 0 0 -5px var(--Track), 961px 0 0 -5px var(--Track), 962px 0 0 -5px var(--Track), 963px 0 0 -5px var(--Track), 964px 0 0 -5px var(--Track), 965px 0 0 -5px var(--Track), 966px 0 0 -5px var(--Track), 967px 0 0 -5px var(--Track), 968px 0 0 -5px var(--Track), 969px 0 0 -5px var(--Track), 970px 0 0 -5px var(--Track), 971px 0 0 -5px var(--Track), 972px 0 0 -5px var(--Track), 973px 0 0 -5px var(--Track), 974px 0 0 -5px var(--Track), 975px 0 0 -5px var(--Track), 976px 0 0 -5px var(--Track), 977px 0 0 -5px var(--Track), 978px 0 0 -5px var(--Track), 979px 0 0 -5px var(--Track), 980px 0 0 -5px var(--Track), 981px 0 0 -5px var(--Track), 982px 0 0 -5px var(--Track), 983px 0 0 -5px var(--Track), 984px 0 0 -5px var(--Track), 985px 0 0 -5px var(--Track), 986px 0 0 -5px var(--Track), 987px 0 0 -5px var(--Track), 988px 0 0 -5px var(--Track), 989px 0 0 -5px var(--Track), 990px 0 0 -5px var(--Track), 991px 0 0 -5px var(--Track), 992px 0 0 -5px var(--Track), 993px 0 0 -5px var(--Track), 994px 0 0 -5px var(--Track), 995px 0 0 -5px var(--Track), 996px 0 0 -5px var(--Track), 997px 0 0 -5px var(--Track), 998px 0 0 -5px var(--Track), 999px 0 0 -5px var(--Track), 1000px 0 0 -5px var(--Track);
  -webkit-transition: background-color 150ms;
  transition: background-color 150ms;
}

.e-range::-moz-range-track,
.e-range::-moz-range-progress {
  width: 100%;
  height: 30px;
  /*background: linear-gradient(to bottom, #cfcfcf, #cfcfcf) 100% 50%/100% 3px no-repeat transparent;*/
  /*background: transparent;*/
  background: linear-gradient(to bottom, #f2c94c, #f2c94c) 100% 50%/100% 3px no-repeat transparent;
}

.e-range::-moz-range-progress {
  background: linear-gradient(to bottom, #f2c94c, #f2c94c) 100% 50%/100% 3px no-repeat transparent;
}

.e-range::-moz-range-thumb {
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  height: 13px;
  width: 13px;
  background: #f2c94c;
  border-radius: 100%;
  border: 0;
  -moz-transition: background-color 150ms;
  transition: background-color 150ms;
}

.e-range::-ms-track {
  width: 100%;
  height: 30px;
  border: 0;
  color: transparent;
  background: transparent;
}

.e-range::-ms-fill-lower {
  background: linear-gradient(to bottom, #f2c94c, #f2c94c) 100% 50%/100% 3px no-repeat transparent;
}

.e-range::-ms-fill-upper {
  /*background: linear-gradient(to bottom, #cfcfcf, #cfcfcf) 100% 50%/100% 3px no-repeat transparent; */
  background: linear-gradient(to bottom, #f2c94c, #f2c94c) 100% 50%/100% 3px no-repeat transparent;
}

.e-range::-ms-thumb {
  appearance: none;
  height: 13px;
  width: 13px;
  background: #f2c94c;
  border-radius: 100%;
  border: 0;
  -ms-transition: background-color 150ms;
  transition: background-color 150ms;
  top: 0;
  margin: 0;
  box-shadow: none;
}

.e-range:hover::-webkit-slider-thumb,
.e-range:focus::-webkit-slider-thumb {
  background-color: #f2c94c;
}
.e-range:hover::-moz-range-thumb,
.e-range:focus::-moz-range-thumb {
  background-color: #f2c94c;
}
.e-range:hover::-ms-thumb,
.e-range:focus::-ms-thumb {
  background-color: #f2c94c;
}
</style>


<style>




.vue-slider {
  border-radius: 100px;
}

.vue-slider-disabled {
  opacity: 1;
  cursor: default;
}

.vue-slider-dot-handle-disabled {
  opacity: 1;
  cursor: default;
}

.vue-slider-dot-handle {
  opacity: 1;
  box-shadow: none;
  cursor: grab;
  -webkit-appearance: none;
  appearance: none;
  -moz-appearance: none;
}

.vue-slider-dot-handle:active {
  opacity: 1;
  cursor: grabbing;
}
</style>
<style scoped>

.buffered {
  height: 3px;
  position: relative;
  top: -13px;
}

#buffered-amount {
  display: block;
  height: 100%;
  background-color: #777;
  width: 0;
}
.downLoadContainer p {
  font-size: 20px !important;
  font-weight: 600 !important;
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 10px;
  margin: 10px;
}

.downLoadContainer p:hover {
  cursor: pointer;
}


.downLoadContainer img {
  width: 30px;
  margin-bottom: -10px;
  margin-left: 5px;
}

.downLoadContainer span {
  color: #29a6da;
  white-space: nowrap;
}

.hasGradient {
  width: 100%;
  position: relative;
}

.hasGradient:after {
  content: "";
  display: block;
  position: absolute;
  width: 10%;
  height: 95%;
  background: linear-gradient(270deg, rgba(33, 33, 33, 1) 5%, rgba(33, 33, 33, 0.7) 51%, rgba(33, 33, 33, 0) 100%);
  top: 0;
  right: -1px;
  z-index: 1000;
}

.hasGradient:before {
  content: "";
  display: block;
  position: absolute;
  width: 10%;
  height: 95%;
  background: linear-gradient(90deg, rgba(33, 33, 33, 1) 5%, rgba(33, 33, 33, 0.7) 51%, rgba(33, 33, 33, 0) 100%);
  top: 0;
  left: -1px;
  z-index: 1000;
}


.playerContainer {
  position: relative;
  left: -1px;
  width: 100vw;
  max-width: 523px;
  z-index: 9999999000000000000000;
  transform: translate3d(0, 0, 400px);
  height: 100vh;
  /*overflow: scroll;*/
  background: var(--black);
  overflow: hidden;
}

.downloadProgress {
  width: 30px;
  height: 30px;
  overflow: visible;
  position: absolute;
}


.controlBox span ,.upItems span, .lowItems span{
  width:100%;
}

#Player .playerData {
  height: auto;
  position: relative;
  transform: translate3d(0, 0, 200px);
  z-index: 2;
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
}
#Player .advText {
  font-size: 18px;
  opacity: 0.5;
}


.topBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(91vh - env(safe-area-inset-bottom));
  overflow: hidden;
  position: relative;
  /*padding-bottom: 15px;*/
  border-radius: 0px 0px 50px 50px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
  background: linear-gradient(180deg, rgba(33, 33, 33, 0.3) 0.5%, rgba(33, 33, 33, 0.3) 20%, rgba(33, 33, 33, 0.7) 30%, rgba(33, 33, 33, 0.9) 40%, #212121 49%)
}

/*.topBox:after{*/
/*  content: "";*/
/*  display: block;*/
/*  position: absolute;*/
/*  width: 100%;*/
/*  height: 50px;*/
/*  background-color:#212121;*/
/*  bottom: 0;*/
/*  left: 0;*/
/*}*/

#bottomBox {
  position: relative;
  z-index:10;
  height:8vh;
  display: flex;
  align-items: center;
}

.back {
  width: 100%;
  height: 50vh;
  position: absolute;
  transform: scale(.998);
  top: 0;
  left: 0;
  z-index: -1;
  /*filter: blur(5px);*/
  /*background-repeat: no-repeat;*/
  /*background-size: 150%;*/
  /*background-position: top center;*/
}



.lyrics {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 54vh;
  overflow-y: hidden;
  /*background: #409B65;*/
}


.lyric-lines-container {
  position: relative;
  width: 100%;
  height: 54vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /*background-color: #409B65;*/
  padding-top: 50px;
  overflow-y: scroll;
  z-index: 1;
}

.lyrics:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 83px;
  bottom: 0;
  left: 0;
  background: linear-gradient(0deg, rgba(33, 33, 33, 0.9870119922969187) 3%, rgba(0, 0, 0, 0) 100%);
  z-index: 3;
}

.lyric-line {
  width: 95%;
  font-size: 14px;
  font-weight: 200;
  line-height: 37px;
  color: #fcfcfc;
  white-space: pre-line;
}

.lyric-limitation {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 300px;
  align-items: center;
  width: 70%;
  border-radius: 10px;
  background: rgba(33, 33, 33, 0.5);
  margin-top: 10px;
  margin-bottom: 200px;
  padding: 10px;
  padding-top: 30px;
}

.lyric-limitation-text {
  direction: rtl;
}

#lyric-limitation-btn {
  width: 90%;
  border-radius: 40px;
  height: 35px;
  margin-top: 10px;
  font-size: 14px;

}


.lyric-btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 150px;
}

.lyric-limitation-text {
  font-size: 12px;
  font-weight: 200;
}

#lyric-btn-one {
  font-size: 12px;
  font-weight: 200;
  width: 111px;
  height: 20px;
  margin: 20px 5px 20px 20px;
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
}

#lyric-btn-two {
  font-size: 12px;
  font-weight: 200;
  width: 111px;
  height: 20px;
  margin: 20px 20px 20px 5px;
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
}




.artistInfo-container {
  position: relative;
  z-index: 3;

}
#Player .MusicName {
  display: flex;
  font-size: 1.4em;
  font-weight: 500;
  text-overflow: ellipsis;
  width: 270px;
  white-space: nowrap;
  overflow: hidden;
}

#Player .mel-logo {
  margin-top: -60px;
  z-index: 1000;
  position: relative;
  right: -5px;
}

@media screen and (max-width: 320px) {
  #Player .mel-logo {
    max-width: 80px;
  }

  #Player .advTitle > span {
    margin-top: -10px;
    margin-bottom: 5px;
  }

}
@media screen and (max-width: 321px) {
  .playerBox[data-v-eee03e7a] {
    padding-bottom: 25px;
  }
}
#Player .advTitle {
  font-size: 1.4em;
  font-weight: 500;
  text-overflow: ellipsis;
  width: 270px;
  white-space: nowrap;
  overflow: hidden;
}

#Player .ArtistsName {
  font-size: 1.2em;
  color: var(--Accent);
  text-overflow: ellipsis;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}

#Player .advDesc {
  position: relative;
  top: -10px;
  font-size: 1em;
  color: var(--Accent);
}

.playerBox {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: -28vh;
}

.upItems, .lowItems {
  width: calc(100% - 64px);
  display: inline-flex;
  z-index: 1;
}
.lowItems {
  margin: 0 auto 5px;
}
.upItems {
  margin: 10px auto;
}

#Player .playerBox .upItems span, #Player .playerBox .lowItems span {
  display: inherit;
  /*width: 100%;*/
}

#Player .playerBox .upItems span:first-of-type, #Player .playerBox .lowItems span:first-of-type {
  justify-content: flex-start;
}

#Player .playerBox .upItems span:last-of-type, #Player .playerBox .lowItems span:last-of-type {
  justify-content: flex-end;
}

#Player .playerBox .upItems .repeatOneNum {
  position: absolute;
  display: block;
  width: 10px;
  height: 10px;
  background-color: var(--Accent);
  color: black;
  border-radius: 30px;
  font-size: 10px;
  left: 48px;
  margin-top: 8px;
}

.playerBox audio {
  display: flex;
  width: calc(100% - 64px);
  margin: 0 auto;
}

.controlBox {
  display: flex;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
  width: calc(100% - 64px);
  margin: 0 auto;
  height: auto;
}


#Player .controlBox .prev,#Player .controlBox .next,#Player .controlBox .play ,#Player .controlBox .pause {
  display: flex;
  justify-content: center;
  align-items: center;
  /*height: 100%;*/
  box-sizing: content-box;
}

.controlBox #play img, .controlBox #pause img {
  box-shadow: -4px 4px 5px rgba(0, 0, 0, 0.5);
  border-radius: 100px;
  vertical-align: middle;
  min-height: 70px;
  height: 65%;
}

#btnRow {
  display: flex;
  position: relative;
  bottom: 0px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
}

#btnRow div {
  display: flex;
  flex-direction: row;
  width: 32%;
  justify-content: space-around;
}

#btnRow svg {
  border-radius: 60px;
  width: 50px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#btnRow span img {
  vertical-align: middle;
}
#Player .controlBox .next, #Player .controlBox .prev
{
  /*width: 30%;*/
}
#Player .controlBox .play, #Player .controlBox .pause
{
  /*width: 60%;*/
  /*height: 100%;*/
}
.controlBox span:nth-of-type(even) svg {
  width: 75%;
}



/*.prev {*/
/*  position: relative;*/
/*  right: -30px;*/
/*}*/

/*.next {*/
/*  position: relative;*/
/*  left: -30px;*/
/*}*/

/*@media screen and (max-height: 568px ) {*/
/*  .controlBox span:nth-of-type(odd) img {*/
/*    margin-top: 15px;*/
/*  }*/
/*}*/


#btnRow div span {
  max-width: 23px;
  min-width: 23px;
  height: 25px;
  background-position: center;
  background-repeat: no-repeat;
}

#btnRow .liked, #btnRow div .notLiked {
  width: 100%;
  background-size: contain;
}

#btnRow div .notLiked {
  background-image: url('~@/assets/icons/like2.svg');
}

#btnRow div .liked {
  background-image: url('~@/assets/icons/liked2.svg');
}

@media (max-width: 359px) {
  #Player .MusicName {
    font-size: 1.2em;
  }

  #Player .ArtistsName {
    font-size: 1em;
  }

  #sortRight span:first-of-type {
    font-size: 0.7em;
  }
}




@media (max-width: 540px) and (max-height: 668px) {
  /*.playerBox .controlBox {*/
  /*	height: 5em;*/
  /*	width: calc(100% - 24px);*/
  /*	padding: 5px 0px;*/
  /*}*/
  /*.controlBox span:nth-of-type(even) img {*/
  /*	width:75%;*/
  /*}*/
  /*.controlBox span:nth-of-type(odd) img {*/
  /*	width:40%;*/
  /*}*/
  #playerBox {
    margin-top: 0.5em;
  }


  /*#btnRow {*/
  /*  height: 34px;*/
  /*}*/

}

.goToTop {
  position: absolute;
  z-index: 9000000000000000000;
  bottom: calc(40px + env(safe-area-inset-bottom)) ;
  left: 20px;
  transition: all .1s ease-in-out;
}


.onTop {
  transform: translate3d(0, 0, 523px);
}

.hide {
  transition: all .1s ease-in-out;
  transform: translate3d(0, 0, 500px) scale(0);
}
.behind {
  transition: transform ease 0.3s;
  transform:translate3d(0,100vh,0);
  z-index: 10000000000000;
  pointer-events: none;
  position: absolute;
}
.front {
  transition: transform ease 0.3s;
  transform:translate3d(0,0,0);
  z-index: 10000000000000;
  position: relative;
}
.adv {
  width:auto !important;
}
.advImg {
  min-width: 70px;
  width: 23% !important;
  max-width: 80px;
  margin-top: -10px;
}

@media screen  and (max-width: 475px) and (max-height: 768px ) {

  #Player .mel-logo{
    width: 80px ;
  }


  .adv {
    margin-top: -21px;
  }


  .playerBox .controlBox {

    height: 5em;
    width: calc(100% - 24px);
    padding: 0;
  }
}

@media screen and (min-width: 450px) and (max-height: 850px) {
  #Player .mel-logo {
    margin-top: -80px;
  }
  .limit-cover {
    width: 105vw;
    max-width: 385px;
  }

  .artistInfo-container {

    margin-top: -5px;
  }
  .upItems {
    margin-top: 25px;
  }
  .topBox{
    height: calc(92vh - env(safe-area-inset-bottom));
  }
  #Player .advTitle{
    margin-top: -11px !important;
    margin-bottom: 10px !important;
  }
  .controlBox{
    top: 0;
  }
}



@media screen and (min-width: 450px) and (max-height: 818px) {



  .advImg{
    margin-top: -20px;
  }
}

@media screen and (min-width: 450px) and (max-height: 808px) {

  .advImg{
    margin-top: -25px;
  }
}

@media screen and (min-width: 450px) and (max-height: 808px) {

  .advImg{
    margin-top: -25px;
  }
}


@media screen and (min-width: 450px) and (max-height: 798px) {
  #Player .mel-logo {
    margin-top: -80px;
  }
  .artistInfo-container {

    margin-top: -5px;
  }

  .upItems {
    margin-top: 25px;
  }
  .topBox{
    height: calc(92vh - env(safe-area-inset-bottom));
  }
  #Player .advTitle{
    margin-top: -11px !important;
    margin-bottom: 10px !important;
  }
  .controlBox{
    top: 0;
  }
}
@media screen and (max-width: 375px) {
  #Player .controlBox .play, #Player .controlBox .pause {
    height:60px;
  }
  #Player .controlBox .next, #Player .controlBox .prev {
    height:25px;
  }
}
</style>
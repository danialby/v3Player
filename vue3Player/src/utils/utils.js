
// import {app} from "@/main";
import {melodify} from "@/store";
import {app} from "@/main";
import {db} from "@/db";
import {storeToRefs} from "pinia";
const melodifyStore = melodify()
const {userActivity,downloadedTracks} = melodifyStore

export default {
        isLetter(str) {
            return str.match(/[a-z]/i);
        },
        formatTime: function(secs) {
            var minutes = Math.floor(secs / 60) || 0;
            var seconds = (secs - minutes * 60) || 0;

            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds.toPrecision(0);
        },
        scrollTop(el) {
            let toScroll = document.getElementById(el)
            toScroll.scrollTo({top: 0, behavior: "smooth"})
        },
        isTrackInUserLikedTracks(id) {
            return userActivity.liked_tracks.filter(item => item === id).length !== 0
        },
        // async getDownloadedItems() {
        //     let dlTracks = await db.dlTracks.toArray()
        //     console.log(dlTracks)
        //     let tracksItems = dlTracks.map(track => track.item)
        //     await store.dispatch('setDownloadedTracks',tracksItems)
        // },
        // async getListenedItems() {
        //     let lsTracks = await db.lsTracks.toArray()
        //     console.log(lsTracks)
        //     await store.dispatch('setListenedTracks',lsTracks)
        // },
        isInDownloadedTracks(id) {
            return downloadedTracks.filter(item => item.id === id).length !== 0
        },
        // isInListenedTracks(id) {
        //     return store.state.listenedTracks.filter(item => item.id === id).length !== 0
        // },
        toggleLike(item) {
            console.log('like')
            // if (!this.isTrackInUserLikedTracks(item.id)) {
            //     try {
            //         Promise.all([this.likeTrack(item.id)]).then(() => {
            //         })
            //     } catch {
            //         store.commit('toggleLikedTracks', item.id)
            //     }
            // } else {
            //     try {
            //         Promise.all([this.dislikeTrack(item.id)]).then(() => {
            //         })
            //     } catch {
            //         store.commit('toggleLikedTracks', item.id)
            //     }
            //
            // }
        },
        // async likeTrack(id) {
        //     store.commit('toggleLikedTracks', id)
        //     await store.dispatch('get_Data',
        //         {
        //
        //             api_command: 'trackLike',
        //             params: {
        //                 "track_id": id,
        //             },
        //             store_command: {
        //                 "command": ''
        //             }
        //         })
        //         .then(() => {
        //             console.log('track ' + id + ' liked')
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         })
        // },
        // async dislikeTrack(id) {
        //     store.commit('toggleLikedTracks', id)
        //     await store.dispatch('get_Data',
        //         {
        //             api_command: 'trackDislike',
        //             params: {
        //                 "track_id": id,
        //             },
        //             store_command: {
        //                 "command": ''
        //             }
        //         })
        //         .then(() => {
        //             console.log('track ' + id + ' disliked')
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         })
        // },
        // limitAction(backState,action) {
        //     if (backState) {
        //         store.dispatch('setPlanBackState', backState)
        //             .then(() => {
        //                 app.$root.$refs.player.close()
        //                 console.log('planBackState', backState)
        //             })
        //         if(action)
        //         {
        //             store.dispatch('handleAction',{target_type:action})
        //         }
        //         else {
        //             app.$router.push('/Plans')
        //         }
        //     }
        //     else {
        //         if(action)
        //         {
        //             store.dispatch('handleAction',{target_type:action})
        //         }
        //         else {
        //             app.$router.push('/Plans')
        //         }
        //     }
        //
        // },

    //     toQueryString(params) {
    //         return Object.keys(params).map(key => key + '=' + params[key]).join('&');
    //     },
    //
    //
    //     openSheet(sheet,parent) {
    //         if(parent) {
    //             parent.$refs[sheet].open()
    //         }
    //         else {
    //             sheet.open()
    //         }
    //     },
    //     closeSheet(sheet,parent){
    //         if(parent) {
    //             parent.$refs[sheet].close()
    //         }
    //         else {
    //             sheet.close()
    //         }
    //     },
    //     handleIntersection(isIntersecting,props) {
    //         console.log('isIntersecting : ', isIntersecting) // true or false
    //         if(isIntersecting)
    //         {
    //             this.recycleList(props)
    //         }
    //         // console.log(el)             // reference to the elment (<p> element in this case)
    //         // console.log(options)        // value of v-intersect
    //     },
    //     recycleList(listProps) {
    //         if (!listProps.itemData.end) {
    //             console.log('end', listProps.itemData.end)
    //             if (listProps.isRecycling === false) {
    //                 store.state.recyclingObject.isRecycling = true
    //                 store.dispatch('get_Data',
    //                     {
    //                         api_command: listProps.itemData.query,
    //                         params: listProps.itemData.queryParams,
    //                         store_command: {
    //                             "command": listProps.itemData.storeCommand,
    //                             "action": "loadmore",
    //                             "addOn": {
    //                                 "offset":
    //                                 listProps.itemData.queryParams.offset,
    //                                 "type": listProps.itemData.queryParams.type,
    //                                 "language": listProps.itemData.queryParams.language
    //                             }
    //                         }
    //                     }).then(() => {
    //                     store.state.recyclingObject.isRecycling = false
    //             })
    //         }
    //     }
    // }
}

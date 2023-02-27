import {defineStore} from "pinia";
import router from '@/router'
import {app} from "@/main"
import axios from 'axios'
// import aes from 'js-crypto-aes'
import CryptoJS from 'crypto-js'
// const cfg = {
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7
// };
export const melodify = defineStore('melodify', {
    state: () => ({
        //Debug Variables
        devUserObject:
            {
                '09362684506': {
                    "verified": true,
                    "user": {
                        "id": 2090040,
                        "full_name": "danialank",
                        "email": null,
                        "phone": "09362684506",
                        "locale": "fa",
                        "ref_number": 27171543,
                        "user_code": 6271097,
                        "is_registered": true,
                        "premium_days_left": 0,
                        "is_premium": false,
                        "new_user": true,
                        "is_foreign": false,
                        "streaming_quality": "160",
                        "should_register_phone": false,
                        "user_sessions_count": 14
                    },
                    "token": "a9a1d687fb79561dffff3da5c020448dd21119e1a3adfd61d50ead9ef2c3bac066fba60f84a0509b6b15cd8e2b7e16a7b953740ddbd20a209d249cb13f00b110",
                    "device_token": '557ea8eb-c5da-431a-8d88-c8173a693fa6'
                },
                '09353264254': {
                    "verified": true,
                    "user": {
                        "id": 1793177,
                        "full_name": "danialang",
                        "email": null,
                        "phone": "09353264254",
                        "locale": "fa",
                        "ref_number": 23312324,
                        "user_code": 5380507,
                        "is_registered": true,
                        "premium_days_left": 54,
                        "is_premium": true,
                        "new_user": false,
                        "is_foreign": false,
                        "streaming_quality": "160",
                        "should_register_phone": false,
                        "user_sessions_count": 20
                    },
                    "token": "52b2f1b8f4519447305a5a9da43714b952257aea206fca8e18b458ae378090834ee506e2224deedf0d304557d87c7c6bcb20dffbab0094e3c69ba89aada16d2d",
                    "device_token": '557ea8eb-c5da-431a-8d88-c8173a693fa6'
                }
            },





        retryCounter:0,
        listenCount:0,
        musicListEditMode:false,
        playerSelectionMode:false,
        musicListCheckedItems: [],
        playerCheckedItems: [],
        isTGUnlinked:false,
        lastListenedTracksArray: [],
        maxListenableTracksCount:3,
        //Advertise Variables
        playerAdvertiseData: null,
        advertiseIndex: 0,
        should_close_player: false,
        fetchUrl: null,
        appUpdateDialogData:null,

        initialData: null,
        appDialogs: null,
        userActivity:null,
        getDataResult: null,
        _collectionData: null,
        trackListData:null,
        trackListTracks: null,


        //loading Variables
        fullAnimationContainer: false,
        albumResult:null,
        albumTracks:null,
        albumData:null,

        // Global Variables.
        app_version: '7.0.1',
        pwa_version:'1.3.2',
        api_version: 'pwa/',
        imgUrl: 'https://img.melodify.pw/',
        activeUrl: 'https://melodify.pw/',
        cdnUrl: 'https://cdn.melodify.pw/',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=net.melodify.android',
        recyclingObject: null,
        hasDHint: false,
        emptyListLoadMessage: null,

        // // HomePage Variables
        // trendingLanguage: null,
        // persian_week_TrendingTracks: [],
        // persian_month_TrendingTracks: [],
        // foreign_week_TrendingTracks: [],
        // foreign_month_TrendingTracks: [],


        // newestLanguage: null,
        // persian_vip_NewestTracks: [],
        // persian_all_NewestTracks: [],
        // foreign_vip_NewestTracks: [],
        // foreign_all_NewestTracks: [],
        //
        //
        // popularArtistsLanguage: null,
        // popularPersianArtists: null,
        // popularForeignArtists: null,


        // //Search Variables
        // SearchResults: null,
        // searchState: {
        //     searchType: null,
        //     query: null
        // },
        // searchSuggestions: null,


        // User Variables =>
        user: null,
        // userCollections: null,
        // followedCollections: null,
        // followedArtists: null,
        // userLikedTracks: null,
        // userMostListenedTracks: null,
        // PlaylistTracksByType: null,


        // userCollectionSortId: 'my_sort',
        // userCollectionSortTitle: 'ترتیب دلخواه من',
        // userCollectionTracks: [],
        // editedUserPlaylistTracks: [],

        // User - AboutUs
        // privacyPolicy: null,
        // shareInfo: null,
        // copyright: null,
        // termsOfUse: null,


        // Login and Device Variables
        userObject: {},
        device_token: null,
        // inactiveData: null,
        // invalidTokenData: null,
        // sessionData: null,
        initialized: false,


        // Playlist Variables
        // collectionPageData: {},
        // playlistCategories: {},
        // playlistSubCategories: {},


        // Playlist - thePlaylist
        // playlistData: null,
        // playlistTracks: null,

        // Playlist - Grid
        // collectionGrid: {
        //     title: null,
        //     collections: null
        // },

        // Playlist - SubGrid
        // subGrid: {
        //     bg: null,
        //     subGridTitle: null,
        //     subGridSubtitle: null,
        //     isEN: null,
        //     collections: null
        // },


        // Artist Variables
        artistData: null,
        artistTracks: null,
        artistSortId: 'newest',
        artistSortTitle: 'جدیدترین ها',
        artistGroup: null,
        artistGroupArtists: null,

        // UI Variables
        tabState: {
            isPresent: true
        },
        navState: {
            backColor: '',
            title: '',
            shadow: '0px 0px 10px rgba(0,0,0,0.4)',
            rdp: '',
            ldp: ''
        },
        hasRightLeft: {
            right: null,
            left: null
        },
        isEditingMode: false,
        middleStyle: {
            MarginTop: '',
            MarginBottom: '',
            bgColor: '',
            heightOffset: '',
            miniPlayerHeight: '',
            overScroll: '',
        },


        //player Variables
        playerData:
            {
                "id":410074,"image":"new_data/images/track-covers/2281918/conversions/4968aab6-23c4-4766-a15a-1453a47e3da9-thumb-300.jpg","image_large":"new_data/images/track-covers/2281918/conversions/4968aab6-23c4-4766-a15a-1453a47e3da9-thumb-640.jpg","title":"عطر بودار","download_title":"Atre Boodar  Mahan Bahram Khan","download_list_title":"عطر بودار  ماهان بهرام خان","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/248c8be9e6d0fbf334e0e3e6bc8b46eb/320","quality":"320","demo":0},{"name":"handle/v1/tracks/248c8be9e6d0fbf334e0e3e6bc8b46eb/160","quality":"160","demo":0},{"name":"handle/v1/tracks/248c8be9e6d0fbf334e0e3e6bc8b46eb/96","quality":"96","demo":0}],"artists":[{"id":41,"image":"new_data/images/artist-images/235/conversions/efa9ea81-4b89-4fdf-9bc2-fb08fab90713-thumb-300.jpg","image_large":"new_data/images/artist-images/235/conversions/efa9ea81-4b89-4fdf-9bc2-fb08fab90713-thumb-500.jpg","name":"ماهان بهرام خان","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#24D9CF","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true},"isDownloading":false,"isDownloaded":false},
        playerMeta: null,
        playerIndex: null,
        playerTracks:
            {"tracks":
                    [{"id":403458,"image":"new_data/images/track-covers/2129716/conversions/dd6394bd-3c81-4e75-99df-abb744f9aa5b-thumb-200.jpg","image_large":"new_data/images/track-covers/2129716/conversions/dd6394bd-3c81-4e75-99df-abb744f9aa5b-thumb-640.jpg","title":"باطل (اجرای زنده)","download_title":"Batel( concert version)  Shadmehr Aghili","download_list_title":"باطل (اجرای زنده)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/d2c6964f1f6e9f957e94373c603f6a94/320","quality":"320","demo":0},{"name":"handle/v1/tracks/d2c6964f1f6e9f957e94373c603f6a94/160","quality":"160","demo":0},{"name":"handle/v1/tracks/d2c6964f1f6e9f957e94373c603f6a94/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#AF494B","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false},"isDownloading":false,"isDownloaded":false},{"id":271656,"image":"new_data/images/track-covers/893340/conversions/8b1086b0-aa13-45b5-ac07-31e434c91f41-thumb-200.jpg","image_large":"new_data/images/track-covers/893340/conversions/8b1086b0-aa13-45b5-ac07-31e434c91f41-thumb-640.jpg","title":"باطل","download_title":"Batel  Shadmehr Aghili","download_list_title":"باطل  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/d57dfa25e08888d4e313c1522b10aac8/320","quality":"320","demo":0},{"name":"handle/v1/tracks/d57dfa25e08888d4e313c1522b10aac8/160","quality":"160","demo":0},{"name":"handle/v1/tracks/d57dfa25e08888d4e313c1522b10aac8/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C17078","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false},"isDownloading":false,"isDownloaded":false},{"id":267447,"image":"new_data/images/track-covers/839391/conversions/f226291a-5e33-40d5-b2cd-42048bee55b5-thumb-200.jpg","image_large":"new_data/images/track-covers/839391/conversions/f226291a-5e33-40d5-b2cd-42048bee55b5-thumb-640.jpg","title":"وقتی که بد میشم (بیکلام)","download_title":"Vaghti Ke Bad Misham [Instrumental]  Shadmehr Aghili","download_list_title":"وقتی که بد میشم (بیکلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ee1c4bcab213506c1e5fa1cf431f1b09/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ee1c4bcab213506c1e5fa1cf431f1b09/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ee1c4bcab213506c1e5fa1cf431f1b09/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#4F4F4F","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true},"isDownloading":false,"isDownloaded":false},{"id":262913,"image":"new_data/images/track-covers/597406/conversions/015af878-1b15-4209-9fb5-4cd8bb117428-thumb-200.jpg","image_large":"new_data/images/track-covers/597406/conversions/015af878-1b15-4209-9fb5-4cd8bb117428-thumb-640.jpg","title":"چرا تو جنگی","download_title":"Chera Too Jangi  Shadmehr Aghili","download_list_title":"چرا تو جنگی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/4dd5aa0010655f763a0887c0fb824fde/320","quality":"320","demo":0},{"name":"handle/v1/tracks/4dd5aa0010655f763a0887c0fb824fde/160","quality":"160","demo":0},{"name":"handle/v1/tracks/4dd5aa0010655f763a0887c0fb824fde/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true},"isDownloading":false,"isDownloaded":false},{"id":261918,"image":"new_data/images/track-covers/590970/conversions/1e1ccfb5-5969-43e7-92c7-284696c7c396-thumb-200.jpg","image_large":"new_data/images/track-covers/590970/conversions/1e1ccfb5-5969-43e7-92c7-284696c7c396-thumb-640.jpg","title":"بی احساس (اجرای زنده)","download_title":"Bi Ehsas (Live In Concert)  Shadmehr Aghili","download_list_title":"بی احساس (اجرای زنده)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/df77c47d089f949623d4c325f6470886/320","quality":"320","demo":0},{"name":"handle/v1/tracks/df77c47d089f949623d4c325f6470886/160","quality":"160","demo":0},{"name":"handle/v1/tracks/df77c47d089f949623d4c325f6470886/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false},"isDownloading":false,"isDownloaded":false},{"id":229671,"image":"new_data/images/track-covers/510463/conversions/daa4e1c8-f99b-4cc6-8d38-3bbfa367e358-thumb-200.jpg","image_large":"new_data/images/track-covers/510463/conversions/daa4e1c8-f99b-4cc6-8d38-3bbfa367e358-thumb-640.jpg","title":"دست من نیست","download_title":"Daste Man Nist  Shadmehr Aghili","download_list_title":"دست من نیست  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/434ad89b944ede083a415a363bc0ef02/320","quality":"320","demo":0},{"name":"handle/v1/tracks/434ad89b944ede083a415a363bc0ef02/160","quality":"160","demo":0},{"name":"handle/v1/tracks/434ad89b944ede083a415a363bc0ef02/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B69C79","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true},"isDownloading":false,"isDownloaded":false},{"id":160262,"image":"new_data/images/track-covers/413373/conversions/b71d4428-9240-41a7-86e2-4585c180bf01-thumb-200.jpg","image_large":"new_data/images/track-covers/413373/conversions/b71d4428-9240-41a7-86e2-4585c180bf01-thumb-640.jpg","title":"جنگ دلم","download_title":"Jange Delam  Shadmehr Aghili","download_list_title":"جنگ دلم  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/78ef67c19623b168a8d84909c95ea9ea/320","quality":"320","demo":0},{"name":"handle/v1/tracks/78ef67c19623b168a8d84909c95ea9ea/160","quality":"160","demo":0},{"name":"handle/v1/tracks/78ef67c19623b168a8d84909c95ea9ea/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CE9A8C","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true},"isDownloading":false,"isDownloaded":false},{"id":156643,"image":"new_data/images/track-covers/409646/conversions/8fdc16c0-2031-4d3e-962c-f7b65d2f09e6-thumb-200.jpg","image_large":"new_data/images/track-covers/409646/conversions/8fdc16c0-2031-4d3e-962c-f7b65d2f09e6-thumb-640.jpg","title":"یخ زدم","download_title":"Yakh Zadam  Shadmehr Aghili","download_list_title":"یخ زدم  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/fa22f440c44f4c4ec9624a68f0d72ebb/320","quality":"320","demo":0},{"name":"handle/v1/tracks/fa22f440c44f4c4ec9624a68f0d72ebb/160","quality":"160","demo":0},{"name":"handle/v1/tracks/fa22f440c44f4c4ec9624a68f0d72ebb/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#2E9CA5","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true},"isDownloading":false,"isDownloaded":false},{"id":68070,"image":"new_data/images/track-covers/101985/conversions/bfaf33c4-259d-4742-89ef-e0f997bb87b1-thumb-200.jpg","image_large":"new_data/images/track-covers/101985/conversions/bfaf33c4-259d-4742-89ef-e0f997bb87b1-thumb-640.jpg","title":"عوض نمیشی","download_title":"Avaz Nemishi  Shadmehr Aghili","download_list_title":"عوض نمیشی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/16ad869a8977a5f3fdc32b9aab1d2c41/320","quality":"320","demo":0},{"name":"handle/v1/tracks/16ad869a8977a5f3fdc32b9aab1d2c41/160","quality":"160","demo":0},{"name":"handle/v1/tracks/16ad869a8977a5f3fdc32b9aab1d2c41/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EAB539","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true},"isDownloading":false,"isDownloaded":false},{"id":51738,"image":"new_data/images/track-covers/80477/conversions/2334388a-d319-48d8-838f-5a8202bb07d2-thumb-200.jpg","image_large":"new_data/images/track-covers/80477/conversions/2334388a-d319-48d8-838f-5a8202bb07d2-thumb-640.jpg","title":"بارون دلم خواست (ریمیکس)","download_title":"Baroon Delam Khast (Remix)  Shadmehr Aghili","download_list_title":"بارون دلم خواست (ریمیکس)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/0eadd926fd2da9894f819a6e7669f00b/320","quality":"320","demo":0},{"name":"handle/v1/tracks/0eadd926fd2da9894f819a6e7669f00b/160","quality":"160","demo":0},{"name":"handle/v1/tracks/0eadd926fd2da9894f819a6e7669f00b/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A6877D","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true},"isDownloading":false,"isDownloaded":false},{"id":51578,"image":"new_data/images/track-covers/80317/conversions/fb4e9d65-c578-4d48-9215-b3a8d536025f-thumb-200.jpg","image_large":"new_data/images/track-covers/80317/conversions/fb4e9d65-c578-4d48-9215-b3a8d536025f-thumb-640.jpg","title":"بارون دلم خواست","download_title":"Baroon Delam Khast  Shadmehr Aghili","download_list_title":"بارون دلم خواست  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/92d770070fa818f260fb4f4a679ee62f/320","quality":"320","demo":0},{"name":"handle/v1/tracks/92d770070fa818f260fb4f4a679ee62f/160","quality":"160","demo":0},{"name":"handle/v1/tracks/92d770070fa818f260fb4f4a679ee62f/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CA2A3A","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":49707,"image":"new_data/images/track-covers/78628/conversions/1faa0b3d-e18b-43a9-83d5-13616b988a82-thumb-200.jpg","image_large":"new_data/images/track-covers/78628/conversions/1faa0b3d-e18b-43a9-83d5-13616b988a82-thumb-640.jpg","title":"اگر ستاره بودی","download_title":"If You Were A Star  Shadmehr Aghili","download_list_title":"اگر ستاره بودی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/36c376a91d945950f7f0abd5f0728cf3/320","quality":"320","demo":0},{"name":"handle/v1/tracks/36c376a91d945950f7f0abd5f0728cf3/160","quality":"160","demo":0},{"name":"handle/v1/tracks/36c376a91d945950f7f0abd5f0728cf3/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":43919,"image":"new_data/images/track-covers/73613/conversions/16a97086-5ec5-43db-be73-9ea147624780-thumb-200.jpg","image_large":"new_data/images/track-covers/73613/conversions/16a97086-5ec5-43db-be73-9ea147624780-thumb-640.jpg","title":"بی احساس (ریمیکس)","download_title":"Bi Ehsas (Dynatonic & DJ M.Nik Remix)  Shadmehr Aghili, Dynatonic","download_list_title":"بی احساس (ریمیکس)  شادمهر عقیلی، دایناتونیک","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/dba4275809c95e6c23fdfcd305406ac8/320","quality":"320","demo":0},{"name":"handle/v1/tracks/dba4275809c95e6c23fdfcd305406ac8/160","quality":"160","demo":0},{"name":"handle/v1/tracks/dba4275809c95e6c23fdfcd305406ac8/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null},{"id":138,"image":"new_data/images/artist-images/323/conversions/69bc0373-d99e-4d77-9aac-cba26d347976-thumb-300.jpg","image_large":"new_data/images/artist-images/323/conversions/69bc0373-d99e-4d77-9aac-cba26d347976-thumb-500.jpg","name":"دایناتونیک","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#4F4F4F","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":43558,"image":"new_data/images/track-covers/73252/conversions/9e36c42d-1e00-49f2-81cf-04cb297867c4-thumb-200.jpg","image_large":"new_data/images/track-covers/73252/conversions/9e36c42d-1e00-49f2-81cf-04cb297867c4-thumb-640.jpg","title":"قاضی","download_title":"Ghazi  Shadmehr Aghili","download_list_title":"قاضی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/193d45dbbb9b5988fdb9e1ede983709c/320","quality":"320","demo":0},{"name":"handle/v1/tracks/193d45dbbb9b5988fdb9e1ede983709c/160","quality":"160","demo":0},{"name":"handle/v1/tracks/193d45dbbb9b5988fdb9e1ede983709c/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B66E31","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4089,"image":"new_data/images/track-covers/33863/conversions/08e2349b-ea99-444e-8786-c1373b88b475-thumb-200.jpg","image_large":"new_data/images/track-covers/33863/conversions/08e2349b-ea99-444e-8786-c1373b88b475-thumb-640.jpg","title":"بی احساس","download_title":"Bi Ehsas  Shadmehr Aghili","download_list_title":"بی احساس  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/64fc827586c3070197da17ece3bf6744/320","quality":"320","demo":0},{"name":"handle/v1/tracks/64fc827586c3070197da17ece3bf6744/160","quality":"160","demo":0},{"name":"handle/v1/tracks/64fc827586c3070197da17ece3bf6744/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#DBAC9D","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":269477,"image":"new_data/images/track-covers/853646/conversions/0cc45307-168f-4d46-a84b-b0fc635a278a-thumb-200.jpg","image_large":"new_data/images/track-covers/853646/conversions/0cc45307-168f-4d46-a84b-b0fc635a278a-thumb-640.jpg","title":"عادت","download_title":"Aadat  Shadmehr Aghili","download_list_title":"عادت  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/79165f2cb3fa856e424834f6adc39e46/320","quality":"320","demo":0},{"name":"handle/v1/tracks/79165f2cb3fa856e424834f6adc39e46/160","quality":"160","demo":0},{"name":"handle/v1/tracks/79165f2cb3fa856e424834f6adc39e46/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#D88560","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4091,"image":"new_data/images/track-covers/33865/conversions/01da0cba-f99a-4e9e-a82d-03b26a19091f-thumb-200.jpg","image_large":"new_data/images/track-covers/33865/conversions/01da0cba-f99a-4e9e-a82d-03b26a19091f-thumb-640.jpg","title":"ترنر لا پژ","download_title":"Tourner La Page  Shadmehr Aghili","download_list_title":"ترنر لا پژ  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/412d4ed42fa9941dd483eda6660fb538/320","quality":"320","demo":0},{"name":"handle/v1/tracks/412d4ed42fa9941dd483eda6660fb538/160","quality":"160","demo":0},{"name":"handle/v1/tracks/412d4ed42fa9941dd483eda6660fb538/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#BA9D91","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4092,"image":"new_data/images/track-covers/33866/conversions/73b95b47-4f5c-44d5-b289-98ae1b6a2342-thumb-200.jpg","image_large":"new_data/images/track-covers/33866/conversions/73b95b47-4f5c-44d5-b289-98ae1b6a2342-thumb-640.jpg","title":"خواب خوش","download_title":"Khaabe Khosh  Shadmehr Aghili","download_list_title":"خواب خوش  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/914fe1b871f9ee02e348dce5a090538f/320","quality":"320","demo":0},{"name":"handle/v1/tracks/914fe1b871f9ee02e348dce5a090538f/160","quality":"160","demo":0},{"name":"handle/v1/tracks/914fe1b871f9ee02e348dce5a090538f/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B33D3E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4093,"image":"new_data/images/track-covers/33867/conversions/0ad8a0fe-1eb1-4252-af47-7ab285590932-thumb-200.jpg","image_large":"new_data/images/track-covers/33867/conversions/0ad8a0fe-1eb1-4252-af47-7ab285590932-thumb-640.jpg","title":"دور شدی (آنپلاگد)","download_title":"Door Shodi (Unplugged Version)  Shadmehr Aghili","download_list_title":"دور شدی (آنپلاگد)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ff613cda3fe3a312ce9d09debc52ff7e/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ff613cda3fe3a312ce9d09debc52ff7e/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ff613cda3fe3a312ce9d09debc52ff7e/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CEC295","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4094,"image":"new_data/images/track-covers/33868/conversions/9ee904ac-4ecc-47c2-b33c-3783c9b8c2bd-thumb-200.jpg","image_large":"new_data/images/track-covers/33868/conversions/9ee904ac-4ecc-47c2-b33c-3783c9b8c2bd-thumb-640.jpg","title":"معروف (ریمیکس)","download_title":"Maroof (Mehran Abbasi Remix)  Shadmehr Aghili, Mehran Abbasi","download_list_title":"معروف (ریمیکس)  شادمهر عقیلی، مهران عباسی و شایان فرهادی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/65745ae63c9a88eaa935d7e5fa405f25/320","quality":"320","demo":0},{"name":"handle/v1/tracks/65745ae63c9a88eaa935d7e5fa405f25/160","quality":"160","demo":0},{"name":"handle/v1/tracks/65745ae63c9a88eaa935d7e5fa405f25/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null},{"id":139,"image":null,"image_large":null,"name":"مهران عباسی و شایان فرهادی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#18ABC7","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4096,"image":"new_data/images/track-covers/33870/conversions/123f8d06-3321-424f-bbf9-5264ba573932-thumb-200.jpg","image_large":"new_data/images/track-covers/33870/conversions/123f8d06-3321-424f-bbf9-5264ba573932-thumb-640.jpg","title":"قلب من(زنده)","download_title":"Ghalbe Man (Live)  Shadmehr Aghili","download_list_title":"قلب من(زنده)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/7119fa4b33721c9387c56fcec0f7fc92/320","quality":"320","demo":0},{"name":"handle/v1/tracks/7119fa4b33721c9387c56fcec0f7fc92/160","quality":"160","demo":0},{"name":"handle/v1/tracks/7119fa4b33721c9387c56fcec0f7fc92/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#963C41","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4097,"image":"new_data/images/track-covers/33871/conversions/4d3777e7-0264-4998-b033-e895597fca5b-thumb-200.jpg","image_large":"new_data/images/track-covers/33871/conversions/4d3777e7-0264-4998-b033-e895597fca5b-thumb-640.jpg","title":"دور شدی","download_title":"Door Shodi  Shadmehr Aghili","download_list_title":"دور شدی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ff0861c3af34e7dcf001fcba308881cc/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ff0861c3af34e7dcf001fcba308881cc/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ff0861c3af34e7dcf001fcba308881cc/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#ECDD51","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4098,"image":"new_data/images/track-covers/33872/conversions/5bbd6ad0-36d7-4f5b-ae99-f346007128b9-thumb-200.jpg","image_large":"new_data/images/track-covers/33872/conversions/5bbd6ad0-36d7-4f5b-ae99-f346007128b9-thumb-640.jpg","title":"ویک می آپ (ریمیکس)","download_title":"Wake Me Up (MoMoRizza Remix)  Shadmehr Aghili, MoMoRizza","download_list_title":"ویک می آپ (ریمیکس)  شادمهر عقیلی، موموریزا و فرهاد جهانی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/562ebd4a94eee0f516dccd51b392fdd6/320","quality":"320","demo":0},{"name":"handle/v1/tracks/562ebd4a94eee0f516dccd51b392fdd6/160","quality":"160","demo":0},{"name":"handle/v1/tracks/562ebd4a94eee0f516dccd51b392fdd6/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null},{"id":640,"image":null,"image_large":null,"name":"موموریزا و فرهاد جهانی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#AB4CBC","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4099,"image":"new_data/images/track-covers/33873/conversions/5014ecaf-224d-4d92-92fa-e93c331f2555-thumb-200.jpg","image_large":"new_data/images/track-covers/33873/conversions/5014ecaf-224d-4d92-92fa-e93c331f2555-thumb-640.jpg","title":"وقتی که بد میشم","download_title":"Vaghti Ke Bad Misham  Shadmehr Aghili","download_list_title":"وقتی که بد میشم  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/c3457846bd1af2f2255e7db81e086392/320","quality":"320","demo":0},{"name":"handle/v1/tracks/c3457846bd1af2f2255e7db81e086392/160","quality":"160","demo":0},{"name":"handle/v1/tracks/c3457846bd1af2f2255e7db81e086392/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#2E6C9F","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4100,"image":"new_data/images/track-covers/33874/conversions/8d70fd47-68de-4ac7-91f0-c646dd8e5890-thumb-200.jpg","image_large":"new_data/images/track-covers/33874/conversions/8d70fd47-68de-4ac7-91f0-c646dd8e5890-thumb-640.jpg","title":"رابطه (زنده)","download_title":"Rabeteh (Live)  Shadmehr Aghili","download_list_title":"رابطه (زنده)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/bc09c9c77b259f0e397ad596c0d7144e/320","quality":"320","demo":0},{"name":"handle/v1/tracks/bc09c9c77b259f0e397ad596c0d7144e/160","quality":"160","demo":0},{"name":"handle/v1/tracks/bc09c9c77b259f0e397ad596c0d7144e/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#626DE6","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4101,"image":"new_data/images/track-covers/33875/conversions/9960425b-e309-4b9e-b8bf-df0c11826473-thumb-200.jpg","image_large":"new_data/images/track-covers/33875/conversions/9960425b-e309-4b9e-b8bf-df0c11826473-thumb-640.jpg","title":"کوه","download_title":"Kooh  Shadmehr Aghili","download_list_title":"کوه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/71c4aaacdfd2dceae5407d937ec7718b/320","quality":"320","demo":0},{"name":"handle/v1/tracks/71c4aaacdfd2dceae5407d937ec7718b/160","quality":"160","demo":0},{"name":"handle/v1/tracks/71c4aaacdfd2dceae5407d937ec7718b/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#21A0A8","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4102,"image":"new_data/images/track-covers/33876/conversions/419e0427-0218-4e5f-952d-d0a85b5c0b33-thumb-200.jpg","image_large":"new_data/images/track-covers/33876/conversions/419e0427-0218-4e5f-952d-d0a85b5c0b33-thumb-640.jpg","title":"وقتی حواست نیست","download_title":"Vaghti Havaset Nist  Shadmehr Aghili","download_list_title":"وقتی حواست نیست  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ca23e97038f16bd238eabe96a23b9ed2/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ca23e97038f16bd238eabe96a23b9ed2/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ca23e97038f16bd238eabe96a23b9ed2/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#405893","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4164,"image":"new_data/images/track-covers/33938/conversions/e3813ec2-6e4e-43af-8c1f-2ed91d1a0d93-thumb-200.jpg","image_large":"new_data/images/track-covers/33938/conversions/e3813ec2-6e4e-43af-8c1f-2ed91d1a0d93-thumb-640.jpg","title":"یه قفس","download_title":"Ye Ghafas  Shadmehr Aghili","download_list_title":"یه قفس  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/98d99c32a2dcb28384e7039eb310da5b/320","quality":"320","demo":0},{"name":"handle/v1/tracks/98d99c32a2dcb28384e7039eb310da5b/160","quality":"160","demo":0},{"name":"handle/v1/tracks/98d99c32a2dcb28384e7039eb310da5b/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#794B2F","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4162,"image":"new_data/images/track-covers/33936/conversions/5e8c81da-4b02-4fd9-902c-460eac67b23b-thumb-200.jpg","image_large":"new_data/images/track-covers/33936/conversions/5e8c81da-4b02-4fd9-902c-460eac67b23b-thumb-640.jpg","title":"تصویر","download_title":"Tasvir  Shadmehr Aghili","download_list_title":"تصویر  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/7ca523d35e1bc08c4556ab77c23917ad/320","quality":"320","demo":0},{"name":"handle/v1/tracks/7ca523d35e1bc08c4556ab77c23917ad/160","quality":"160","demo":0},{"name":"handle/v1/tracks/7ca523d35e1bc08c4556ab77c23917ad/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#7A4C31","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4161,"image":"new_data/images/track-covers/33935/conversions/07482529-1e24-40b9-9f3a-f6eebe3cb08e-thumb-200.jpg","image_large":"new_data/images/track-covers/33935/conversions/07482529-1e24-40b9-9f3a-f6eebe3cb08e-thumb-640.jpg","title":"صدام بزن","download_title":"Sedam Bezan  Shadmehr Aghili","download_list_title":"صدام بزن  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/2dec7b99a9f9d4e0a16c90e45925185e/320","quality":"320","demo":0},{"name":"handle/v1/tracks/2dec7b99a9f9d4e0a16c90e45925185e/160","quality":"160","demo":0},{"name":"handle/v1/tracks/2dec7b99a9f9d4e0a16c90e45925185e/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#7A4C31","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4159,"image":"new_data/images/track-covers/33933/conversions/82acd48e-174a-4171-aad5-9e4e7b571aa4-thumb-200.jpg","image_large":"new_data/images/track-covers/33933/conversions/82acd48e-174a-4171-aad5-9e4e7b571aa4-thumb-640.jpg","title":"نقطه ضعف","download_title":"Noghte Zaaf  Shadmehr Aghili","download_list_title":"نقطه ضعف  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/0e67c2d6e4b5a8f8bccf9298a8376816/320","quality":"320","demo":0},{"name":"handle/v1/tracks/0e67c2d6e4b5a8f8bccf9298a8376816/160","quality":"160","demo":0},{"name":"handle/v1/tracks/0e67c2d6e4b5a8f8bccf9298a8376816/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#794B30","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4157,"image":"new_data/images/track-covers/33931/conversions/4ba4fe5c-5195-49c4-be14-a1897019af4a-thumb-200.jpg","image_large":"new_data/images/track-covers/33931/conversions/4ba4fe5c-5195-49c4-be14-a1897019af4a-thumb-640.jpg","title":"فرصت","download_title":"Forsat  Shadmehr Aghili","download_list_title":"فرصت  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ce2d16e4611e0f4f48fd2d7b86ceca63/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ce2d16e4611e0f4f48fd2d7b86ceca63/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ce2d16e4611e0f4f48fd2d7b86ceca63/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#7B4D31","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4103,"image":"new_data/images/track-covers/33877/conversions/129fe9f3-b651-4679-a540-466fa584036c-thumb-200.jpg","image_large":"new_data/images/track-covers/33877/conversions/129fe9f3-b651-4679-a540-466fa584036c-thumb-640.jpg","title":"اعتراف","download_title":"Eteraf  Shadmehr Aghili","download_list_title":"اعتراف  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/4cf5aefcc38a59ee3fc8e293775db6a8/320","quality":"320","demo":0},{"name":"handle/v1/tracks/4cf5aefcc38a59ee3fc8e293775db6a8/160","quality":"160","demo":0},{"name":"handle/v1/tracks/4cf5aefcc38a59ee3fc8e293775db6a8/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#794B30","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4106,"image":"new_data/images/track-covers/33880/conversions/071622a4-8ba3-4bb8-a69b-d4a08a087477-thumb-200.jpg","image_large":"new_data/images/track-covers/33880/conversions/071622a4-8ba3-4bb8-a69b-d4a08a087477-thumb-640.jpg","title":"روز سرد (اجرای زنده)","download_title":"Rooze Sard (Live)  Shadmehr Aghili","download_list_title":"روز سرد (اجرای زنده)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/b74a19ccff5604f3979dc4b9bf266cda/320","quality":"320","demo":0},{"name":"handle/v1/tracks/b74a19ccff5604f3979dc4b9bf266cda/160","quality":"160","demo":0},{"name":"handle/v1/tracks/b74a19ccff5604f3979dc4b9bf266cda/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#88A7BF","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4107,"image":"new_data/images/track-covers/33881/conversions/1f46dc15-52da-4785-bee9-4521b770380f-thumb-200.jpg","image_large":"new_data/images/track-covers/33881/conversions/1f46dc15-52da-4785-bee9-4521b770380f-thumb-640.jpg","title":"تقدیر(اجرای زنده)","download_title":"Taghdir (Live)  Shadmehr Aghili","download_list_title":"تقدیر(اجرای زنده)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/5fc894324296789824c865455349752d/320","quality":"320","demo":0},{"name":"handle/v1/tracks/5fc894324296789824c865455349752d/160","quality":"160","demo":0},{"name":"handle/v1/tracks/5fc894324296789824c865455349752d/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4109,"image":"new_data/images/track-covers/33883/conversions/98880127-4a79-4da1-a919-a5b6eeabdec0-thumb-200.jpg","image_large":"new_data/images/track-covers/33883/conversions/98880127-4a79-4da1-a919-a5b6eeabdec0-thumb-640.jpg","title":"غرور (ورژن جدید)","download_title":"Ghoroor (Clean Version)  Shadmehr Aghili","download_list_title":"غرور (ورژن جدید)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/1d94ba62d7d5df9e4e5aff09ed0b3083/320","quality":"320","demo":0},{"name":"handle/v1/tracks/1d94ba62d7d5df9e4e5aff09ed0b3083/160","quality":"160","demo":0},{"name":"handle/v1/tracks/1d94ba62d7d5df9e4e5aff09ed0b3083/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#20CBD6","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4110,"image":"new_data/images/track-covers/33884/conversions/87b3cb96-23bc-4586-a8e9-f267adacf0b8-thumb-200.jpg","image_large":"new_data/images/track-covers/33884/conversions/87b3cb96-23bc-4586-a8e9-f267adacf0b8-thumb-640.jpg","title":"عقل و عشق (زنده)","download_title":"Aghl O Eshgh (Live)  Shadmehr Aghili","download_list_title":"عقل و عشق (زنده)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/fe77e4db136f4ad38cd12a771764bf6a/320","quality":"320","demo":0},{"name":"handle/v1/tracks/fe77e4db136f4ad38cd12a771764bf6a/160","quality":"160","demo":0},{"name":"handle/v1/tracks/fe77e4db136f4ad38cd12a771764bf6a/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#489CEA","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4111,"image":"new_data/images/track-covers/33885/conversions/73007cda-9582-4dad-b15e-6f112881aa0f-thumb-200.jpg","image_large":"new_data/images/track-covers/33885/conversions/73007cda-9582-4dad-b15e-6f112881aa0f-thumb-640.jpg","title":"روز سرد(آنپلاگد)","download_title":"Rooze Sard (Unpluged)  Shadmehr Aghili","download_list_title":"روز سرد(آنپلاگد)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/7ae9ce19eaf65c65b38ba4410bc11605/320","quality":"320","demo":0},{"name":"handle/v1/tracks/7ae9ce19eaf65c65b38ba4410bc11605/160","quality":"160","demo":0},{"name":"handle/v1/tracks/7ae9ce19eaf65c65b38ba4410bc11605/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#8097A8","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4112,"image":"new_data/images/track-covers/33886/conversions/8a17f394-416b-415b-b4d9-53eae8df7369-thumb-200.jpg","image_large":"new_data/images/track-covers/33886/conversions/8a17f394-416b-415b-b4d9-53eae8df7369-thumb-640.jpg","title":"روز سرد (بیکلام)","download_title":"Rooze Sard (Instrumental)  Shadmehr Aghili","download_list_title":"روز سرد (بیکلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/d1abd8f30a271b0c2b6b2ae0c1a65ba8/320","quality":"320","demo":0},{"name":"handle/v1/tracks/d1abd8f30a271b0c2b6b2ae0c1a65ba8/160","quality":"160","demo":0},{"name":"handle/v1/tracks/d1abd8f30a271b0c2b6b2ae0c1a65ba8/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4171,"image":"new_data/images/track-covers/33945/conversions/891f21a4-a463-45ce-aa1f-394eafb0b211-thumb-200.jpg","image_large":"new_data/images/track-covers/33945/conversions/891f21a4-a463-45ce-aa1f-394eafb0b211-thumb-640.jpg","title":"تکرارم نکن","download_title":"Tekraram Nakon  Shadmehr Aghili","download_list_title":"تکرارم نکن  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/9e2af16c5bee87f1c2a28eec4ec5efe6/320","quality":"320","demo":0},{"name":"handle/v1/tracks/9e2af16c5bee87f1c2a28eec4ec5efe6/160","quality":"160","demo":0},{"name":"handle/v1/tracks/9e2af16c5bee87f1c2a28eec4ec5efe6/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C8546E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4170,"image":"new_data/images/track-covers/33944/conversions/2fe04465-b663-40d2-9562-57d108ca91ea-thumb-200.jpg","image_large":"new_data/images/track-covers/33944/conversions/2fe04465-b663-40d2-9562-57d108ca91ea-thumb-640.jpg","title":"ادامه میدمت","download_title":"Edame Midamet  Shadmehr Aghili","download_list_title":"ادامه میدمت  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/bac25af345abe68e8380b3b06cb591c0/320","quality":"320","demo":0},{"name":"handle/v1/tracks/bac25af345abe68e8380b3b06cb591c0/160","quality":"160","demo":0},{"name":"handle/v1/tracks/bac25af345abe68e8380b3b06cb591c0/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C9546E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4169,"image":"new_data/images/track-covers/33943/conversions/5a17ed58-98a1-4279-87e8-ca38d20f7d3c-thumb-200.jpg","image_large":"new_data/images/track-covers/33943/conversions/5a17ed58-98a1-4279-87e8-ca38d20f7d3c-thumb-640.jpg","title":"عقل و عشق","download_title":"Aghl O Eshgh  Shadmehr Aghili","download_list_title":"عقل و عشق  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/2292a74954742687a7dc45c97435c3c4/320","quality":"320","demo":0},{"name":"handle/v1/tracks/2292a74954742687a7dc45c97435c3c4/160","quality":"160","demo":0},{"name":"handle/v1/tracks/2292a74954742687a7dc45c97435c3c4/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C9546E","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4168,"image":"new_data/images/track-covers/33942/conversions/a21687c9-0977-4775-816e-47dfdff940a4-thumb-200.jpg","image_large":"new_data/images/track-covers/33942/conversions/a21687c9-0977-4775-816e-47dfdff940a4-thumb-640.jpg","title":"غرور","download_title":"Ghoroor  Shadmehr Aghili","download_list_title":"غرور  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/851cfcf4910a587a4725e47314f119d4/320","quality":"320","demo":0},{"name":"handle/v1/tracks/851cfcf4910a587a4725e47314f119d4/160","quality":"160","demo":0},{"name":"handle/v1/tracks/851cfcf4910a587a4725e47314f119d4/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C9546E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4167,"image":"new_data/images/track-covers/33941/conversions/3c08f638-0360-46cf-a944-793f17a175ea-thumb-200.jpg","image_large":"new_data/images/track-covers/33941/conversions/3c08f638-0360-46cf-a944-793f17a175ea-thumb-640.jpg","title":"تنهائیام","download_title":"Tanhaeeiam  Shadmehr Aghili","download_list_title":"تنهائیام  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/00aae57722c97bdc90a507b588d66818/320","quality":"320","demo":0},{"name":"handle/v1/tracks/00aae57722c97bdc90a507b588d66818/160","quality":"160","demo":0},{"name":"handle/v1/tracks/00aae57722c97bdc90a507b588d66818/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C9546E","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4166,"image":"new_data/images/track-covers/33940/conversions/781f7c61-f175-4b50-8c7e-44c439b4d1d6-thumb-200.jpg","image_large":"new_data/images/track-covers/33940/conversions/781f7c61-f175-4b50-8c7e-44c439b4d1d6-thumb-640.jpg","title":"همیشگی","download_title":"Hamishegi  Shadmehr Aghili","download_list_title":"همیشگی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ebb01ce2a1aa6f49821ca5c533044999/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ebb01ce2a1aa6f49821ca5c533044999/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ebb01ce2a1aa6f49821ca5c533044999/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C9546E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4165,"image":"new_data/images/track-covers/33939/conversions/fa19fa8e-d385-4680-95e8-359e22bc10c6-thumb-200.jpg","image_large":"new_data/images/track-covers/33939/conversions/fa19fa8e-d385-4680-95e8-359e22bc10c6-thumb-640.jpg","title":"تجربه کن","download_title":"Tajrobeh Kon  Shadmehr Aghili","download_list_title":"تجربه کن  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/fa7d938186d161b3c78b8fe40a69d866/320","quality":"320","demo":0},{"name":"handle/v1/tracks/fa7d938186d161b3c78b8fe40a69d866/160","quality":"160","demo":0},{"name":"handle/v1/tracks/fa7d938186d161b3c78b8fe40a69d866/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C8546E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4113,"image":"new_data/images/track-covers/33887/conversions/eac88218-c8c2-4e45-bfa8-a4f3f14929de-thumb-200.jpg","image_large":"new_data/images/track-covers/33887/conversions/eac88218-c8c2-4e45-bfa8-a4f3f14929de-thumb-640.jpg","title":"روز سرد","download_title":"Rooze Sard  Shadmehr Aghili","download_list_title":"روز سرد  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/2718259079971bc5011d98238ca51bcc/320","quality":"320","demo":0},{"name":"handle/v1/tracks/2718259079971bc5011d98238ca51bcc/160","quality":"160","demo":0},{"name":"handle/v1/tracks/2718259079971bc5011d98238ca51bcc/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C8546E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4125,"image":"new_data/images/track-covers/33899/conversions/1b7d39e0-bf69-44d3-9275-0567d99be8e6-thumb-200.jpg","image_large":"new_data/images/track-covers/33899/conversions/1b7d39e0-bf69-44d3-9275-0567d99be8e6-thumb-640.jpg","title":"من از خدامه","download_title":"Man Az Khodameh  Shadmehr Aghili","download_list_title":"من از خدامه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/aca0ece87662d876471cc69da803eafb/320","quality":"320","demo":0},{"name":"handle/v1/tracks/aca0ece87662d876471cc69da803eafb/160","quality":"160","demo":0},{"name":"handle/v1/tracks/aca0ece87662d876471cc69da803eafb/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C23C3A","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4123,"image":"new_data/images/track-covers/33897/conversions/65ba8a87-88e9-4877-9e4c-50365bd5d7c3-thumb-200.jpg","image_large":"new_data/images/track-covers/33897/conversions/65ba8a87-88e9-4877-9e4c-50365bd5d7c3-thumb-640.jpg","title":"آغوش (ریمیکس)","download_title":"Aghoosh (Remix)  Shadmehr Aghili, MoMoRizza","download_list_title":"آغوش (ریمیکس)  شادمهر عقیلی، موموریزا و فرهاد جهانی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/927b7861eb0f59c2afff0179e3b70f5c/320","quality":"320","demo":0},{"name":"handle/v1/tracks/927b7861eb0f59c2afff0179e3b70f5c/160","quality":"160","demo":0},{"name":"handle/v1/tracks/927b7861eb0f59c2afff0179e3b70f5c/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null},{"id":640,"image":null,"image_large":null,"name":"موموریزا و فرهاد جهانی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C72022","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4122,"image":"new_data/images/track-covers/33896/conversions/5fdb653d-04b8-4cbb-88e9-bc8e69a2b7cb-thumb-200.jpg","image_large":"new_data/images/track-covers/33896/conversions/5fdb653d-04b8-4cbb-88e9-bc8e69a2b7cb-thumb-640.jpg","title":"منو از خواب بیدار کن (زنده)","download_title":"Wake Me Up (Live)  Shadmehr Aghili","download_list_title":"منو از خواب بیدار کن (زنده)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/11a944105d582b5d30412dd7397eb53d/320","quality":"320","demo":0},{"name":"handle/v1/tracks/11a944105d582b5d30412dd7397eb53d/160","quality":"160","demo":0},{"name":"handle/v1/tracks/11a944105d582b5d30412dd7397eb53d/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#693CBC","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4121,"image":"new_data/images/track-covers/33895/conversions/e9deb829-8735-4b7d-88a6-c037744a0bd3-thumb-200.jpg","image_large":"new_data/images/track-covers/33895/conversions/e9deb829-8735-4b7d-88a6-c037744a0bd3-thumb-640.jpg","title":"امون از تو (ریمیکس)","download_title":"Amon Az To (Kawoos Hosseini Remix)  Shadmehr Aghili, Kawoos Hosseini","download_list_title":"امون از تو (ریمیکس)  شادمهر عقیلی، کاووس حسینی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/be355c72dd1fb1f0c3cf2b122663d1cd/320","quality":"320","demo":0},{"name":"handle/v1/tracks/be355c72dd1fb1f0c3cf2b122663d1cd/160","quality":"160","demo":0},{"name":"handle/v1/tracks/be355c72dd1fb1f0c3cf2b122663d1cd/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null},{"id":144,"image":null,"image_large":null,"name":"کاووس حسینی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4127,"image":"new_data/images/track-covers/33901/conversions/af9337da-a8c0-4564-bfec-ed47867bee2d-thumb-200.jpg","image_large":"new_data/images/track-covers/33901/conversions/af9337da-a8c0-4564-bfec-ed47867bee2d-thumb-640.jpg","title":"رویای ما","download_title":"Royaye Ma  Shadmehr Aghili, Ebi","download_list_title":"رویای ما  شادمهر عقیلی، ابی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/41d2ddc06824b51f1db3b8ffa30e736f/320","quality":"320","demo":0},{"name":"handle/v1/tracks/41d2ddc06824b51f1db3b8ffa30e736f/160","quality":"160","demo":0},{"name":"handle/v1/tracks/41d2ddc06824b51f1db3b8ffa30e736f/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null},{"id":121,"image":"new_data/images/artist-images/315/conversions/d426ee6e-c176-4077-bd58-e2676aa0ab31-thumb-300.jpg","image_large":"new_data/images/artist-images/315/conversions/d426ee6e-c176-4077-bd58-e2676aa0ab31-thumb-500.jpg","name":"ابی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#F7DC24","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4124,"image":"new_data/images/track-covers/33898/conversions/6354de4b-74b0-49e9-8eb8-8a819cf8934d-thumb-200.jpg","image_large":"new_data/images/track-covers/33898/conversions/6354de4b-74b0-49e9-8eb8-8a819cf8934d-thumb-640.jpg","title":"رابطه","download_title":"Rabete  Shadmehr Aghili","download_list_title":"رابطه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/6f1699ccc136324ab1542bee2abc4538/320","quality":"320","demo":0},{"name":"handle/v1/tracks/6f1699ccc136324ab1542bee2abc4538/160","quality":"160","demo":0},{"name":"handle/v1/tracks/6f1699ccc136324ab1542bee2abc4538/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B0996C","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":46662,"image":"new_data/images/track-covers/76019/conversions/9c198a97-f18a-4718-a504-4ea7597de556-thumb-200.jpg","image_large":"new_data/images/track-covers/76019/conversions/9c198a97-f18a-4718-a504-4ea7597de556-thumb-640.jpg","title":"پاییز","download_title":"Paeez  Shadmehr Aghili","download_list_title":"پاییز  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/65e65a5367f3afa14a0978652c9178da/320","quality":"320","demo":0},{"name":"handle/v1/tracks/65e65a5367f3afa14a0978652c9178da/160","quality":"160","demo":0},{"name":"handle/v1/tracks/65e65a5367f3afa14a0978652c9178da/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A37665","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":46661,"image":"new_data/images/track-covers/76018/conversions/1d80a692-7929-4896-b508-17ef0d874830-thumb-200.jpg","image_large":"new_data/images/track-covers/76018/conversions/1d80a692-7929-4896-b508-17ef0d874830-thumb-640.jpg","title":"دهاتی","download_title":"Dehati  Shadmehr Aghili","download_list_title":"دهاتی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/083fcf3ff95c148c8d110ff63f579f20/320","quality":"320","demo":0},{"name":"handle/v1/tracks/083fcf3ff95c148c8d110ff63f579f20/160","quality":"160","demo":0},{"name":"handle/v1/tracks/083fcf3ff95c148c8d110ff63f579f20/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A27564","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":44850,"image":"new_data/images/track-covers/74499/conversions/0195ee65-4bec-49a9-a270-0c9c25aa4bac-thumb-200.jpg","image_large":"new_data/images/track-covers/74499/conversions/0195ee65-4bec-49a9-a270-0c9c25aa4bac-thumb-640.jpg","title":"آرزوها","download_title":"Arezouha  Shadmehr Aghili","download_list_title":"آرزوها  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/99c4868163b14c83cc87f3f0291d54de/320","quality":"320","demo":0},{"name":"handle/v1/tracks/99c4868163b14c83cc87f3f0291d54de/160","quality":"160","demo":0},{"name":"handle/v1/tracks/99c4868163b14c83cc87f3f0291d54de/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#E0712F","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":44277,"image":"new_data/images/track-covers/73960/conversions/e824e10b-bd51-43c4-ab22-143bb75fb45b-thumb-200.jpg","image_large":"new_data/images/track-covers/73960/conversions/e824e10b-bd51-43c4-ab22-143bb75fb45b-thumb-640.jpg","title":"از محبت 1 (بیکلام)","download_title":"Shadmehr Aghili Az Mohabat  Shadmehr Aghili","download_list_title":"از محبت 1 (بیکلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/5e710044ca298cfa1d84b2710f7e8878/320","quality":"320","demo":0},{"name":"handle/v1/tracks/5e710044ca298cfa1d84b2710f7e8878/160","quality":"160","demo":0},{"name":"handle/v1/tracks/5e710044ca298cfa1d84b2710f7e8878/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#577FA6","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4177,"image":"new_data/images/track-covers/33951/conversions/ec3ff422-9604-4970-a8a7-c54548afd49b-thumb-200.jpg","image_large":"new_data/images/track-covers/33951/conversions/ec3ff422-9604-4970-a8a7-c54548afd49b-thumb-640.jpg","title":"چه خوابایی","download_title":"Che Khabhayi  Shadmehr Aghili","download_list_title":"چه خوابایی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/17ee90a08dae5946ab39eb63bbd1d85c/320","quality":"320","demo":0},{"name":"handle/v1/tracks/17ee90a08dae5946ab39eb63bbd1d85c/160","quality":"160","demo":0},{"name":"handle/v1/tracks/17ee90a08dae5946ab39eb63bbd1d85c/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#95766C","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4186,"image":"new_data/images/track-covers/33960/conversions/582ae312-8285-4898-b232-3b5d18cc9b1c-thumb-200.jpg","image_large":"new_data/images/track-covers/33960/conversions/582ae312-8285-4898-b232-3b5d18cc9b1c-thumb-640.jpg","title":"جاده (بیکلام)","download_title":"Jaddeh (Bi Kalam)  Shadmehr Aghili","download_list_title":"جاده (بیکلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ea4ca1c49cfd8e3dacd929430bf30d46/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ea4ca1c49cfd8e3dacd929430bf30d46/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ea4ca1c49cfd8e3dacd929430bf30d46/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#AC6755","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4184,"image":"new_data/images/track-covers/33958/conversions/e42da7ce-ace9-4b87-bc37-ac5f91b35cc8-thumb-200.jpg","image_large":"new_data/images/track-covers/33958/conversions/e42da7ce-ace9-4b87-bc37-ac5f91b35cc8-thumb-640.jpg","title":"معبود","download_title":"Ma'Aboud  Shadmehr Aghili","download_list_title":"معبود  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/90d1e682088bdcc7d807eb4e76d0b6d8/320","quality":"320","demo":0},{"name":"handle/v1/tracks/90d1e682088bdcc7d807eb4e76d0b6d8/160","quality":"160","demo":0},{"name":"handle/v1/tracks/90d1e682088bdcc7d807eb4e76d0b6d8/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#AC6755","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4183,"image":"new_data/images/track-covers/33957/conversions/2efbda91-b960-4476-bac4-24771f043a72-thumb-200.jpg","image_large":"new_data/images/track-covers/33957/conversions/2efbda91-b960-4476-bac4-24771f043a72-thumb-640.jpg","title":"بی نهایت شب","download_title":"Bi Nahayte Shab  Shadmehr Aghili","download_list_title":"بی نهایت شب  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ddc7c6064a458678931dc327bfc9ecba/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ddc7c6064a458678931dc327bfc9ecba/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ddc7c6064a458678931dc327bfc9ecba/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#AC6755","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4182,"image":"new_data/images/track-covers/33956/conversions/0b4a290d-9538-4b4d-a28c-0ad8786c6230-thumb-200.jpg","image_large":"new_data/images/track-covers/33956/conversions/0b4a290d-9538-4b4d-a28c-0ad8786c6230-thumb-640.jpg","title":"غم تنهایی","download_title":"Ghame Tanhaei  Shadmehr Aghili","download_list_title":"غم تنهایی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/8641eaf6da31b9adf1a7b4d2293a26ed/320","quality":"320","demo":0},{"name":"handle/v1/tracks/8641eaf6da31b9adf1a7b4d2293a26ed/160","quality":"160","demo":0},{"name":"handle/v1/tracks/8641eaf6da31b9adf1a7b4d2293a26ed/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#AC6755","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4193,"image":"new_data/images/track-covers/33967/conversions/077c1d71-9aac-4d61-bd84-6e09b17394ed-thumb-200.jpg","image_large":"new_data/images/track-covers/33967/conversions/077c1d71-9aac-4d61-bd84-6e09b17394ed-thumb-640.jpg","title":"سبب","download_title":"Sabab  Shadmehr Aghili","download_list_title":"سبب  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/bfe2b9a73d7ba8543d8ca42df2dc679c/320","quality":"320","demo":0},{"name":"handle/v1/tracks/bfe2b9a73d7ba8543d8ca42df2dc679c/160","quality":"160","demo":0},{"name":"handle/v1/tracks/bfe2b9a73d7ba8543d8ca42df2dc679c/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B69D32","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4192,"image":"new_data/images/track-covers/33966/conversions/ecf12c5d-0e12-4d8a-be4e-a74458f3a4d6-thumb-200.jpg","image_large":"new_data/images/track-covers/33966/conversions/ecf12c5d-0e12-4d8a-be4e-a74458f3a4d6-thumb-640.jpg","title":"یکاری کن","download_title":"Ye Kari Kon  Shadmehr Aghili","download_list_title":"یکاری کن  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/bd3dce88fff9b7d39b72d29b0f9599d8/320","quality":"320","demo":0},{"name":"handle/v1/tracks/bd3dce88fff9b7d39b72d29b0f9599d8/160","quality":"160","demo":0},{"name":"handle/v1/tracks/bd3dce88fff9b7d39b72d29b0f9599d8/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B69D32","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4191,"image":"new_data/images/track-covers/33965/conversions/be6f05d4-7722-42a3-860e-8f00887a54a4-thumb-200.jpg","image_large":"new_data/images/track-covers/33965/conversions/be6f05d4-7722-42a3-860e-8f00887a54a4-thumb-640.jpg","title":"رسیدی","download_title":"Residi  Shadmehr Aghili","download_list_title":"رسیدی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/9a4bc403062d27cdaee873124f176c8e/320","quality":"320","demo":0},{"name":"handle/v1/tracks/9a4bc403062d27cdaee873124f176c8e/160","quality":"160","demo":0},{"name":"handle/v1/tracks/9a4bc403062d27cdaee873124f176c8e/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B69D32","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4190,"image":"new_data/images/track-covers/33964/conversions/6c1b8cca-e730-4dad-858c-b3b8839ad47c-thumb-200.jpg","image_large":"new_data/images/track-covers/33964/conversions/6c1b8cca-e730-4dad-858c-b3b8839ad47c-thumb-640.jpg","title":"ترس","download_title":"Tars  Shadmehr Aghili","download_list_title":"ترس  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/f4acbdb22817f4ec267c5b12335cb4f0/320","quality":"320","demo":0},{"name":"handle/v1/tracks/f4acbdb22817f4ec267c5b12335cb4f0/160","quality":"160","demo":0},{"name":"handle/v1/tracks/f4acbdb22817f4ec267c5b12335cb4f0/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B69E32","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4189,"image":"new_data/images/track-covers/33963/conversions/bca05a31-92d0-4611-94ce-9613d660b5e0-thumb-200.jpg","image_large":"new_data/images/track-covers/33963/conversions/bca05a31-92d0-4611-94ce-9613d660b5e0-thumb-640.jpg","title":"شیلا","download_title":"Shila  Shadmehr Aghili","download_list_title":"شیلا  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/5416f179040bf179c0183e9c50d9f14b/320","quality":"320","demo":0},{"name":"handle/v1/tracks/5416f179040bf179c0183e9c50d9f14b/160","quality":"160","demo":0},{"name":"handle/v1/tracks/5416f179040bf179c0183e9c50d9f14b/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B69D32","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4188,"image":"new_data/images/track-covers/33962/conversions/5c7a138b-5e90-48e6-9b99-a685d1ca90bc-thumb-200.jpg","image_large":"new_data/images/track-covers/33962/conversions/5c7a138b-5e90-48e6-9b99-a685d1ca90bc-thumb-640.jpg","title":"مشکوک","download_title":"Mashkook  Shadmehr Aghili","download_list_title":"مشکوک  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/bb28e31c4c40fd8d4405a6a9c0f97b62/320","quality":"320","demo":0},{"name":"handle/v1/tracks/bb28e31c4c40fd8d4405a6a9c0f97b62/160","quality":"160","demo":0},{"name":"handle/v1/tracks/bb28e31c4c40fd8d4405a6a9c0f97b62/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B69D32","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4187,"image":"new_data/images/track-covers/33961/conversions/c9ff77d8-8f6f-4f37-ab7d-bf33bc0d6f13-thumb-200.jpg","image_large":"new_data/images/track-covers/33961/conversions/c9ff77d8-8f6f-4f37-ab7d-bf33bc0d6f13-thumb-640.jpg","title":"خیال","download_title":"Khial  Shadmehr Aghili","download_list_title":"خیال  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/052b2a5d5c0562c7021c59e1e5abaca0/320","quality":"320","demo":0},{"name":"handle/v1/tracks/052b2a5d5c0562c7021c59e1e5abaca0/160","quality":"160","demo":0},{"name":"handle/v1/tracks/052b2a5d5c0562c7021c59e1e5abaca0/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B69D32","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4138,"image":"new_data/images/track-covers/33912/conversions/c9076ab6-ab2c-47d4-ae40-c03de6ad896b-thumb-200.jpg","image_large":"new_data/images/track-covers/33912/conversions/c9076ab6-ab2c-47d4-ae40-c03de6ad896b-thumb-640.jpg","title":"دختر آتیش پاره","download_title":"Dokhtare Atish Pareh  Shadmehr Aghili","download_list_title":"دختر آتیش پاره  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/0d107b34391a8a2a750f7cb032b70363/320","quality":"320","demo":0},{"name":"handle/v1/tracks/0d107b34391a8a2a750f7cb032b70363/160","quality":"160","demo":0},{"name":"handle/v1/tracks/0d107b34391a8a2a750f7cb032b70363/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4202,"image":"new_data/images/track-covers/33976/conversions/a1ace3c7-7b9b-45f9-8c09-e143c071a2ed-thumb-200.jpg","image_large":"new_data/images/track-covers/33976/conversions/a1ace3c7-7b9b-45f9-8c09-e143c071a2ed-thumb-640.jpg","title":"غم تنهایی","download_title":"Ghame Tanhayi  Shadmehr Aghili","download_list_title":"غم تنهایی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/f4b12398540edfdd47b2596b173fc999/320","quality":"320","demo":0},{"name":"handle/v1/tracks/f4b12398540edfdd47b2596b173fc999/160","quality":"160","demo":0},{"name":"handle/v1/tracks/f4b12398540edfdd47b2596b173fc999/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CC1C26","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4201,"image":"new_data/images/track-covers/33975/conversions/05826fba-0c8c-434a-94ac-8c57f7f52d8d-thumb-200.jpg","image_large":"new_data/images/track-covers/33975/conversions/05826fba-0c8c-434a-94ac-8c57f7f52d8d-thumb-640.jpg","title":"کعبه ی عشق","download_title":"Kabe Eshgh  Shadmehr Aghili","download_list_title":"کعبه ی عشق  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/022ab49973049ed2078d02f633dfc64e/320","quality":"320","demo":0},{"name":"handle/v1/tracks/022ab49973049ed2078d02f633dfc64e/160","quality":"160","demo":0},{"name":"handle/v1/tracks/022ab49973049ed2078d02f633dfc64e/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CC1C26","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4200,"image":"new_data/images/track-covers/33974/conversions/72b5bd73-b992-4f5e-9293-8931d29a16ea-thumb-200.jpg","image_large":"new_data/images/track-covers/33974/conversions/72b5bd73-b992-4f5e-9293-8931d29a16ea-thumb-640.jpg","title":"موزیک","download_title":"Music  Shadmehr Aghili","download_list_title":"موزیک  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/20bac8a323a608b3dc3a9b43d4259209/320","quality":"320","demo":0},{"name":"handle/v1/tracks/20bac8a323a608b3dc3a9b43d4259209/160","quality":"160","demo":0},{"name":"handle/v1/tracks/20bac8a323a608b3dc3a9b43d4259209/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CD1C26","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4199,"image":"new_data/images/track-covers/33973/conversions/8e1bac1e-69ee-4b0e-9f56-d353d703e846-thumb-200.jpg","image_large":"new_data/images/track-covers/33973/conversions/8e1bac1e-69ee-4b0e-9f56-d353d703e846-thumb-640.jpg","title":"شب برهنه","download_title":"Shabe Berahneh  Shadmehr Aghili","download_list_title":"شب برهنه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/cb0a6656c282c89c133895ce14d0c362/320","quality":"320","demo":0},{"name":"handle/v1/tracks/cb0a6656c282c89c133895ce14d0c362/160","quality":"160","demo":0},{"name":"handle/v1/tracks/cb0a6656c282c89c133895ce14d0c362/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CC1C26","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4198,"image":"new_data/images/track-covers/33972/conversions/ec2e89cf-f5a4-4579-9cb6-676c161e6cef-thumb-200.jpg","image_large":"new_data/images/track-covers/33972/conversions/ec2e89cf-f5a4-4579-9cb6-676c161e6cef-thumb-640.jpg","title":"ریمیکس","download_title":"(Remix)  Shadmehr Aghili","download_list_title":"ریمیکس  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/46f4656085baa2a9d9a86315df3914ba/320","quality":"320","demo":0},{"name":"handle/v1/tracks/46f4656085baa2a9d9a86315df3914ba/160","quality":"160","demo":0},{"name":"handle/v1/tracks/46f4656085baa2a9d9a86315df3914ba/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CD1C26","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4197,"image":"new_data/images/track-covers/33971/conversions/c6ba7553-7344-4e65-bcaf-a6bbe44f7490-thumb-200.jpg","image_large":"new_data/images/track-covers/33971/conversions/c6ba7553-7344-4e65-bcaf-a6bbe44f7490-thumb-640.jpg","title":"ستاره رمیکس","download_title":"Setareh (Remix)  Shadmehr Aghili","download_list_title":"ستاره رمیکس  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/8817f3260ef680cda5d68b9fbf4bd192/320","quality":"320","demo":0},{"name":"handle/v1/tracks/8817f3260ef680cda5d68b9fbf4bd192/160","quality":"160","demo":0},{"name":"handle/v1/tracks/8817f3260ef680cda5d68b9fbf4bd192/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CC1C26","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4196,"image":"new_data/images/track-covers/33970/conversions/aa9cc1f4-b67e-4da5-80c0-b9fd294c01ef-thumb-200.jpg","image_large":"new_data/images/track-covers/33970/conversions/aa9cc1f4-b67e-4da5-80c0-b9fd294c01ef-thumb-640.jpg","title":"اشک بی کسی","download_title":"Ashke Bi Kasi  Shadmehr Aghili","download_list_title":"اشک بی کسی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/f04a983f046d6f7ef01c67d485a3b334/320","quality":"320","demo":0},{"name":"handle/v1/tracks/f04a983f046d6f7ef01c67d485a3b334/160","quality":"160","demo":0},{"name":"handle/v1/tracks/f04a983f046d6f7ef01c67d485a3b334/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CC1C26","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4195,"image":"new_data/images/track-covers/33969/conversions/35d441d4-9ba7-44ad-a013-72aceb74e12a-thumb-200.jpg","image_large":"new_data/images/track-covers/33969/conversions/35d441d4-9ba7-44ad-a013-72aceb74e12a-thumb-640.jpg","title":"وقتی تورو شناختم","download_title":"Vaghti To Ro Shenakhtam  Shadmehr Aghili","download_list_title":"وقتی تورو شناختم  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/24da8c6b65b93c31a335dcefbe3b9b33/320","quality":"320","demo":0},{"name":"handle/v1/tracks/24da8c6b65b93c31a335dcefbe3b9b33/160","quality":"160","demo":0},{"name":"handle/v1/tracks/24da8c6b65b93c31a335dcefbe3b9b33/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CC1C26","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4194,"image":"new_data/images/track-covers/33968/conversions/868234bf-8f1b-47c5-9796-9ccf23fe8f90-thumb-200.jpg","image_large":"new_data/images/track-covers/33968/conversions/868234bf-8f1b-47c5-9796-9ccf23fe8f90-thumb-640.jpg","title":"قید موندنو بزن","download_title":"Gheyde Moondano Bezan  Shadmehr Aghili","download_list_title":"قید موندنو بزن  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/50b61f2a8030b839ca11a1f513b6d104/320","quality":"320","demo":0},{"name":"handle/v1/tracks/50b61f2a8030b839ca11a1f513b6d104/160","quality":"160","demo":0},{"name":"handle/v1/tracks/50b61f2a8030b839ca11a1f513b6d104/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CC1C26","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4139,"image":"new_data/images/track-covers/33913/conversions/9941f13f-a397-47a3-9e85-c949934fc60a-thumb-200.jpg","image_large":"new_data/images/track-covers/33913/conversions/9941f13f-a397-47a3-9e85-c949934fc60a-thumb-640.jpg","title":"تلافی","download_title":"Talafi  Shadmehr Aghili","download_list_title":"تلافی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/0db1d8d1281843b482878231bf93890c/320","quality":"320","demo":0},{"name":"handle/v1/tracks/0db1d8d1281843b482878231bf93890c/160","quality":"160","demo":0},{"name":"handle/v1/tracks/0db1d8d1281843b482878231bf93890c/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CD1C26","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4210,"image":"new_data/images/track-covers/33984/conversions/800f8d8b-5f55-43a4-8c66-2c9a708b4380-thumb-200.jpg","image_large":"new_data/images/track-covers/33984/conversions/800f8d8b-5f55-43a4-8c66-2c9a708b4380-thumb-640.jpg","title":"ماندگار","download_title":"Mandegar  Shadmehr Aghili","download_list_title":"ماندگار  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/0b40641b72ab39a9eded940a387025ca/320","quality":"320","demo":0},{"name":"handle/v1/tracks/0b40641b72ab39a9eded940a387025ca/160","quality":"160","demo":0},{"name":"handle/v1/tracks/0b40641b72ab39a9eded940a387025ca/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#DA2F38","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4209,"image":"new_data/images/track-covers/33983/conversions/12995841-88b2-44a9-aa69-b08a4879b881-thumb-200.jpg","image_large":"new_data/images/track-covers/33983/conversions/12995841-88b2-44a9-aa69-b08a4879b881-thumb-640.jpg","title":"آغوش","download_title":"Aghoosh  Shadmehr Aghili","download_list_title":"آغوش  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/3daf643f91ac228968f76aefaa39d1fb/320","quality":"320","demo":0},{"name":"handle/v1/tracks/3daf643f91ac228968f76aefaa39d1fb/160","quality":"160","demo":0},{"name":"handle/v1/tracks/3daf643f91ac228968f76aefaa39d1fb/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#DA2F38","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4207,"image":"new_data/images/track-covers/33981/conversions/86412ea0-d33c-4ea4-af74-2ab20ed673c2-thumb-200.jpg","image_large":"new_data/images/track-covers/33981/conversions/86412ea0-d33c-4ea4-af74-2ab20ed673c2-thumb-640.jpg","title":"بی تو","download_title":"Bi Toe  Shadmehr Aghili","download_list_title":"بی تو  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/f0dd07ee5f70e821a793d4a8ea9e94d2/320","quality":"320","demo":0},{"name":"handle/v1/tracks/f0dd07ee5f70e821a793d4a8ea9e94d2/160","quality":"160","demo":0},{"name":"handle/v1/tracks/f0dd07ee5f70e821a793d4a8ea9e94d2/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#DA2F38","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4206,"image":"new_data/images/track-covers/33980/conversions/770b1573-f823-4f7a-98b6-232679744fdb-thumb-200.jpg","image_large":"new_data/images/track-covers/33980/conversions/770b1573-f823-4f7a-98b6-232679744fdb-thumb-640.jpg","title":"پاپ کرن","download_title":"Popcorn  Shadmehr Aghili","download_list_title":"پاپ کرن  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/b7f0847b8cdff5aef716c78f34bd00db/320","quality":"320","demo":0},{"name":"handle/v1/tracks/b7f0847b8cdff5aef716c78f34bd00db/160","quality":"160","demo":0},{"name":"handle/v1/tracks/b7f0847b8cdff5aef716c78f34bd00db/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#DA2F38","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4205,"image":"new_data/images/track-covers/33979/conversions/aeff76b7-cf4e-4068-901d-050a69015a01-thumb-200.jpg","image_large":"new_data/images/track-covers/33979/conversions/aeff76b7-cf4e-4068-901d-050a69015a01-thumb-640.jpg","title":"اونه اونه","download_title":"Oone Oone  Shadmehr Aghili","download_list_title":"اونه اونه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/605152849a9b63c3fd968d390802efb2/320","quality":"320","demo":0},{"name":"handle/v1/tracks/605152849a9b63c3fd968d390802efb2/160","quality":"160","demo":0},{"name":"handle/v1/tracks/605152849a9b63c3fd968d390802efb2/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#DA2F38","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4204,"image":"new_data/images/track-covers/33978/conversions/5ea13b16-6182-454f-943c-06251e484ff0-thumb-200.jpg","image_large":"new_data/images/track-covers/33978/conversions/5ea13b16-6182-454f-943c-06251e484ff0-thumb-640.jpg","title":"میخواستمت","download_title":"Mikhastamet  Shadmehr Aghili","download_list_title":"میخواستمت  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/84d9a05d1240adcf8827c33545508ecf/320","quality":"320","demo":0},{"name":"handle/v1/tracks/84d9a05d1240adcf8827c33545508ecf/160","quality":"160","demo":0},{"name":"handle/v1/tracks/84d9a05d1240adcf8827c33545508ecf/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#DA2F38","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4203,"image":"new_data/images/track-covers/33977/conversions/e1fd4107-0703-439f-8dec-454f38be8709-thumb-200.jpg","image_large":"new_data/images/track-covers/33977/conversions/e1fd4107-0703-439f-8dec-454f38be8709-thumb-640.jpg","title":"بیا اینجا","download_title":"Bia Inja  Shadmehr Aghili","download_list_title":"بیا اینجا  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/b1731331c362e162263be1749b539742/320","quality":"320","demo":0},{"name":"handle/v1/tracks/b1731331c362e162263be1749b539742/160","quality":"160","demo":0},{"name":"handle/v1/tracks/b1731331c362e162263be1749b539742/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#DA2F38","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4140,"image":"new_data/images/track-covers/33914/conversions/0ac9cbe5-461b-4d8b-bfcc-3530a90786d8-thumb-200.jpg","image_large":"new_data/images/track-covers/33914/conversions/0ac9cbe5-461b-4d8b-bfcc-3530a90786d8-thumb-640.jpg","title":"انگیزه","download_title":"Angizeh  Shadmehr Aghili","download_list_title":"انگیزه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/7f5e859ca6457f9df3e6828c08d212ac/320","quality":"320","demo":0},{"name":"handle/v1/tracks/7f5e859ca6457f9df3e6828c08d212ac/160","quality":"160","demo":0},{"name":"handle/v1/tracks/7f5e859ca6457f9df3e6828c08d212ac/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#DA2F38","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4208,"image":"new_data/images/track-covers/33982/conversions/077b7827-cfdb-4b3e-b359-e18c7e7e90c4-thumb-200.jpg","image_large":"new_data/images/track-covers/33982/conversions/077b7827-cfdb-4b3e-b359-e18c7e7e90c4-thumb-640.jpg","title":"محال","download_title":"Mahaal  Shadmehr Aghili","download_list_title":"محال  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/96f05131a681ad18e14bc189887dab3f/320","quality":"320","demo":0},{"name":"handle/v1/tracks/96f05131a681ad18e14bc189887dab3f/160","quality":"160","demo":0},{"name":"handle/v1/tracks/96f05131a681ad18e14bc189887dab3f/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#DA2F38","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4219,"image":"new_data/images/track-covers/33993/conversions/cc5cd34d-be0f-4850-81fa-641e70a0e84f-thumb-200.jpg","image_large":"new_data/images/track-covers/33993/conversions/cc5cd34d-be0f-4850-81fa-641e70a0e84f-thumb-640.jpg","title":"مسافر (بی کلام)","download_title":"Mosafer (Instrumental)  Shadmehr Aghili","download_list_title":"مسافر (بی کلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/97cc8c3c69a129dbdf3590b335d15e5e/320","quality":"320","demo":0},{"name":"handle/v1/tracks/97cc8c3c69a129dbdf3590b335d15e5e/160","quality":"160","demo":0},{"name":"handle/v1/tracks/97cc8c3c69a129dbdf3590b335d15e5e/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#425F88","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4218,"image":"new_data/images/track-covers/33992/conversions/47e23f65-d89d-4e3b-89f6-6dedda60e9fa-thumb-200.jpg","image_large":"new_data/images/track-covers/33992/conversions/47e23f65-d89d-4e3b-89f6-6dedda60e9fa-thumb-640.jpg","title":"آرزو ها (بی کلام)","download_title":"Arezooha (Instrumental)  Shadmehr Aghili","download_list_title":"آرزو ها (بی کلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/f3f0950b080e4dae518adff965dabec8/320","quality":"320","demo":0},{"name":"handle/v1/tracks/f3f0950b080e4dae518adff965dabec8/160","quality":"160","demo":0},{"name":"handle/v1/tracks/f3f0950b080e4dae518adff965dabec8/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#425F88","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4217,"image":"new_data/images/track-covers/33991/conversions/70aa370c-f43b-4d25-bd1f-c7d7c1d366e2-thumb-200.jpg","image_large":"new_data/images/track-covers/33991/conversions/70aa370c-f43b-4d25-bd1f-c7d7c1d366e2-thumb-640.jpg","title":"حدیث مهربانی (بی کلام)","download_title":"Hadise Mehrabooni (Instrumental)  Shadmehr Aghili","download_list_title":"حدیث مهربانی (بی کلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/26509aa7e90ef25461f8f8ba73853aaf/320","quality":"320","demo":0},{"name":"handle/v1/tracks/26509aa7e90ef25461f8f8ba73853aaf/160","quality":"160","demo":0},{"name":"handle/v1/tracks/26509aa7e90ef25461f8f8ba73853aaf/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#425F88","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4216,"image":"new_data/images/track-covers/33990/conversions/bb4b17a4-afa9-4c90-8331-207b92763af0-thumb-200.jpg","image_large":"new_data/images/track-covers/33990/conversions/bb4b17a4-afa9-4c90-8331-207b92763af0-thumb-640.jpg","title":"غم تنهایی (بی کلام)","download_title":"Ghame Tanhaei (Instrumental)  Shadmehr Aghili","download_list_title":"غم تنهایی (بی کلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/c4dda15b63bb9806fae6e3cf79330494/320","quality":"320","demo":0},{"name":"handle/v1/tracks/c4dda15b63bb9806fae6e3cf79330494/160","quality":"160","demo":0},{"name":"handle/v1/tracks/c4dda15b63bb9806fae6e3cf79330494/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#425F88","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4215,"image":"new_data/images/track-covers/33989/conversions/439cb8bb-34ee-4440-98a7-41b990a22f5d-thumb-200.jpg","image_large":"new_data/images/track-covers/33989/conversions/439cb8bb-34ee-4440-98a7-41b990a22f5d-thumb-640.jpg","title":"روح سبز (بی کلام)","download_title":"Roohe Sabz (Instrumental)  Shadmehr Aghili","download_list_title":"روح سبز (بی کلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/66fd278e7f358929dd44a0b99780746e/320","quality":"320","demo":0},{"name":"handle/v1/tracks/66fd278e7f358929dd44a0b99780746e/160","quality":"160","demo":0},{"name":"handle/v1/tracks/66fd278e7f358929dd44a0b99780746e/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#425F88","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4214,"image":"new_data/images/track-covers/33988/conversions/5ab5924d-271e-4d56-a199-847fd08b58c2-thumb-200.jpg","image_large":"new_data/images/track-covers/33988/conversions/5ab5924d-271e-4d56-a199-847fd08b58c2-thumb-640.jpg","title":"بی تابی (بی کلام)","download_title":"Bi Tabi (Instrumental)  Shadmehr Aghili","download_list_title":"بی تابی (بی کلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/79069a6f1e1b536822dc7e24bc2c2877/320","quality":"320","demo":0},{"name":"handle/v1/tracks/79069a6f1e1b536822dc7e24bc2c2877/160","quality":"160","demo":0},{"name":"handle/v1/tracks/79069a6f1e1b536822dc7e24bc2c2877/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#425F88","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4213,"image":"new_data/images/track-covers/33987/conversions/38864c1a-799b-48ef-bee4-494bfd4169b5-thumb-200.jpg","image_large":"new_data/images/track-covers/33987/conversions/38864c1a-799b-48ef-bee4-494bfd4169b5-thumb-640.jpg","title":"پل عاطفه (بی کلام)","download_title":"Pole Atefeh (Instrumental)  Shadmehr Aghili","download_list_title":"پل عاطفه (بی کلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ffe12c37436a7198f68dcfdeb805b88a/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ffe12c37436a7198f68dcfdeb805b88a/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ffe12c37436a7198f68dcfdeb805b88a/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#425F88","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4212,"image":"new_data/images/track-covers/33986/conversions/c49b8844-2e07-49ec-bf09-be41830ad51a-thumb-200.jpg","image_large":"new_data/images/track-covers/33986/conversions/c49b8844-2e07-49ec-bf09-be41830ad51a-thumb-640.jpg","title":"هزار و یک شب (بی کلام)","download_title":"Hezaro Yek Shab (Instrumental)  Shadmehr Aghili","download_list_title":"هزار و یک شب (بی کلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/dc52fd08a61c637b8f118ab8461ae4f3/320","quality":"320","demo":0},{"name":"handle/v1/tracks/dc52fd08a61c637b8f118ab8461ae4f3/160","quality":"160","demo":0},{"name":"handle/v1/tracks/dc52fd08a61c637b8f118ab8461ae4f3/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#425F88","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4211,"image":"new_data/images/track-covers/33985/conversions/66269f0a-272c-4cd3-a2cb-4aff6f395346-thumb-200.jpg","image_large":"new_data/images/track-covers/33985/conversions/66269f0a-272c-4cd3-a2cb-4aff6f395346-thumb-640.jpg","title":"عطر و شبنم (بی کلام)","download_title":"Atro Shabnam (Instrumental)  Shadmehr Aghili","download_list_title":"عطر و شبنم (بی کلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/d6e8e87b75ad53401bf52c5c98db0deb/320","quality":"320","demo":0},{"name":"handle/v1/tracks/d6e8e87b75ad53401bf52c5c98db0deb/160","quality":"160","demo":0},{"name":"handle/v1/tracks/d6e8e87b75ad53401bf52c5c98db0deb/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#425F88","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4141,"image":"new_data/images/track-covers/33915/conversions/737fa6ff-b957-4d07-b4a9-e9f4c12ec75e-thumb-200.jpg","image_large":"new_data/images/track-covers/33915/conversions/737fa6ff-b957-4d07-b4a9-e9f4c12ec75e-thumb-640.jpg","title":"مشق سکوت (بی کلام)","download_title":"Mashghe Sokoot (Instrumental)  Shadmehr Aghili","download_list_title":"مشق سکوت (بی کلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/609f2361d290cc13caa23767ae7c7a4a/320","quality":"320","demo":0},{"name":"handle/v1/tracks/609f2361d290cc13caa23767ae7c7a4a/160","quality":"160","demo":0},{"name":"handle/v1/tracks/609f2361d290cc13caa23767ae7c7a4a/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#425F88","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4225,"image":"new_data/images/track-covers/33999/conversions/0be4654b-830d-47a3-8a6e-6b805b24ed53-thumb-200.jpg","image_large":"new_data/images/track-covers/33999/conversions/0be4654b-830d-47a3-8a6e-6b805b24ed53-thumb-640.jpg","title":"تهدید","download_title":"Tahdid  Shadmehr Aghili","download_list_title":"تهدید  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/405fe23b025c2c984c5989caa9010a39/320","quality":"320","demo":0},{"name":"handle/v1/tracks/405fe23b025c2c984c5989caa9010a39/160","quality":"160","demo":0},{"name":"handle/v1/tracks/405fe23b025c2c984c5989caa9010a39/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4224,"image":"new_data/images/track-covers/33998/conversions/01ac830f-362c-49b7-a4e0-a3b931066f1e-thumb-200.jpg","image_large":"new_data/images/track-covers/33998/conversions/01ac830f-362c-49b7-a4e0-a3b931066f1e-thumb-640.jpg","title":"عمرا","download_title":"06 Omran  Shadmehr Aghili","download_list_title":"عمرا  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/86a7af035673985ac9339555228c7abc/320","quality":"320","demo":0},{"name":"handle/v1/tracks/86a7af035673985ac9339555228c7abc/160","quality":"160","demo":0},{"name":"handle/v1/tracks/86a7af035673985ac9339555228c7abc/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4223,"image":"new_data/images/track-covers/33997/conversions/1c5e114d-9162-436c-8b6b-1d264df01141-thumb-200.jpg","image_large":"new_data/images/track-covers/33997/conversions/1c5e114d-9162-436c-8b6b-1d264df01141-thumb-640.jpg","title":"کل‌کل","download_title":"Ghorbat  Shadmehr Aghili","download_list_title":"کل‌کل  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/6e1bb92e929f18ac092b13ef34b01329/320","quality":"320","demo":0},{"name":"handle/v1/tracks/6e1bb92e929f18ac092b13ef34b01329/160","quality":"160","demo":0},{"name":"handle/v1/tracks/6e1bb92e929f18ac092b13ef34b01329/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4222,"image":"new_data/images/track-covers/33996/conversions/f68851a9-f185-4794-8b1b-46a6b720dae1-thumb-200.jpg","image_large":"new_data/images/track-covers/33996/conversions/f68851a9-f185-4794-8b1b-46a6b720dae1-thumb-640.jpg","title":"دل دیوونه","download_title":"Del Devone  Shadmehr Aghili","download_list_title":"دل دیوونه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/2acba89d92f0596e3d3de0ae8ef74204/320","quality":"320","demo":0},{"name":"handle/v1/tracks/2acba89d92f0596e3d3de0ae8ef74204/160","quality":"160","demo":0},{"name":"handle/v1/tracks/2acba89d92f0596e3d3de0ae8ef74204/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4221,"image":"new_data/images/track-covers/33995/conversions/a538137d-8013-4f58-ada4-583e1f3b7e56-thumb-200.jpg","image_large":"new_data/images/track-covers/33995/conversions/a538137d-8013-4f58-ada4-583e1f3b7e56-thumb-640.jpg","title":"بهونه","download_title":"Bahooneh  Shadmehr Aghili","download_list_title":"بهونه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/8fa84bc7de7f97a7edd841ed1841fa5e/320","quality":"320","demo":0},{"name":"handle/v1/tracks/8fa84bc7de7f97a7edd841ed1841fa5e/160","quality":"160","demo":0},{"name":"handle/v1/tracks/8fa84bc7de7f97a7edd841ed1841fa5e/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4220,"image":"new_data/images/track-covers/33994/conversions/16c3991b-4018-4b99-86c6-84267deb0806-thumb-200.jpg","image_large":"new_data/images/track-covers/33994/conversions/16c3991b-4018-4b99-86c6-84267deb0806-thumb-640.jpg","title":"اشک من","download_title":"Ashke Man  Shadmehr Aghili","download_list_title":"اشک من  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/8e4afa530d0e5a1ec59bf08b01a49614/320","quality":"320","demo":0},{"name":"handle/v1/tracks/8e4afa530d0e5a1ec59bf08b01a49614/160","quality":"160","demo":0},{"name":"handle/v1/tracks/8e4afa530d0e5a1ec59bf08b01a49614/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4142,"image":"new_data/images/track-covers/33916/conversions/ff93fb1c-5900-4ff4-ab6d-ee85de1f8063-thumb-200.jpg","image_large":"new_data/images/track-covers/33916/conversions/ff93fb1c-5900-4ff4-ab6d-ee85de1f8063-thumb-640.jpg","title":"آدم فروش","download_title":"Adam Fouroosh  Shadmehr Aghili","download_list_title":"آدم فروش  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/eace313bce86956b45ff5bbe24f69bc3/320","quality":"320","demo":0},{"name":"handle/v1/tracks/eace313bce86956b45ff5bbe24f69bc3/160","quality":"160","demo":0},{"name":"handle/v1/tracks/eace313bce86956b45ff5bbe24f69bc3/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4232,"image":"new_data/images/track-covers/34006/conversions/617174d6-dd06-42aa-b77e-6bc32da09430-thumb-200.jpg","image_large":"new_data/images/track-covers/34006/conversions/617174d6-dd06-42aa-b77e-6bc32da09430-thumb-640.jpg","title":"ژینا","download_title":"Zhina  Shadmehr Aghili","download_list_title":"ژینا  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/79f236ad61fe9d1fe6aa7380205f0128/320","quality":"320","demo":0},{"name":"handle/v1/tracks/79f236ad61fe9d1fe6aa7380205f0128/160","quality":"160","demo":0},{"name":"handle/v1/tracks/79f236ad61fe9d1fe6aa7380205f0128/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B85259","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4231,"image":"new_data/images/track-covers/34005/conversions/84e418f9-664d-4b61-870a-eddc91277dec-thumb-200.jpg","image_large":"new_data/images/track-covers/34005/conversions/84e418f9-664d-4b61-870a-eddc91277dec-thumb-640.jpg","title":"زمستون","download_title":"Zemeston  Shadmehr Aghili","download_list_title":"زمستون  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/e23f8b6cc205bef477e93d805db1d9e9/320","quality":"320","demo":0},{"name":"handle/v1/tracks/e23f8b6cc205bef477e93d805db1d9e9/160","quality":"160","demo":0},{"name":"handle/v1/tracks/e23f8b6cc205bef477e93d805db1d9e9/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B85259","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4229,"image":"new_data/images/track-covers/34003/conversions/e2140130-1052-4fe4-a8ab-f2b5ab09b820-thumb-200.jpg","image_large":"new_data/images/track-covers/34003/conversions/e2140130-1052-4fe4-a8ab-f2b5ab09b820-thumb-640.jpg","title":"خیالی نیست","download_title":"Khiali Nist  Shadmehr Aghili","download_list_title":"خیالی نیست  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/3bb5a527e93f231430789a3518f091d5/320","quality":"320","demo":0},{"name":"handle/v1/tracks/3bb5a527e93f231430789a3518f091d5/160","quality":"160","demo":0},{"name":"handle/v1/tracks/3bb5a527e93f231430789a3518f091d5/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B85259","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4228,"image":"new_data/images/track-covers/34002/conversions/8cc44af0-2ada-4292-a07d-76e7f69e1bfb-thumb-200.jpg","image_large":"new_data/images/track-covers/34002/conversions/8cc44af0-2ada-4292-a07d-76e7f69e1bfb-thumb-640.jpg","title":"فال قهوه","download_title":"Fale Ghahveh  Shadmehr Aghili","download_list_title":"فال قهوه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/bf175c335a2933bb11dbed3f0147b548/320","quality":"320","demo":0},{"name":"handle/v1/tracks/bf175c335a2933bb11dbed3f0147b548/160","quality":"160","demo":0},{"name":"handle/v1/tracks/bf175c335a2933bb11dbed3f0147b548/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B85259","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4227,"image":"new_data/images/track-covers/34001/conversions/b46cb028-1344-4483-9b7f-bb7d7a30b892-thumb-200.jpg","image_large":"new_data/images/track-covers/34001/conversions/b46cb028-1344-4483-9b7f-bb7d7a30b892-thumb-640.jpg","title":"چشمهای عاشق","download_title":"Cheshmaye Ashegh  Shadmehr Aghili","download_list_title":"چشمهای عاشق  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/91fa26d73c061c42313d7f7f49621f86/320","quality":"320","demo":0},{"name":"handle/v1/tracks/91fa26d73c061c42313d7f7f49621f86/160","quality":"160","demo":0},{"name":"handle/v1/tracks/91fa26d73c061c42313d7f7f49621f86/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B75359","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4226,"image":"new_data/images/track-covers/34000/conversions/0d21e72d-6b73-4648-a38c-77b3cfc421ac-thumb-200.jpg","image_large":"new_data/images/track-covers/34000/conversions/0d21e72d-6b73-4648-a38c-77b3cfc421ac-thumb-640.jpg","title":"بگو از کجا","download_title":"Begoo Az Koja  Shadmehr Aghili","download_list_title":"بگو از کجا  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/da6543e1fe45213e0826d5be67529df3/320","quality":"320","demo":0},{"name":"handle/v1/tracks/da6543e1fe45213e0826d5be67529df3/160","quality":"160","demo":0},{"name":"handle/v1/tracks/da6543e1fe45213e0826d5be67529df3/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B85259","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4143,"image":"new_data/images/track-covers/33917/conversions/2e99dd32-ef1c-4528-bb68-f8a83643ea44-thumb-200.jpg","image_large":"new_data/images/track-covers/33917/conversions/2e99dd32-ef1c-4528-bb68-f8a83643ea44-thumb-640.jpg","title":"باور","download_title":"Bavar  Shadmehr Aghili","download_list_title":"باور  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/401e49f559a7a4a130d7e80cba62e7ba/320","quality":"320","demo":0},{"name":"handle/v1/tracks/401e49f559a7a4a130d7e80cba62e7ba/160","quality":"160","demo":0},{"name":"handle/v1/tracks/401e49f559a7a4a130d7e80cba62e7ba/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B85259","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4242,"image":"new_data/images/track-covers/34016/conversions/6234cd2f-9557-486c-a631-249587b78c4a-thumb-200.jpg","image_large":"new_data/images/track-covers/34016/conversions/6234cd2f-9557-486c-a631-249587b78c4a-thumb-640.jpg","title":"یادت میاد اون قدیما","download_title":"Yadet Miad Oon Ghadima  Shadmehr Aghili","download_list_title":"یادت میاد اون قدیما  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/6a1911cf1d180c18a3536f4150a435a0/320","quality":"320","demo":0},{"name":"handle/v1/tracks/6a1911cf1d180c18a3536f4150a435a0/160","quality":"160","demo":0},{"name":"handle/v1/tracks/6a1911cf1d180c18a3536f4150a435a0/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CBB298","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4241,"image":"new_data/images/track-covers/34015/conversions/cd44c0b3-847d-49f9-9590-1d0dd0ecce62-thumb-200.jpg","image_large":"new_data/images/track-covers/34015/conversions/cd44c0b3-847d-49f9-9590-1d0dd0ecce62-thumb-640.jpg","title":"بر من بتاب ای ماه من","download_title":"Bar Man Betab Ey Mahe Man  Shadmehr Aghili","download_list_title":"بر من بتاب ای ماه من  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/8477dd71ed96b4336d1e5a604402c276/320","quality":"320","demo":0},{"name":"handle/v1/tracks/8477dd71ed96b4336d1e5a604402c276/160","quality":"160","demo":0},{"name":"handle/v1/tracks/8477dd71ed96b4336d1e5a604402c276/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CAB197","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4240,"image":"new_data/images/track-covers/34014/conversions/634feb85-0554-423e-81b2-1706686694a0-thumb-200.jpg","image_large":"new_data/images/track-covers/34014/conversions/634feb85-0554-423e-81b2-1706686694a0-thumb-640.jpg","title":"رو شونم اشک چشمات","download_title":"Roo Shonam Ashke Cheshmat  Shadmehr Aghili","download_list_title":"رو شونم اشک چشمات  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/08a7375c822c576baecba943499ebcd3/320","quality":"320","demo":0},{"name":"handle/v1/tracks/08a7375c822c576baecba943499ebcd3/160","quality":"160","demo":0},{"name":"handle/v1/tracks/08a7375c822c576baecba943499ebcd3/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CBB297","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4239,"image":"new_data/images/track-covers/34013/conversions/b4697c57-44fd-4507-9701-fc5b7941e1d3-thumb-200.jpg","image_large":"new_data/images/track-covers/34013/conversions/b4697c57-44fd-4507-9701-fc5b7941e1d3-thumb-640.jpg","title":"شکوندی دلم رو","download_title":"Shekoondi Delam Ro  Shadmehr Aghili","download_list_title":"شکوندی دلم رو  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/985937eceff8d02d5683c7c0efd46343/320","quality":"320","demo":0},{"name":"handle/v1/tracks/985937eceff8d02d5683c7c0efd46343/160","quality":"160","demo":0},{"name":"handle/v1/tracks/985937eceff8d02d5683c7c0efd46343/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C9B095","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4238,"image":"new_data/images/track-covers/34012/conversions/a5ba3cf4-0371-4bd0-a9bb-b529a44925ec-thumb-200.jpg","image_large":"new_data/images/track-covers/34012/conversions/a5ba3cf4-0371-4bd0-a9bb-b529a44925ec-thumb-640.jpg","title":"حجم پای سکوتم","download_title":"Hajme Paye Sokootam  Shadmehr Aghili","download_list_title":"حجم پای سکوتم  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/bbf67753a1684fe2fb1ae5b3e908d505/320","quality":"320","demo":0},{"name":"handle/v1/tracks/bbf67753a1684fe2fb1ae5b3e908d505/160","quality":"160","demo":0},{"name":"handle/v1/tracks/bbf67753a1684fe2fb1ae5b3e908d505/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CBB297","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4237,"image":"new_data/images/track-covers/34011/conversions/50dcfd1b-0911-4184-8e0d-89581fda5af3-thumb-200.jpg","image_large":"new_data/images/track-covers/34011/conversions/50dcfd1b-0911-4184-8e0d-89581fda5af3-thumb-640.jpg","title":"دروغ نگو تو زندگی","download_title":"Dooroogh Nagoo Too Zendegi  Shadmehr Aghili","download_list_title":"دروغ نگو تو زندگی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/67af9479d5c267b3ce89a62083431a44/320","quality":"320","demo":0},{"name":"handle/v1/tracks/67af9479d5c267b3ce89a62083431a44/160","quality":"160","demo":0},{"name":"handle/v1/tracks/67af9479d5c267b3ce89a62083431a44/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CAB096","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4236,"image":"new_data/images/track-covers/34010/conversions/d7397995-c260-432c-ae08-e1809a3b4beb-thumb-200.jpg","image_large":"new_data/images/track-covers/34010/conversions/d7397995-c260-432c-ae08-e1809a3b4beb-thumb-640.jpg","title":"مثل بارون جنس رویا","download_title":"Mesle Baroon Jense Roya  Shadmehr Aghili","download_list_title":"مثل بارون جنس رویا  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/f06d104b8117510431ff1780dba82ef4/320","quality":"320","demo":0},{"name":"handle/v1/tracks/f06d104b8117510431ff1780dba82ef4/160","quality":"160","demo":0},{"name":"handle/v1/tracks/f06d104b8117510431ff1780dba82ef4/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CBB297","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4235,"image":"new_data/images/track-covers/34009/conversions/c417e50f-7825-4f54-adb9-42813ca9fc6a-thumb-200.jpg","image_large":"new_data/images/track-covers/34009/conversions/c417e50f-7825-4f54-adb9-42813ca9fc6a-thumb-640.jpg","title":"دل شکسته","download_title":"Dele Shekasteh  Shadmehr Aghili","download_list_title":"دل شکسته  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/d49f1c29692e749614c935931beeaa53/320","quality":"320","demo":0},{"name":"handle/v1/tracks/d49f1c29692e749614c935931beeaa53/160","quality":"160","demo":0},{"name":"handle/v1/tracks/d49f1c29692e749614c935931beeaa53/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CCB398","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4234,"image":"new_data/images/track-covers/34008/conversions/4372e962-e6be-437d-823d-271c0b2d4815-thumb-200.jpg","image_large":"new_data/images/track-covers/34008/conversions/4372e962-e6be-437d-823d-271c0b2d4815-thumb-640.jpg","title":"شب بخیر","download_title":"Shab Be Kheyr  Shadmehr Aghili","download_list_title":"شب بخیر  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/f7367a22028a7dc7728d7dd63817e861/320","quality":"320","demo":0},{"name":"handle/v1/tracks/f7367a22028a7dc7728d7dd63817e861/160","quality":"160","demo":0},{"name":"handle/v1/tracks/f7367a22028a7dc7728d7dd63817e861/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CAB197","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4233,"image":"new_data/images/track-covers/34007/conversions/e30931e7-aaab-43f3-96ce-a06e01816a17-thumb-200.jpg","image_large":"new_data/images/track-covers/34007/conversions/e30931e7-aaab-43f3-96ce-a06e01816a17-thumb-640.jpg","title":"آسمون شب من پر از ستارست","download_title":"Asemoone Shabe Man Por Az Setareh  Shadmehr Aghili","download_list_title":"آسمون شب من پر از ستارست  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/e25a421ba90808c77b7dd2a71b70b807/320","quality":"320","demo":0},{"name":"handle/v1/tracks/e25a421ba90808c77b7dd2a71b70b807/160","quality":"160","demo":0},{"name":"handle/v1/tracks/e25a421ba90808c77b7dd2a71b70b807/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CBB297","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4144,"image":"new_data/images/track-covers/33918/conversions/5f203998-bb7c-4eb8-aa06-05e128992fe5-thumb-200.jpg","image_large":"new_data/images/track-covers/33918/conversions/5f203998-bb7c-4eb8-aa06-05e128992fe5-thumb-640.jpg","title":"ندارد باغ گل طاقت","download_title":"Nadarad Bage Gol Taghat  Shadmehr Aghili","download_list_title":"ندارد باغ گل طاقت  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/251900567a1eea14fcae57150003af9a/320","quality":"320","demo":0},{"name":"handle/v1/tracks/251900567a1eea14fcae57150003af9a/160","quality":"160","demo":0},{"name":"handle/v1/tracks/251900567a1eea14fcae57150003af9a/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#CAB096","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4251,"image":"new_data/images/track-covers/34025/conversions/d8b5727b-5f68-43f0-956b-def57a8a8457-thumb-200.jpg","image_large":"new_data/images/track-covers/34025/conversions/d8b5727b-5f68-43f0-956b-def57a8a8457-thumb-640.jpg","title":"با من باش","download_title":"Ba Man Bash  Shadmehr Aghili","download_list_title":"با من باش  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/719c060f990376537b2222ff547d802e/320","quality":"320","demo":0},{"name":"handle/v1/tracks/719c060f990376537b2222ff547d802e/160","quality":"160","demo":0},{"name":"handle/v1/tracks/719c060f990376537b2222ff547d802e/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4249,"image":"new_data/images/track-covers/34023/conversions/a4757006-49e3-4e56-8786-d815b2fd9b9b-thumb-200.jpg","image_large":"new_data/images/track-covers/34023/conversions/a4757006-49e3-4e56-8786-d815b2fd9b9b-thumb-640.jpg","title":"آدم و حوا","download_title":"Adamo Hava  Shadmehr Aghili","download_list_title":"آدم و حوا  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/64c78883914ba5cf5264e8ad4335e509/320","quality":"320","demo":0},{"name":"handle/v1/tracks/64c78883914ba5cf5264e8ad4335e509/160","quality":"160","demo":0},{"name":"handle/v1/tracks/64c78883914ba5cf5264e8ad4335e509/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4248,"image":"new_data/images/track-covers/34022/conversions/faa1e261-d181-45f2-9c6c-2fa8fb45c3cf-thumb-200.jpg","image_large":"new_data/images/track-covers/34022/conversions/faa1e261-d181-45f2-9c6c-2fa8fb45c3cf-thumb-640.jpg","title":"میخوام برم","download_title":"Mikham Beram  Shadmehr Aghili","download_list_title":"میخوام برم  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/38105146e719609adba6484c649a1c48/320","quality":"320","demo":0},{"name":"handle/v1/tracks/38105146e719609adba6484c649a1c48/160","quality":"160","demo":0},{"name":"handle/v1/tracks/38105146e719609adba6484c649a1c48/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4246,"image":"new_data/images/track-covers/34020/conversions/fa3ab25a-8217-4269-b4ba-07ac8dd322f6-thumb-200.jpg","image_large":"new_data/images/track-covers/34020/conversions/fa3ab25a-8217-4269-b4ba-07ac8dd322f6-thumb-640.jpg","title":"منو تو","download_title":"Mano To  Shadmehr Aghili","download_list_title":"منو تو  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/47fffe5f857a788489ce34dfe77b49f5/320","quality":"320","demo":0},{"name":"handle/v1/tracks/47fffe5f857a788489ce34dfe77b49f5/160","quality":"160","demo":0},{"name":"handle/v1/tracks/47fffe5f857a788489ce34dfe77b49f5/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4245,"image":"new_data/images/track-covers/34019/conversions/043cf798-94e0-418a-9c70-ec9ed247e823-thumb-200.jpg","image_large":"new_data/images/track-covers/34019/conversions/043cf798-94e0-418a-9c70-ec9ed247e823-thumb-640.jpg","title":"بی تو هرگز","download_title":"Bi To Hargez  Shadmehr Aghili","download_list_title":"بی تو هرگز  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/27d0eecc626dd8f428f8ec65bd88a7e5/320","quality":"320","demo":0},{"name":"handle/v1/tracks/27d0eecc626dd8f428f8ec65bd88a7e5/160","quality":"160","demo":0},{"name":"handle/v1/tracks/27d0eecc626dd8f428f8ec65bd88a7e5/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4244,"image":"new_data/images/track-covers/34018/conversions/ccb26498-23e1-4188-ae17-3fb81c53e09a-thumb-200.jpg","image_large":"new_data/images/track-covers/34018/conversions/ccb26498-23e1-4188-ae17-3fb81c53e09a-thumb-640.jpg","title":"مادر","download_title":"Madar  Shadmehr Aghili","download_list_title":"مادر  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ffdd06f166172e48f379affdc9dfadb4/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ffdd06f166172e48f379affdc9dfadb4/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ffdd06f166172e48f379affdc9dfadb4/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4146,"image":"new_data/images/track-covers/33920/conversions/579f207e-982b-4b2f-b5ad-eac7663c8c51-thumb-200.jpg","image_large":"new_data/images/track-covers/33920/conversions/579f207e-982b-4b2f-b5ad-eac7663c8c51-thumb-640.jpg","title":"با تموم یک دلی","download_title":"Ba Tamoome Yek Deli  Shadmehr Aghili","download_list_title":"با تموم یک دلی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/3e60c0fbb31a8ad4b6b10008006b2bd8/320","quality":"320","demo":0},{"name":"handle/v1/tracks/3e60c0fbb31a8ad4b6b10008006b2bd8/160","quality":"160","demo":0},{"name":"handle/v1/tracks/3e60c0fbb31a8ad4b6b10008006b2bd8/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4250,"image":"new_data/images/track-covers/34024/conversions/583fd297-1141-4139-9bb1-495b7fc428ff-thumb-200.jpg","image_large":"new_data/images/track-covers/34024/conversions/583fd297-1141-4139-9bb1-495b7fc428ff-thumb-640.jpg","title":"ستاره","download_title":"Setareh  Shadmehr Aghili","download_list_title":"ستاره  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/c694a9ea4bd5d3b8f89ef7763f6b3b17/320","quality":"320","demo":0},{"name":"handle/v1/tracks/c694a9ea4bd5d3b8f89ef7763f6b3b17/160","quality":"160","demo":0},{"name":"handle/v1/tracks/c694a9ea4bd5d3b8f89ef7763f6b3b17/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4247,"image":"new_data/images/track-covers/34021/conversions/f467f018-0d6f-471f-ab67-fe70a61316fa-thumb-200.jpg","image_large":"new_data/images/track-covers/34021/conversions/f467f018-0d6f-471f-ab67-fe70a61316fa-thumb-640.jpg","title":"دل من تورو میخواد","download_title":"Dele Man To Ro Mikhad  Shadmehr Aghili","download_list_title":"دل من تورو میخواد  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/2b45dbe367aea94b103b6f1f4aa93c2d/320","quality":"320","demo":0},{"name":"handle/v1/tracks/2b45dbe367aea94b103b6f1f4aa93c2d/160","quality":"160","demo":0},{"name":"handle/v1/tracks/2b45dbe367aea94b103b6f1f4aa93c2d/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4243,"image":"new_data/images/track-covers/34017/conversions/2ce59ba2-e9a2-4e9c-b9c8-184ec1dbc353-thumb-200.jpg","image_large":"new_data/images/track-covers/34017/conversions/2ce59ba2-e9a2-4e9c-b9c8-184ec1dbc353-thumb-640.jpg","title":"امروز و فردا","download_title":"Emroozo Farda  Shadmehr Aghili","download_list_title":"امروز و فردا  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/71df5cb432a37bdf6de3cb1c77ab0d65/320","quality":"320","demo":0},{"name":"handle/v1/tracks/71df5cb432a37bdf6de3cb1c77ab0d65/160","quality":"160","demo":0},{"name":"handle/v1/tracks/71df5cb432a37bdf6de3cb1c77ab0d65/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4269,"image":"new_data/images/track-covers/34043/conversions/64272215-8a47-4a62-a386-e1a7a3323797-thumb-200.jpg","image_large":"new_data/images/track-covers/34043/conversions/64272215-8a47-4a62-a386-e1a7a3323797-thumb-640.jpg","title":"شاید","download_title":"Shayad  Shadmehr Aghili","download_list_title":"شاید  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/5169b174a9543e417f548f19906bf7bf/320","quality":"320","demo":0},{"name":"handle/v1/tracks/5169b174a9543e417f548f19906bf7bf/160","quality":"160","demo":0},{"name":"handle/v1/tracks/5169b174a9543e417f548f19906bf7bf/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#328EB0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4268,"image":"new_data/images/track-covers/34042/conversions/80fb437f-df93-4671-a011-0783201a1055-thumb-200.jpg","image_large":"new_data/images/track-covers/34042/conversions/80fb437f-df93-4671-a011-0783201a1055-thumb-640.jpg","title":"آدما","download_title":"Adama  Shadmehr Aghili","download_list_title":"آدما  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/138103be2c1cc4a5426c399fe661a850/320","quality":"320","demo":0},{"name":"handle/v1/tracks/138103be2c1cc4a5426c399fe661a850/160","quality":"160","demo":0},{"name":"handle/v1/tracks/138103be2c1cc4a5426c399fe661a850/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#338FB1","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4267,"image":"new_data/images/track-covers/34041/conversions/44474b02-8664-4e00-ba21-c3f336f00d74-thumb-200.jpg","image_large":"new_data/images/track-covers/34041/conversions/44474b02-8664-4e00-ba21-c3f336f00d74-thumb-640.jpg","title":"حقه","download_title":"Hoghe  Shadmehr Aghili","download_list_title":"حقه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/73fde02e622d54604b403cb0337fd260/320","quality":"320","demo":0},{"name":"handle/v1/tracks/73fde02e622d54604b403cb0337fd260/160","quality":"160","demo":0},{"name":"handle/v1/tracks/73fde02e622d54604b403cb0337fd260/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#338EB1","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4265,"image":"new_data/images/track-covers/34039/conversions/8c154216-0150-49a2-b77d-11c0dfc1ed16-thumb-200.jpg","image_large":"new_data/images/track-covers/34039/conversions/8c154216-0150-49a2-b77d-11c0dfc1ed16-thumb-640.jpg","title":"گرفتار","download_title":"Gereftar  Shadmehr Aghili","download_list_title":"گرفتار  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ca1a87b63569bb5c82515e01e1e06caf/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ca1a87b63569bb5c82515e01e1e06caf/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ca1a87b63569bb5c82515e01e1e06caf/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#328EB1","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4263,"image":"new_data/images/track-covers/34037/conversions/41dc3db9-5855-4a0f-9410-a6149d1a59ed-thumb-200.jpg","image_large":"new_data/images/track-covers/34037/conversions/41dc3db9-5855-4a0f-9410-a6149d1a59ed-thumb-640.jpg","title":"نیاز","download_title":"Niyaz  Shadmehr Aghili","download_list_title":"نیاز  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/c6221ef045b965bbe6f18c70c7034ab2/320","quality":"320","demo":0},{"name":"handle/v1/tracks/c6221ef045b965bbe6f18c70c7034ab2/160","quality":"160","demo":0},{"name":"handle/v1/tracks/c6221ef045b965bbe6f18c70c7034ab2/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#328EB1","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4262,"image":"new_data/images/track-covers/34036/conversions/714deabb-c177-4a08-bddb-d9feff00dc08-thumb-200.jpg","image_large":"new_data/images/track-covers/34036/conversions/714deabb-c177-4a08-bddb-d9feff00dc08-thumb-640.jpg","title":"بیکلام 9","download_title":"Accordion & Orchestra  Shadmehr Aghili","download_list_title":"بیکلام 9  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/b87324ed1a3972d8bfd93a7753c89319/320","quality":"320","demo":0},{"name":"handle/v1/tracks/b87324ed1a3972d8bfd93a7753c89319/160","quality":"160","demo":0},{"name":"handle/v1/tracks/b87324ed1a3972d8bfd93a7753c89319/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EAAC8D","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4261,"image":"new_data/images/track-covers/34035/conversions/73b603b8-40a8-4361-b922-20d0c1ff50e0-thumb-200.jpg","image_large":"new_data/images/track-covers/34035/conversions/73b603b8-40a8-4361-b922-20d0c1ff50e0-thumb-640.jpg","title":"پر پرواز بیکلام","download_title":"Pare Parvaz (Instrumental)  Shadmehr Aghili","download_list_title":"پر پرواز بیکلام  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/b67d226fd1c99d3c6e9b52f5efacbf24/320","quality":"320","demo":0},{"name":"handle/v1/tracks/b67d226fd1c99d3c6e9b52f5efacbf24/160","quality":"160","demo":0},{"name":"handle/v1/tracks/b67d226fd1c99d3c6e9b52f5efacbf24/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#BD7E65","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4260,"image":"new_data/images/track-covers/34034/conversions/4d25b40a-4253-4f25-83c2-fb4c9c8e2603-thumb-200.jpg","image_large":"new_data/images/track-covers/34034/conversions/4d25b40a-4253-4f25-83c2-fb4c9c8e2603-thumb-640.jpg","title":"علامت سوال بیکلام","download_title":"Alamate Soal (Instrumental)  Shadmehr Aghili","download_list_title":"علامت سوال بیکلام  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/bc780b29c6e8f4fc185f082878192230/320","quality":"320","demo":0},{"name":"handle/v1/tracks/bc780b29c6e8f4fc185f082878192230/160","quality":"160","demo":0},{"name":"handle/v1/tracks/bc780b29c6e8f4fc185f082878192230/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#ECB193","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4259,"image":"new_data/images/track-covers/34033/conversions/1f5dc2d1-a3b2-4c59-a1ed-d06328d13282-thumb-200.jpg","image_large":"new_data/images/track-covers/34033/conversions/1f5dc2d1-a3b2-4c59-a1ed-d06328d13282-thumb-640.jpg","title":"آتیش بازی بیکلام","download_title":"Atish Bazi (Instrumental)  Shadmehr Aghili","download_list_title":"آتیش بازی بیکلام  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/13fd33e3906812b2cc57be83f4d1992b/320","quality":"320","demo":0},{"name":"handle/v1/tracks/13fd33e3906812b2cc57be83f4d1992b/160","quality":"160","demo":0},{"name":"handle/v1/tracks/13fd33e3906812b2cc57be83f4d1992b/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EAAD8F","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4258,"image":"new_data/images/track-covers/34032/conversions/7085cb5f-2366-4448-9015-f58c331df058-thumb-200.jpg","image_large":"new_data/images/track-covers/34032/conversions/7085cb5f-2366-4448-9015-f58c331df058-thumb-640.jpg","title":"بیکلام 5","download_title":"Instrumental 5  Shadmehr Aghili","download_list_title":"بیکلام 5  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/c38ace3da383f5330ef0a556b9724fe5/320","quality":"320","demo":0},{"name":"handle/v1/tracks/c38ace3da383f5330ef0a556b9724fe5/160","quality":"160","demo":0},{"name":"handle/v1/tracks/c38ace3da383f5330ef0a556b9724fe5/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EAAD8F","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4257,"image":"new_data/images/track-covers/34031/conversions/cb9b97ec-4bed-46c0-998a-973376737793-thumb-200.jpg","image_large":"new_data/images/track-covers/34031/conversions/cb9b97ec-4bed-46c0-998a-973376737793-thumb-640.jpg","title":"بیکلام 4","download_title":"Instrumental 4  Shadmehr Aghili","download_list_title":"بیکلام 4  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/2a20631900ffe180cd8ae73aa5e638ea/320","quality":"320","demo":0},{"name":"handle/v1/tracks/2a20631900ffe180cd8ae73aa5e638ea/160","quality":"160","demo":0},{"name":"handle/v1/tracks/2a20631900ffe180cd8ae73aa5e638ea/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#BC7D64","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4255,"image":"new_data/images/track-covers/34029/conversions/9308142e-1d0f-4f28-ac09-7075aabe34f8-thumb-200.jpg","image_large":"new_data/images/track-covers/34029/conversions/9308142e-1d0f-4f28-ac09-7075aabe34f8-thumb-640.jpg","title":"بیکلام 2","download_title":"Instrumental 2  Shadmehr Aghili","download_list_title":"بیکلام 2  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/f96b53146373c8f8122bf792b5288bce/320","quality":"320","demo":0},{"name":"handle/v1/tracks/f96b53146373c8f8122bf792b5288bce/160","quality":"160","demo":0},{"name":"handle/v1/tracks/f96b53146373c8f8122bf792b5288bce/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EAAC8D","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4253,"image":"new_data/images/track-covers/34027/conversions/06dd8769-5246-4a3d-ad21-15449b3605d3-thumb-200.jpg","image_large":"new_data/images/track-covers/34027/conversions/06dd8769-5246-4a3d-ad21-15449b3605d3-thumb-640.jpg","title":"علامت سوال","download_title":"Alamate Soal  Shadmehr Aghili","download_list_title":"علامت سوال  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/bfd22f62e9aa32403a9474bb33d1f7ec/320","quality":"320","demo":0},{"name":"handle/v1/tracks/bfd22f62e9aa32403a9474bb33d1f7ec/160","quality":"160","demo":0},{"name":"handle/v1/tracks/bfd22f62e9aa32403a9474bb33d1f7ec/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#E9AA8A","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4252,"image":"new_data/images/track-covers/34026/conversions/3db66a7e-4c82-4d93-8d37-0f773cf71e9c-thumb-200.jpg","image_large":"new_data/images/track-covers/34026/conversions/3db66a7e-4c82-4d93-8d37-0f773cf71e9c-thumb-640.jpg","title":"بیکلام 1","download_title":"Instrumental 1  Shadmehr Aghili","download_list_title":"بیکلام 1  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/8f337ce5c2afea3d8f6865a30cbd87e9/320","quality":"320","demo":0},{"name":"handle/v1/tracks/8f337ce5c2afea3d8f6865a30cbd87e9/160","quality":"160","demo":0},{"name":"handle/v1/tracks/8f337ce5c2afea3d8f6865a30cbd87e9/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EAAC8E","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4149,"image":"new_data/images/track-covers/33923/conversions/5a429796-04d6-4342-8e6f-a00f7c70a207-thumb-200.jpg","image_large":"new_data/images/track-covers/33923/conversions/5a429796-04d6-4342-8e6f-a00f7c70a207-thumb-640.jpg","title":"پیشگش","download_title":"Pishkesh  Shadmehr Aghili","download_list_title":"پیشگش  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/1b59f9489e2315475359f45fadb5e4be/320","quality":"320","demo":0},{"name":"handle/v1/tracks/1b59f9489e2315475359f45fadb5e4be/160","quality":"160","demo":0},{"name":"handle/v1/tracks/1b59f9489e2315475359f45fadb5e4be/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#318CAE","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4148,"image":"new_data/images/track-covers/33922/conversions/0b3d4f9c-e160-4d8f-b4d5-559209877ed8-thumb-200.jpg","image_large":"new_data/images/track-covers/33922/conversions/0b3d4f9c-e160-4d8f-b4d5-559209877ed8-thumb-640.jpg","title":"آتیش بازی","download_title":"Atish Bazi  Shadmehr Aghili","download_list_title":"آتیش بازی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/79144793accd1a395382ce38c17029e8/320","quality":"320","demo":0},{"name":"handle/v1/tracks/79144793accd1a395382ce38c17029e8/160","quality":"160","demo":0},{"name":"handle/v1/tracks/79144793accd1a395382ce38c17029e8/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EAAD8F","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4254,"image":"new_data/images/track-covers/34028/conversions/95be7a3f-9fa2-4cfa-a224-872b0f7482ca-thumb-200.jpg","image_large":"new_data/images/track-covers/34028/conversions/95be7a3f-9fa2-4cfa-a224-872b0f7482ca-thumb-640.jpg","title":"پر پرواز","download_title":"Par E Parvaz  Shadmehr Aghili","download_list_title":"پر پرواز  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/e2877a4a61ee178bcd7112a9f0c12e61/320","quality":"320","demo":0},{"name":"handle/v1/tracks/e2877a4a61ee178bcd7112a9f0c12e61/160","quality":"160","demo":0},{"name":"handle/v1/tracks/e2877a4a61ee178bcd7112a9f0c12e61/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#C28267","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4278,"image":"new_data/images/track-covers/34052/conversions/4b08af66-8585-4926-bf93-3377647f4c07-thumb-200.jpg","image_large":"new_data/images/track-covers/34052/conversions/4b08af66-8585-4926-bf93-3377647f4c07-thumb-640.jpg","title":"زندگی","download_title":"Zendegi  Shadmehr Aghili","download_list_title":"زندگی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/d3111c24fc482b10df8876521bffcf30/320","quality":"320","demo":0},{"name":"handle/v1/tracks/d3111c24fc482b10df8876521bffcf30/160","quality":"160","demo":0},{"name":"handle/v1/tracks/d3111c24fc482b10df8876521bffcf30/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B5836D","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4277,"image":"new_data/images/track-covers/34051/conversions/cc31fc36-e614-4160-a360-8158bbe56b7f-thumb-200.jpg","image_large":"new_data/images/track-covers/34051/conversions/cc31fc36-e614-4160-a360-8158bbe56b7f-thumb-640.jpg","title":"وقتی نیستی","download_title":"Vaghti Nisti  Shadmehr Aghili","download_list_title":"وقتی نیستی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/9de8e3e625112412fd63914e98e902eb/320","quality":"320","demo":0},{"name":"handle/v1/tracks/9de8e3e625112412fd63914e98e902eb/160","quality":"160","demo":0},{"name":"handle/v1/tracks/9de8e3e625112412fd63914e98e902eb/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B6836E","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4276,"image":"new_data/images/track-covers/34050/conversions/5e2133d1-2dec-4d35-9441-de7db6a3c32a-thumb-200.jpg","image_large":"new_data/images/track-covers/34050/conversions/5e2133d1-2dec-4d35-9441-de7db6a3c32a-thumb-640.jpg","title":"شیرین","download_title":"Shirin  Shadmehr Aghili","download_list_title":"شیرین  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/0baa5ac95ad9e192d856809a84f6cfe9/320","quality":"320","demo":0},{"name":"handle/v1/tracks/0baa5ac95ad9e192d856809a84f6cfe9/160","quality":"160","demo":0},{"name":"handle/v1/tracks/0baa5ac95ad9e192d856809a84f6cfe9/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B6836E","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4275,"image":"new_data/images/track-covers/34049/conversions/1669b8c0-d163-4802-b3c9-6a79ea62c1b1-thumb-200.jpg","image_large":"new_data/images/track-covers/34049/conversions/1669b8c0-d163-4802-b3c9-6a79ea62c1b1-thumb-640.jpg","title":"فریبا","download_title":"Fariba  Shadmehr Aghili","download_list_title":"فریبا  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/17686fa2ff858c733ad4fad67be85e35/320","quality":"320","demo":0},{"name":"handle/v1/tracks/17686fa2ff858c733ad4fad67be85e35/160","quality":"160","demo":0},{"name":"handle/v1/tracks/17686fa2ff858c733ad4fad67be85e35/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B7846E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4274,"image":"new_data/images/track-covers/34048/conversions/41cc0d18-4201-4068-b9e9-4b0995fb522a-thumb-200.jpg","image_large":"new_data/images/track-covers/34048/conversions/41cc0d18-4201-4068-b9e9-4b0995fb522a-thumb-640.jpg","title":"دوست دارم","download_title":"Dooset Daram  Shadmehr Aghili","download_list_title":"دوست دارم  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/aebece234a73e22896e1c1017355f1d6/320","quality":"320","demo":0},{"name":"handle/v1/tracks/aebece234a73e22896e1c1017355f1d6/160","quality":"160","demo":0},{"name":"handle/v1/tracks/aebece234a73e22896e1c1017355f1d6/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B5836D","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4273,"image":"new_data/images/track-covers/34047/conversions/e5eb2bf3-03e1-4d38-a74a-4d289518de9b-thumb-200.jpg","image_large":"new_data/images/track-covers/34047/conversions/e5eb2bf3-03e1-4d38-a74a-4d289518de9b-thumb-640.jpg","title":"بینهایت شب","download_title":"Binahayate Shab  Shadmehr Aghili","download_list_title":"بینهایت شب  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/5ff8a3301d25d4b7f7586b443eca7f99/320","quality":"320","demo":0},{"name":"handle/v1/tracks/5ff8a3301d25d4b7f7586b443eca7f99/160","quality":"160","demo":0},{"name":"handle/v1/tracks/5ff8a3301d25d4b7f7586b443eca7f99/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B5836D","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4272,"image":"new_data/images/track-covers/34046/conversions/4b69adfc-826b-47ab-bc32-c60ea8bbedf4-thumb-200.jpg","image_large":"new_data/images/track-covers/34046/conversions/4b69adfc-826b-47ab-bc32-c60ea8bbedf4-thumb-640.jpg","title":"باز بگم یا بسه","download_title":"Baz Begam Ya Base  Shadmehr Aghili","download_list_title":"باز بگم یا بسه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/541ee18d2aa212651a00a62c46ff268f/320","quality":"320","demo":0},{"name":"handle/v1/tracks/541ee18d2aa212651a00a62c46ff268f/160","quality":"160","demo":0},{"name":"handle/v1/tracks/541ee18d2aa212651a00a62c46ff268f/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B6836E","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4271,"image":"new_data/images/track-covers/34045/conversions/94855f96-057c-4d52-8de3-d277a7a1e8ea-thumb-200.jpg","image_large":"new_data/images/track-covers/34045/conversions/94855f96-057c-4d52-8de3-d277a7a1e8ea-thumb-640.jpg","title":"اولین قصه بی کتاب","download_title":"Avalin Ghesseh Bi Ketab  Shadmehr Aghili","download_list_title":"اولین قصه بی کتاب  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/4717bf863d5851e7efe52882eef7605d/320","quality":"320","demo":0},{"name":"handle/v1/tracks/4717bf863d5851e7efe52882eef7605d/160","quality":"160","demo":0},{"name":"handle/v1/tracks/4717bf863d5851e7efe52882eef7605d/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B6836E","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4270,"image":"new_data/images/track-covers/34044/conversions/fe14ecce-44d4-466c-abae-f6c5c0179973-thumb-200.jpg","image_large":"new_data/images/track-covers/34044/conversions/fe14ecce-44d4-466c-abae-f6c5c0179973-thumb-640.jpg","title":"عطر و شبنم","download_title":"Atr O Shabnam  Shadmehr Aghili","download_list_title":"عطر و شبنم  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/0d99ef81b55a2e9a0a1c0fc151771224/320","quality":"320","demo":0},{"name":"handle/v1/tracks/0d99ef81b55a2e9a0a1c0fc151771224/160","quality":"160","demo":0},{"name":"handle/v1/tracks/0d99ef81b55a2e9a0a1c0fc151771224/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B6846E","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4289,"image":"new_data/images/track-covers/34063/conversions/309be54b-b04a-4c65-a04e-65e78eaad2d1-thumb-200.jpg","image_large":"new_data/images/track-covers/34063/conversions/309be54b-b04a-4c65-a04e-65e78eaad2d1-thumb-640.jpg","title":"قفس","download_title":"Ghafas  Shadmehr Aghili","download_list_title":"قفس  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/3ec5fd561a3c275010b108b384768ded/320","quality":"320","demo":0},{"name":"handle/v1/tracks/3ec5fd561a3c275010b108b384768ded/160","quality":"160","demo":0},{"name":"handle/v1/tracks/3ec5fd561a3c275010b108b384768ded/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EDA971","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4287,"image":"new_data/images/track-covers/34061/conversions/b577ae69-3e94-4606-b2f2-2abd0a428d72-thumb-200.jpg","image_large":"new_data/images/track-covers/34061/conversions/b577ae69-3e94-4606-b2f2-2abd0a428d72-thumb-640.jpg","title":"بینهایت شب","download_title":"Bi Nahayat E Shab  Shadmehr Aghili","download_list_title":"بینهایت شب  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/6a62992a0eb457837887d927d7c77c7e/320","quality":"320","demo":0},{"name":"handle/v1/tracks/6a62992a0eb457837887d927d7c77c7e/160","quality":"160","demo":0},{"name":"handle/v1/tracks/6a62992a0eb457837887d927d7c77c7e/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EDA871","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4286,"image":"new_data/images/track-covers/34060/conversions/f3b36ac6-4bc7-4081-b5f7-0c6083640578-thumb-200.jpg","image_large":"new_data/images/track-covers/34060/conversions/f3b36ac6-4bc7-4081-b5f7-0c6083640578-thumb-640.jpg","title":"منو تو درخت و بارون","download_title":"Mano To Derakhto Baroon  Shadmehr Aghili","download_list_title":"منو تو درخت و بارون  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/c364f836c6fce3e9886391c2ecdc3dbd/320","quality":"320","demo":0},{"name":"handle/v1/tracks/c364f836c6fce3e9886391c2ecdc3dbd/160","quality":"160","demo":0},{"name":"handle/v1/tracks/c364f836c6fce3e9886391c2ecdc3dbd/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EDA871","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4284,"image":"new_data/images/track-covers/34058/conversions/ecd2e862-453d-4a10-8a57-a53c2be4a75f-thumb-200.jpg","image_large":"new_data/images/track-covers/34058/conversions/ecd2e862-453d-4a10-8a57-a53c2be4a75f-thumb-640.jpg","title":"عطر و شبنم","download_title":"Atro Shabnam  Shadmehr Aghili","download_list_title":"عطر و شبنم  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/11fd67556a57e85a157ec5705c484988/320","quality":"320","demo":0},{"name":"handle/v1/tracks/11fd67556a57e85a157ec5705c484988/160","quality":"160","demo":0},{"name":"handle/v1/tracks/11fd67556a57e85a157ec5705c484988/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EDA871","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4283,"image":"new_data/images/track-covers/34057/conversions/440d2e48-89a6-451f-84b1-3829e8b49201-thumb-200.jpg","image_large":"new_data/images/track-covers/34057/conversions/440d2e48-89a6-451f-84b1-3829e8b49201-thumb-640.jpg","title":"قسمت","download_title":"Ghesmat  Shadmehr Aghili","download_list_title":"قسمت  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/1c2ee7e0314bce09615b313fb30f99c1/320","quality":"320","demo":0},{"name":"handle/v1/tracks/1c2ee7e0314bce09615b313fb30f99c1/160","quality":"160","demo":0},{"name":"handle/v1/tracks/1c2ee7e0314bce09615b313fb30f99c1/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EDA871","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4282,"image":"new_data/images/track-covers/34056/conversions/b7a9f336-db7a-472c-88d7-779ad4303ae5-thumb-200.jpg","image_large":"new_data/images/track-covers/34056/conversions/b7a9f336-db7a-472c-88d7-779ad4303ae5-thumb-640.jpg","title":"تقدیر","download_title":"Taghdir  Shadmehr Aghili","download_list_title":"تقدیر  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/5fead776d23a89303e0563835db69a18/320","quality":"320","demo":0},{"name":"handle/v1/tracks/5fead776d23a89303e0563835db69a18/160","quality":"160","demo":0},{"name":"handle/v1/tracks/5fead776d23a89303e0563835db69a18/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EDA871","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4281,"image":"new_data/images/track-covers/34055/conversions/58a56af5-67f7-4630-8e5a-737474c89c70-thumb-200.jpg","image_large":"new_data/images/track-covers/34055/conversions/58a56af5-67f7-4630-8e5a-737474c89c70-thumb-640.jpg","title":"تبسم","download_title":"Tabasom  Shadmehr Aghili","download_list_title":"تبسم  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/9c6b883a4dd5bc9f714be8d431ca3178/320","quality":"320","demo":0},{"name":"handle/v1/tracks/9c6b883a4dd5bc9f714be8d431ca3178/160","quality":"160","demo":0},{"name":"handle/v1/tracks/9c6b883a4dd5bc9f714be8d431ca3178/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EDA871","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4280,"image":"new_data/images/track-covers/34054/conversions/9056cfda-ac91-4333-9b19-f7b9b22a9f65-thumb-200.jpg","image_large":"new_data/images/track-covers/34054/conversions/9056cfda-ac91-4333-9b19-f7b9b22a9f65-thumb-640.jpg","title":"باغ زندگی","download_title":"Bagh E Zemdegi  Shadmehr Aghili","download_list_title":"باغ زندگی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/df523f653a69948347e042f76a4d8c72/320","quality":"320","demo":0},{"name":"handle/v1/tracks/df523f653a69948347e042f76a4d8c72/160","quality":"160","demo":0},{"name":"handle/v1/tracks/df523f653a69948347e042f76a4d8c72/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EDA971","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4279,"image":"new_data/images/track-covers/34053/conversions/7601ce81-283d-4da0-bb13-a019a49a4663-thumb-200.jpg","image_large":"new_data/images/track-covers/34053/conversions/7601ce81-283d-4da0-bb13-a019a49a4663-thumb-640.jpg","title":"وقف پرندهها","download_title":"Vaghf E Parandeha  Shadmehr Aghili","download_list_title":"وقف پرندهها  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/e6626402f4f6063b81d07d91fca1f389/320","quality":"320","demo":0},{"name":"handle/v1/tracks/e6626402f4f6063b81d07d91fca1f389/160","quality":"160","demo":0},{"name":"handle/v1/tracks/e6626402f4f6063b81d07d91fca1f389/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EDA971","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4298,"image":"new_data/images/track-covers/34072/conversions/6415b5e8-ff63-42e2-9707-0ba08be4ee64-thumb-200.jpg","image_large":"new_data/images/track-covers/34072/conversions/6415b5e8-ff63-42e2-9707-0ba08be4ee64-thumb-640.jpg","title":"پائیز","download_title":"Paeiz  Shadmehr Aghili","download_list_title":"پائیز  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/c46198aad8739ce6f9e1bf69f02fa9ea/320","quality":"320","demo":0},{"name":"handle/v1/tracks/c46198aad8739ce6f9e1bf69f02fa9ea/160","quality":"160","demo":0},{"name":"handle/v1/tracks/c46198aad8739ce6f9e1bf69f02fa9ea/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#D56C4E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4297,"image":"new_data/images/track-covers/34071/conversions/a8800d50-33c3-4ee0-a626-2693552bf906-thumb-200.jpg","image_large":"new_data/images/track-covers/34071/conversions/a8800d50-33c3-4ee0-a626-2693552bf906-thumb-640.jpg","title":"نگاه پنجره","download_title":"Negahe Panjereh  Shadmehr Aghili","download_list_title":"نگاه پنجره  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/b825d078c9d68a4cce870fc720b13b87/320","quality":"320","demo":0},{"name":"handle/v1/tracks/b825d078c9d68a4cce870fc720b13b87/160","quality":"160","demo":0},{"name":"handle/v1/tracks/b825d078c9d68a4cce870fc720b13b87/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#D56C4E","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4296,"image":"new_data/images/track-covers/34070/conversions/f04dc1c5-47ce-4341-8ada-31711e14ccf9-thumb-200.jpg","image_large":"new_data/images/track-covers/34070/conversions/f04dc1c5-47ce-4341-8ada-31711e14ccf9-thumb-640.jpg","title":"نوایی","download_title":"Navaei  Shadmehr Aghili","download_list_title":"نوایی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/e208f6f1d04ca65716916229a5330614/320","quality":"320","demo":0},{"name":"handle/v1/tracks/e208f6f1d04ca65716916229a5330614/160","quality":"160","demo":0},{"name":"handle/v1/tracks/e208f6f1d04ca65716916229a5330614/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#D56C4E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4295,"image":"new_data/images/track-covers/34069/conversions/6bcc99f2-3734-4df9-9eb2-0cda54fae77a-thumb-200.jpg","image_large":"new_data/images/track-covers/34069/conversions/6bcc99f2-3734-4df9-9eb2-0cda54fae77a-thumb-640.jpg","title":"خونه","download_title":"Khooneh  Shadmehr Aghili","download_list_title":"خونه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/17f45cca639ef134f03770ea09937901/320","quality":"320","demo":0},{"name":"handle/v1/tracks/17f45cca639ef134f03770ea09937901/160","quality":"160","demo":0},{"name":"handle/v1/tracks/17f45cca639ef134f03770ea09937901/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#D56C4E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4294,"image":"new_data/images/track-covers/34068/conversions/a9084226-b944-480a-9391-889dff6bcbaa-thumb-200.jpg","image_large":"new_data/images/track-covers/34068/conversions/a9084226-b944-480a-9391-889dff6bcbaa-thumb-640.jpg","title":"غریبه","download_title":"Gharibeh  Shadmehr Aghili","download_list_title":"غریبه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/b5b38fce5ec74ac7b36450baef1076bc/320","quality":"320","demo":0},{"name":"handle/v1/tracks/b5b38fce5ec74ac7b36450baef1076bc/160","quality":"160","demo":0},{"name":"handle/v1/tracks/b5b38fce5ec74ac7b36450baef1076bc/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#D56B4E","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4293,"image":"new_data/images/track-covers/34067/conversions/118d2c84-0a53-4f2c-88e2-8683e2334389-thumb-200.jpg","image_large":"new_data/images/track-covers/34067/conversions/118d2c84-0a53-4f2c-88e2-8683e2334389-thumb-640.jpg","title":"دلخوشی","download_title":"Del Khoshi  Shadmehr Aghili","download_list_title":"دلخوشی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/e9dd2e05e040d55982cfba113604deba/320","quality":"320","demo":0},{"name":"handle/v1/tracks/e9dd2e05e040d55982cfba113604deba/160","quality":"160","demo":0},{"name":"handle/v1/tracks/e9dd2e05e040d55982cfba113604deba/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#D66D4E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4292,"image":"new_data/images/track-covers/34066/conversions/d62520d8-c1ab-4005-bed0-f53376d163f2-thumb-200.jpg","image_large":"new_data/images/track-covers/34066/conversions/d62520d8-c1ab-4005-bed0-f53376d163f2-thumb-640.jpg","title":"دل خوشی بیکلام","download_title":"Del Khoshi (Instrumental)  Shadmehr Aghili","download_list_title":"دل خوشی بیکلام  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/d1a6942e041a6dfaf90f74fc1c496145/320","quality":"320","demo":0},{"name":"handle/v1/tracks/d1a6942e041a6dfaf90f74fc1c496145/160","quality":"160","demo":0},{"name":"handle/v1/tracks/d1a6942e041a6dfaf90f74fc1c496145/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#D56C4E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4291,"image":"new_data/images/track-covers/34065/conversions/9dcf3f6f-69ae-4ab2-8eb1-6fc941cc84b2-thumb-200.jpg","image_large":"new_data/images/track-covers/34065/conversions/9dcf3f6f-69ae-4ab2-8eb1-6fc941cc84b2-thumb-640.jpg","title":"آسمونی بیکلام","download_title":"Asemooni (Instrumental)  Shadmehr Aghili","download_list_title":"آسمونی بیکلام  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/7984a6450005b1b82e4c60f265b2c7c0/320","quality":"320","demo":0},{"name":"handle/v1/tracks/7984a6450005b1b82e4c60f265b2c7c0/160","quality":"160","demo":0},{"name":"handle/v1/tracks/7984a6450005b1b82e4c60f265b2c7c0/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#D56B4E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4290,"image":"new_data/images/track-covers/34064/conversions/8dcc6f81-bd60-49fc-831f-1e2e54b2a829-thumb-200.jpg","image_large":"new_data/images/track-covers/34064/conversions/8dcc6f81-bd60-49fc-831f-1e2e54b2a829-thumb-640.jpg","title":"دهاتی","download_title":"Dehaati  Shadmehr Aghili","download_list_title":"دهاتی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/cb228a698a45669fd966c90c86b4bb85/320","quality":"320","demo":0},{"name":"handle/v1/tracks/cb228a698a45669fd966c90c86b4bb85/160","quality":"160","demo":0},{"name":"handle/v1/tracks/cb228a698a45669fd966c90c86b4bb85/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#D66C4E","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4152,"image":"new_data/images/track-covers/33926/conversions/c1134f2a-90cb-4081-976f-3d6cc64e3911-thumb-200.jpg","image_large":"new_data/images/track-covers/33926/conversions/c1134f2a-90cb-4081-976f-3d6cc64e3911-thumb-640.jpg","title":"آسمونی","download_title":"Asemooni  Shadmehr Aghili","download_list_title":"آسمونی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/c28ac83a4fd8863b72e972175fc7f199/320","quality":"320","demo":0},{"name":"handle/v1/tracks/c28ac83a4fd8863b72e972175fc7f199/160","quality":"160","demo":0},{"name":"handle/v1/tracks/c28ac83a4fd8863b72e972175fc7f199/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#D66D4E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4285,"image":"new_data/images/track-covers/34059/conversions/c3a9ccaf-f9eb-40bb-ad5e-6f0b02d2370c-thumb-200.jpg","image_large":"new_data/images/track-covers/34059/conversions/c3a9ccaf-f9eb-40bb-ad5e-6f0b02d2370c-thumb-640.jpg","title":"هزار و یک شب","download_title":"Hezaar O Yek Shab  Shadmehr Aghili","download_list_title":"هزار و یک شب  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/2c2481e11215e237ae62da52a0716048/320","quality":"320","demo":0},{"name":"handle/v1/tracks/2c2481e11215e237ae62da52a0716048/160","quality":"160","demo":0},{"name":"handle/v1/tracks/2c2481e11215e237ae62da52a0716048/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#EDA971","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4306,"image":"new_data/images/track-covers/34080/conversions/af66459c-811a-4913-a2af-5fdc1eb1394d-thumb-200.jpg","image_large":"new_data/images/track-covers/34080/conversions/af66459c-811a-4913-a2af-5fdc1eb1394d-thumb-640.jpg","title":"پله عاطفه","download_title":"Poleh Aatefeh  Shadmehr Aghili","download_list_title":"پله عاطفه  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/bef2f6097d5c87c0691fcb08df7413bb/320","quality":"320","demo":0},{"name":"handle/v1/tracks/bef2f6097d5c87c0691fcb08df7413bb/160","quality":"160","demo":0},{"name":"handle/v1/tracks/bef2f6097d5c87c0691fcb08df7413bb/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B35D2E","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4305,"image":"new_data/images/track-covers/34079/conversions/6610b477-d5bf-4adf-8726-cca90e6ecd37-thumb-200.jpg","image_large":"new_data/images/track-covers/34079/conversions/6610b477-d5bf-4adf-8726-cca90e6ecd37-thumb-640.jpg","title":"آرزوها","download_title":"Arezooha  Shadmehr Aghili","download_list_title":"آرزوها  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/97da9341c0a89cd75637125551616728/320","quality":"320","demo":0},{"name":"handle/v1/tracks/97da9341c0a89cd75637125551616728/160","quality":"160","demo":0},{"name":"handle/v1/tracks/97da9341c0a89cd75637125551616728/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B65F2F","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4304,"image":"new_data/images/track-covers/34078/conversions/e1e4302a-f082-473f-8bf5-b69e9ca1169a-thumb-200.jpg","image_large":"new_data/images/track-covers/34078/conversions/e1e4302a-f082-473f-8bf5-b69e9ca1169a-thumb-640.jpg","title":"بی تابی","download_title":"Bi Tabi  Shadmehr Aghili","download_list_title":"بی تابی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/99881e3cf9917b56326ba16c97a83f3a/320","quality":"320","demo":0},{"name":"handle/v1/tracks/99881e3cf9917b56326ba16c97a83f3a/160","quality":"160","demo":0},{"name":"handle/v1/tracks/99881e3cf9917b56326ba16c97a83f3a/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B55E2F","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4303,"image":"new_data/images/track-covers/34077/conversions/78374a2c-2caf-492f-b429-e43446b963d8-thumb-200.jpg","image_large":"new_data/images/track-covers/34077/conversions/78374a2c-2caf-492f-b429-e43446b963d8-thumb-640.jpg","title":"گل یاس","download_title":"Gole Yas  Shadmehr Aghili","download_list_title":"گل یاس  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/4ca6cbce36d575e961131691d8123c6a/320","quality":"320","demo":0},{"name":"handle/v1/tracks/4ca6cbce36d575e961131691d8123c6a/160","quality":"160","demo":0},{"name":"handle/v1/tracks/4ca6cbce36d575e961131691d8123c6a/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B35D2E","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4302,"image":"new_data/images/track-covers/34076/conversions/c23b2a30-2b2e-47a1-b75b-e0ebc6189bf3-thumb-200.jpg","image_large":"new_data/images/track-covers/34076/conversions/c23b2a30-2b2e-47a1-b75b-e0ebc6189bf3-thumb-640.jpg","title":"حدیث مهربانی","download_title":"Hadise Mehrabani  Shadmehr Aghili","download_list_title":"حدیث مهربانی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/f3907415116303b10d0e1b151f7b5334/320","quality":"320","demo":0},{"name":"handle/v1/tracks/f3907415116303b10d0e1b151f7b5334/160","quality":"160","demo":0},{"name":"handle/v1/tracks/f3907415116303b10d0e1b151f7b5334/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B76030","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4301,"image":"new_data/images/track-covers/34075/conversions/6d49aaf9-9bab-4600-a499-e060501056c9-thumb-200.jpg","image_large":"new_data/images/track-covers/34075/conversions/6d49aaf9-9bab-4600-a499-e060501056c9-thumb-640.jpg","title":"مشق سکوت","download_title":"Mashghe Sokoot  Shadmehr Aghili","download_list_title":"مشق سکوت  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/345531ad9c4bfe01844dbb2a6525ebc6/320","quality":"320","demo":0},{"name":"handle/v1/tracks/345531ad9c4bfe01844dbb2a6525ebc6/160","quality":"160","demo":0},{"name":"handle/v1/tracks/345531ad9c4bfe01844dbb2a6525ebc6/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B65F2F","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4300,"image":"new_data/images/track-covers/34074/conversions/0dca13db-066a-49d5-8bcb-92b3b142ebc2-thumb-200.jpg","image_large":"new_data/images/track-covers/34074/conversions/0dca13db-066a-49d5-8bcb-92b3b142ebc2-thumb-640.jpg","title":"هزار و یک شب","download_title":"Hezar Va Yek Shab  Shadmehr Aghili","download_list_title":"هزار و یک شب  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/e31f59685600527d718a489184f9a114/320","quality":"320","demo":0},{"name":"handle/v1/tracks/e31f59685600527d718a489184f9a114/160","quality":"160","demo":0},{"name":"handle/v1/tracks/e31f59685600527d718a489184f9a114/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B65F2F","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4299,"image":"new_data/images/track-covers/34073/conversions/ed910f17-8750-4a32-8395-eb3d432724a3-thumb-200.jpg","image_large":"new_data/images/track-covers/34073/conversions/ed910f17-8750-4a32-8395-eb3d432724a3-thumb-640.jpg","title":"روح سبز","download_title":"Roohe Sabz  Shadmehr Aghili","download_list_title":"روح سبز  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/493b8ce21499176d7670028b854319be/320","quality":"320","demo":0},{"name":"handle/v1/tracks/493b8ce21499176d7670028b854319be/160","quality":"160","demo":0},{"name":"handle/v1/tracks/493b8ce21499176d7670028b854319be/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B65F2F","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4314,"image":"new_data/images/track-covers/34088/conversions/165ee5f4-89b3-4e3f-9291-a5879b096948-thumb-200.jpg","image_large":"new_data/images/track-covers/34088/conversions/165ee5f4-89b3-4e3f-9291-a5879b096948-thumb-640.jpg","title":"وقف پرنده ها","download_title":"Vaghfeh Parandeha  Shadmehr Aghili","download_list_title":"وقف پرنده ها  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ac8d9be384ff7b7c7ef3efbabb76d52c/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ac8d9be384ff7b7c7ef3efbabb76d52c/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ac8d9be384ff7b7c7ef3efbabb76d52c/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B03A2C","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4313,"image":"new_data/images/track-covers/34087/conversions/91cb4e7f-aeed-4875-8855-c79e92470139-thumb-200.jpg","image_large":"new_data/images/track-covers/34087/conversions/91cb4e7f-aeed-4875-8855-c79e92470139-thumb-640.jpg","title":"وصل حجران","download_title":"Vasleh Hejran  Shadmehr Aghili","download_list_title":"وصل حجران  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/ebafceb548ace5ce4bd04588a6ee7e9d/320","quality":"320","demo":0},{"name":"handle/v1/tracks/ebafceb548ace5ce4bd04588a6ee7e9d/160","quality":"160","demo":0},{"name":"handle/v1/tracks/ebafceb548ace5ce4bd04588a6ee7e9d/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B03A2C","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4312,"image":"new_data/images/track-covers/34086/conversions/16b546ef-1af5-4bd5-8401-e92eb2186b36-thumb-200.jpg","image_large":"new_data/images/track-covers/34086/conversions/16b546ef-1af5-4bd5-8401-e92eb2186b36-thumb-640.jpg","title":"نکته دان عشق","download_title":"Nokte Daneh Eshgh  Shadmehr Aghili","download_list_title":"نکته دان عشق  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/1690b417913b34dee9f149b4b7e29af2/320","quality":"320","demo":0},{"name":"handle/v1/tracks/1690b417913b34dee9f149b4b7e29af2/160","quality":"160","demo":0},{"name":"handle/v1/tracks/1690b417913b34dee9f149b4b7e29af2/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B03A2C","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4311,"image":"new_data/images/track-covers/34085/conversions/7174bf99-0d08-4bcf-9daa-3c08575c5252-thumb-200.jpg","image_large":"new_data/images/track-covers/34085/conversions/7174bf99-0d08-4bcf-9daa-3c08575c5252-thumb-640.jpg","title":"خاک آستان علی","download_title":"Khake Astene Ali  Shadmehr Aghili","download_list_title":"خاک آستان علی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/fccdd6c9f53623bd4f29f3a764f9186e/320","quality":"320","demo":0},{"name":"handle/v1/tracks/fccdd6c9f53623bd4f29f3a764f9186e/160","quality":"160","demo":0},{"name":"handle/v1/tracks/fccdd6c9f53623bd4f29f3a764f9186e/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B03A2C","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4310,"image":"new_data/images/track-covers/34084/conversions/2f669db6-18da-40f8-a080-78b1e945c412-thumb-200.jpg","image_large":"new_data/images/track-covers/34084/conversions/2f669db6-18da-40f8-a080-78b1e945c412-thumb-640.jpg","title":"معبود","download_title":"Mabood  Shadmehr Aghili","download_list_title":"معبود  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/00a056b02fea8ed3632a8ee8ff08cfdd/320","quality":"320","demo":0},{"name":"handle/v1/tracks/00a056b02fea8ed3632a8ee8ff08cfdd/160","quality":"160","demo":0},{"name":"handle/v1/tracks/00a056b02fea8ed3632a8ee8ff08cfdd/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B03A2C","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4309,"image":"new_data/images/track-covers/34083/conversions/edf145a4-d5ad-4b0c-a84d-e940955c463b-thumb-200.jpg","image_large":"new_data/images/track-covers/34083/conversions/edf145a4-d5ad-4b0c-a84d-e940955c463b-thumb-640.jpg","title":"فصل آشنایی","download_title":"Fasle Ashenaei  Shadmehr Aghili","download_list_title":"فصل آشنایی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/8d5ab2750377cb43c4a0905c9498422b/320","quality":"320","demo":0},{"name":"handle/v1/tracks/8d5ab2750377cb43c4a0905c9498422b/160","quality":"160","demo":0},{"name":"handle/v1/tracks/8d5ab2750377cb43c4a0905c9498422b/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B03A2C","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4308,"image":"new_data/images/track-covers/34082/conversions/179c2334-eafd-4042-bc8c-95d1a1f61d48-thumb-200.jpg","image_large":"new_data/images/track-covers/34082/conversions/179c2334-eafd-4042-bc8c-95d1a1f61d48-thumb-640.jpg","title":"باغ زندگی","download_title":"Baghe Zendegi  Shadmehr Aghili","download_list_title":"باغ زندگی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/b83296e62fdb27611277e654faecae85/320","quality":"320","demo":0},{"name":"handle/v1/tracks/b83296e62fdb27611277e654faecae85/160","quality":"160","demo":0},{"name":"handle/v1/tracks/b83296e62fdb27611277e654faecae85/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B03A2C","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4154,"image":"new_data/images/track-covers/33928/conversions/27ac579f-3b6f-465f-bf25-d9d73eb90fa8-thumb-200.jpg","image_large":"new_data/images/track-covers/33928/conversions/27ac579f-3b6f-465f-bf25-d9d73eb90fa8-thumb-640.jpg","title":"منو تو و درخت و باران","download_title":"Man O To O Derakht O Baran  Shadmehr Aghili","download_list_title":"منو تو و درخت و باران  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/327924c226db3352469247960a95d64c/320","quality":"320","demo":0},{"name":"handle/v1/tracks/327924c226db3352469247960a95d64c/160","quality":"160","demo":0},{"name":"handle/v1/tracks/327924c226db3352469247960a95d64c/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B03A2C","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4153,"image":"new_data/images/track-covers/33927/conversions/6c2892b6-0caf-4636-8bd9-6538e55bcb60-thumb-200.jpg","image_large":"new_data/images/track-covers/33927/conversions/6c2892b6-0caf-4636-8bd9-6538e55bcb60-thumb-640.jpg","title":"مسافر","download_title":"Mosaafer  Shadmehr Aghili","download_list_title":"مسافر  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/e7c304f8e87a0d0aca1eab6aa6b174db/320","quality":"320","demo":0},{"name":"handle/v1/tracks/e7c304f8e87a0d0aca1eab6aa6b174db/160","quality":"160","demo":0},{"name":"handle/v1/tracks/e7c304f8e87a0d0aca1eab6aa6b174db/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#B65F2F","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4155,"image":"new_data/images/track-covers/33929/conversions/8a53b98a-f006-4fcb-b2b5-c122b25baad4-thumb-200.jpg","image_large":"new_data/images/track-covers/33929/conversions/8a53b98a-f006-4fcb-b2b5-c122b25baad4-thumb-640.jpg","title":"ملودی شادی","download_title":"Melody Of Joy  Shadmehr Aghili","download_list_title":"ملودی شادی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/7952fc5948e0b9eb1a57fd1c4ca66bdf/320","quality":"320","demo":0},{"name":"handle/v1/tracks/7952fc5948e0b9eb1a57fd1c4ca66bdf/160","quality":"160","demo":0},{"name":"handle/v1/tracks/7952fc5948e0b9eb1a57fd1c4ca66bdf/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#5089BB","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4320,"image":"new_data/images/track-covers/34094/conversions/afadc671-938b-443d-ba17-1e78575c6c6b-thumb-200.jpg","image_large":"new_data/images/track-covers/34094/conversions/afadc671-938b-443d-ba17-1e78575c6c6b-thumb-640.jpg","title":"خانم خانما","download_title":"Khanom Khanoma  Shadmehr Aghili","download_list_title":"خانم خانما  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/d77bf4117abb332f6e3f2c157e6d7e3e/320","quality":"320","demo":0},{"name":"handle/v1/tracks/d77bf4117abb332f6e3f2c157e6d7e3e/160","quality":"160","demo":0},{"name":"handle/v1/tracks/d77bf4117abb332f6e3f2c157e6d7e3e/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4319,"image":"new_data/images/track-covers/34093/conversions/72924c96-63db-42d1-82d6-be3da72a062e-thumb-200.jpg","image_large":"new_data/images/track-covers/34093/conversions/72924c96-63db-42d1-82d6-be3da72a062e-thumb-640.jpg","title":"پنهون","download_title":"Penhoon  Shadmehr Aghili","download_list_title":"پنهون  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/0d8f5f462504ae73aaf4aab1cf960ac2/320","quality":"320","demo":0},{"name":"handle/v1/tracks/0d8f5f462504ae73aaf4aab1cf960ac2/160","quality":"160","demo":0},{"name":"handle/v1/tracks/0d8f5f462504ae73aaf4aab1cf960ac2/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4318,"image":"new_data/images/track-covers/34092/conversions/73804309-db36-4173-b061-ffe4797e401a-thumb-200.jpg","image_large":"new_data/images/track-covers/34092/conversions/73804309-db36-4173-b061-ffe4797e401a-thumb-640.jpg","title":"کرشمه (بیکلام)","download_title":"Kereshmeh (Bi Kalam)  Shadmehr Aghili","download_list_title":"کرشمه (بیکلام)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/8bfa28cf9b0f8d764f01b3473839d77d/320","quality":"320","demo":0},{"name":"handle/v1/tracks/8bfa28cf9b0f8d764f01b3473839d77d/160","quality":"160","demo":0},{"name":"handle/v1/tracks/8bfa28cf9b0f8d764f01b3473839d77d/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4317,"image":"new_data/images/track-covers/34091/conversions/5c642db2-f081-4e34-a3fb-13400e0cde50-thumb-200.jpg","image_large":"new_data/images/track-covers/34091/conversions/5c642db2-f081-4e34-a3fb-13400e0cde50-thumb-640.jpg","title":"زمستون (ورژن 1)","download_title":"Zemestoon (Version1)  Shadmehr Aghili","download_list_title":"زمستون (ورژن 1)  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/7ad904e9a0d3919655364b73fa90da48/320","quality":"320","demo":0},{"name":"handle/v1/tracks/7ad904e9a0d3919655364b73fa90da48/160","quality":"160","demo":0},{"name":"handle/v1/tracks/7ad904e9a0d3919655364b73fa90da48/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}},{"id":4316,"image":"new_data/images/track-covers/34090/conversions/6ae50204-5e20-4d50-b426-5c961d3da48e-thumb-200.jpg","image_large":"new_data/images/track-covers/34090/conversions/6ae50204-5e20-4d50-b426-5c961d3da48e-thumb-640.jpg","title":"نرو","download_title":"Naro  Shadmehr Aghili","download_list_title":"نرو  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/b3f1e7ca13342cf1816edb47a01ed5ad/320","quality":"320","demo":0},{"name":"handle/v1/tracks/b3f1e7ca13342cf1816edb47a01ed5ad/160","quality":"160","demo":0},{"name":"handle/v1/tracks/b3f1e7ca13342cf1816edb47a01ed5ad/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":"هم‌زمان","show_limitation_box":false,"has_lyric":true}},{"id":4315,"image":"new_data/images/track-covers/34089/conversions/dd63d013-f0e6-4be9-8b5b-9cca8ef74973-thumb-200.jpg","image_large":"new_data/images/track-covers/34089/conversions/dd63d013-f0e6-4be9-8b5b-9cca8ef74973-thumb-640.jpg","title":"سول وحشی","download_title":"Sole Vahshi  Shadmehr Aghili","download_list_title":"سول وحشی  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/a2ce73673d03618928deb36efe69ce80/320","quality":"320","demo":0},{"name":"handle/v1/tracks/a2ce73673d03618928deb36efe69ce80/160","quality":"160","demo":0},{"name":"handle/v1/tracks/a2ce73673d03618928deb36efe69ce80/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":false}},{"id":4156,"image":"new_data/images/track-covers/33930/conversions/a2d8a60d-01ab-49b6-9260-5bc85defe702-thumb-200.jpg","image_large":"new_data/images/track-covers/33930/conversions/a2d8a60d-01ab-49b6-9260-5bc85defe702-thumb-640.jpg","title":"شام غریبان","download_title":"Sham Ghariban  Shadmehr Aghili","download_list_title":"شام غریبان  شادمهر عقیلی","is_demo":false,"mp3s":[{"name":"handle/v1/tracks/28270fd4bf5c82f274bdd55b914ebe12/320","quality":"320","demo":0},{"name":"handle/v1/tracks/28270fd4bf5c82f274bdd55b914ebe12/160","quality":"160","demo":0},{"name":"handle/v1/tracks/28270fd4bf5c82f274bdd55b914ebe12/96","quality":"96","demo":0}],"artists":[{"id":55,"image":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-300.jpg","image_large":"new_data/images/artist-images/604302/conversions/370c5837-9160-416a-8830-13dd28d7efdb-thumb-500.jpg","name":"شادمهر عقیلی","has_related_collection":false,"instagram_page":null}],"track_limit":null,"add_on":null,"background_color":"#A0A0A0","lyric":{"type_title":null,"show_limitation_box":false,"has_lyric":true}}],"remaining":0,"end":true},
        playerQuery: null,
        playerQueryParams: null,
        playlistSortId: 'melodify',
        playlistSortTitle: 'پیشنهادی ملودیفای',
        listIsLoading: false,
        playerLyrics: null,
        lyric_limitation_data:null,
        lyric_reports_for_sync:null,
        lyric_reports_for_nonSync:null,
        isLoadingLyrics:false,
        stream_limitation_data:null,
        download_limitation_data:null,
        currentPointedTrackID:null,
        downloadedTracks:null,
        listenedTracks:null,


        //Support Variables
        // selectedFAQ: null,
        // selectedFAQQuestion: null,
        // ticketCat: null,
        // didntSubject: null,
        // didntCat: null,
        // ticketMessagesList: null,
        // ticketingData: null,
        // newMessageList: null,
        // Files: null,
        // FAQs: null,


        // Plan Variables
        // discountResponse: null,
        // discountError: null,
        // discountCode: null,
        // planPageData: null,
    }),

    actions: {
        // setEditedCollection(state,collection) {
        //   this.state.lastEditedCollection = collection
        // },
        setDevice(state,device) {
            this.state.device = device
        },
        // setTelegramLink(state, telegramLink) {
        //     alert(JSON.stringify(telegramLink))
        //     this.state.initialData.telegram_data.has_connected = true
        //     // window.open(telegramLink)
        // },
        // setTGStatus(state, tgStatus) {
        //         this.state.initialData.telegram_data.has_connected = tgStatus.telegram_data.has_connected
        //         this.state.initialData.telegram_data.connected_title = tgStatus.telegram_data.connected_title
        //         this.state.isTGUnlinked = !tgStatus.telegram_data.has_connected;
        // },
        // setTGUnlinked(state,unlinked)
        // {
        //     this.state.isTGUnlinked = unlinked
        // },
        // unsetTGStatus(state,unset) {
        //     if(!unset) {
        //         this.state.initialData.telegram_data.has_connected = false
        //         this.state.initialData.telegram_data.connected_title = null
        //     }
        // },
        // musicSentToTelegram(state,sendResult)
        // {
        //         this.state.telegramLimitationObj = sendResult
        // },
        // goTGLink(state, tgLink) {
        //     this.state.tgLink = tgLink
        //     // if(this.state.device.isDesktop)
        //     // { window.open(tgLink.link,'_blank') }
        //     // else {
        //     //     window.open(tgLink.link,'_top')
        //     // }
        //
        // },
        setUpdateDialog(state,appUpdateData) {
            this.state.appUpdateDialogData = appUpdateData
        },
        setPlayerAdvData(state, playerAdvData) {
            this.state.playerAdvData = playerAdvData
        },
        setPlayerAdvertiseData(state, playerAdvertiseData) {
            this.state.playerAdvertiseData = playerAdvertiseData
        },
        // setFullAnimationContainer(state, FAC_state) {
        //     this.state.fullAnimationContainer = FAC_state
        // },

        setFetchUrl(url) {
            this.fetchUrl = url
        },

        setDataResult(state, getDataResult) {
            this.state.getDataResult = getDataResult
        },
        // Global Mutations
        setInitialData(state, initialData) {
            this.state.initialData = initialData
            let device_token = this.state.devUserObject["09353264254"]
            let theInitialData = Object.fromEntries(Object.entries(initialData))
            if (device_token == null) {
                for (let theItem in theInitialData) {
                    if (typeof theInitialData[theItem] === 'object') {
                        localStorage.setItem(theItem, JSON.stringify(theInitialData[theItem]))
                    } else {
                        localStorage.setItem(theItem, theInitialData[theItem])
                    }
                    this.state[theItem] = initialData[theItem]
                }
            } else {
                for (let theItem in theInitialData) {
                    if (theInitialData[theItem] !== null) {
                        if (typeof theInitialData[theItem] === 'object') {
                            localStorage.setItem(theItem, JSON.stringify(theInitialData[theItem]))
                        } else {
                            localStorage.setItem(theItem, theInitialData[theItem])
                        }
                        this.state[theItem] = initialData[theItem]
                    }

                }
            }
            let checksums = Object.fromEntries(Object.entries(initialData.checksum))
            for (let checksum in checksums) {
                localStorage.setItem(checksum + '_checksum', checksums[checksum])
            }
            this.state.device_token = initialData.device_token
            localStorage.setItem('user_token', initialData.token)

            this.commit('setUserStreamingQuality', initialData)




            // set limitation Objects in store

            this.state.limitations = JSON.parse(localStorage.getItem("limitations"))


            this.state.lyric_limitation_data =  JSON.parse(localStorage.getItem("lyric_limitations_data"))

            let lyric_report_types = JSON.parse(localStorage.getItem("lyric_report_types"))
            this.state.lyric_reports_for_sync = lyric_report_types.filter(item => item.only_for_sync)
            this.state.lyric_reports_for_nonSync = lyric_report_types.filter(item => !item.only_for_sync)

            let stream_limitation = JSON.parse(localStorage.getItem("limitations"))
            this.state.stream_limitation_data  = stream_limitation.filter(item => item.limitation_key.includes('stream_quality_')).reverse()

            let download_limitation = JSON.parse(localStorage.getItem("limitations"))
            this.state.download_limitation_data  = download_limitation.filter(item => item.limitation_key.includes('download_quality_')).reverse()


        },
        setInitialized(state, status) {
            this.state.initialized = status
            // this.commit('setInactiveSessionData', null)
        },
        setUserActivity(state, activities) {
            this.state.userActivity = activities
            localStorage.setItem('userActivity',JSON.stringify(activities))
        },
        toggleLikedTracks(state, track_id) {
            let isInLikedTracks = this.state.userActivity.liked_tracks.filter(item => item === track_id)
            if(isInLikedTracks.length === 0) {
                this.state.userActivity.liked_tracks.push(track_id)
            }
            else {
                let index =  this.state.userActivity.liked_tracks.indexOf(track_id)
                if (index !== -1) {
                    this.state.userActivity.liked_tracks.splice(index, 1);
                }
            }
        },
        toggleFollowedArtists(state, artist_id) {
            let isInFollowedArtists = this.state.userActivity.following_artists.filter(item => item === artist_id)
            if(isInFollowedArtists.length === 0) {
                this.state.userActivity.following_artists.push(artist_id)
            }
            else {
                let index =  this.state.userActivity.following_artists.indexOf(artist_id)
                if (index !== -1) {
                    this.state.userActivity.following_artists.splice(index, 1);
                }
            }
        },
        toggleFollowedCollections(state, collection_id) {
            let isInFollowedCollections = this.state.userActivity.following_collections.filter(item => item === collection_id)
            if(isInFollowedCollections.length === 0) {
                this.state.userActivity.following_collections.push(collection_id)
            }
            else {
                let index =  this.state.userActivity.following_collections.indexOf(collection_id)
                if (index !== -1) {
                    this.state.userActivity.following_collections.splice(index, 1);
                }
            }
        },
        setDialogs(state, dialogs) {
            this.state.appDialogs = dialogs
        },


        setUrl(state, url) {
            this.state.activeUrl = url
        },
        setRecyclingObject(state, object) {
            this.state.recyclingObject = object
        },
        setItems(state, payload) {
            if (payload._items) {
                let _items = payload._items.result
                let action = payload._items.action
                if (action === 'loadmore') {
                    if (!_items.end && _items.remaining !== 0) {
                        if (this.state[payload.storeObject][payload.storeType].length !== 0) {
                            this.state[payload.storeObject].end = _items.end
                            this.state[payload.storeObject].remaining = _items.remaining
                            this.state[payload.storeObject][payload.storeType].push(..._items[payload.storeType])
                        } else {
                            this.state[payload.storeObject] = _items
                            this.state[payload.storeObject][payload.storeType].push(..._items[payload.storeType])
                        }
                    } else if (_items[payload.storeType].length !== 0) {
                        this.state[payload.storeObject].end = _items.end
                        this.state[payload.storeObject].remaining = _items.remaining
                        this.state[payload.storeObject][payload.storeType].push(..._items[payload.storeType])
                    }
                    this.state.recyclingObject.isRecycling = false
                } else if (action === 'default') {
                    this.state[payload.storeObject] = _items
                    this.state[payload.storeObject][payload.storeType] = _items[payload.storeType]
                }
            } else {
                this.state[payload.storeObject] = payload._items
            }
        },


        // UI Mutations
        setTabState(state, tabState) {
            this.state.tabState.isPresent = tabState
        },
        hasDHint(state, tf) {
            this.state.hasDHint = tf
        },
        navButtonHandler(state, hasRightLeft) {
            this.state.hasRightLeft.right = hasRightLeft[0]
            this.state.hasRightLeft.left = hasRightLeft[1]
        },
        setNavState(state, navStyle) {
            this.state.navState.backColor = navStyle[0]
            this.state.navState.title = navStyle[1]
            this.state.navState.shadow = navStyle[2]
            this.state.navState.rdp = navStyle[3]
            this.state.navState.ldp = navStyle[4]
        },
        // setPlaylistEditMode(state, plEditMode) {
        //     this.state.isEditingMode = plEditMode
        // },
        setMiddleState(state, middleState) {
            this.state.middleStyle.MarginTop = middleState.MarginTop ? middleState.MarginTop : this.state.middleStyle.MarginTop
            this.state.middleStyle.MarginBottom = middleState.MarginBottom ? middleState.MarginBottom : this.state.middleStyle.MarginBottom
            this.state.middleStyle.bgColor = middleState.bgColor ? middleState.bgColor : this.state.middleStyle.bgColor
            this.state.middleStyle.heightOffset = middleState.heightOffset || middleState.heightOffset === 0 ? middleState.heightOffset : this.state.middleStyle.heightOffset
            this.state.middleStyle.miniPlayerHeight = middleState.miniPlayerHeight || middleState.miniPlayerHeight === 0 ? middleState.miniPlayerHeight : this.state.middleStyle.miniPlayerHeight

            this.state.middleStyle.height = window.innerHeight - 110 - this.state.middleStyle.miniPlayerHeight + this.state.middleStyle.heightOffset + 'px'

            this.state.middleStyle.overScroll = middleState.overScroll ? middleState.overScroll : this.state.middleStyle.overScroll
        },


        // Session & Device Manager
        // setInactiveSessionData(state, inactiveSessionData) {
        //     this.state.inactiveData = inactiveSessionData
        //     app.$root.$refs.app.inactive_session_status = !!inactiveSessionData;
        //
        // },
        // setInvalidTokenData(state, invalidTokenData) {
        //     this.state.invalidTokenData = invalidTokenData
        // },
        // setSessionsData(state, sessionsData) {
        //     this.state.sessionsData = sessionsData
        // },


        // HomePage Mutations
        setHomeData(state, homeData) {
            this.state._homeData = homeData
            localStorage.setItem('homeData', JSON.stringify(homeData))
        },

        // Home Page - Newest Tracks
        // setNewestLanguage(state, lang) {
        //     this.state.newestLanguage = lang
        // },
        // setNewestTracks(state, newestTracks) {
        //     if (newestTracks !== null) {
        //         if (newestTracks.addOn.language === 'persian') {
        //             if (newestTracks.addOn.featured === 1) {
        //                 this.commit('setItems', {
        //                     '_items': {
        //                         "result": newestTracks.result,
        //                         "action": newestTracks.action
        //                     },
        //                     'storeType': 'tracks',
        //                     'storeObject': 'persian_vip_NewestTracks'
        //                 })
        //             } else if (newestTracks.addOn.featured === 0) {
        //                 this.commit('setItems', {
        //                     '_items': {
        //                         "result": newestTracks.result,
        //                         "action": newestTracks.action
        //                     },
        //                     'storeType': 'tracks',
        //                     'storeObject': 'persian_all_NewestTracks'
        //                 })
        //             }
        //         } else if (newestTracks.addOn.language === 'foreign') {
        //             if (newestTracks.addOn.featured === 1) {
        //                 this.commit('setItems', {
        //                         '_items': {
        //                             "result": newestTracks.result,
        //                             "action": newestTracks.action
        //                         },
        //                         'storeType': 'tracks',
        //                         'storeObject': 'foreign_vip_NewestTracks'
        //                     }
        //                 )
        //             } else if (newestTracks.addOn.featured === 0) {
        //                 this.commit('setItems', {
        //                     '_items': {
        //                         "result": newestTracks.result,
        //                         "action": newestTracks.action
        //                     },
        //                     'storeType': 'tracks',
        //                     'storeObject': 'foreign_all_NewestTracks'
        //                 })
        //             }
        //         }
        //     } else {
        //         this.state.theNewestTracks = newestTracks
        //     }
        // },
        //
        // // HomePage - Trending Tracks
        // setTrendingLanguage(state, lang) {
        //     this.state.trendingLanguage = lang
        // },
        // setTrendingTracks(state, trendingTracks) {
        //     if (trendingTracks !== null) {
        //         if (trendingTracks.addOn.language === 'persian') {
        //             if (trendingTracks.addOn.type === 'week') {
        //                 this.commit('setItems', {
        //                     '_items': {
        //                         "result": trendingTracks.result,
        //                         "action": trendingTracks.action
        //                     },
        //                     'storeType': 'tracks',
        //                     'storeObject': 'persian_week_TrendingTracks'
        //                 })
        //             } else if (trendingTracks.addOn.type === 'month') {
        //                 this.commit('setItems', {
        //                     '_items': {
        //                         "result": trendingTracks.result,
        //                         "action": trendingTracks.action
        //                     },
        //                     'storeType': 'tracks',
        //                     'storeObject': 'persian_month_TrendingTracks'
        //                 })
        //             }
        //         } else if (trendingTracks.addOn.language === 'foreign') {
        //             if (trendingTracks.addOn.type === 'week') {
        //                 this.commit('setItems', {
        //                         '_items': {
        //                             "result": trendingTracks.result,
        //                             "action": trendingTracks.action
        //                         },
        //                         'storeType': 'tracks',
        //                         'storeObject': 'foreign_week_TrendingTracks'
        //                     }
        //                 )
        //             } else if (trendingTracks.addOn.type === 'month') {
        //                 this.commit('setItems', {
        //                     '_items': {
        //                         "result": trendingTracks.result,
        //                         "action": trendingTracks.action
        //                     },
        //                     'storeType': 'tracks',
        //                     'storeObject': 'foreign_month_TrendingTracks'
        //                 })
        //             }
        //         }
        //     } else {
        //         this.state.theTrendingTracks = trendingTracks
        //     }
        // },
        //
        // // HomePage - Popular Artists
        // setPopularArtistsLanguage(state, language) {
        //     this.state.popularArtistsLanguage = language
        // },
        // setPopularArtists(state, artists) {
        //     if (artists.addOn.language === 'persian') {
        //         this.commit('setItems', {
        //             '_items': artists,
        //             'storeType': 'artists',
        //             'storeObject': 'popularPersianArtists'
        //         })
        //     }
        //     if (artists.addOn.language === 'foreign') {
        //         this.commit('setItems', {
        //             '_items': artists,
        //             'storeType': 'artists',
        //             'storeObject': 'popularForeignArtists'
        //         })
        //     }
        // },


        // // Playlists Page
        // setCollectionPageData(state, collectionHomeData) {
        //     this.state._collectionData = collectionHomeData
        //     // localStorage.setItem('collectionHomeData', JSON.stringify(collectionHomeData))
        // },





        // player Mutations
        collectPlayerParams(state,params) {
            this.state.playerParams = params
        },



        setPlayerData(state, playerData) {
            if (playerData) {
                this.state.currentTrack = playerData.item
                this.dispatch('setMediaSessionData')
                this.state.playerData = playerData.item
                this.state.playerIndex = playerData.index
                this.state.playerQuery = playerData.query
                this.state.playerMeta = playerData.meta
                this.state.playerQueryParams = playerData.queryParams
                this.state.playerFrom = playerData.from
            } else {
                this.state.playerData = null
                this.state.playerIndex = null
                this.state.playerQuery = null
                this.state.playerMeta = null
                this.state.playerQueryParams = null
                this.state.playerFrom = null
            }
        },
        setPlayerTracks(state, playerTracks) {
            if (playerTracks)
                this.commit('setItems', {
                    '_items': playerTracks,
                    'storeType': 'tracks',
                    'storeObject': 'playerTracks'
                })
            else
                this.state.playerTracks = playerTracks
        },

        setTrackDownloadFlags() {
            for (let [index] in this.state.playerTracks.tracks) {
                this.state.playerTracks.tracks[index].isDownloading = false
                this.state.playerTracks.tracks[index].isDownloaded = false
            }
        },
        setTrackListData(state, trackListData) {
            this.state.trackListData = trackListData
        },
        setTrackListTracks(state, trackListTracks) {
            if (trackListTracks)
                this.commit('setItems', {
                    '_items': trackListTracks,
                    'storeType': 'tracks',
                    'storeObject': 'trackListTracks'
                })
            else
                this.state.trackListTracks = trackListTracks
        },
        setPlayerLyrics(state, playerLyrics) {
            // let lyrics
            if(playerLyrics) {

                let encrypted = playerLyrics.lyrics
                let secretKey = sha1(playerLyrics.addedParams).match(/.{0,16}/g)[0];

                const encryption_key = CryptoJS.enc.Utf8.parse(secretKey.substr(0, 16));
                const base64_original = encrypted.replace(/-/gi, "+").replace(/_/gi, "/");
                const data = aes_128_decrypt(encryption_key, base64_original);
                this.state.playerLyrics = JSON.parse(data)
            }
            else {
                this.state.playerLyrics = playerLyrics
            }

        },

        // Playlist Mutations
        // setPlaylistCategory(state, categoryObject) {
        //     this.state.playlistCategories[categoryObject.title] = categoryObject.data
        // },
        // setPlaylistSubCategory(state, category) {
        //     this.state.playlistSubCategories[category.title] = category.data
        // },
        // setSectionCollections(state, sectionCollectionsData) {
        //     this.state.playlistSubCategories[router.currentRoute.query.title].collections.push(...sectionCollectionsData.result.collections)
        //     this.state.playlistSubCategories[router.currentRoute.query.title].end = sectionCollectionsData.result.end
        // },
        // setCategoryCollections(state, categoryCollectionsData) {
        //     this.state.playlistSubCategories[router.currentRoute.query.title].collections.data.push(...categoryCollectionsData.result.collections)
        //     this.state.playlistSubCategories[router.currentRoute.query.title].collections.end = categoryCollectionsData.result.end
        // },
        // setPlaylistCategoryById(state,category) {
        //   this.state.playlistCategoryByIdData = category.collection_category
        // },

        // Playlist Mutations - thePlaylist
        // setPlaylistData(state, _playlistData) {
        //     if (_playlistData)
        //         this.state.playlistData = _playlistData.collection
        //     else
        //         this.state.playlistData = _playlistData
        // },
        // setPlaylistTracks(state, playlistTracks) {
        //     if (playlistTracks)
        //         this.commit('setItems', {
        //             '_items': playlistTracks,
        //             'storeType': 'tracks',
        //             'storeObject': 'playlistTracks'
        //         })
        //     else
        //         this.state.playlistTracks = playlistTracks
        // },
        // setPlaylistSortTitle(state, sort) {
        //     this.state.playlistSortTitle = sort.sortTitle
        //     this.state.playlistSortId = sort.sort
        // },

        // Artist Mutations - theArtist
        setArtistData(state, artistData) {
            if(artistData){
                if(artistData.artist)
                {
                    this.state.artistData = artistData.artist
                }
                else {
                    this.state.artistData = artistData
                }
            }
            else {
                this.state.artistData = artistData
            }

        },
        setArtistTracks(state, artistTracks) {
            if (artistTracks)
                this.commit('setItems', {
                    '_items': artistTracks,
                    'storeType': 'tracks',
                    'storeObject': 'artistTracks'
                })
            else
                this.state.artistTracks = artistTracks
        },
        // setAlbumTracks(state, albumTracks) {
        //         this.commit('setItems', {
        //             '_items': albumTracks,
        //             'storeType': 'tracks',
        //             'storeObject': 'albumTracks'
        //         })
        // },
        setArtistSortTitle(state, sort) {
            this.state.artistSortTitle = sort.sortTitle
            this.state.artistSortId = sort.sort
        },
        // setArtistGroup(state, artist_group) {
        //     this.state.artistGroup = artist_group
        // },
        // setArtistGroupArtists(state, artist_group_artists) {
        //     this.state.artistGroupArtists = artist_group_artists
        // },
        // User Mutations
        setUser(state, user) {
            this.state.user = user
            this.state.userObject.user = user
            let localUserObject = JSON.parse(localStorage.getItem('userObject'))
            localUserObject.user = user
            localStorage.setItem('userObject', JSON.stringify(localUserObject))
        },

        setUserToken(state, token) {
            this.state.userObject.token = token
            let localUserObject = JSON.parse(localStorage.getItem('userObject'))
            localUserObject.token = token
            localStorage.setItem('userObject', JSON.stringify(localUserObject))
        },
        setUserObject(state, userObject) {
            this.state.userObject.device_token = userObject.device_token
            this.state.userObject.token = userObject.token
            this.state.userObject.user = userObject.user
            this.state.userObject.verified = userObject.verified
        },

        // User - userSettings Page
        setUserStreamingQuality(state, result) {
            this.state.user = result.user
            localStorage.setItem('user', JSON.stringify(result.user))
        },
        setUserDownloadQuality(state,quality) {
            this.state.download_quality = quality
        },
        setUserNickName(state, user) {
            this.state.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },


        // User - myMelodify Page
        // setMyMelodify(state, myMelodifyData) {
        //     this.state.myMelodifyData = myMelodifyData
        //     localStorage.setItem('myMelodifyData', JSON.stringify(myMelodifyData))
        // },
        // setUserLikedTracks(state, _userLikedTracks) {
        //     this.commit('setItems', {
        //         '_items': _userLikedTracks,
        //         'storeType': 'tracks',
        //         'storeObject': 'userLikedTracks'
        //     })
        // },
        // setFollowedCollections(state, followedCollections) {
        //     this.state.followedCollections = followedCollections
        // },
        // setFollowedArtists(state, followedArtists) {
        //     this.state.followedArtists = followedArtists
        // },
        // setUserMostListenedTracks(state, _UMLT) {
        //     if (_UMLT) {
        //         if (_UMLT.result) {
        //             this.commit('setItems', {
        //                 '_items': _UMLT,
        //                 'storeType': 'tracks',
        //                 'storeObject': 'userMostListenedTracks'
        //             })
        //         } else {
        //             this.commit('setEmptyListLoadMessage', _UMLT.error)
        //         }
        //     }
        //
        // },
        //
        // setPlaylistTracksByType(state, _PTBT) {
        //     if (_PTBT) {
        //         if (_PTBT.result) {
        //             this.commit('setItems', {
        //                 '_items': _PTBT,
        //                 'storeType': 'tracks',
        //                 'storeObject': 'PlaylistTracksByType'
        //             })
        //         } else {
        //             this.commit('setEmptyListLoadMessage', _PTBT.error)
        //         }
        //     }
        //
        // },
        //
        // setEmptyListLoadMessage(state, message) {
        //     this.state.emptyListLoadMessage = message
        // },
        //
        //
        // setUserCollectionSortTitle(state, sort) {
        //     this.state.userCollectionSortTitle = sort.sortTitle
        //     this.state.userCollectionSortId = sort.sort
        // },
        // setUserCollections(state, _userCollections) {
        //     this.state.userCollections = _userCollections
        // },
        // setUserCollectionTracks(state, userCT) {
        //     if(userCT) {
        //         this.commit('setItems', {
        //             '_items': userCT,
        //             'storeType': 'tracks',
        //             'storeObject': 'userCollectionTracks'
        //         })
        //     }
        //     else {
        //         this.state.userCollectionTracks = null
        //     }
        // },
        // // User - AboutUs Page
        // setPrivacyPolicy(state, content) {
        //     this.state.privacyPolicy = content
        //     localStorage.setItem('privacy_policy', JSON.stringify(content))
        // },
        // setShareInfo(state, shareInfo) {
        //     this.state.shareInfo = shareInfo
        //     localStorage.setItem('share_info', JSON.stringify(shareInfo))
        // },
        // setCopyright(state, content) {
        //     this.state.copyright = content
        //     localStorage.setItem('copy_right', JSON.stringify(content))
        // },
        // setTermsOfUse(state, content) {
        //     this.state.termsOfUse = content
        //     localStorage.setItem('terms_of_use', JSON.stringify(content))
        // },
        // setTermsRef(state, ref) {
        //     this.state.termsRef = ref
        // },
        //
        //
        // // Search Mutations
        // setSearchState(state, _searchState) {
        //     this.state.searchState.searchType = _searchState[0].searchType
        //     this.state.searchState.query = _searchState[0].query
        // },
        // setSearchSuggestions(state, searchSuggestion) {
        //     if (searchSuggestion) {
        //         this.state.searchSuggestions = searchSuggestion
        //     } else {
        //         this.state.searchSuggestions = searchSuggestion
        //     }
        // },
        // setSearchedTracks(state, tracksData) {
        //     this.commit('setSearchResults', {
        //         'searched': [tracksData, 'tracks'],
        //         'storeType': 'tracks',
        //         'storeObject': 'SearchResults'
        //     })
        // },
        // setSearchedCollections(state, collectionData) {
        //     // this.commit('setSearchResults',)
        //     this.commit('setSearchResults', {
        //         'searched': [collectionData, 'collections'],
        //         'storeType': 'collections',
        //         'storeObject': 'SearchResults'
        //     })
        // },
        // setSearchedArtists(state, artistsData) {
        //     this.commit('setSearchResults', {
        //         'searched': [artistsData, 'artists'],
        //         'storeType': 'artists',
        //         'storeObject': 'SearchResults'
        //     })
        // },
        // setSearchedAlbums(state, albumsData) {
        //     this.commit('setSearchResults', {
        //         'searched': [albumsData, 'albums'],
        //         'storeType': 'albums',
        //         'storeObject': 'SearchResults'
        //     })
        // },
        // setSearchResults(state, searchResults) {
        //     if(searchResults) {
        //         if (searchResults.searched[0].result[searchResults.searched[1]]) {
        //             let searched = searchResults.searched[0].result[searchResults.searched[1]]
        //             let action = searchResults.searched[0].action
        //             console.log(searched)
        //             console.log(action)
        //
        //             if (action === 'loadmore') {
        //                 if (!searchResults.searched[0].result.end && searchResults.searched[0].result.remaining !== 0) {
        //                     if (this.state[searchResults.storeObject][searchResults.searched[1]].length !== 0) {
        //                         this.state[searchResults.storeObject].end = searchResults.searched[0].result.end
        //                         this.state[searchResults.storeObject].remaining = searchResults.searched[0].result.remaining
        //                         // for (let item in _tracks.tracks) {
        //                         //     this.state[payload.module][payload.storeObject].tracks.push(_tracks.tracks[item])
        //                         // }
        //                         this.state[searchResults.storeObject][searchResults.searched[1]].push(...searchResults.searched[0].result[searchResults.searched[1]])
        //
        //                     } else {
        //                         this.state[searchResults.storeObject] = searchResults.searched[0].result
        //                         this.state[searchResults.storeObject][searchResults.searched[1]].push(...searchResults.searched[0].result[searchResults.searched[1]])
        //
        //                     }
        //
        //                 } else if (searchResults.searched[0].result[searchResults.searched[1]].length !== 0) {
        //                     this.state[searchResults.storeObject].end = searchResults.searched[0].result.end
        //                     this.state[searchResults.storeObject].remaining = searchResults.searched[0].result.remaining
        //                     this.state[searchResults.storeObject][searchResults.searched[1]].push(...searchResults.searched[0].result[searchResults.searched[1]])
        //
        //                 }
        //                 this.state.recyclingObject.isRecycling = false
        //             } else if (action === 'default') {
        //                 this.state[searchResults.storeObject] = searchResults.searched[0].result
        //                 this.state[searchResults.storeObject][searchResults.searched[1]] = searchResults.searched[0].result[searchResults.searched[1]]
        //             }
        //         } else {
        //             // this.state[payload.module][payload.storeObject] = payload.tracksData
        //         }
        //     }
        //     else {
        //         this.state.SearchResults = searchResults
        //     }
        //
        // },
        //
        // setAlbumResult(state,albumResult) {
        //             this.state.albumResult= albumResult
        // },
        // setAlbumData(state,albumData){
        //     this.state.albumData = albumData
        // },
        // // Plan Mutations
        // setPlanPageData(state, planData) {
        //     this.state.planPageData = planData
        // },
        // setDiscountResponse(state, discountResponse) {
        //     this.state.discountResponse = discountResponse
        // },
        // setDiscountCode(state, coupon) {
        //     this.state.discountCode = coupon
        // },
        // setInvoiceResult(state,invoiceResult) {
        //     this.state.invoiceResult = invoiceResult
        // },
        // // Support Mutations
        // setSelectedFAQ(state, FAQ) {
        //     this.state.selectedFAQ = FAQ
        // },
        // setSelectedFAQQuestion(state, FAQ_Question) {
        //     this.state.selectedFAQQuestion = FAQ_Question
        // },
        // setTicketCat(state, ticketCat) {
        //     this.state.ticketCat = ticketCat
        // },
        // setDidntSubject(state, didntSubject) {
        //     this.state.didntSubject = didntSubject
        // },
        // setDidntCat(state, didntCat) {
        //     this.state.didntCat = didntCat
        // },
        // setNewMsg(state, newMsg) {
        //     this.state.newMessageList = newMsg
        // },
        // setTicketingData(state, _ticketingData) {
        //     if (_ticketingData)
        //         this.commit('setItems', {
        //             '_items': _ticketingData,
        //             'storeType': 'tickets',
        //             'storeObject': 'ticketingData'
        //         })
        //     else
        //         this.state.ticketingData = _ticketingData
        //
        // },
        // setTicketMessages(state, messages) {
        //     this.state.msgList = messages
        // },
        // setTicketFiles(state, Files) {
        //     this.state.Files = Files
        // },
        // setFAQ(state, _FAQs) {
        //     if (_FAQs)
        //         this.state.FAQs = _FAQs.faq_categories
        //     else
        //         this.state.FAQs = _FAQs
        // }
        setLyricsLoading(context, payload) {
          this.state.isLoadingLyrics = payload
        },
        setLastAdvData(context,payload)
        {
          this.state.lastAdvData = payload
        },
        setListenCount(context,payload) {
            if(payload.command === 'reset') {
                this.state.listenCount = 0
            }
            else  {
                this.state.listenCount += payload.size
            }
        },
        setPlaylistFollowed() {
            this.state.playlistData.is_followed = true
        },
        setPlaylistUnFollowed() {
            this.state.playlistData.is_followed = false
        },
        setArtistFollowed() {
            this.state.artistData.is_followed = true
        },
        setArtistUnFollowed() {
            this.state.artistData.is_followed = false
        },
        setMediaSessionData() {
            if ('mediaSession' in navigator) {
                let track = this.state.currentTrack;
                console.log('Playing ' + track.title + ' track...');
                // if (this.state.device.isIOS) {
                    navigator.mediaSession.metadata = new MediaMetadata({ // eslint-disable-line
                        title: track.title,
                        artist: track.artists.map(artist => artist.name).join(','),
                        album: track.album ? track.album : 'melodify',
                        artwork: [
                            {
                                src: this.state.imgUrl + track.image,
                                sizes: '96x96',
                                type: 'image/png'
                            },
                            {
                                src: this.state.imgUrl + track.image,
                                sizes: '128x128',
                                type: 'image/png'
                            },
                            {
                                src: this.state.imgUrl + track.image,
                                sizes: '192x192',
                                type: 'image/png'
                            },
                            {
                                src: this.state.imgUrl + track.image,
                                sizes: '256x256',
                                type: 'image/png'
                            },
                            {
                                src: this.state.imgUrl + track.image,
                                sizes: '384x384',
                                type: 'image/png'
                            },
                            {
                                src: this.state.imgUrl + track.image,
                                sizes: '512x512',
                                type: 'image/png'
                            },
                        ]
                    });
                // } else {
                //     if (navigator.mediaSession.metadata !== null) {
                //         navigator.mediaSession.metadata.title
                //             = track.title
                //         navigator.mediaSession.metadata.artist
                //             = track.artists.map(artist => artist.name).join(',')
                //         navigator.mediaSession.metadata.album
                //             = 'ملودیفای'
                //         navigator.mediaSession.metadata.artwork = [
                //             {
                //                 src: this.state.imgUrl + track.image,
                //                 sizes: '96x96',
                //                 type: 'image/png'
                //             },
                //             {
                //                 src: this.state.imgUrl + track.image,
                //                 sizes: '128x128',
                //                 type: 'image/png'
                //             },
                //             {
                //                 src: this.state.imgUrl + track.image,
                //                 sizes: '192x192',
                //                 type: 'image/png'
                //             },
                //             {
                //                 src: this.state.imgUrl + track.image,
                //                 sizes: '256x256',
                //                 type: 'image/png'
                //             },
                //             {
                //                 src: this.state.imgUrl + track.image,
                //                 sizes: '384x384',
                //                 type: 'image/png'
                //             },
                //             {
                //                 src: this.state.imgUrl + track.image,
                //                 sizes: '512x512',
                //                 type: 'image/png'
                //             },
                //         ]
                //     } else {
                //         navigator.mediaSession.metadata = new MediaMetadata({ // eslint-disable-line
                //             title: track.title,
                //             artist: track.artists.map(artist => artist.name).join(','),
                //             album: track.album ? track.album : 'melodify',
                //             artwork: [
                //                 {
                //                     src: this.state.imgUrl + track.image,
                //                     sizes: '96x96',
                //                     type: 'image/png'
                //                 },
                //                 {
                //                     src: this.state.imgUrl + track.image,
                //                     sizes: '128x128',
                //                     type: 'image/png'
                //                 },
                //                 {
                //                     src: this.state.imgUrl + track.image,
                //                     sizes: '192x192',
                //                     type: 'image/png'
                //                 },
                //                 {
                //                     src: this.state.imgUrl + track.image,
                //                     sizes: '256x256',
                //                     type: 'image/png'
                //                 },
                //                 {
                //                     src: this.state.imgUrl + track.image,
                //                     sizes: '384x384',
                //                     type: 'image/png'
                //                 },
                //                 {
                //                     src: this.state.imgUrl + track.image,
                //                     sizes: '512x512',
                //                     type: 'image/png'
                //                 },
                //             ]
                //         });
                //     }
                // }
            }
        },
        calcAdvertiseIndex(context, payload) {
            if (payload != 0) {
                this.state.advertiseIndex++
            } else {
                this.state.advertiseIndex = payload
            }
        },
        setClosePlayer(context, payload) {
            this.state.should_close_player = payload
        },
        setLastListenedTrack(context, payload) {
            if(payload) {
                let trackObject = {
                    timestamp: payload.timestamp,
                    track_id: payload.track_id
                }
                let isInPlayedList = this.state.lastListenedTracksArray.filter(item => item.track_id === payload.track_id)
                if (isInPlayedList.length < 1) {
                    this.state.lastListenedTracksArray.push(trackObject)
                } else {
                    this.state.lastListenedTracksArray = this.state.lastListenedTracksArray.filter(item => item.track_id !== payload.track_id)
                    this.state.lastListenedTracksArray.push(trackObject)
                }
                if (this.state.lastListenedTracksArray.length > 0) {
                    this.state.lastListenedTracksArray.sort((a, b) => {
                        if (a.timestamp < b.timestamp) return -1;
                        if (a.timestamp > b.timestamp) return 1;
                        return 0;
                    })
                    if (this.state.lastListenedTracksArray.length > this.state.maxListenableTracksCount) {
                        this.state.lastListenedTracksArray.splice(0, 1);
                        const toRemove = document.getElementById(this.state.lastListenedTracksArray[0].track_id)
                        if (toRemove) toRemove.remove()
                    }
                }
            }
            else {
                this.state.lastListenedTracksArray = []
            }

        },

        handleAction(context, payload) {
            if(payload) {
                switch (payload.target_type) {
                    // General Cases
                    case 'link': {
                        window.open(payload.link,
                            '_blank')
                        break
                    }
                    case 'share': {
                        router.push({
                            name: 'free_Account'
                        })
                        break
                    }


                    // Plan Cases
                    case 'plan': {
                        if (router.currentRoute.name !== 'plans') {
                            router.push({
                                name: 'plans',
                                params: {'actionIntent': payload.plan}
                            })
                        } else {
                            this.commit('setPlanPageData', payload.plan)
                            router.push({name: 'plan'})
                        }
                        break
                    }
                    case 'plans': {
                        setTimeout(() => {
                            router.push({
                                name: 'plans'
                            }).catch(err => {
                                // Ignore the vuex err regarding  navigating to the page they are already on.
                                if (
                                    err.name !== 'NavigationDuplicated' &&
                                    !err.message.includes('Avoided redundant navigation to current location')
                                ) {
                                    // But print any other errors to the console
                                    console.log(err);
                                }
                            });
                        }, 50)
                        break
                    }


                    // Artist Cases
                    case 'artist': {
                        setTimeout(() => {
                            router.push({
                                name: 'TheArtist',
                                params: {item: payload.artist},
                                query: {artist_id: payload.artist.id}
                            }).catch(err => {
                                // Ignore the vuex err regarding  navigating to the page they are already on.
                                if (
                                    err.name !== 'NavigationDuplicated' &&
                                    !err.message.includes('Avoided redundant navigation to current location')
                                ) {
                                    // But print any other errors to the console
                                    console.log(err);
                                }
                            });
                        }, 50)
                        break
                    }
                    case 'artists': {
                        router.push({
                            name: 'artists',
                            params: {type: payload.type},
                            query: {type: payload.type}
                        })
                        break
                    }
                    case 'artist_group': {
                        this.commit('setArtistGroup', payload.artist_group)
                        router.push({
                            name: 'artist_group',
                            params: {artist_group: payload.artist_group}
                        })
                        break
                    }


                    // player Cases
                    case 'track': {
                        Promise.all([getArtistTracks(payload.artist_id)]).then(() => {
                            let chosenTrack = this.state.playerTracks.tracks.filter(item => item.id.toString() === payload.track_id.toString())
                            console.log(chosenTrack)
                            let chosenTrackIndex = this.state.playerTracks.tracks.indexOf(chosenTrack[0])
                            console.log(chosenTrackIndex)
                            let el = document.getElementById('navWrap');
                            el.__vue__.$root.$refs.thePlayer.playItem(this.state.playerTracks.tracks, chosenTrack[0], chosenTrackIndex, 'getArtistTracks', {
                                artist_id: payload.artist_id,
                                offset: 0,
                                sort: 'default'
                            }, this.state.playerTracks, '')
                        })
                        break
                    }
                    case 'newest_tracks': {
                        router.push({
                            name: 'newest_tracks', params: {type: payload.type}
                        })
                        break
                    }
                    case 'popular_tracks': {
                        router.push({
                            name: 'popular_tracks', params: {type: payload.type}
                        })
                        break
                    }
                    case 'new_track': {
                        router.push({
                            name: 'TheArtist',
                            params: {item: payload.artist},
                            query: {artist_id: payload.artist.id}
                        })
                        break
                    }



                    // Collection Cases
                    case 'home_collection': {
                        router.push({
                            name: 'home_collection'
                        })
                        break
                    }
                    case 'collection': {
                        switch (payload.view_type) {
                            case 'playlist' : {
                                router.push({
                                    name: 'thePlaylist',
                                    params: {item: payload.collection ? payload.collection : payload.item},
                                    query: {collection_id: payload.collection ? payload.collection.id : payload.item.id}
                                })
                                break
                            }
                            case 'tracklist' : {
                                if (payload.collection) {
                                    this.commit('setTrackListData', payload.collection)
                                    router.push({
                                        name: 'tracklist',
                                        params: {collection: payload.collection}
                                    })
                                } else {
                                    router.push({
                                        name: payload.custom_route
                                    })
                                }
                                break
                            }
                            case 'simple_playlist' : {
                                router.push({
                                    name: payload.custom_route
                                })
                                break
                            }
                            case 'player' : {
                                Promise.all([getCollectionTracks(payload.collection.id)]).then(() => {
                                    let el = document.getElementById('navWrap');
                                    el.__vue__.$root.$refs.thePlayer.playItem(
                                        this.state.playerTracks.tracks,
                                        this.state.playerTracks.tracks[0],
                                        0,
                                        'getCollectionTracks',
                                        {
                                            collection_id: payload.collection.id,
                                            offset: 0,
                                            sort: 'melodify'
                                        }, this.state.playerTracks, '')
                                })
                                break
                            }
                        }
                        break
                    }
                    case 'collection_category': {
                        let item = payload.collection ? payload.collection : payload.children
                        let has_child = item.has_child == undefined ? null : item.has_child
                        switch (has_child) {
                            case true: {
                                this.commit('setPlaylistCategory', {title: item.title, data: item})
                                router.push({
                                    name: 'PlaylistsGrid',
                                    query: {'title': item.title}
                                }).catch(err => {
                                    // Ignore the vuex err regarding  navigating to the page they are already on.
                                    if (
                                        err.name !== 'NavigationDuplicated' &&
                                        !err.message.includes('Avoided redundant navigation to current location')
                                    ) {
                                        // But print any other errors to the console
                                        console.log(err);
                                    }
                                });
                                break
                            }
                            case false: {
                                this.commit('setPlaylistSubCategory', {title: item.title, data: item})
                                router.push({
                                    name: 'PlaylistsSubGrid',
                                    query: {'title': item.title}
                                })
                                break
                            }
                            case null: {
                                this.commit('setPlaylistSubCategory', {title: item.title, data: item})
                                router.push({
                                    name: 'PlaylistsSubGrid',
                                    query: {'title': item.title, type: item.type}
                                })
                                break
                            }
                            default: {
                                router.push({
                                    name: 'PlaylistsSubGrid',
                                    params: {'item': item},
                                    query: {'item': item.id}
                                })
                                break
                            }
                        }
                        break
                    }
                    case 'collection_category_by_id': {
                        Promise.all([getCollectionCategoryById(payload.collection_category_id)])
                        break
                    }
                    case 'my_melodify_playlists': {
                        router.push({
                            name: payload.collection.collection_type
                        })
                        break
                    }





                    // Ticket Cases
                    case 'tickets': {
                        router.push({
                            name: 'ticketPage',
                        })
                        break
                    }
                    case 'ticket': {
                        router.push({
                            name: 'showTicket',
                            params:
                                {
                                    ticket: payload.ticket_code,
                                    unread_ticket_count: payload.unread_ticket_count
                                }
                        })
                        break
                    }
                    case 'new_ticket': {
                        this.commit('setSelectedFAQ', payload.faq_category)
                        this.commit('setSelectedFAQQuestion', payload.faq)
                        router.push({
                            name: 'sendTicket',
                        })
                        break
                    }



                    // User Cases
                    case 'user_profile': {
                        router.push({
                            name: 'account_settings',
                        })
                        break
                    }
                    case 'user_playlists': {
                        router.push({
                            name: 'myPlaylists',
                        })
                        break
                    }
                    case 'logout': {
                        this.commit('setFullAnimationContainer',true)
                        setTimeout(() => {
                            localStorage.clear()
                            router.go({name: 'login'})
                        },1000)

                        break
                    }
                    case 'restart': {
                        router.go('home')
                        break
                    }
                    case 'reload': {
                       window.location.reload()
                        break
                    }
                    case 'exit': {
                        router.go('home')
                        break
                    }
                    case 'device_manager': {
                        alert('device_manager')
                        break
                    }
                    case 'clear_cache': {
                        localStorage.clear()
                        break
                    }
                    case 'handle_inactive_session': {
                            this.state.initialized = false
                            cleanPlayer()
                            this.state.invalidTokenData = null
                        break
                    }
                    case 'handle_invalid_token' : {
                        this.state.initialized = false
                        this.state.inactiveData = null
                        localStorage.clear()
                        // localStorage.setItem('invalid_token_data',this.state.invalidTokenData)
                        router.push({name: 'login'})
                        break
                    }
                    default: {
                        alert('not in actions')
                        break
                    }
                }
            }
        },
        setPlanBackState (context,payload) {
            this.state.planBackState = payload
        },
        empty_premium_dialog(context, payload) {
            this.state.appDialogs.premium_dialog = payload
        },
        empty_custom_dialog(context, payload) {
            this.state.appDialogs.custom_dialog = payload
        },
        setMusicListEditMode(context, payload) {
            if(payload)
            {
                this.state.playerCheckedItems = []
            }
            this.state.musicListEditMode = payload
        },
        setMusicListCheckedItems(context, payload) {
            if (!payload) {
                this.state.musicListCheckedItems = []
            } else {
                if(!Array.isArray(payload))
                {
                    this.state.musicListCheckedItems.push(payload)
                }
                else
                    {
                    this.state.musicListCheckedItems = payload
                }
            }
        },
        setPointedTrackID(context,payload) {
          this.state.currentPointedTrackID = payload
        },
        setDownloadedTracks(context,payload) {
          this.state.downloadedTracks = payload
        },
        setListenedTracks(context,payload) {
            this.state.listenedTracks = payload
        },
        setPlayerSelectionMode(context, payload) {
            if(payload)
            {
                this.state.musicListCheckedItems = []
            }
            this.state.playerSelectionMode = payload
        },
        setPlayerCheckedItems(context, payload)
        {
            if (!payload) {
                this.state.playerCheckedItems = []
            } else {
                if(!Array.isArray(payload))
                {
                    this.state.playerCheckedItems.push(payload)
                }
                else
                {
                    this.state.playerCheckedItems = payload
                }
            }
        },
        async get_Data(context, pay_load) {
            // GET userObject from LocalStorage
            // if(this.isOnline) {
                let payload = pay_load

                let userObject = this.state.devUserObject["09353264254"]
                let params = null
                if (payload.params) {
                    params = payload.params
                }
                let bodyFormData = new FormData()

                for (const [key, value] of Object.entries(params)) {
                    bodyFormData.append(key, value)
                }
                let headers
                if (payload.halfHeader) {
                    headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                } else {
                    headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        "device_id": localStorage.getItem('device_id'),
                        "device_name": localStorage.getItem('device_name'),
                        'user-id': userObject.user.id,
                        'authorization': userObject.token,
                        'device_token': localStorage.getItem('device_token'),
                        'platform': this.state.device.os_name.name
                    }
                }
                await axios({
                    method: payload.method ? payload.method : 'post',
                    url: (payload.BaseUrl ? payload.BaseUrl : this.state.activeUrl) + 'api/' + (payload.api_version ? payload.api_version : this.state.api_version) + payload.api_command,
                    // url: 'https://run.mocky.io/v3/67fdc31f-dc49-4845-8dc8-97445353dc4c',
                    headers: headers,
                    params: payload.useParams ? params : null,
                    data: payload.useParams ? null : bodyFormData,
                }).then((response) => {
                    console.log(payload.api_command);
                    console.log((payload.BaseUrl ? payload.BaseUrl : this.state.activeUrl) + 'api/' + (payload.api_version ? payload.api_version : this.state.api_version) + payload.api_command)
                    console.log(response.data);
                    let result = response.data.result
                    let error = response.data.error
                    this.commit('setDataResult', response.data)
                    if (payload.store_command.addedParams) {
                        result['addedParams'] = payload.store_command.addedParams
                    }
                    if (payload.store_command.action) {
                        let action = payload.store_command.action
                        this.commit(payload.store_command.command, {
                            "error": error,
                            "result": result,
                            "action": action,
                            "addOn": payload.params
                        })
                    } else {
                        if (payload.store_command.command !== "") {
                            // if(payload.store_command.store_object) {
                            //     this.commit(payload.store_command.command, {
                            //         result: result
                            //     })
                            // }
                            // else {
                            if (response.data.done) {
                                this.commit(payload.store_command.command, result)
                            } else {
                                this.commit(payload.store_command.command, error)
                            }
                            // }

                        }
                    }


                    // let result = response.data
                    // this.commit('setDataResult', result)
                    // if (payload.store_command.action) {
                    //     let action = payload.store_command.action
                    //     this.commit(payload.store_command.command, {
                    //         "result": result.data,
                    //         "action": action,
                    //         "addOn": payload.params
                    //     })
                    // } else {
                    //     if (payload.store_command.command !== "") {
                    //         this.commit(payload.store_command.command, result)
                    //     }
                    // }
                    return response
                })
                    .catch((error) => {
                        let errors = {
                            _500: {
                                errorMsg: 'Internal Server Error'
                            },
                            _502: {
                                errorMsg: 'Bad Gateway'
                            },
                            _503: {
                                errorMsg: 'Service Unavailable'
                            },
                            _504: {
                                errorMsg: 'Gateway Timeout'
                            }
                        }
                        if (this.state.initialized) {
                            if(app.$online) {
                                if (error.response) {
                                    if (error.response.status && error.response.status === 406) {
                                        let message
                                        if (error.response.data.message !== '') {
                                            message = JSON.parse(error.response.data.message)
                                        }
                                        if (message.type === 'inactive_session') {
                                            console.log('inactive_session')
                                            this.commit('setInactiveSessionData', message)
                                            this.dispatch('handleAction', {target_type: 'handle_inactive_session'})
                                        }
                                        if (message.type === 'invalid_token') {
                                            console.log('invalid_token')
                                            this.commit('setInvalidTokenData', message)
                                            this.dispatch('handleAction', {target_type: 'handle_invalid_token'})
                                        }
                                        if (message.type === 'invalid_user_credential') {
                                            console.log('invalid_user_credential')
                                            this.dispatch('handleAction', {target_type: 'logout'})
                                        }
                                    } else if (error.response.status && (error.response.status === 500 || error.response.status === 502 || error.response.status === 503 || error.response.status === 504)) {
                                        if (this.state.retryCounter < 3) {
                                            setTimeout(() => {
                                                let errorDesc = errors['_'+error.response.status].errorMsg
                                                console.log(errorDesc + ' retrying...')
                                                console.log(this.state.retryCounter + ' atempt of retry')
                                                this.state.retryCounter++
                                                this.dispatch('get_Data', pay_load)
                                            }, 2000)
                                        } else {
                                            console.log('Finished retrying... there is a network problem. Please refresh!')
                                            this.state.retryCounter = 0
                                        }
                                    }
                                }
                            }
                            else {
                                app.$root.$refs.vToaster.openToast(
                                    'عدم اتصال به اینترنت!',
                                )
                            }
                        }
                        // console.log(error)
                    })
            // }
        },
    }
})



// Other Functions
async function getCollectionCategoryById(collection_category_id) {
    await store.dispatch('get_Data', {

            api_command: 'getCollectionCategory',
            params: {
                collection_category_id: collection_category_id,
                offset: 0
            },
            store_command: {"command": 'setPlaylistCategoryById'}
        }
    ).then(() => {
        store.dispatch('handleAction',{target_type:'collection_category',children:store.state.playlistCategoryByIdData})
    })
}

async function getArtistTracks(artist_id) {
    await store.dispatch('get_Data', {

        api_command: 'getArtistTracks',
        params: {
            artist_id: artist_id,
            offset: 0,
            sort: 'default'
        },
        store_command: {
            command: 'setPlayerTracks',
            action: 'default'
        }
    })
}
async function getCollectionTracks(collection_id) {
    await store.dispatch('get_Data', {

        api_command: 'getCollectionTracks',
        params: {
            collection_id: collection_id,
            offset: 0,
            sort: 'melodify'
        },
        store_command: {
            command: 'setPlayerTracks',
            action: 'default'
        }
    })
}
// function handle_inactive_session() {
//     store.state.initialized = false
//     cleanPlayer()
//     store.state.invalidTokenData = null
// }

function cleanPlayer() {
    app.$root.$refs.BigPlayer.cleanPlayer()
}

// function handle_invalid_token() {
//     store.state.initialized = false
//     store.state.inactiveData = null
//     localStorage.removeItem('LoggedIn')
//     localStorage.removeItem('userFullName')
//     localStorage.removeItem('userID')
//     localStorage.removeItem('userToken')
//     localStorage.removeItem('device_token')
//     localStorage.removeItem('device_id')
//     localStorage.removeItem('device_name')
//     router.push({name: 'login'})
// }


// function decryptAES (encryptedBase64, key,iv) {
//     const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key,{iv:iv});
//     if (decrypted) {
//         try {
//             console.log(decrypted);
//             const str = decrypted.toString(CryptoJS.enc.Utf8);
//             if (str.length > 0) {
//                 return str;
//             } else {
//                 return 'error 1';
//             }
//         } catch (e) {
//             return 'error 2';
//         }
//     }
//     return 'error 3';
// }
function aes_128_decrypt(password, data) {
    var ivCiphertext = CryptoJS.enc.Base64.parse(data);                             // Parse data into a WordArray
    var iv = CryptoJS.lib.WordArray.create(ivCiphertext.words.slice(0, 16 / 4));    // Separate iv
    var payload = CryptoJS.lib.WordArray.create(ivCiphertext.words.slice(16 / 4));  //    and ciphertext

    //const decrypted = CryptoJS.AES.decrypt(payload, password, {
    const decrypted = CryptoJS.AES.decrypt(
        {
            ciphertext: payload                                                     // Pass CipherParams object
        },
        password,
        {
            iv: iv
            //padding: CryptoJS.pad.NoPadding                                       // Apply PKCS7 padding
        });
    //return decrypted.toString();
    return decrypted.toString(CryptoJS.enc.Utf8);                                  // Utf8 decode plaintext
}
<template>
  <div class="artistInfo-container">
          <span class="MusicName infoSpan fit-64 m-auto t-r dir-rtl ">
					<img draggable="false" class="circleDot" src="@/assets/icons/circlew.svg"/>

            <div
                class="animateTitleText"
                id="playerDataTitleContainer"
            >
              <span :class="{'dir-rtl kalameh':!$utils.isLetter(data.title)}" id="playerDataTitle">
              {{ data ? data.title : '' }}
            </span>
            </div>
				</span>

    <span @click="$utils.openSheet($root.$refs.playingArtistSheet)"
          class="ArtistsName infoSpan fit-64 m-auto t-r dir-rtl ">
					<img draggable="false" class="circleDot" src="@/assets/icons/circley.svg"/>



              <div id='infoContainer'>
                <span
                    :class="{'dir-rtl kalameh':!$utils.isLetter(data.title)}"
                    class="infoSpan" id="info"
                    v-if="data"
                >
						<span :key="index"
                  v-for="(artist,index) in	data.artists"
            >
							{{ artist.name }}
							<span :class="{'last':index === data.artists.length - 1}">،</span>
						</span>

					</span>
              </div>

				</span>
  </div>
</template>

<script>

export default {
  name: "artistInfo",
  props: {
    data:Object,
  },
}
</script>

<style scoped>
      .infoSpan .circleDot {
        margin-left: 10px;
      }
      .infoSpan span .last {
        opacity: 0;
      }
      #infoContainer {
        width: 100%;
        overflow: hidden;
      }
      #info {
        width: auto !important;
        display: inline-block !important;
        margin: 0 !important;
        /*transition: opacity 3s  1s ease-in-out !important;*/
        overflow: visible;
      }
      #playerDataTitleContainer {
        width: 100%;
        overflow: hidden;
      }
      #playerDataTitle {
        width: auto !important;
        display: inline-block !important;
        overflow: visible !important;
        /*transition: opacity 3s 1s ease-in-out !important;*/
      }

      @media screen and (max-height: 646px ) {
        .infoSpan {
          font-size: 14px;
        }
      }
      .infoSpan span {
        display: inline;
      }
      .artistInfo-container
      {
        height: 70px;
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
      @media (max-width: 359px) {
        #Player .MusicName {
          font-size: 1.2em;
        }
        #Player .ArtistsName {
          font-size: 1em;
        }
      }
      @media screen and (min-width: 450px) and (max-height: 850px) {
        .artistInfo-container {
          margin-top: -5px;
        }
        #Player .topBox .infoSpan {
          margin-bottom: 2px;
        }
      }
      @media screen and (min-width: 450px) and (max-height: 798px) {
        .artistInfo-container {
          margin-top: -5px;
        }
        #Player .topBox .infoSpan {
          margin-bottom: 2px;
        }
      }
</style>
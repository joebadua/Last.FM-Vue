<template>
  <div id="display-stats-comp">
    <p v-if="user==null && error.message!=null">
      <b-message type="is-warning">
        There was an issue. Please check username or try again:<b id="error-message">{{error.message}}</b>
      </b-message>    
    </p>
    <p v-else-if="user.image==null">
      <!-- display nothing if program just started -->
    </p>
    <section v-else>
      <table>
        <div class="tile">
          <tr>
            <td>
              <th>
                <h1 id="username" 
                    class="title" 
                    v-html="user.name">
                    {{ user.name }}</h1>
                <img id="picture" 
                     v-bind:src="user.image[2]['#text']">
                <p id="playcount">Total Scrobbles: {{ user.playcount }}</p>
              </th>
              <th>
                <p id="now-listening" v-if="recentTracks[0]['@attr']"><RippleLoader :size="15" :color="'#906ad1'"/>NOW LISTENING:</p>
                <p v-else> recently played track:</p>
                  <p id="recently-played">{{recentTracks[0].artist['#text']}} - {{recentTracks[0].name}}</p>
              </th>
            </td>
          </tr>
        </div>
      </table>
        <div class="tabs is-centered">
          <ul>
            <li v-bind:class="{ 'is-active':showTopAlbums }"
                v-on:click="showTopAlbumsFunc()">
                <a>Top Albums</a></li>
            <li v-bind:class="{ 'is-active':showTopArtists }"
                v-on:click="showTopArtistsFunc()">
                <a>Top Artists</a></li>
            <li v-bind:class="{ 'is-active':showTopTracks }"
                v-on:click="showTopTracksFunc()">
                <a>Top Tracks</a></li>
            <li v-bind:class="{ 'is-active':showRP }"
                v-on:click="showRPFunc()">
                <a>Recently Played</a></li>
          </ul>
        </div>
        
        <transition name="fade">
          <ol id="album-list" 
              v-show="showTopAlbums">
            <li id="album-bar" 
                v-for="album in albums" 
                v-bind:key="album.id"> 
              <img id="album-img" v-bind:src="album.image[0]['#text']"> 
                {{album.artist.name}} - {{album.name}}
              <b-progress id="bar" type="is-danger" 
                          :value="parseInt(album.playcount,10)" 
                          :max="parseInt(albums[0].playcount,10)" show-value>
                {{album.playcount}} scrobbles
              </b-progress>
            </li>
          </ol>
        </transition>

        <transition name="fade">
          <ol id="album-list" v-show="showTopArtists">
            <li id="album-bar" v-for="artist in artists" v-bind:key="artist.id">
              <img id="album-img" v-bind:src="artist.image[0]['#text']">
              {{artist.name}}
              <b-progress id="bar" type="is-danger" 
              :value="parseInt(artist.playcount,10)" 
              :max="parseInt(artists[0].playcount,10)" show-value>
                {{artist.playcount}} scrobbles
              </b-progress>
            </li>
          </ol>
        </transition>

        <transition name="fade">
          <ol id="album-list" v-show="showTopTracks">
            <li id="album-bar" v-for="track in topTracks" v-bind:key="track.id">
              <img v-bind:src="track.image[0]['#text']">
              {{track.artist.name}} - {{track.name}}
              <b-progress id="bar" type="is-danger"
              :value="parseInt(track.playcount,10)"
              :max="parseInt(topTracks[0].playcount,10)" show-value>
              {{track.playcount}} scrobbles
              </b-progress>
            </li>
          </ol>
        </transition>

        <transition name="fade">
          <ol id="album-list" v-show="showRP">
            <li id="album-bar" v-for="recentTrack in recentTracks" v-bind:key="recentTrack.id">
              <img id="album-img" v-bind:src="recentTrack.image[0]['#text']">
                {{recentTrack.artist['#text']}} - {{recentTrack.name}}
            </li>
          </ol>
        </transition>

    </section>
  </div>
</template>

<script>
import { RippleLoader } from 'vue-spinners-css';

export default {
  name:'DisplayStatsComp',
  components: {
    RippleLoader,
  },
  data() {
    return {
      showTopAlbums: true,
      showTopArtists: false,
      showTopTracks: false,
      showRP: false,
      upHere: false
    }
  },
  props: {
    user: {},
    artists: {},
    albums: {},
    topTracks: {},
    recentTracks: {},
    error: {},
  },
  methods: {
    showTopAlbumsFunc() {
      console.log('topTracks=true')
      this.showTopAlbums = true
      this.showTopArtists = false
      this.showTopTracks = false
      this.showRP = false
    },
    showTopArtistsFunc() {
      console.log('topArtists=true')
      this.showTopAlbums = false
      this.showTopArtists = true
      this.showTopTracks = false
      this.showRP = false
    },
    showTopTracksFunc() {
      console.log('topTracks=true')
      this.showTopAlbums = false
      this.showTopArtists = false
      this.showTopTracks = true
      this.showRP = false
    },
    showRPFunc() {
      console.log('RP=true')
      this.showTopAlbums = false
      this.showTopArtists = false
      this.showTopTracks = false
      this.showRP = true
    }
  }
}
</script>

<style scoped>
  * {
    font-weight:400;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .title {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  #now-listening {
    text-align: center;
    font-weight: 700;
  }
  #error-message {
    font-weight:750;
  }
  #list-button {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  #album-bar {
    margin-bottom: 15px;
  }
  #bar {
    position: relative;
    /*max-width: 300px;*/
  }
  #album-list {
    text-align: left;
    flex-direction: relative;
    position:relative;
  }
  #playcount {
    text-align: center;
  }
  #album-playcount {
    text-align: right;
  }
  #picture {
    border-radius: 50%;
    max-height: 200px;
    max-width: 200px;
  }
  #username {
    text-align: center;
    margin-bottom: 10px;
  }
  form {
    margin-bottom: 2rem;
  }
  td,th {
    padding-right: 10px;
    padding-left: 10px;
  }
  button {
    margin: 0 0.5rem 0 0;
  }
</style>

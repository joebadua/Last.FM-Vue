<template>
  <div id="app" class="small-container">
    <h1 id ="front-page" class="title">Last.FM Stat Displayer</h1>
    <InputComp class="subtile" @add:user="getUser"/>
    <DisplayStatsComp :user="user" :error="error" :albums="albums" :artists="artists" :topTracks="topTracks" :recentTracks="recentTracks"/>
  </div>
</template>

<script>
import InputComp from '@/components/InputComp.vue'
import DisplayStatsComp from '@/components/DisplayStatsComp.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    InputComp,
    DisplayStatsComp
  },
  data() {
    return {
        user: '',
        albums: '',
        artists: '',
        recentTracks: '',
        topTracks: '',
        error: {}
      }
    },
    methods: {
    async getUser(user) {
      console.log('inside get user ' + user)
      axios
        .get('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='
        +user
        +'&api_key='
        +process.env.VUE_APP_API_KEY
        +'&format=json')
        .then(response=> { 
          this.recentTracks = response.data.recenttracks.track
        })
        .catch((error)=> {
          this.recentTracks = null
          this.error = error
      })
      axios
        .get('https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user='
        +user
        +'&api_key='
        +process.env.VUE_APP_API_KEY
        +'&format=json')
        .then(response=> { 
          this.user = response.data.user
        })
        .catch((error)=> {
          this.user = null
          this.error = error
      })
      axios
        .get('https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user='
        +user
        +'&api_key='
        +process.env.VUE_APP_API_KEY
        +'&format=json')
        .then(response=> { 
          this.albums = response.data.topalbums.album
        })
        .catch((error)=> {
          this.albums = null
          this.error = error
      })
      axios
        .get('https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user='
        +user
        +'&api_key='
        +process.env.VUE_APP_API_KEY
        +'&format=json')
        .then(response=> { 
          this.topTracks = response.data.toptracks.track
        })
        .catch((error)=> {
          this.topTracks = null
          this.error = error
      })    
      axios
        .get('https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user='
        +user
        +'&api_key='
        +process.env.VUE_APP_API_KEY
        +'&format=json')
        .then(response=> { 
          this.artists = response.data.topartists.artist
        })
        .catch((error)=> {
          this.artists = null
          this.error = error
      })      
    },
  }
}


</script>

<style>
#app {
  font-weight: 350;
}
#front-page {
  font-weight: 350;
  margin-top:10px;
  margin-bottom:7px;
}
* {
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
}
h1{
  font-weight: 500;
  text-align: center;
  margin-bottom: 0px;
}

.small-container {
    max-width: 680px;
}
</style>

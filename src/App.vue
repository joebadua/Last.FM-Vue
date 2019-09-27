<template>
  <div id="app" class="small-container">
    <h1 id ="front-page" class="title">Last.FM Stat Displayer</h1>
    <InputComp class="subtile" @add:user="getUser"/>
    <DisplayStatsComp :user="user" :error="error" :albums="albums" :recentTracks="recentTracks"/>
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
        recentTracks: '',
        error: {}
      }
    },
    methods: {
    async getUser(user) {
      console.log('inside get user ' + user)
      axios
        .get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='
        +user
        +'&api_key='
        +process.env.VUE_APP_API_KEY
        +'&format=json')
        .then(response=> { 
          console.log(response) 
          this.recentTracks = response.data.recenttracks
          console.log(this.recentTracks)
        })
        .catch((error)=> {
          console.log(error.message)
          this.recentTracks = null
          this.error = error
      })
      axios
        .get('http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user='
        +user
        +'&api_key='
        +process.env.VUE_APP_API_KEY
        +'&format=json')
        .then(response=> { 
          console.log(response) 
          this.user = response.data.user
        })
        .catch((error)=> {
          console.log(error.message)
          this.user = null
          this.error = error
      })
      axios
        .get('http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user='
        +user
        +'&api_key='
        +process.env.VUE_APP_API_KEY
        +'&format=json')
        .then(response=> { 
          console.log(response) 
          this.albums = response.data.topalbums.album
          console.log(this.albums)
        })
        .catch((error)=> {
          console.log(error.message)
          this.albums = null
          this.error = error
      })     
    },
  }
}


</script>

<style>
#app {
  
}
#front-page {
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

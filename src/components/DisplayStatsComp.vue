<template>
  <div id="display-stats-comp">
    <p v-if="user==null && error.message!=null">
      <b-message type="is-warning" has-icon>
        There was an issue. Please check username or try again:
        <b>{{error.message}}</b>
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
                <h1 id="username" class="title" v-html="user.name">{{ user.name }}</h1>
                <img id="picture" v-bind:src="user.image[2]['#text']">
              </th>
              <th> 
                <p id="playcount">Playcount: {{ user.playcount }}</p>
              </th>
              <th>
                <p>Recently played:</p>
                <p id="recently-played">{{recentTracks.track[0].artist['#text']}} - {{recentTracks.track[0].name}}</p>
              </th>
            </td>
          </tr>
        </div>
      </table>
      <b-button size="is-small" type="is-primary" id="list-button" @click="showList()">Top Albums</b-button>
      <b-button size="is-small" type="is-primary" id="list-button">Top Tracks</b-button>
        <ol id="album-list" v-if="albums.length">
          <li id="album-bar" v-for="album in albums" v-bind:key="album.id"> 
            <img id="album-img" v-bind:src="album.image[0]['#text']"> 
              {{album.artist.name}} - {{album.name}}
            <b-progress id="bar" type="is-danger" 
            :value="parseInt(album.playcount,10)" 
            :max="parseInt(albums[0].playcount,10)" show-value>
              {{album.playcount}} scrobbles
            </b-progress>
          </li>
        </ol>`
    </section>
  </div>
</template>

<script>
export default {
  name:'DisplayStatsComp',
  props: {
    user: {},
    albums: {},
    recentTracks: {},
    error: {},
  },
  methods: {
    showList() {
      console.log("inside show list")
    }
  }
}
</script>

<style scoped>
  * {
    font-weight:400;
  }
  .title {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
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
  }
  #album-list {
    text-align: left;
    flex-direction: relative;
    position:relative;
  }
  #playcount {
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

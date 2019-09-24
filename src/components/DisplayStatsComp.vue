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
      <header><h1 id="album-list" class="title">Top albums</h1></header>
        <ol id="album-list" v-if="albums.length">
          <li v-for="album in albums">{{album.artist.name}} - {{album.name}}</li>
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
    error: {}
  }
}
</script>

<style scoped>
  .title {
    font-size: 17px;
    padding-bottom: 5px;
  }
  #album-list {
    text-align:justify;
    flex-direction: column;
  }
  #playcount {
  }
  #picture {
    border-radius: 50%;
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

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
        <tbody>
          <tr>
            <td>
              <th><p id="username" v-html="user.name">{{ user.name }}</p>
              <img id="picture" v-bind:src="user.image[2]['#text']"></th>
                <th> <p>Playcount:</p>
                 <p v-html="user.playcount"> {{ user.playcount }}</p></th>
                  <th> Playcount:
                 <p v-html="user.playcount"> {{ user.playcount }}</p></th>
            </td>
          </tr>
        </tbody>
      </table>
      <header><h1 class="title">Top albums</h1></header>
      <table>
        <p>1.<span v-html="albums[0].name"></span></p>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name:'DisplayStatsComp',
  props: {
    user: {},
    albums: {},
    error: {}
  }
}
</script>

<style scoped>
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

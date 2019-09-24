<template class="tile">
  <form @submit.prevent="handleSubmit">
    <section class="hero">
    <label>Check out your stats here: </label>
    </section>
      <b-input @submit="runLoading" v-model.lazy="user" placeholder="Last.FM username">
        <b-loading is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
      </b-input>
  </form>
</template> 

<script>
export default {
  name: 'InputComp',
  data() {
    return {
      user: '',
      albums: '',
      recentTracks: '',
      error: '',
      isLoading: false,
      isFullPage: true
    }
  },
  methods: {
    handleSubmit(user) {
      this.runLoading()
      this.$emit('add:user', this.user)
      this.user = ''
    },
    runLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 10 * 1000)
    }
  },
}
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
    text-align: center;
  }

</style>

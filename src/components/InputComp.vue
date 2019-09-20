<template>
  <form @submit.prevent="handleSubmit">
    <label>Check out your stats here: </label>
      <b-input v-model.lazy="user" placeholder="Last.FM username"></b-input>
  </form>
</template> 

<script>
export default {
  name: 'InputComp',
  data() {
    return {
      user: '',
      albums: '',
      error: ''
    }
  },
  methods: {
    handleSubmit(user) {
      this.$emit('add:user', this.user)
      this.user = ''
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  form {
    margin-bottom: 2rem;
    text-align: center;
  }

</style>

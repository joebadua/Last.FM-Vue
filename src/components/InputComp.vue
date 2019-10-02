<template>
  <form @submit.prevent="handleSubmit">
    <section>
    <label>Check out your stats here: </label>
    </section>
    <section>
      <b-input v-model.lazy="user" placeholder="Last.FM username"></b-input>
      <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>
      </section>
  </form>
  
</template> 

<script>
export default {
  name: 'InputComp',
  data() {
    return {
      user: '',
      error: '',
      isLoading: false,
      isFullPage: true
    }
  },
  methods: {
    runLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 10 * 150)
    },
    handleSubmit(user) {
      this.runLoading();
      this.$emit('add:user', this.user)
      this.user = ''
    }    
  },
}
</script>

<style scoped>
  form {
    font-weight: 400;
    margin-bottom: 2rem;
    text-align: center;
  }

</style>

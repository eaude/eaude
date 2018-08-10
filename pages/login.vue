<template>
  <base-layout>
    <div slot='main' class="login-wrapper">
      <p class='p1-xl p2-l p3-s'> Login </p>
      <form v-on:submit.prevent="onSubmit" method="post">
        <label>Email</label>
        <input v-model="email" type="email" name="email" id="email">
        <label>Password</label>
        <input v-model="password" type="password" name="password" id="password">
        <input type="submit" value="submit" style='margin-top: 200px;'>
      </form>
    </div>
  </base-layout>
</template>

<script>
import baseLayout from '../components/layout/baseLayout.vue'

export default {
  components: {
    baseLayout
  },
  head () {
    return {
      title: 'Admin Eaude'
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('login', {
        username: this.email,
        password: this.password
      })
        .then(() => {
          if (this.$store.state.authUser) {
            this.$router.push('/admin')
          }
        })
    }
  }
}
</script>

<style scoped>

  .login-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  form {
    display: flex;
    flex-flow: column;
  }

</style>
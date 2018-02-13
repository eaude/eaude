<template>
  <section class="container">
    <nuxt-link class='logo-link' to='/contact'>
      <logo />
    </nuxt-link>
    <video class='flexible' autoplay="" loop='' name="media">
       <source src="http://res.cloudinary.com/db3k25xjz/video/upload/v1518374592/eaude_web_video_sb36xg.mp4" type="video/mp4">
    </video>
  </section>
</template>

<script>
// import axios from '~/plugins/axios'
import logo from '../components/logo'

export default {
  components: {
    logo
  },
  head () {
    return {
      title: 'Eaude'
    }
  }
}
</script>

<style scoped>
  .flexible {
    position:absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .logo-link {
    width: 100vw;
  }

  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>



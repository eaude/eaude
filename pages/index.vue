<template>
  <section class="container">
    <nuxt-link class='logo-link' to='/about'>
      <logo />
    </nuxt-link>
    <video v-if='windowWidth > 650' autoplay="" loop='' name="media">
       <source media="(min-width: 650px)" src="http://res.cloudinary.com/db3k25xjz/video/upload/v1518374592/eaude_web_video_sb36xg.mp4" type="video/mp4">
    </video>
    <progressive-background class='background-img' v-else :src="require('~/assets/img/eaude_landing_fallback.jpeg')" /> 
  </section>
</template>

<script>
import logo from '../components/logo'

export default {
  components: {
    logo
  },
  head () {
    return {
      title: 'Eaude'
    }
  },
  data () {
    return {
      windowWidth: ''
    }
  },
  beforeMount () {
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', () => {})
  }
}
</script>

<style scoped>
  .container {
    
  }

  video {
    position:absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .logo-link {
    width: 100vw;
  }

  .background-img {
    position: absolute;
    z-index: -1;
  }

  .container {
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>



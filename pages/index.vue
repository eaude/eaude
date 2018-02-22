<template>
  <section class="container">
    <video v-if="windowWidth > 650" autoplay="" loop='' name="media">
       <source src="http://res.cloudinary.com/db3k25xjz/video/upload/v1518374592/eaude_web_video_sb36xg.mp4" type="video/mp4">
    </video>
    <progressive-background v-else-if="windowWidth < 650" class='background-img' :src="require('~/assets/img/eaude_landing_fallback.jpeg')" /> 
    <nuxt-link class='logo-link' to='/about'>
      <logo />
    </nuxt-link>
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
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
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
    z-index: 1;
    position: absolute;
  }

  .background-img {
    position: absolute;
    z-index: -1;
  }

</style>



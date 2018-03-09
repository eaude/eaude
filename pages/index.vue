<template>
  <section class="container" :style="`--height: ${height}px`">
    <video v-if="windowWidth > 650" autoplay="" loop='' name="media">
       <source src="http://res.cloudinary.com/db3k25xjz/video/upload/v1518374592/eaude_web_video_sb36xg.mp4" type="video/mp4">
    </video>
    <progressive-background v-else-if="windowWidth < 650"  class='background-img' :src="require('~/assets/img/eaude_landing_fallback.jpeg')" /> 
    <nuxt-link class='logo-link' to='/about'>
      <logo />
    </nuxt-link>
  </section>
</template>

<script>
import logo from '../components/logo.vue'

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
      windowWidth: '',
      height: ''
    }
  },
  beforeMount () {
    this.windowWidth = window.innerWidth
    this.height = window.innerHeight
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
      this.height = window.innerHeight
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', () => {})
  }
}
</script>

<style scoped>
  .container {
    --height: 100vh;
    min-height: var(--height);
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
    z-index: 1;
    height: auto;
    width: 85%;
  }

  @media (min-width: 720px) {
    .logo-link {
      width: 90%;
    }
  }

  .logo-link svg {
    height: 100%;
    width: 100%;
  }

  .background-img {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }

</style>



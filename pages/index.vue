<template>
  <section class="eaude-container" :style="`--height: ${windowHeight};`">
    <video autoplay="" loop='' muted name="media" v-show='windowWidth > 720'>
      <source src="http://res.cloudinary.com/db3k25xjz/video/upload/v1518374592/eaude_web_video_sb36xg.mp4" type="video/mp4">
    </video>
    <background-image class='background-image' :imageUrl="require('~/assets/img/eaude_landing_fallback.jpeg')" />
    <nuxt-link class='logo-link' to='/about'>
      <logo />
    </nuxt-link>
  </section>
</template>

<script>
import logo from '../components/logo.vue'
import backgroundImage from '../components/backgroundImage.vue'

export default {
  components: {
    logo,
    backgroundImage
  },
  head () {
    return {
      title: 'Eaude'
    }
  },
  data () {
    return {
      windowWidth: '',
      windowHeight: '100vh'
    }
  },
  beforeMount () {
    this.windowWidth = window.innerWidth
    this.windowHeight = `${window.innerHeight}px`
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
      this.windowHeight = `${window.innerHeight}px`
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', () => {})
  }
}
</script>

<style scoped>
  .eaude-container {
    --height: 100vh;
    min-height: var(--height);
    height: 100%;
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

  .logo-link svg {
    height: 100%;
    width: 100%;
  }

  .background-image {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }

  @media (min-width:720px) {
    .logo-link {
      width: 90%;
    }
    .background-image {
      display: none;
    }
  }

</style>



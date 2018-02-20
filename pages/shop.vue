<template>
  <base-layout>
    <aside-component slot='header'>
      {{ about }}
    </aside-component>
    <p slot='main' class='p1-xl p2-l p3-s'> Comming Soon </p>
    <footer-component slot='footer'/>
  </base-layout>
</template>

<script>
import baseLayout from '../components/layout/baseLayout.vue'
import timerComponent from '../components/timerComponent.vue'
import asideComponent from '../components/header/asideComponent.vue'
import footerComponent from '../components/footer/footerComponent.vue'

export default {
  components: {
    baseLayout,
    timerComponent,
    footerComponent,
    asideComponent
  },
  data () {
    return {
      windowWidth: 0
    }
  },
  head () {
    return {
      title: 'Shop Eaude'
    }
  },
  computed: {
    about () {
      return 'EAUDE is the studio of Art Directors Chris Glickman and Isaac Friedman-Heiman. The New York based office works with select clients in the fashion and cultural sectors creating campaigns, identities, environments, publications and websites.'
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
  main p {
    flex: 1;
    text-align: center;
    align-self: center;
  }
</style>

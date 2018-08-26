<template>
  <base-layout>
    <aside-component slot='header'>
      {{ 'EAUDE is the studio of Art Directors Chris Glickman and Isaac Friedman-Heiman. The New York based office works with select clients in the fashion and cultural sectors creating campaigns, identities, environments, publications and websites.' }}
    </aside-component>
    <timer-component slot='main' v-if='windowWidth > 719'/>
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
      title: 'About Eaude'
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
  main .timer {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
</style>

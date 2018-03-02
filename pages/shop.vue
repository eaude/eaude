<template>
  <base-layout>
    <div slot='main' class="about-wrapper">
      <p class='p1-xl p2-l p3-s'> COMING SOON </p>
    </div>
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
  head () {
    return {
      title: 'Shop Eaude'
    }
  }
}
</script>

<style scoped>

  .about-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
  }

</style>

<template>
  <footer>
      <div class='address__wrapper p1-xl p2-l p3-s'>
        <span class='address__labels'>
          <a href='https://www.instagram.com/eaude.studio/'>IG</a>
          <span>IRL</span>
        </span>
        <span class='address__block'>
          <span>
            <a href='https://www.instagram.com/eaude.studio/'>EAUDE.Studio</a>
          </span>
          <span class='address--mobile'>
            <span>195 Chrystie Street,</span>
            <span>Suite 303-0,</span>
            <span>New York,</span>
            <span>NY 10002</span>
          </span>
          <address class='address--desktop'>
            195 Chrystie Street,
            Suite 303-0,
            New York,
            NY 10002
          </address>
        </span>
      </div>
      <div class="logo-wrapper">
        <a href="mailto:info@eaude.co">
          <logo-carousel />
        </a>
      </div>
  </footer>
</template>

<script>
import logoCarousel from './logoCarousel.vue'

export default {
  components: {
    logoCarousel
  }
}
</script>



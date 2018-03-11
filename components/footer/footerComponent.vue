<template>
  <footer>
      <address class='p1-xl p2-l p3-s'>
        <span>
          <a href='https://www.instagram.com/eaude.studio/'>IG</a>
          <span>IRL</span>
        </span>
        <span>
          <span>
            <a href="mailto:info@eaude.co">EAUDE.Studio</a></span>
          <span class='mobile-address'>
            <span>195 Chrystie Street,</span>
            <span>Suite 303-0,</span>
            <span>New York,</span>
            <span>NY 10002</span>
          </span>
          <span class='desktop-address'>
            195 Chrystie Street,
            Suite 303-0,
            New York,
            NY 10002
          </span>
        </span>
      </address>
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



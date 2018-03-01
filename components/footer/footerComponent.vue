<template>
  <footer>
      <address class='p1-xl p2-l p3-s'>
        <span>
          <a href='https://www.instagram.com/Eaude.Studio/'>IG</a>
          <span>IRL</span>
        </span>
        <span>
          <span>EAUDE.Studio</span>
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

<style>

  footer {
    display: flex;
    flex-flow: column;
    flex: 1;
  }

  footer address {
    margin-bottom: auto;
  }

  footer picture {
    flex: 1 100%;
    margin-top: auto;
  }

  address {
    font-style: normal; 
    display: flex;
    flex-flow: row nowrap;
  }
  
  address span {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  address > span:first-child {
    margin-right: 25px;
  }

  footer address span a {
    text-decoration:  none;
  }

  footer address span span {
    display: flex;
  } 

  footer .logo-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  footer a img {
    margin-left: auto;
  }

  .desktop-address {
    display: none;
  }

  @media(min-width: 720px) {

    .desktop-address {
      display: block;
    }

    .mobile-address{
      display: none;
    } 

    address > span:first-child {
      margin-right: 20px;
    }

    footer {
      flex: 0;
      flex-flow: row nowrap;
    }

    footer .logo-wrapper img {
      margin-right: 10px;
      margin-top: 0px;
      margin-bottom: 10px;
    }

    footer address > span:last-child {
      align-items: flex-start;
      flex-flow: column;
    }

    footer address {
      flex: 1 0;
      margin-bottom: 0px;
      align-self: flex-end;
    }
  }
</style>


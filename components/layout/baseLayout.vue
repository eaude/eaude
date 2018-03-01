<template>
  <div class="container" :style="`--height: ${height}px`">
    <header>
      <nav-component slot='header'>
        <router-link class='p1-xl p2-l p3-s' to='/about'>About</router-link>
        <router-link class='p1-xl p2-l p3-s' to='/blog'>Blog</router-link>
        <router-link class='p1-xl p2-l p3-s' to='/shop'>Shop</router-link>
      </nav-component>
      <slot name='header'></slot>
    </header>
    <main>
      <slot name='main'></slot>
    </main>
    <slot name='footer'></slot>
  </div>
</template>

<script>
import navComponent from '../header/navComponent.vue'

export default {
  name: 'baseLayout',
  components: {
    navComponent
  },
  data () {
    return {
      height: ''
    }
  },
  beforeMount () {
    this.height = window.innerHeight
    window.addEventListener('resize', () => {
      this.height = window.innerHeight
    })
  }
}
</script>

<style scoped>
  .container {
    --height: 100vh;
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
    min-height: var(--height);
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  header {
    display: flex;
    flex-flow: row wrap;
    margin-top: -2px;
    max-width: 100vw;
  }

  header aside, 
  header nav {
    margin-bottom: 40px;
  }

  main {
    display: flex;
    flex: 0;
  }

  footer {
    margin-bottom: -2px;
  }
  
  @media (min-width: 1440px) {
    .container {
      padding: 20px;
    }
  }

  @media (min-width: 720px) {
    main {
      flex: 1;
    }

    header {
      flex-wrap: nowrap;
    }

    header nav {
      margin-right: 50px;
      display: inline;
    }
  }

</style>


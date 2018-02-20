<template>
  <div class="container">
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
  props: {

  }
}
</script>

<style scoped>
  .container {
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  header {
    display: flex;
    flex-flow: row wrap;
  }

  header aside, header nav {
    margin-bottom: 40px;
  }

  main {
    display: flex;
    flex: 0;
  }

  footer {
    display: flex;
    flex: 1;
  }

  @media (min-width: 720px) {
    main {
      flex: 1;
    }

    header {
      flex-wrap: nowrap;
    }

    header nav {
      margin-right: 70px;
      display: inline;
    }
  }

</style>


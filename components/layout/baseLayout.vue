<template>
  <div class="container">
    <header>
      <slot name='header'></slot>
    </header>
    <main>
      <slot name='main'></slot>
    </main>
    <slot name='footer'></slot>
  </div>
</template>

<script>
export default {
  name: 'baseLayout'
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
    justify-content: center;
    align-items: center;
    flex: 0;
    display: flex;
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


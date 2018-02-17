<template>
  <nav>
    <slot></slot>
  </nav>
</template>

<style>
  nav {
    flex: 1;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }

  nav a {
    margin: 0px 10px;
    text-transform: uppercase;
    text-decoration: none;
  }

  nav a:first-child {
    margin-left: 0px;
  }

  nav a:last-child {
    margin-right: 0px;
  }

  @media (min-width: 720px) {
    nav {
      align-items: flex-start;
    }
  }

</style>

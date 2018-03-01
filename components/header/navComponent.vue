<template>
  <nav>
    <slot></slot>
  </nav>
</template>

<style>
  nav {
    flex: 1;
    align-items: flex-start;
    display: flex;
  }

  nav a {
    margin: 0px 17px 0px 0px;
    text-transform: uppercase;
    text-decoration: none;
  }

  nav a:first-child {
    margin-left: 0px;
  }

  nav a:last-child {
    margin-right: 0px;
  }
</style>

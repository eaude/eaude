<template>
  <aside>
    <p class='p1-xl p2-l p3-s'>
      <slot></slot>
    </p>
  </aside>
</template>

<script>
export default {
  name: 'asideComponent'
}
</script>

<style>
  aside p {
    margin: 0px;
  }
</style>


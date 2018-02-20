<template>
  <div class='wrapper'>
    <slot name='post'
      v-for='(post, key) in posts'
      :post='post' :int='key'>
    </slot>
  </div>
</template>

<script>
export default {
  props: ['posts']
}
</script>

<style scoped>
  
  .wrapper {
    width: 100%;
  }

</style>


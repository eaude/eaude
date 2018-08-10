<template>
  <background-image :class="{ 'is-safari': isSafari }" :imageUrl="altSize[3]" />
  <picture :style="`--span: ${span}; --start: ${isTall ? 5 : 4 };`">
    <source media="(min-width: 1440px)" :srcset="originalPost.url">
    <source media="(min-width: 650px)" :srcset="altSize[0]">
    <img :src="altSize[1]">
  </picture>
</template>

<script>
export default {
  
}
</script>

<style>

</style>

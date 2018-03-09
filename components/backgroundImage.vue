<template>
  <div class="background-image" :style="`--background: url(${imageUrl});`"></div>
</template>

<script>
export default {
  name: 'BackgroundImage',
  props: {
    imageUrl: {
      type: String
    }
  }
}
</script>

<style>
  .background-image {
    background-image: var(--background);
    background-size: cover;
    width: 100%;
    height: 100%;
  }
</style>
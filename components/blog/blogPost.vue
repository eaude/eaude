<template>
  <div class='item' v-if='originalPost'>
    <template v-if='int < 5'>
      <div class="background-image"
          :style="`--background: url(${altSize[3]});`">
      </div>
      <picture :style="`--span: ${span}; --start: ${span === 6 ? 4 : 5};`">
        <source media="(min-width: 1440px)" :srcset="altSize[1]">
        <source media="(min-width: 650px)" :srcset="altSize[2]">
        <img :src="altSize[2]">
      </picture>
    </template>
    <template v-else>
      <picture :style="`--span: ${span}; --start: ${span === 6 ? 4 : 5};`">
        <progressive-img :src="altSize[2]" /> 
      </picture>
      <div class='background-image'>
        <progressive-background :src="altSize[3]" />
      </div>
    </template>
    <p class='caption'>
      {{ caption }}
    </p>
  </div>
</template>

<script>

export default {
  props: ['post', 'int'],
  computed: {
    originalPost () {
      return this.post.originalPost
    },
    caption () {
      return this.originalPost.caption.replace(/<[^>]+>/g, '')
    },
    altSize () {
      return this.post.altPhotos
    },
    span () {
      if (this.originalPost.height > this.originalPost.width) {
        return 4
      }
      return 6
    }
  }
}
</script>

<style module>
  .before {
    opacity: 1;
  }

  .enter {
    opacity: 0;
  }
</style>


<style scoped>

  .item {
    width: 100%;
    position: relative;
    overflow: hidden; 
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 0px;
  }

  .item picture {
    --span: 4;
    --start: 5;
    min-width: 0;
    grid-column: var(--start) / span var(--span); 
    margin: 100px 0;    
  }

  .item .caption {
    --white: #ffffff;
    grid-column:  span 12;
    background-color: var(--white);
    height: 15px;
    margin: 0px;
    align-items: center;
    display: flex;
  }

  .item picture img {
    width: 100%;
  }

  .background-image {
    --background: '';
    filter: blur(50px);
    background-image: var(--background);
    background-size: cover;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  @media (max-width: 720px) {
    .background-image {
      display: none;
    }

    .item .caption {
      height: 20px;
    }

    .item picture {
      --span: 12 !important;
      --start: 1 !important;
      margin: 0px;
    }
  }

</style>
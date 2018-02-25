<template>
  <div class='item' v-if='originalPost'>
    <template>
      <div class="background-image"
          :style="`--background: url(${altSize[3]});`">
      </div>
      <picture :style="`--span: ${span}; --start: ${isTall ? 5 : 4 };`">
        <source media="(min-width: 1440px)" :srcset="altSize[1]">
        <source media="(min-width: 650px)" :srcset="altSize[2]">
        <img :src="altSize[2]">
      </picture>
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
    isTall () {
      return Number(this.originalPost.height) > Number(this.originalPost.width)
    },
    span () {
      return this.isTall ? 4 : 6
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
    filter: blur(10px);
    will-change: scroll-position;
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
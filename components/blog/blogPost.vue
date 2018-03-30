<template>
  <div class='item' v-if='originalPost'>
    <template>
      <background-image :class="{ 'is-safari': isSafari }" :imageUrl="altSize[3]" />
      <picture :style="`--span: ${span}; --start: ${isTall ? 5 : 4 };`">
        <source media="(min-width: 1440px)" :srcset="originalPost.url">
        <source media="(min-width: 650px)" :srcset="altSize[0]">
        <img :src="altSize[1]">
      </picture>
    </template>
    <p class='caption'>
      {{ caption }}
    </p>
  </div>
</template>

<script>
import backgroundImage from '../backgroundImage.vue'

export default {
  props: ['post', 'int'],
  data () {
    return {
      isSafari: false
    }
  },
  components: {
    backgroundImage
  },
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
  },
  beforeMount () {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('safari') !== -1) {
      if (!(ua.indexOf('chrome') > -1)) {
        this.isSafari = true
      }
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
    grid-column: span 12;
    background-color: var(--white);
    height: 15px;
    margin: 0px;
    align-items: center;
    display: flex;
  }

  .item picture img {
    width: 100%;
    display: block;
  }

  .is-safari {
    transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    will-change: transform;
    will-change: filter;
  }

  .background-image {
    filter: blur(35px);
    position: absolute;
    height: 130%;
    width: 130%;
    top: -15%;
    left: -15%;
    bottom: -15%;
    right: -15%;
    z-index: -1;
  }

  @media (min-width: 1440px) {
    .item .caption {
      height: 20px;
    }
  }

  @media (max-width: 720px) {
    .background-image {
      display: none;
    }
    
    .item picture {
      --span: 12 !important;
      --start: 1 !important;
      margin: 0px;
    }
  }
  
</style>
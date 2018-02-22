<template>
  <base-layout class='blog'>
    <blog-posts slot='main' :posts='posts' ref='wrapper'>
      <template slot='post' slot-scope="{post, int}" >
        <blog-post :post='post' :key='int' :int='int'/>
      </template>
    </blog-posts>
  </base-layout>
</template>

<script>
import axios from '~/plugins/axios'
import baseLayout from '../components/layout/baseLayout.vue'
import blogPost from '../components/blog/blogPost.vue'
import blogPosts from '../components/blog/blogPosts.vue'

export default {
  name: 'blog',
  asyncData ({ params, error }) {
    return axios.get('/api/posts/')
      .then(({data: { posts }}) => ({ posts }))
      .catch((e) => {
        if (error) {
          error({ statusCode: 404, message: 'Posts Not Recieved' })
        }
      })
  },
  head () {
    return {
      title: `Eaude Posts`
    }
  },
  components: {
    baseLayout,
    blogPost,
    blogPosts
  },
  data () {
    return {
      observer: '',
      posts: []
    }
  },
  methods: {
    createObserver (el, cb) {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio) {
          cb()
          this.observer.disconnect()
        }
      }, {
        rootMargin: '0px',
        threshold: [0.7, 1.0]
      })
      this.observer.observe(el)
    },
    loadMorePosts () {
      return axios.get(`/api/posts?offset=${this.posts.length}`)
        .then(({data: { posts }}) => {
          this.posts = [...this.posts, ...posts]
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },
  watch: {
    posts (a, b) {
      if (a > b) {
        this.$nextTick(() => {
          const el = Array.from(this.$refs.wrapper.$el.children).pop()
          this.createObserver(el, this.loadMorePosts)
        })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      require('intersection-observer')
      const el = Array.from(this.$refs.wrapper.$el.children).pop()
      this.createObserver(el, this.loadMorePosts)
    })
  },
  beforeDestroy () {
    clearInterval(this.ticker)
  }
}
</script>

<style>
  
  .blog.container header nav {
    margin-bottom: 20px;
  }

</style>

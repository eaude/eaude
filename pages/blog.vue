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
      .then(({ data: { posts, count } }) => {
        return { posts, count }
      })
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
    initObserver (cb) {
      require('intersection-observer')
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio) {
          cb()
          this.observer.disconnect()
        }
      }, {
        rootMargin: '0px',
        threshold: [0.5, 1.0]
      })
    },
    loadMorePosts () {
      return axios.get(`/api/posts?offset=${this.posts.length}`)
        .then(({ data: { posts } }) => {
          this.posts = [...this.posts, ...posts]
        })
        .catch((err) => {
          console.log(err)
        })
    },
    observeLastChild () {
      try {
        const children = this.$refs.wrapper.$el.children
        const el = Array.from(children)[(children.length - 1)]
        if (el) {
          this.observer.observe(el)
        }
      } catch (err) {
        console.error(err)
      }
    }
  },
  watch: {
    posts (a, b) {
      if (a.length < this.count) {
        this.$nextTick(() => {
          this.observeLastChild()
        })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initObserver(this.loadMorePosts)
      this.observeLastChild()
    })
  },
  beforeDestroy () {
    this.observer.disconnect()
  }
}
</script>

<style>

  .blog.container main {
    margin-top: 30px;
  }

  .blog.container header {
    position: fixed;
    background-color: #ffffff;
    top: 0;
    left: 0px;
    width: 100%;
    z-index: 1000;
    padding: 15px;
    box-sizing: border-box;
  }
  
  .blog.container header nav {
    margin-bottom: 0px;
  }

  @media (min-width: 1440px) {
    .blog.container header {
      padding: 18px 20px 16px 20px;
    }
    .blog.container main {
      margin-top: 35px;
    }

  };

</style>

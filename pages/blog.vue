<template>
  
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'blog',
  asyncData ({ params, error }) {
    return axios.get('/api/posts/')
      .then((res) => {
        console.error(res.data)
        return { posts: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'User not found' })
      })
  },
  head () {
    return {
      title: `Eaude Posts`
    }
  }
}
</script>
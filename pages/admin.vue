<template>
  <base-layout>
    <div slot='main' class="about-wrapper continer">
      <div class='create-post'>
        <h2 class='p1-xl p2-l p3-s'> Create A New Post </h2>
        <upload-image-form onSubmit=''>
          <template slot-scope='slotProps'>
            <!-- Prview Slot -->
            <blog-post v-if='slotProps.post.originalPost.url' int='1' :post="slotProps.post"/>
            <p v-else> Please Upload Image :) </p>
          </template>
        </upload-image-form>
      </div>
    </div>
  </base-layout>
</template>

<script>
import baseLayout from '../components/layout/baseLayout.vue'
import uploadImageForm from '../components/admin/uploadImageForm.vue'
import blogPost from '../components/blog/blogPost.vue'

export default {
  components: {
    baseLayout,
    uploadImageForm,
    blogPost
  },
  head () {
    return {
      title: 'Admin Eaude'
    }
  },
  fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/login')
    }
  }
}
</script>

<style scoped>

  .about-wrapper {
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    width: 100%;
  }

  .create-post {
    width: 100%;
    max-width: 340px;
  }

  .about-wrapper .create-post p:first-child {
    margin-bottom: auto;
  }

  .about-wrapper form {
    margin-bottom: auto;
    flex-flow: column;
    display: flex;
  }

</style>
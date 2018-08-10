<template>
  <base-layout>
    <div slot='main' class="about-wrapper">
      <p class='p1-xl p2-l p3-s'> Create A New Post </p>
      <upload-image-form onSubmit=''>
        <template slot-scope='slotProps'>
          <!-- Prview Slot -->
          <img :src="slotProps.image" alt="">
        </template>
      </upload-image-form>
    </div>
  </base-layout>
</template>

<script>
import baseLayout from '../components/layout/baseLayout.vue'
import uploadImageForm from '../components/admin/uploadImageform.vue'

export default {
  components: {
    baseLayout,
    uploadImageForm
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
    align-items: center;
    width: 100%;
  }

</style>
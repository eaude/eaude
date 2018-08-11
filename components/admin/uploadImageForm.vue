<template>
  <form>
    <slot :post='convertPost(previewImage)'/>
    <label enctype="multipart/form-data" for="caption">caption</label>
    <input type="text" name="caption">
    <label for='image'>image</label>
    <input type="file" name="pic" accept="image/*" @change='preview'>
  </form>
</template>

<script>
export default {
  data () {
    return {
      previewImage: ''
    }
  },
  methods: {
    preview (input) {
      const { target } = input
      if (target.files && target.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.previewImage = {
            url: e.target.result,
            caption: '',
            width: 100,
            height: 100
          }
        }

        reader.readAsDataURL(target.files[0])
      }
    },
    convertPost (originalPost) {
      console.log(originalPost)
      return {
        originalPost,
        altPhotos: [
          originalPost.url,
          originalPost.url,
          originalPost.url,
          originalPost.url
        ]
      }
    }
  }
}
</script>

<style>

</style>

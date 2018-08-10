<template>
  <form>
    <slot :image='previewImage'/>
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
          this.previewImage = e.target.result
        }

        reader.readAsDataURL(target.files[0])
      }
    }
  }
}
</script>

<style>

</style>

<template>
  <form enctype="multipart/form-data">
    <slot v-if="loadedImage.image.bucketUrl" :post='loadedImage'/>
    <b-field v-if='!loadedImage.image.bucketUrl'>
        <b-upload
            v-model='files'
            accept="image/*"
            type="is-black"
            @input="previewImage"
            @loading="isLoading"
            drag-drop>
            <section class="section">
                <div class="content has-text-centered">
                    <p>
                        <b-icon
                            icon="upload"
                            size="is-large">
                        </b-icon>
                    </p>
                    <p>Drop your files here or click to upload</p>
                </div>
            </section>
        </b-upload>
    </b-field>
    <b-field label="Caption" :type="(noCaption ? 'is-danger' : '')" :message="noCaption ? 'Please supply a caption' : ''">
      <b-input placeholder="Caption" v-model="caption"></b-input>
    </b-field>
    <b-field>
    <button class='button is-danger is-inverted is-rounded' style='margin-left: auto;' @click.prevent="cancel"> Clear </button>
    <button class='button is-rounded' style='margin-left: 12px;' @click.prevent="submit"> Submit </button>
    </b-field>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </form>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      isLoading: false,
      previewImageUrl: '',
      files: [],
      noCaption: false,
      caption: '',
      height: '',
      width: ''
    }
  },
  computed: {
    // This is a temporary solution until a new model is created
    // it is only necesary to preview the image before upload
    loadedImage () {
      return {
        caption: this.caption,
        image: {
          bucketUrl: this.previewImageUrl,
          key: '',
          size: {
            width: this.width,
            height: this.height
          }
        }
      }
    }
  },
  methods: {
    previewImage (files) {
      const image = files[0]
      const reader = new FileReader()

      reader.onload = (e) => {
        this.getDimensions(e.currentTarget.result)
      }

      reader.readAsDataURL(image)
    },
    async upload (files = this.files) {
      try {
        const file = files[0]
        const { data } = await axios.get('/api/posts/get-upload-url')

        await axios.put(data.uploadUrl, file, {
          headers: {
            'Content-Type': file.type
          }
        })

        delete data['uploadUrl']

        return data
      } catch (error) {
        throw error
        // do something here and stop the rest of the flow
      }
    },
    getDimensions (url) {
      const img = new Image()
      img.onload = () => {
        this.previewImageUrl = url
        this.height = img.naturalHeight
        this.width = img.naturalWidth
        this.isLoading = false
      }
      img.src = url
    },
    cancel () {
      this.width = 0
      this.height = 0
      this.caption = ''
      this.previewImageUrl = ''
      this.files = []
    },
    checkCaption () {
      this.noCaption = !this.caption.length
    },
    createFormData (url) {
      return {
        caption: this.caption,
        image: {
          ...url,
          size: {
            width: this.width,
            height: this.height
          }
        }
      }
    },
    async submit () {
      this.checkCaption()
      // check for caption
      if (!this.noCaption) {
        try {
          this.isLoading = true
          const url = await this.upload()
          const data = this.createFormData(url)
          // create post
          await axios.post('/api/posts/create', data, {
            config: {
              headers: { 'Content-Type': 'application/json' }
            }
          })
          // turn off loading
          this.isLoading = false
          this.$toast.open(`Post Succesfully Created`)
        } catch (error) {
          // TODO: handle error
          this.isLoading = false
          this.$toast.open({
            duration: 3000,
            message: error.message,
            type: 'is-danger',
            position: 'is-bottom'
          })
          console.error(error)
        }
      }
    }
  }
}
</script>
<template>
  <img :src="require(`~/assets/img/Eaude-contact-button-${logoToShow}.svg`)" alt="Eaude Agency Logo">
</template>
<script>
export default {
  data () {
    return {
      logoToShow: ''
    }
  },
  created () {
    this.logoToShow = Math.ceil(
      Math.random() * Math.floor(4))
  }
}
</script>

<style scoped>  

    img {
      margin-right: 10px;
      margin-bottom: 10px;
      width: 270px;
    }

     @media(min-width: 720px) { 
       
       img {
         flex: 0;
         margin-right: 0;
       }
     }

</style>

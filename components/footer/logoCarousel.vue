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

    picture {
      display: flex;
      flex: 1;
    }

    img {
      width: 270px;
      margin: 0 auto;
    }

     @media(min-width: 720px) { 
       picture {
         flex: 0;
       }

       img {
         flex: 0;
         margin-right: 0;
       }
     }

</style>

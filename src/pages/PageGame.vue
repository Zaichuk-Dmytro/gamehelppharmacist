<template>
  <div class="page-game">
    <div class="page-game__aside aside">
      <div></div>
    </div>
    <div class="page-game__field">
      <clients-card class="client-card" :clients="clients"/>   
      
    </div>   
  </div>
</template>

<script>
import ClientsCard from '../components/ClientsCard.vue'
export default {
  components: { ClientsCard },
  name: 'page-game',
  data: () => ({
    clients: [],
  }),
  async mounted() {
    this.clients = await this.$store.dispatch('clientsApi')
  }
}
</script>

<style lang="scss" scoped>
  .page-game{
    display: flex;

    .page-game__aside{
      width: 32.64vw;
      height: 100vh;
      background: linear-gradient(63.53deg, #2D8550 16.62%, #5E6EC2 83.38%);
      opacity: 0.7;
      
    }

    .page-game__field{
      .client-card{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 540px;
        height: 590px;      
      }
    }
    

    
  }
</style>
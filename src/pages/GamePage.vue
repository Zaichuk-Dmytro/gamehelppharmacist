<template>
  <div class="game-page">
  <div class="test__edit" style="display:none;">test</div>
    <div class="game-page__aside aside">
      <div class="aside__wrapper">
        <div class="aside__nav-btn">
          <button 
            class="aside__nav-btn-wrapper"
            @click="toHome"  
          >
            <home-icon/>
          </button>
          <button 
            class="aside__nav-btn-wrapper"
            @click="reload"  
          >
            <repeat-icon/>
          </button>          
        </div>
        <div class="aside__game-status game-status">
          <div class="game-status__title"> 
            Параметри:          
          </div>
          <div class="game-status__wrapper-icon" v-if="!loading">
            <smile-chips
              class="game-status__icon" 
              icon="sad-smile-icon"
              :count="result.UNHAPPY.length"
            ></smile-chips>
            <smile-chips 
              class="game-status__icon" 
              icon="happy-smile-icon"
              :count="result.HAPPY.length"
            ></smile-chips>
            <smile-chips 
              class="game-status__icon" 
              icon="heart-icon"
              :count="result.HEART.length"
            ></smile-chips>
          </div>
        </div>
      </div>
      <div class="aside__turn">
        <div>Осталось в очереди:</div>
        <div class="aside__turn-count">
          <span class="aside__turn-count-current">{{clientsInQueue}}</span>/{{clientsAmount}}
        </div>
      </div>
    </div>
    <game 
      v-if="!loading"
      class="game-page__field"
      :currentClient="currentClient"
      :clientIndex.sync="clientIndex"
      :clients="clients"
      >
    </game>
    
  </div>
</template>

<script>
export default {
  name: 'game-page',
  data: () => ({
    clients: [],
    clientIndex: 0,
    loading: true
  }),
  async mounted() {
    this.clients = await this.$store.dispatch('clientsApi')    
    
    this.loading = false
  },
  computed: {
    result() {
      return this.$store.getters.getResult
    },
    currentClient() {
      return this.clients[this.clientIndex] || {}     
    },
    clientsAmount() {
      return this.clients.length
    },
    clientsInQueue() {
      let rr =  this.clientsAmount - this.clientIndex - 1 

      if (rr < 0 ) {
        return 0
      } else {
        return rr
      }
    }
  },
  methods: {
    toHome() {
      this.$store.commit('clearResult')
      this.$router.push('/')      
    },
    reload() {
      this.$store.commit('clearResult')
      this.clientIndex = 0
    }
  }
 
}
</script>

<style lang="scss" scoped>
  .game-page{
    display: flex;

    .game-page__aside{
      position: relative;

      width: 32.64vw;
      height: 100vh;

      background: linear-gradient(63.53deg, #2D8550 16.62%, #5E6EC2 83.38%);

      opacity: 0.7;
    } 
    .aside{
      &__wrapper{
        display: flex;
        flex-direction: column;   

        height: 100%;

        padding-top: 4.86vw;
        padding-left: 3.26vw;       
      }

      &__nav-btn{
        display: flex;

        &-wrapper{
          display: flex;
          justify-content: center;
          align-items: center;  
   
          width: 4.86vw;
          height: 4.86vw;    
          border-radius: 100px;

          background-color: #fff;          

          &:not(:last-child){
            margin-right: 2.64vw;
          } 
        }
      }

      .game-status{
        margin: auto 0;

        &__title{
          margin-bottom: 2.08vw;

          font-size: 2.50vw;
          color: #FFFFFF;
          line-height: 3.06vw;                    
        }

        &__wrapper-icon{
          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          .game-status__icon{
            margin-bottom: 2.78vw;
            margin-right: 1.39vw;
         }
        }
      }

      .aside__turn{        
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 9.24vw;

        background: rgba(255,255,255, 0.15);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        font-family: 'Avenir Next Cyr';
        font-size: 2.50vw;
        color: #fff;
        line-height: 3.47vw;
        letter-spacing: 0.02em;
        
        &-count{
          font-size: 3.13vw;

          &-current{
            font-weight: bold;
          }
        }
      }
    }

    .game-page__field{
      display: flex;
      flex-direction: column;
      justify-content: space-around;      
      align-items: center;
      flex-grow: 1;
    }    
  }
</style>

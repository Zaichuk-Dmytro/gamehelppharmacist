<template>
  <div class="page-game">
    <div class="page-game__aside aside">
      <div class="aside__wrapper">
        <div class="aside__nav-btn">
          <div class="aside__nav-btn-wrapper">
            <home-icon/>
          </div>
          <div class="aside__nav-btn-wrapper">
            <repeat-icon/>
          </div>          
        </div>
        <div class="aside__game-status game-status">
          <div class="game-status__title"> 
            Параметри:          
          </div>
          <div class="game-status__wrapper-icon">
            <smile-chips
              class="game-status__icon" 
              icon="sad-smile-icon"
              count="1"
            ></smile-chips>
            <smile-chips 
              class="game-status__icon" 
              icon="happy-smile-icon"
              count="2"
            ></smile-chips>
            <smile-chips 
              class="game-status__icon" 
              icon="heart-icon"
              count="4"
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
    <div class="page-game__field">
      <clients-card class="client-card" :client="currentClient"/>   
      <div class="test">
          <custom-btn
            class="medicines-btn"
            v-for="(item, index) in currentClient.medicines"
            :key="index"
            :background="backgroundBtn(index)"            
          >
            {{item.name}}
          </custom-btn>
      </div>
    </div>   
  </div>
</template>

<script>
export default {
  name: 'page-game',
  data: () => ({
    clients: [],
    clientIndex: 0,
  }),
  async mounted() {
    this.clients = await this.$store.dispatch('clientsApi')
  },
  computed: {
    currentClient() {
      return this.clients[this.clientIndex] || {}     
    },
    clientsAmount() {
      return this.clients.length
    },
    clientsInQueue() {
      return this.clientsAmount - this.clientIndex - 1
    }
  },
  methods: {
    backgroundBtn(index) {
      if (index == 0) {
        return 'purple'
      } else if (index == 1) {
        return 'blue'
      } else {
        return 'yellow'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-game{
    display: flex;

    .page-game__aside{
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
        padding-left: 47px;
        padding-top: 70px;
        height: 100%;
      }

      &__nav-btn{
        display: flex;

        &-wrapper{
          display: flex;
          justify-content: center;
          align-items: center;  
          width: 70px;
          height: 70px;        
          background-color: #fff;          
          border-radius: 100px;

          &:not(:last-child){
            margin-right: 38px;
          } 
        }
      }

      .game-status{
        margin: auto 0;

        &__title{
          margin-bottom: 30px;
          font-size: 36px;
          line-height: 44px;
          color: #FFFFFF;          
        }

        &__wrapper-icon{
          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          .game-status__icon{
            margin-bottom: 40px;
            margin-right: 20px;
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
        height: 133px;
        font-family: 'Avenir Next Cyr';
        font-size: 36px;
        line-height: 50px;
        letter-spacing: 0.02em;
        color: #fff;
        background: rgba(255,255,255, 0.15);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        
        &-count{
          font-size: 45px;

          &-current{
            font-weight: bold;
          }
        }
      }
    }

    .page-game__field{
      display: flex;
      flex-grow: 1;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;

      .client-card{
        display: flex;
        flex-direction: column;
        align-items: center;
        // width: 540px;
        // height: 590px;  
        width: 37.50vw;   
        height: 40.97vw; 
      }

      .test{
        display: flex;
        justify-content: space-around;    
        width: 100%;

        .medicines-btn{
          width: 19.44vw;
          height: 6.25vw;
        }
      }
    }    
  }
</style>
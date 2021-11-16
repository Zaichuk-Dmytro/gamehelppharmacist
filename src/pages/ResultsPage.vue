<template>
  <div class="result-page">
    <div class="result-page__nav-btn-wrapper">
      <button class="result-page__nav-btn"
        @click="toHome">
        <home-icon color="white"></home-icon>
      </button>   
    </div>
    <div class="result-page__content content">
      <div class="content-wrapper">
        <div class="content__results">
          <div 
            class="content__results-wrapper" 
            v-for="(item, index) in prosentages"
            :key="index"
          >
          <div class="count">    
            {{item.prosent}}%          
          </div>
            <div class="med">
              {{item.name}}
            </div>
          </div>          
        </div>
        <div class="content__title">
          Ваш результат: <br/> <span class="content__title_bold">«Что я здесь делаю?»</span>
        </div>
        <div class="content__subtitle">
          Это тестовое задание, так что не будем углубляться в глубины проблем фармацевтов.
        </div>
      </div>
      <custom-btn 
        class="content__custom-btn" 
        background="gray"
        @click="toHome"
      >
        Попробовать еще
      </custom-btn>
    </div>
    <div class="result-page__img-wrapper">
      <div class="result-page__img"
      :style="`background: url(${require('../assets/img/result.png')}) no-repeat bottom;`">      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'results-page',
  data: () => ({
    clientLength: '',
    prosentages: [],
    result: {},
  }),
  mounted() {
    this.clientLength = this.$store.getters.clientLength
    if (!this.clientLength) {
      this.$router.push('/')     
    }
    this.result =  this.$store.getters.getResult
    this.medicines = this.$store.getters.getMedicines
    this.medicines.forEach(item => {
      this.prosentages.push({name: item.name, prosent: +(this.result[item.value].length / this.clientLength * 100).toFixed(2)})
    })
  },
  methods: {
    toHome() {
      this.$store.commit('clearResult')
      this.$router.push('/')      
    }
  }
  
}
</script>

<style lang="scss" scoped>
  .result-page{
    display: flex;
    position: relative;

    width: 100vw;
    height: 100vh;

    overflow: hidden;

    &__nav-btn-wrapper{
      padding-top: 4.86vw;
      padding-left: 3.47vw;
    }

    &__nav-btn{
      display: flex;
      justify-content: center;
      align-items: center;

      width: 4.86vw;
      height: 4.86vw;
      border-radius: 100px;

      background: linear-gradient(63.53deg, #2D8550 16.62%, #5E6EC2 83.38%);      
    }  
    
    
    &__img-wrapper{
      position: relative;

      min-width: 46.53vw;
      
      .result-page__img{
        position: absolute;
        top: -7.15vw;
        right: -10.35vw;

        width: 56.94vw;   
        max-width: 100vh;
        height: 56.94vw;
        max-height: 100vh;
        border-radius: 100%;

        
        background-position: 25% 100%;
        background-size: 67.71vw;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

      &::before{
        content: "";
        position: absolute;

        width: 100%;
        height: 100%;
        border-radius: inherit;

        background: linear-gradient(63.53deg, #2D8550 16.62%, #5E6EC2 83.38%);
        box-shadow: 0px 0px 160px #C4C4C4;

        opacity: 0.25;
        
      }
    }
    }
    .result-page__content{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-grow: 1;

      height: 100vh;
      margin: 0 4.17vw 0 0.69vw;
    }

    .content{
      .content-wrapper{
        margin: auto 0;
      }
      &__results{
        display: flex;
        justify-content: space-around;

        .content__results-wrapper{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #424242;
          margin-bottom: 3.47vw;

          .count{
            font-weight: normal;
            font-size: 3.33vw;
            line-height: 4.86vw;
          }

          .med{
            font-weight: bold;
            font-size: 1.11vw;
            line-height: 2.71vw;

          }
        }
      }

      &__title{
        padding-top: 2.78vw;
        border-top: 2px solid #D9D9D9;

        font-weight: normal;
        font-size: 2.43vw;
        color: #8E9AD5;
        line-height: 2.71vw;
        letter-spacing: 0.02em;
        

        &_bold{
          font-weight: bold;
          font-size: 2.78vw;
        }
      }

      .content__subtitle{
        margin-top: 1.39vw;

        font-size: 1.67vw;
        color: #424242;
        line-height: 2.08vw;
        letter-spacing: 0.004em;      
      }

      .content__custom-btn{
        width: 18.75vw;
        height: 4.17vw;
        margin-bottom: 5.83vw;

        font-size: 1.67vw;
        line-height: 2.08vw;
      }
    }
  }
</style>
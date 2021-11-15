<template>
  <div class="start-game">
    <div class="start-game__circle circle">
      <div class="circle__text-wrapper">
        <div class="circle__subtitle">Добро пожаловать в игру</div>
        <div class="circle__title">Помоги</div>
        <div class="circle__title circle__title_upper">Фармацевту</div>
        
      </div>
      <div class="circle__link">
        <router-link to="game-page">
          <custom-btn class="circle__link-btn">
            Начать
          </custom-btn>
        </router-link>
        <!-- <router-link to="results-page">
          <custom-btn class="circle__link-btn">
            results
          </custom-btn>
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'start-game'
}
</script>

<style lang="scss" scoped>
  .start-game{
    height: 100%;
    width: 100%;
    background: url('../assets/img/cover.png')  no-repeat;
    background-size: cover; 

    &__circle{
      position: absolute;
      top: -30px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center; 
      max-width: 100vh;
      max-height: 100vh;
      width: 59.51vw;
      height: 59.51vw;             
      margin-left: 110px;      
      color: #fff;
      border-radius: 100%;
      background: linear-gradient(63.53deg, #2D8550 16.62%, #5E6EC2 83.38%);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    } 

    .circle {
      &__subtitle {
        margin-bottom: 29px;
        font-weight: 300;
        font-size: 2.43vw;
        line-height: 41px;
        letter-spacing: 0.02em;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);             
      }

      &__title{
        font-size: 4.17vw;
        line-height: 4.58vw;        
        letter-spacing: 0.02em;
        font-weight: bold;
        
        &_upper{
          text-transform: uppercase;
        }
      }

      &__link{ 
        padding-top: 11.72vh;
        padding-bottom: 15.63vh; 

         &-btn{          
          width: 26.39vw;
          height: 6.25vw;
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: bold;
          font-size: 2.50vw;
          line-height: 3.06vw;
          color: #8E9AD5;  
        }
      }
    }
  }
</style>
<template>
  <div class="client-card client">
        <div class="client__photo-wrapper">
          <img class="client__photo" :src="require(`../assets/img/${clients[0].img}`)">
        </div>
      <div class="client__desk">
        <div class="client__data">
          {{clients[5].name}}, {{clients[5].age}}
        </div>
        <div class="client__request">
          {{clients[5].request}}
        </div>
      </div>
    </div> 
</template>

<script>
export default {
  name: 'clients-card',
  props: {
    clients: Object
  }
}
</script>

<style lang="scss" scoped>
  .client{
    background-color: #fff;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px rgba(127, 127, 127, 0.4);
    border-radius: 40px;

  .client__photo-wrapper{
    position: relative;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px; 

    &::before{
      content: "";;
      position: absolute;      
      width: 100%;
      height: 100%;   
      border-radius: inherit;
      background: linear-gradient(63.53deg, #2D8550 16.62%, #5E6EC2 83.38%);     
      opacity: 0.2;      
    }

    .clietn__photo{
      border-radius: inherit;  
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);   
    }
  }   
      
    .client__desk{
      width: 420px;
      padding-top: 25px;

      .client__data{
        margin-bottom: 6px;
        font-size: 32px;
        line-height: 39px;
        font-weight: bold;
        color: #8E9AD5;          
      }

      .client__request{
        font-weight: 300;
        font-size: 24px;
        line-height: 29px;
      }
    }
  }
</style>
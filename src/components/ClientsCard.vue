<template>
  <div class="client-card client">
        <div class="client__photo-wrapper">
          <img v-if="client.img" class="client__photo" :src="require(`../assets/img/${client.img}`)">
        </div>
      <div class="client__desk">
        <div class="client__data">
          {{client.name}}, {{client.age}}
        </div>
        <div class="client__request">
          {{client.request}}
        </div>
      </div>
    </div> 
</template>

<script>
export default {
  name: 'clients-card',
  props: {
    client: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
  .client{
    background-color: #fff;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px rgba(127, 127, 127, 0.4);
    border-radius: 40px;

  &__photo-wrapper{
    position: relative;
    width: 100%;
    height: 24.31vw;  
    object-fit: cover;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px; 

    &::before{
      content: "";
      position: absolute;      
      width: 100%;
      height: 100%;   
      border-radius: inherit;
      background: linear-gradient(63.53deg, #2D8550 16.62%, #5E6EC2 83.38%);     
      opacity: 0.2;      
    }

    .client__photo{
      width: 100%;
      height: 100%;
      border-radius: inherit;  
      object-fit: cover;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);   
    }
  }   
        
    .client__desk{
      padding: 1.74vw 4.17vw;

      .client__data{
        margin-bottom: 0.42vw;
        font-size: 2.22vw;
        line-height: 2.71vw;
        font-weight: bold;
        color: #8E9AD5;          
      }

      .client__request{
        font-weight: 300;
        font-size: 1.67vw;
        line-height: 2.01vw;
      }
    }
  }
</style>
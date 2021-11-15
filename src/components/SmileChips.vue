<template>
  <div class="smile-chips">
    <component :is="icon"/>
    <div class="smile-chips__count">
     
    </div>
  </div>
</template>

<script>
export default {
  name: 'smile-chips',
  props: {
    icon: String,
  }
}
</script>

<style lang="scss" scoped>
  .smile-chips{
    display: flex;
    align-items: center;    
    width: 190px;
    height: 80px;
    padding: 0 10px;
    background: #FFFFFF;
    box-shadow: 0px 0px 50px rgba(131, 42, 64, 0.4);
    border-radius: 40px;

    .smile-chips__count{
      display: flex;
      font-weight: bold;
      font-size: 48px;
      line-height: 59px;
      flex-grow: 1;
      justify-content: center;
    }
  }
</style>
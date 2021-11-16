<template>
  <div class="smile-chips">
    <component :is="icon"/>
    <div class="smile-chips__count">
      {{count}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'smile-chips',
  props: {
    icon: String,
    count: Number
  }
}
</script>

<style lang="scss" scoped>
  .smile-chips{
    display: flex;
    align-items: center;

    width: 13.19vw;
    height: 5.56vw;
    padding: 0 0.69vw;
    border-radius: 40px;

    background: #FFFFFF;
    box-shadow: 0px 0px 50px rgba(131, 42, 64, 0.4);
    

    .smile-chips__count{
      display: flex;
      justify-content: center;
      flex-grow: 1;

      font-weight: bold;
      font-size: 3.33vw;
      line-height: 4.10vw;      
    }
  }
</style>
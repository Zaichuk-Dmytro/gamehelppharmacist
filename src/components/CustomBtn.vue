<template>
  <button 
    :class="['medicine-btn', 'medicine-btn_background_' + background, 'medicine-btn_color_' + color,]"
    
    :disabled="disabled"
    @click="$emit('click' )"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'custom-btn', 
  props: {
    background: {
      type: String,
      default: 'white',
    },
    color: {
      type: String,
    },
    disabled: {
      type: Boolean,
    }
  }
}
</script>

<style lang="scss" scoped>
  .medicine-btn{
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100px;
    height: 100px;
    border-radius: 100px; 

    background: #fff;

    font-weight: bold;
    font-size: 1.94vw;
    color: #FFFFFF;
    line-height: 34px;

    &_background_blue {
      background: linear-gradient(266.19deg, #169AE4 0%, #0CC4FA 100%);
    }

    &_background_yellow{
      background: linear-gradient(90deg, #FFD748 0.02%, rgba(195, 199, 11, 0.96) 99.97%, #CAC6AB 99.98%, #D3E9E1 99.99%);
    }

    &_background_purple{
    background: linear-gradient(266.19deg, #8049C7 0%, #CA57FD 100%);
    }

    &_background_gray{
      background: linear-gradient(90deg, #D9D9D9 0%, #A1A1A1 100%);
    }
    
    &[disabled] {
      opacity: 0.5;
    }
  }    
</style>

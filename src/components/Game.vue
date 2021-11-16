<template>
  <div class="game">
    <clients-card 
      ref="card" 
      class="client-card" 
      :client="currentClient"
      @touchend="gestureEnd"
      @touchmove="gestureMove"
      @touchstart="gestureStart"
    >    
      <div
        ref="stamp"
        class="client-card__stamp">
        <div
          v-if="currentClient && medicines && medicines[action] "
          :class="'client-card__stamp_' + backgroundBtn(action)">
          {{ medicines[action].name}}
        </div>        
      </div>  
    </clients-card>   
    <div class="medicines__btn-wrapper">
      <custom-btn
        class="medicines__btn"
        v-for="(item, index) in medicines"
        :key="index"
        :disabled="loading"
        :background="backgroundBtn(index)"
        @click="countEvent(index)"           
      >
        {{item.name}}
      </custom-btn>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'game',
  mounted() {
    this.currentElement.style.transform = 'scale(0.96) translateX(0) translateY(0) translateZ(0)'    

  },
  data: () => ({
    loading: false,
    action: 0,
    topOpacity: '',
    rightOpacity: '',
    leftOpacity: '',
    startTime: '',
    startX: '',
    startY: '',
    translateX: '',
    translateY: '',
    currentX: '',
    currentY: '',
    touchingElement: false,
    timeTaken: ''
  }),
  props: {
    currentClient: {
      type: Object,
      default: () => ({})
    },
    clientIndex: {
      type: Number
    },
    clients: {
      type: Array
    }
  },
  
  computed: {
    medicines() {
      return this.$store.getters.getMedicines
    },

    index: {
      get() {
        return this.clientIndex
      },
      set(value) {
        this.$emit('update:clientIndex', value)
      }
    },

    stamp() {
      return this.$refs.stamp
    },
    currentElement() {
      return  this.$refs.card?.$el
    },
    elementHeight() {
      return this.currentElement.offsetHeight / 3
    },
    listElNodesWidth() {
      return this.$el?.offsetWidth
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
    },

    countEvent(index) {
      this.loading = true

      if (index == 0 ) {
        this.onActionLeft()
      } else if (index == 1) {
        this.onActionTop()
      } else if (index == 2) {
        this.onActionRight()
      }
    },

    backToMiddle(hidden) {
      this.transformUi( +!hidden, this.currentElement, true, 0, 0)
      this.transformUi( 0, this.stamp)
    },
  
    setOverlayOpacity() {
      this.topOpacity = (((this.translateY + (this.elementHeight) / 2) / 100) * -1)
      this.rightOpacity = this.translateX / 100
      this.leftOpacity = ((this.translateX / 100) * -1)
   
      if (this.topOpacity > 1) {
        this.topOpacity = 1
      }
      if (this.rightOpacity > 1) {
        this.rightOpacity = 1
      }
      if (this.leftOpacity > 1) {
        this.leftOpacity = 1
      }
    },
  
    gestureStart(evt) {
      this.startTime = new Date().getTime()
   
      this.startX = evt.changedTouches[0].clientX
      this.startY = evt.changedTouches[0].clientY
   
      this.currentX = this.startX
      this.currentY = this.startY
 
      this.setOverlayOpacity()
   
      this.touchingElement = true
    },
    gestureMove(evt) {
      this.currentX = evt.changedTouches[0].pageX
      this.currentY = evt.changedTouches[0].pageY
   
      this.translateX = this.currentX - this.startX
      this.translateY = this.currentY - this.startY
 
      this.setOverlayOpacity()
   
      evt.preventDefault()
      this.transformUi( 1, this.currentElement, true, this.translateX, this.translateY)
      
      this.stamp.style.opacity = Math.max( this.topOpacity , this.leftOpacity ,this.rightOpacity )
      if ( this.topOpacity >= 0.5 && this.leftOpacity < 0.5 && this.rightOpacity < 0.5) {
        this.action = 1
      }
      if ( this.rightOpacity >= 0.5 && this.topOpacity < 0.5 && this.leftOpacity < 0.5) {
        this.action = 2
      }
      if ( this.leftOpacity >= 0.5 && this.topOpacity < 0.5 && this.rightOpacity < 0.5) {
        this.action = 0
      }
    },

    gestureEnd() {
      if (!this.touchingElement) {
        return
      }
      this.translateX = this.currentX - this.startX
      this.translateY = this.currentY - this.startY
   
      this.timeTaken = new Date().getTime() - this.startTime

      this.touchingElement = false
      let velocity = 0.3

      if (this.translateY < (this.elementHeight * -1) && this.translateX > ((this.listElNodesWidth / 2) * -1) && this.translateX < (this.listElNodesWidth / 2)) {  //is Top?
        if (this.translateY < (this.elementHeight * -1) || (Math.abs(this.translateY) / this.timeTaken > velocity)) { // Did It Move To Top?
          this.onSwipeTop()
        } else {
          this.backToMiddle()
        }
      } else {
        if (this.translateX < 0) {
          if (this.translateX < ((this.listElNodesWidth / 2) * -1) || (Math.abs(this.translateX) / this.timeTaken > velocity)) { // Did It Move To Left?
            this.onSwipeLeft()
          } else {
            this.backToMiddle()
          }
        } else if (this.translateX > 0) {

          if (this.translateX > (this.listElNodesWidth / 2) && (Math.abs(this.translateX) / this.timeTaken > velocity)) { // Did It Move To Right?
            this.onSwipeRight()
          } else {
            this.backToMiddle()
          }
        }
      }
    },

    //Move the overlays to initial position.
    resetOverlays() {
      const that = this
      setTimeout(() => {
        requestAnimationFrame(() => {
          that.stamp.style.opacity = '0'
        })
      },300)
       
    },
    
    onActionLeft() {
      this.action = 0
      this.transformUi( 1, this.stamp)
      
      const that = this
      setTimeout(() => {
        that.onSwipeLeft()
        that.resetOverlays()
      },300)
    },
  
    onActionRight() {
      this.action = 2
      this.transformUi( 1, this.stamp)      

      const that = this
      setTimeout(() => {
        that.onSwipeRight()
        that.resetOverlays()
      },300)
    },  
    
    //Functions to swipe top elements on logic external action.
    onActionTop() {
      this.action = 1
      this.transformUi( 1, this.stamp)

      const that = this
      setTimeout(() => {
        that.onSwipeTop()
        that.resetOverlays()
      },300)
    },
    
    setActiveHidden() {
      this.currentElement.classList.remove('stackedcards-active')

      const that = this
      that.index = that.index + 1
    
      that.$store.commit('recordResults', that.medicines[that.action])
      if ( that.index + 1 == that.clients.length ) {        
        that.$router.push('results-page')
      }
      this.backToMiddle(true)
      setTimeout(() => {
        that.transformUi( 1, this.currentElement)
        that.currentElement.classList.add('stackedcards-active') 
        that.loading = false
      }, 400)
    },
      
    //Add translate X and Y to active card for each frame.
    transformUi(opacity,elementObj, translate, moveX, moveY,) {
      requestAnimationFrame(() => {

        // Function to generate rotate value 
        function RotateRegulator(value) {
          if (value / 10 > 15) {
            return 15
          } else if (value / 10 < -15) {
            return -15
          }
          return value / 10
        }
        let rotateElement = RotateRegulator(moveX)
          
        if (elementObj) {
          if ( translate ) {
            elementObj.style.transform = 'translateX(' + moveX + 'px) translateY(' + (moveY) + 'px) translateZ(0) rotate(' + rotateElement + 'deg)'
          }
          
          elementObj.style.opacity = opacity
        }
      })
    },
    //Swipe card to top.
    onSwipeTop() {
      this.transformUi( 0, this.currentElement, true, 0, -1000)
      
      this.transformUi( 0, this.stamp) //Move leftOverlay
      this.resetOverlays()
      setTimeout(() => {
        this.setActiveHidden()
      }, 300)
    },

    //Swipe card to left.
    onSwipeLeft() {
      this.transformUi( 0, this.currentElement, true, -1000, 0,)
      this.resetOverlays()
      setTimeout(() => {
        this.setActiveHidden()
      }, 300)
    },
  
    //Swipe card to right.
    onSwipeRight() {
      this.transformUi( 0, this.currentElement, true, 1000, 0,)
      this.resetOverlays()
      setTimeout(() => {
        this.setActiveHidden()
      }, 300)
    },
      
  }
  
}
</script>

<style lang="scss" scoped>
  .game{
    overflow: hidden;

    .client-card{
      position: relative;

      transition: all 400ms ease;

      &__stamp{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        
        width: 100%;
        height: 100%;
        
        font-weight: bold;
        font-size: 52px;
        line-height: 51px;

        opacity: 0;

        *{
          padding: 32px;

          transform: rotate(-30deg);
        }

        &_purple{
          border: 8px solid #8049C7;

          color: #8049C7;         
        }

        &_blue{
          border: 8px solid #169AE4;

          color:#169AE4;
        }

        &_yellow{
          border: 8px solid #FFB903;

          color: #FFB903;
        }
      }
    }

    .medicines__btn-wrapper{
      display: flex;
      justify-content: space-around;
          
      width: 100%;

      .medicines__btn{
        width: 19.44vw;
        height: 6.25vw;
      }
    }
  }       
</style>
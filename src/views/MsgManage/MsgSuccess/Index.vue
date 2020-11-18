<template>
     <ToolBar>
       <div class="box"> 
         <img src="../../../assets/images/success.png">
          <p class="title">{{name}}</p>
      </div>
    </ToolBar>
</template>
<script>
  import ToolBar from '~/components/ToolBar/ToolBar.vue';
  export default {
    data() {
      return {
          name:this.$route.query.name,

      }
    },
    methods: {

    },
    components: {
        ToolBar
    }
  }
</script>
<style lang="less">
.box{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 18px;
    font-weight: bold;
    color: #2183d8;
    height: 350px;
}
</style>
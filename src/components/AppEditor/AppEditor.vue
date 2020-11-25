<template>
  <div class="app-editor">
    <vue-editor 
      v-model="model"
      use-custom-image-handler
      @image-added="imageAdded"></vue-editor>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor';
import upload from '@/utils/upload.js';

export default {
  name:'AppEditor',
  components:{ VueEditor },
  props:{
    value:{
      type:String,
      default:''
    }
  },
  data(){
    return {

    }
  },
  computed:{
    model:{
      get(){

        return this.value;

      },
      set(v){

        this.$emit('input',v)

      }
    }
  },
  methods:{
    async imageAdded(file, Editor, cursorLocation){

      let url = await upload(file);
      Editor.insertEmbed(cursorLocation, 'image', url);

    }

  }
}
</script>

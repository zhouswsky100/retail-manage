<template>
  <nav class="nav-bar">
    <ScrollPane class="nav-bar-scroll">
      <router-link :to="v.path" class="nav-bar-tag" v-for="(v,i) in nav"
                   :key="i.path" :class="$route.path == v.path ? ' active':''">
        <i class="point"></i>
        {{ v.title }}
        <div v-show="nav.length != 1" class="close-box">
          <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(i)'></span>
        </div>
      </router-link>
    </ScrollPane>
  </nav>
</template>

<script>
  import ScrollPane from '~/components/ScrollPane/Index.vue'

  export default {
    data() {
      return {
        nav: [],
      };
    },
    components: {
      ScrollPane
    },
    watch: {
      '$route': {
        handler: function () {
          let index = this.$Func.hasValInArrayObj(this.nav, 'path', this.$route.path);
          if (index != -1) return;
          this.nav.push({
            path: this.$route.path,
            title: this.$route.meta.title,
          });

        },
        // 深度观察
        deep: true
      }
    },
    methods: {
      closeSelectedTag(i) {
        let nav = this.nav;
        let thisPath = nav[i].path;
        nav.splice(i, 1);
        if (thisPath == this.$route.path) {
          this.$router.push(nav[(nav.length - 1)].path);
        }

      }
    },
    mounted: function () {
      this.nav.push({
        path: this.$route.path,
        title: this.$route.meta.title,
      });
    }
  }
</script>
<style lang="less" scoped="">
  .nav-bar {
    margin-top: 50px;
    height: 38px;
    width: 100%;
    z-index: 8;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

    .nav-bar-tag {
      height: 26px;
      color: #495060;
      margin: 6px 2px;
      padding-left: 6px;
      padding-right: 6px;
      font-size: 12px;
      line-height: 26px;
      border: 1px solid #ebeef5;
      border-radius: 2px;
      display: inline-block;
      .close-box {
        display: inline-block;
        height: 100%;
        border-left: 1px solid #ebeef5;
        margin-left: 6px;
      }
      &:hover {
        opacity: 0.85;
        //box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
        //border-color: #3d8dbc;
      }
      .point {
        display: none;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: auto 0;
        position: relative;
        background: #fff;
      }
      .el-icon-close {
        font-weight: bolder;
        margin-left: 6px;
        &:hover {
          color: #ff0000;
        }
      }
    }
    .active {
      border: 1px solid #916BFF;
      background: #916BFF;
      color: #fff;
      .point {
        display: inline-block;
      }
    }
    .scroll-container {
      flex: 1;
      height: 100%;
    }
  }
</style>

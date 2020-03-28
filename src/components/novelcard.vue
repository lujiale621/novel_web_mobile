<style scoped>
.ms {
  margin-bottom: 0px;
  color: #ffffff;
  font-size: 12px;
  position: absolute;
  /*position: relative;*/
  border-bottom-right-radius: 6px;
  border-top-left-radius: 6px;
  bottom: 5px;
  right: 0;
  width: 80%;
  height: 10%;
  background: #505b4c;
  opacity: 0.8;
  filter: alpha(opacity=60);
  -moz-opacity: 0.8;
}
.con_img {
  position: relative;
  width: auto;
  height: auto;
}
.image{
  height: 140px;
  width:100px;
}
</style>>

<template>
  <div style="width:100px;">
    <div class="con_img">
      <!-- <img class="image right-radius left-radius" src="@/static/demo.jpg" id="scenic_img" /> -->
      <div class="image">
        <van-image
          radius="6"
          lazy-load
          style="height: 140px"
          :src="nvattrs.cover"
          @click="todetail(nvattrs.url)"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <p class="ms van-ellipsis">{{ nvattrs.updatatime }}</p>
    </div>
    <div class="van-ellipsis">{{ nvattrs.title }}</div>
  </div>
</template>
<script>
export default {
  name: "novelcard",
  props: {
    nvattrs: ""
  },
  mounted() {},
  methods: {
    todetail: function(value) {
      this.$router.push({
        path: "/detail",
        query: {
          url: value,
          textsize: this.nvattrs.textsize
        }
      });
    }
  }
};
</script>
<style  scoped>
img {
  height: 106px;
  width: 76px;
  box-shadow: 1px 1px 2px #bbb;
  border-radius: 0.3em;
}
.box {
  text-align: left;
  display: flex;
  flex-direction: row;
}
.layout {
  margin: 10px 5px;
  border-bottom: 1px solid #eee;
  padding: 5px;
}
.title {
  color: #3f8d94;
}
.updatatime {
  right: 8px !important;
}
.introduce {
  height: 80px;
  margin-top: 0;
  width: auto;
  line-height: 21px;
  font-size: 13px;
  color: #666;
  overflow: hidden;
}
.van-nav-bar {
  height: 20px;
  line-height: 20px;
}
.van-nav-bar__left {
  left: 8px !important;
}
.van-nav-bar__title {
  margin-left: 40px !important;
  max-width: 65% !important;
}
.van-nav-bar__right {
  right: 8px !important;
  color: #666;
}
.image {
  height: 106px;
  width: 76px;
    margin-right: 5px;
}
</style>
<template>
  <div class="layout">
    <van-row>
      <van-col span="24">
        <div class="box">
          <div class="image">
            <img :src="nvattrs.cover"  lazy-load @click="todetail(nvattrs.url)" />
          </div>
          <div>
            <van-nav-bar left-arrow :border="false">
              <template #title></template>
              <template #left>
                <div class="title" @click="todetail(nvattrs.url)">{{nvattrs.title}}{{nvattrs.name}}</div>
              </template>
              <template #right>
                <div class="updatatime">{{nvattrs.updatatime}}{{nvattrs.time}}</div>
              </template>
            </van-nav-bar>
            <div class="introduce">{{nvattrs.introduce}}</div>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  name: "novelsortcard",
  props: {
    nvattrs: ""
  },
  mounted() {},
  methods: {
    todetail: function(value) {
      this.$router.push({
        path: "/detail",
        query: {
          url: value
        }
      });
    }
  }
};
</script>
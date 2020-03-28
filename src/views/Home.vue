<style  scoped>
.van-nav-bar__left {
  height: 35px;
  left: 8px !important;
}
.van-nav-bar__title {
  margin-left: 40px !important;
  max-width: 65% !important;
}
.van-nav-bar__right {
  height: 40px;
  right: 8px !important;
}

.iconfont {
  margin-left: 8px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 70%;
  text-align: center;
  background-color: #39a9ed;
}
.tab {
  margin: 15px 0px !important;
}
.bannerimage {
  width: 100%;
  height: 100%;
}
.center {
  text-align: center;
}
.top {
  padding: 5px;
  background: rgba(78, 80, 82, 0.39);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
.nav {
  margin: 5px 0px;
}
.home {
  background-color: #f6f7f9;
}
.itcon {
  text-align: center;
  align-items: center;
}
.font {
  font-size: 12px;
}
</style>
<template>
  <keep-alive>
    <div class="home">
      <BackTop :height="100" :bottom="200">
        <div class="top">顶端</div>
      </BackTop>
      <van-nav-bar left-arrow :border="false">
        <template #title>
          <van-search shape="round" v-model="value" placeholder="请输入搜索关键词" @search="search"></van-search>
        </template>
        <template #left>
          <img class="icon-avatar" src="../assets/av.png" alt="Smiley face" width="30" height="30" />
        </template>
        <template #right>
          <van-icon :size="25" class="iconfont icon-email-fill" name="sixin" />
          <van-icon :size="25" class="iconfont icon-clock-fill" name="lishijilu" />
        </template>
      </van-nav-bar>
      <van-tabs v-model="active" scrollspy sticky>
        <!-- <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">网页正在建设中</van-notice-bar> -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <van-image radius="0" class="bannerimage" src="/static/pictures/banner/1.jpg">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </van-swipe-item>
          <van-swipe-item>
            <van-image radius="0" class="bannerimage" src="/static/pictures/banner/2.jpg">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </van-swipe-item>
          <van-swipe-item>
            <van-image radius="0" class="bannerimage" src="/static/pictures/banner/3.jpg">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </van-swipe-item>
        </van-swipe>
        <div class="nav">
          <van-grid>
            <van-grid-item :to="{ path: '/showrank2' }">
              <div class="itcon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jinrongketang" />
                </svg>
                <h4 class="font">推荐</h4>
              </div>
            </van-grid-item>
            <van-grid-item :to="{ path: '/showrank' }">
              <div class="itcon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bangdan" />
                </svg>
                <h4 class="font">排行榜</h4>
              </div>
            </van-grid-item>
            <van-grid-item />
            <van-grid-item />
          </van-grid>
        </div>
        <van-tab title="言情女生" class="tab">
          <sortscrollcard nvtype="言情"></sortscrollcard>
        </van-tab>
        <van-tab title="玄幻奇幻" class="tab">
          <sortscrollcard nvtype="玄幻"></sortscrollcard>
        </van-tab>
        <van-tab title="都市青春" class="tab">
          <sortscrollcard nvtype="都市"></sortscrollcard>
        </van-tab>
        <van-tab title="武侠仙侠" class="tab">
          <sortscrollcard nvtype="仙侠"></sortscrollcard>
        </van-tab>
        <van-tab title="唯美纯爱" class="tab">
          <sortscrollcard nvtype="唯美"></sortscrollcard>
        </van-tab>
        <van-tab title="科幻灵异" class="tab">
          <sortscrollcard nvtype="科幻"></sortscrollcard>
        </van-tab>
        <van-tab title="轻小说" class="tab">
          <sortscrollcard nvtype="轻小说"></sortscrollcard>
        </van-tab>
        <van-tab title="历史军事" class="tab">
          <sortscrollcard nvtype="历史"></sortscrollcard>
        </van-tab>
      </van-tabs>
      <div class="center">
        <div style="margin: 10px">本网站提供小说资源均系收集各大网站，本网站只提供web页面浏览服务，并不提供小说资源存储，也不参与任何小说上传!</div>
        <div>Coryright © 2020 All Right Reserved</div>

        <br />
        <br />
        <br />
      </div>
    </div>
  </keep-alive>
</template>
<script>
import sortscrollcard from "@/components/Sortscrollcard";
export default {
  name: "home",
  data() {
    return {
      value: "",
      active: 0
    };
  },
  methods: {
    search: function() {
      this.$router.push({
        path: "/searchdetail",
        query: {
          searchname: this.value
        }
      });
    }
  },
  components: {
    sortscrollcard
  }
};
</script>
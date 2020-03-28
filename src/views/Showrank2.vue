<style  scoped>
</style>
<template>
  <div>
    <div class="nav-header">
      <van-nav-bar title="排行榜" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <van-skeleton title avatar row="30" :loading="loading"></van-skeleton>

    <rankcard :obj="res[0].ranklist" nvtype="点击"></rankcard>
    <rankcard :obj="res[1].ranklist" nvtype="推荐"></rankcard>
    <rankcard :obj="res[2].ranklist" nvtype="收藏"></rankcard>
  </div>
</template>
<script>
import rankcard from "@/components/rankcard";
export default {
  name: "showrank",
  data() {
    return {
      res: [],
      loadtime: 0,
      loading: true
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    load() {
      this.$Spin.show();
      var value = "api/e1bookrank2";
      var self = this;
      this.axios.get(value).then(function(rest) {
        self.loading = false;
        self.$Spin.hide();
        if (rest.data != null) {
          if (rest.data.code != 0) {
            self.res = rest.data.data.list;
          } else {
            if (self.loadtime > 5) return;
            console.log(self.nvtype + ":再次加载 加载次数:" + self.loadtime);
            this.load();
          }
        }
      });
    }
  },
  components: { rankcard }
};
</script>
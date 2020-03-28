<style  scoped>
</style>
<template>
  <div>
    <van-skeleton title avatar row="30" :loading="loading">
    <div class="nav-header">
      <van-nav-bar title="排行榜" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <rankcard :obj="res[0].ranklist" nvtype="言情女生"></rankcard>
    <rankcard :obj="res[1].ranklist" nvtype="玄幻奇幻"></rankcard>
    <rankcard :obj="res[2].ranklist" nvtype="都市青春"></rankcard>
    <rankcard :obj="res[3].ranklist" nvtype="武侠仙侠"></rankcard>
    <rankcard :obj="res[4].ranklist" nvtype="耽美同人"></rankcard>
    <rankcard :obj="res[5].ranklist" nvtype="科幻灵异"></rankcard>
    <rankcard :obj="res[5].ranklist" nvtype="轻小说"></rankcard>
    <rankcard :obj="res[5].ranklist" nvtype="历史军事"></rankcard>
    </van-skeleton>
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
      var value = "api/e1bookrank1";
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
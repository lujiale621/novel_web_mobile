<style  scoped>
.center {
  text-align: center;
}
.update_title {
  text-align: left;
  border-top: none;
  border-bottom: 1px solid #e5a9b7;
}
.update_title span.update_icon {
  font-weight: 400;
}
.update_title {
  padding: 0 10px;
  color: #3f8d94;
  height: 32px;
  line-height: 32px;
  border-top: solid 2px #b4cdd2;
  border-bottom: solid 1px #d8d8d8;
  font-size: 14px;
  position: relative;
  background: #f7f7f7;
}
.vancol {
  margin-bottom: 5px;
}
</style>
<template>
  <div>
    <van-row>
      <van-col span="24" class="vancol">
        <div class="update_title">
          <Breadcrumb>
            <BreadcrumbItem :to="{ path: '/home' }">Home</BreadcrumbItem>
            <BreadcrumbItem>搜索结果</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </van-col>
      <van-skeleton title avatar row="30" :loading="loading"></van-skeleton>

      <novelsortcard v-for="item in res" :key="item.id" :nvattrs="item">1</novelsortcard>
    </van-row>
    <div class="center">
      <div style="margin: 10px">本网站提供小说资源均系收集各大网站，本网站只提供web页面浏览服务，并不提供小说资源存储，也不参与任何小说上传!</div>
      <div>Coryright © 2020 All Right Reserved</div>

      <br />
      <br />
      <br />
    </div>
  </div>
</template>
<script>
import novelsortcard from "@/components/NovelSortcard";
export default {
  name: "searchdetail",
  data() {
    return {
      searchname: "",
      res: [],
      loading: true,
      loadtime:0
    };
  },
  created() {
    this.searchname = this.$route.query.searchname;
  },
  destroyed() {
    this.$Spin.hide();
    this.loading = false;
  },
  methods: {
    load() {
      this.$Spin.show();
      var value = "api/e1searchbook";
      var self = this;
      this.axios
        .get(value, {
          params: {
            xsname: this.searchname
          }
        })
        .then(function(rest) {
          self.loading = false;
          self.$Spin.hide();
          if (rest.data != null) {
            if (rest.data.code != 0) {
              self.res = rest.data.data.list;
            }else{
              if (self.loadtime > 5) return;
              console.log(self.nvtype + ":再次加载 加载次数:" + self.loadtime);
              this.load();
            }
          }
        });
    }
  },
  mounted() {
    this.load();
  },
  components: {
    novelsortcard
  }
};
</script>
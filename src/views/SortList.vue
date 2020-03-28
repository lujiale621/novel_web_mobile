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
.center {
  text-align: center;
}
</style>
<template>
  <div>
    <van-skeleton title avatar row="30" :loading="loading"></van-skeleton>
    <van-row>
      <van-col span="24" class="vancol">
        <div class="update_title">
          <Breadcrumb>
            <BreadcrumbItem :to="{ path: '/home' }">首页</BreadcrumbItem>
            <BreadcrumbItem>分类</BreadcrumbItem>
            <BreadcrumbItem>{{nvtype}}</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </van-col>
      <novelsortcard v-for="item in booklist" :key="item.id" :nvattrs="item">1</novelsortcard>
    </van-row>
    <Row>
      <Col span="24">
        <Page @on-change="changepage" class="center" :total="100"></Page>
      </Col>
    </Row>
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
  name: "sortlist",
  data() {
    return {
      nvtype: "",
      booklist: [],
      loadtime: 0,
      loading: true
    };
  },
  created() {
    this.nvtype = this.$route.query.nvtype;
  },
  mounted() {
    this.load(1);
  },
  destroyed() {
    this.$Spin.hide();
    this.loading = false;
  },
  methods: {
    load(index) {
      this.$Spin.show();
      var self = this;
      var value = "";
      var fenlei = "";
      value = "/api/e1booksort";
      if (this.nvtype == "都市") {
        fenlei = "dushi";
      } else if (this.nvtype == "玄幻") {
        fenlei = "xuanhuan";
      } else if (this.nvtype == "言情") {
        fenlei = "yanqing";
      } else if (this.nvtype == "武侠") {
        fenlei = "wuxia";
      } else if (this.nvtype == "唯美") {
        fenlei = "danmei";
      } else if (this.nvtype == "科幻") {
        fenlei = "kehuan";
      } else if (this.nvtype == "历史") {
        fenlei = "danmei";
      } else if (this.nvtype == "轻小说") {
        fenlei = "lightnovel";
      }
      this.axios
        .get(value, {
          params: {
            page: index,
            xsfenlei: fenlei
          }
        })
        .then(function(rest) {
          self.loading = false;

          self.$Spin.hide();
          if (rest.data != null) {
            if (rest.data.code != 0) {
              self.booklist = rest.data.data.list;
            } else {
              if (self.loadtime > 5) return;
              console.log(self.nvtype + ":再次加载 加载次数:" + self.loadtime);
              this.load();
            }
          }
        });
    },
    changepage(index) {
      this.booklist = "";
      this.load(index);
    }
  },
  components: { novelsortcard }
};
</script>
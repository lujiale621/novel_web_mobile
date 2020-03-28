<style  scoped>
.list-title {
  text-align: left;
  font-size: 16px;
  margin: 5px 5px;
}

.list-update {
  text-align: right;
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 15px;
  color: burlywood;
}
.scrollcard {
  background: #ffffff;
}
.imgdiv {
  padding-left: 5px;
}
</style>
<template>
  <div class="scrollcard">
    <van-skeleton title avatar :row="3" :loading="loading">
      <van-row>
        <van-col span="2">
          <div class="imgdiv">
            <img
              class="icon-avatar"
              src="../assets/tv.png"
              alt="Smiley face"
              width="30"
              height="30"
            />
          </div>
        </van-col>
        <van-col span="10">
          <p class="list-title">{{nvtype}}</p>
        </van-col>
        <van-col span="12">
          <p class="list-update" @click="tonovelsort">更多></p>
        </van-col>
      </van-row>
      <div>
        <vue-scroll :ops="ops">
          <div style="display: flex;">
            <novelcard
              v-for="item of nvlist"
              :key="item.id"
              :nvattrs="item"
              style="margin: 10px;"
              @click="todetail(item.url)"
            ></novelcard>
          </div>
        </vue-scroll>
      </div>
    </van-skeleton>
  </div>
</template>
<script>
import novelcard from "@/components/NovelCard";
export default {
  name: "sortscrollcard",
  props: {
    nvtype: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {
          disable: true
        }
      },
      loading: true,
      nvlist: [],
      loadtime: 0
    };
  },
  mounted() {
    this.load();
  },
  destroyed() {
    this.$Spin.hide();
    this.loading = false;
  },
  methods: {
    load() {
      var self = this;
      self.loadtime = self.loadtime + 1;
      var value = "";
      var fenlei = "";
      value = "api/e1booksort";
      if (this.nvtype == "都市") {
        fenlei = "dushi";
      } else if (this.nvtype == "玄幻") {
        fenlei = "xuanhuan";
      } else if (this.nvtype == "言情") {
        fenlei = "yanqing";
      } else if (this.nvtype == "仙侠") {
        fenlei = "wuxia";
      } else if (this.nvtype == "唯美") {
        fenlei = "danmei";
      } else if (this.nvtype == "科幻") {
        fenlei = "kehuan";
      } else if (this.nvtype == "历史") {
        fenlei = "lishi";
      } else if (this.nvtype == "轻小说") {
        fenlei = "lightnovel";
      }
      this.axios
        .get(value, {
          params: {
            page: "1",
            xsfenlei: fenlei
          }
        })
        .then(function(rest) {
          self.loading = false;
          if (rest.data != null) {
            if (rest.data.code != 0) {
              self.nvlist = rest.data.data.list;
            } else {
              if (self.loadtime > 5) return;
              console.log(self.nvtype + ":再次加载 加载次数:" + self.loadtime);
              self.load();
            }
          }
        });
    },
    todetail: function(value) {
      this.$router.push({
        path: "/detail",
        query: {
          url: value
        }
      });
    },
    tonovelsort() {
      this.$router.push({
        path: "/sortlist",
        query: {
          nvtype: this.nvtype
        }
      });
    }
  },
  components: { novelcard }
};
</script>
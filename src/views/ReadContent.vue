<style  scoped>
.title {
  text-align: center;
  font-size: 15px;
}
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.content {
  padding: 0px 30px;
  background: #f1f1f1;
}
#TextContent p {
  text-indent: 2em;
  word-wrap: break-word;
  word-break: break-word;
  margin: 0.8em 0;
}
.center {
  display: flex;
  justify-content: center;
}
.button {
  width: 100%;
}
html {
  margin: 0px;
  width: 100%;
  height: 100%;
  color: #49423a;
}
.fz20 {
  font-size: 20px;
}
.scroll {
  height: 100%;
}
.mulu:after {
  content: "目录";
  color: #fff;
  font-size: 10px;
  text-align: center;
  width: 38px;
  position: absolute;
  left: 21px;
  top: 50%;
}
.mulu {
  left: -22px;
  width: 60px;
  height: 60px;
  margin-top: -30px;
  position: fixed;
  top: 50%;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  background-color: rgba(51, 51, 51, 0.493);
  background-repeat: no-repeat;
  background-position: 40px 12px;
  background-size: 100px;
}
.drawer {
  left: 0;
  position: fixed;
  width: 60%;
  height: 100%;
  background-color: rgba(8, 7, 7, 0.445);
  z-index: 1;
}
.active {
  display: none;
}
.itemli {
  background-color: rgba(17, 15, 15, 0.432);
  color: #fff;
  padding: 5px;
}
.render {
  color: #6cb2e07a;
}
.nav{
  background-color:rgba(8, 7, 7, 0.445);

}
</style>
<template>
  <div class="layout">
    <van-skeleton title avatar row="30" :loading="loading"></van-skeleton>
    <Layout>
      <Content>
        <div class="mulu" v-bind:class="{ active: ismulushow }" @click="showmulu"></div>
        <div class="drawer" v-bind:class="{ active: isdrawdis }">
          <vue-scroll :ops="ops">
            <Row>
              <Col span="24">
                <van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft" class="nav" />
              </Col>
            </Row>
            <Row>
              <Col v-for="(item,index) in artlinks" :key="item.id" span="24">
                <div class="itemli" @click="refleshcontent(index)">{{item.num}}</div>
              </Col>
            </Row>
          </vue-scroll>
        </div>
        <div class="content fz20" id="TextContent" @click="clickcontent">
          <div>
            <div v-for="(it,index) in list" :key="index">
              <div class="title">
                <h1>{{it.title}}</h1>
              </div>
              <hr />
              <div>
                <p v-for="(text,index) in it.bookcontent" :key="index">{{text}}</p>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {
  name: "readcontent",
  data() {
    return {
      url: "",
      bookcontent: "",
      title: "",
      index: "",
      parenturl: "",
      bookdetail: "",
      artlinks: "",
      list: [],
      isloading: false,
      value2: false,
      isdrawdis: true,
      ismulushow: true,
      ops: {}, // Your options，
      loading: true
    };
  },
  created() {
    this.url = this.$route.query.url;
    this.index = this.$route.query.index;
    this.parenturl = this.$route.query.parenturl;
    console.log("parenturl:");
    console.log(this.parenturl);

    var that = this;
    window.onscroll = function() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
      if (scrollTop + windowHeight > scrollHeight - 2500) {
        //已滚动底部
        that.onLoad();
      }
    };
  },
  destroyed() {
    this.$Spin.hide();
    this.loading = false;
    window.onscroll = null;
    clearInterval(this.timer)
    clearInterval(this.timer2)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    refleshcontent(value) {
      console.log("clickindex:" + value);
      this.loading = true;
      this.index = value;
      this.list = [];
      this.toread(false);
      this.isdrawdis = !this.isdrawdis;
    },
    clickcontent() {
      this.isdrawdis = true;
      this.ismulushow = !this.ismulushow;
    },
    showmulu() {
      this.isdrawdis = false;
    },
    read(dex) {
      var par = "";
      par = this.artlinks[dex].url;
    },
    toread(isinit) {
      this.isloading = true;
      var self = this;
      var value = "/api/e1bookcontent";
      var par = "";
      if (!isinit) {
        console.log("加载下一章");
        console.log("index:" + this.index);
        par = this.artlinks[this.index].url;
        console.log("url:" + par);
      } else {
        par = this.url;
      }

      this.axios
        .get(value, {
          params: {
            xscontent: par
          }
        })
        .then(function(rest) {
          self.loading = false;
          self.isloading = false;
          if (rest.data != null) {
            if (rest.data.code != 0) {
              if (isinit) {
                var unit = {};
                self.bookcontent = rest.data.data.content;
                self.title = rest.data.data.num;
                unit.title = self.title;
                unit.bookcontent = self.bookcontent;
                self.list.push(unit);
              } else {
                var unit = {};
                var content = rest.data.data.content;
                var title = rest.data.data.num;
                unit.title = title;
                unit.bookcontent = content;
                self.list.push(unit);
                console.log(self.list);
              }
            } else {
              console.log("再次加载");
              self.toread(false);
            }
          }
        });
    },
    init() {
      this.$Spin.show();
      var value = "api/e1bookdetail";
      var self = this;
      this.axios
        .get(value, {
          params: {
            xsdetail: this.parenturl
          }
        })
        .then(function(rest) {
          self.$Spin.hide();

          if (rest.data != null) {
            if (rest.data.code != 0) {
              self.bookdetail = rest.data.data.data;
              console.log(self.bookdetail);
              self.artlinks = rest.data.data.list;
              console.log(self.artlinks);
            } else {
              console.log("再次加载");
              self.init();
            }
          }
        });
    },
    onLoad() {
      console.log("onLoad");
      this.isLoading = false;
      var tag = "next";
      if (this.isloading == false) {
        if (tag == "pre") {
          this.index = parseInt(this.index) - 1;

          this.toread(false);
        } else if (tag == "next") {
          this.index = parseInt(this.index) + 1;
          console.log("index:" + this.index);
          this.toread(false);
        }
      }
    },
  },

  mounted() {
    this.isdrawdis = true;
    var value = "/api/e1bookcontent";
    this.toread(true);
    this.init();
    console.log("mounted");
    this.timer = setInterval(() => {
    this.ismulushow = true;
    }, 5000);
    this.timer2 = setInterval(() => {
    this.onLoad()
    }, 80000);
  }
};
</script>
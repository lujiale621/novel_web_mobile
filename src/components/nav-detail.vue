<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  margin: 0px;
}
.layout-footer-center {
  text-align: center;
}
img {
  height: 106px;
  width: 76px;
  border-radius: 5px;
}
.daheader {
  margin: 0px 10px;
}
.daheader2 {
  margin: 5px 10px;
}
.name {
  font-size: 15px;
  text-align: left;
}
.author {
  color: cadetblue;
  text-align: left;
}
.datxt {
  font-size: 12px;
  padding: 3px 0px;
  margin: 1px 0px;
  text-align: left;
}
.introduce {
  margin: 10px 20px;
  height: 69px;
  overflow: hidden;
}
.button {
  margin: 10px 5px;
  width: 100px;
}
.button1 {
  margin: 10px 5px;
  width: 100px;
  margin-left: 20px;
}
.list {
  margin-top: 20px;
}
.hreflist {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.lit {
  color: cadetblue;
  border-bottom: 1px solid rgba(231, 228, 228, 0.753);
}
.bookdetail {
  width: 100%;
}
.content {
  display: flex;
  flex-direction: row;
}
.li {
  display: flex;
  flex-direction: row;
}
.href {
  margin-top: 10px;
  margin-bottom: 10px;
}
.leftitem {
  text-align: left;
  padding-left: 10px;
  background: #ffffff;
  padding-top: 0px;
}
.introduce {
  font-size: 12px;
  margin-bottom: 0px;
}
.image {
  height: 106px;
  width: 76px;
}
.nav-header {
  padding: 0px;
  border: 1px solid #dcdee2;
  border-color: #e8eaec;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Content :style="{padding: '0 5px'}">
        <div class="nav-header">
          <van-nav-bar :title="data.name" left-text="返回" left-arrow @click-left="onClickLeft" />
        </div>
        <Card>
          <div style="min-height: 200px;">
            <div class="content">
              <div class="image">
                <img :src="data.cover" alt />
              </div>
              <div class="bookdetail">
                <div class="daheader">
                  <Row>
                    <Col span="12">
                      <div class="name">{{data.name}}</div>
                    </Col>
                    <Col span="12">
                      <div class="author">作者:{{data.author}}</div>
                    </Col>
                  </Row>
                </div>
                <div class="daheader2">
                  <Row>
                    <Col span="8" class="datxt">分类:{{data.tag}}</Col>
                    <Col span="8" class="datxt">状态:{{data.status}}</Col>
                  </Row>
                  <Row>
                    <Col span="8" class="datxt">字数:{{this.textsize}}</Col>
                    <Col span="16" class="datxt">更新:{{data.time}}</Col>
                  </Row>
                  <Row>
                    <Col span="24" class="datxt">最新章节:{{data.num}}</Col>
                  </Row>
                </div>
              </div>
            </div>
            <div>
              <Row>
                <Col span="24">
                  <vue-scroll :ops="ops">
                    <div class="introduce">简介:{{data.introduce}}</div>
                  </vue-scroll>
                </Col>
              </Row>
            </div>
            <div class="content">
              <Button class="button1" type="info" @click="toread(links[0].url,0)">开始阅读</Button>
              <Button class="button">放入书架</Button>
              <Button class="button">txt下载</Button>
            </div>
          </div>
        </Card>
      </Content>

      <Content :style="{padding: '0 5px'}" class="list">
        <Card>
          <div>
            <Row>
              <Col span="12" v-for="(lit,ix) in links" :key="lit.id" class="lit">
                <div class="li">
                  <Icon type="ios-checkmark" />
                  <div class="href" @click="toread(lit.url,ix)">{{lit.num.slice(0,10)}}</div>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2020 &copy; Lujiale</Footer>
    </Layout>
  </div>
</template>
<script>
export default {
  name: "navdetail",
  props: {
    data: "",
    links: "",
    parenturl: "",
    textsize: ""
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
      }
    };
  },

  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toread(value, ix) {
      console.log("parenturl");
      console.log(this.parenturl);
      this.$router.push({
        path: "/readcontent",
        query: {
          url: value,
          index: parseInt(ix),
          parenturl: this.parenturl
        }
      });
    }
  }
};
</script>
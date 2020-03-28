<style  scoped>
.toptab span.tabRight span.cur {
  color: #3f8d94;
  border-bottom: 2px solid #4ba0a0;
  height: 28px;
}
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
form,
button,
input,
textarea,
p {
  margin: 0;
  padding: 0;
}
.topbook ul li span.hits,
.index_top ul li span.hits,
.topbooks ul li span.hits {
  width: 45px;
  float: right;
  text-align: right;
  font-family: verdana;
}
a {
  text-decoration: none;
  color: #666;
}
ul,
ol,
li {
  list-style: none;
}
.topbooks ul li,
.topbook ul li,
.listlie ul li {
  font-size: 14px;
}
.topbook ul,
.index_top ul,
.topbooks ul {
  padding: 5px 10px;
}
.topbook ul li,
.index_top ul li,
.topbooks ul li {
  line-height: 27px;
  height: 27px;
  color: #999;
  float: left;
  width: 100%;
  overflow: hidden;
  font-weight: 400;
}
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.toptab {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #3f8d94;
  background: #f7f7f7;
  border-top: solid 2px #b4cdd2;
  border-bottom: 1px solid #d8d8d8;
  border-left: 1px solid #d8d8d8;
  border-right: 1px solid #d8d8d8;
  padding-left: 10px;
}
.toptab span.tabRight {
  float: right;
}
.tabRight{
    margin-right: 5px;
}
.topbooks {
  height: 335px;
}
.recombook,
.recomclass,
.topbook,
.index_top,
.topbooks {

  border-top: none;
  background: #fff;
}
.hidden {
  display: none;
}
.card{
    margin: 10px 0px;
    border-bottom: 1px solid #d8d8d8;
    margin-top: 0px;
}
</style>
<template>
  <div class="card">
    <van-row>
      <van-col span="24">
        <div class="toptab" id="top_all_1">
          <span>{{nvtype}}排行</span>
          <span class="tabRight">
            <span v-bind:class="{ cur: iszhoushow }" @click="selectdata('zhou')">周</span>
            <span v-bind:class="{ cur:  isyueshow }" @click="selectdata('yue')">月</span>
            <span v-bind:class="{ cur:  iszhongshow }" @click="selectdata('zhong')">总</span>
          </span>
        </div>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <div id="tabData_1">
          <div class="topbooks" v-bind:class="{ hidden: !iszhoushow }">
            <ul>
              <li v-for="(item,index) in obj" :key="index">
                <span class="hits">{{item.z_hit}}</span>
                <span class="num">{{item.z_num}}</span>
                <span class="zilei">{{item.z_type}}</span>
                <a @click="todetail(item.z_href)" target="_blank">{{item.z_title}}</a>
              </li>
            </ul>
          </div>
          <div class="topbooks" v-bind:class="{ hidden:  !isyueshow }">
            <ul>
               <li v-for="(item,index) in obj" :key="index">
                <span class="hits">{{item.y_hit}}</span>
                <span class="num">{{item.y_num}}</span>
                <span class="zilei">{{item.y_type}}</span>
                <a @click="todetail(item.y_href)" target="_blank">{{item.y_title}}</a>
              </li>
            </ul>
          </div>
          <div class="topbooks" v-bind:class="{ hidden:  !iszhongshow }">
            <ul>
              <li v-for="(item,index) in obj" :key="index">
                <span class="hits">{{item.t_hit}}</span>
                <span class="num">{{item.t_num}}</span>
                <span class="zilei">{{item.t_type}}</span>
                <a @click="todetail(item.t_href)" target="_blank">{{item.t_title}}</a>
              </li>
            </ul>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  name: "rankcard",
  props: {
    obj: {
      required: true
    },
    nvtype:''
  },
  data() {
    return {
      iszhoushow: true,
      isyueshow: false,
      iszhongshow: false
    };
  },
  mounted() {
    console.log(this.obj);
  },
  methods: {
    selectdata(value) {
      if (value == "zhou") {
        this.clearfag(value);
      } else if (value == "yue") {
        this.clearfag(value);
      } else if (value == "zhong") {
        this.clearfag(value);
      }
    },
    clearfag(value) {
      (this.iszhoushow = false),
        (this.isyueshow = false),
        (this.iszhongshow = false);
      if (value == "zhou") {
        this.iszhoushow = true;
      } else if (value == "yue") {
        this.isyueshow = true;
      } else if (value == "zhong") {
        this.iszhongshow = true;
      }
    },
    todetail: function(value) {
      this.$router.push({
        path: "/detail",
        query: {
          url: value,
          textsize: 0
        }
      });
    }
  }
};
</script>
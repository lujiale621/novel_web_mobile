<style  scoped>
</style>
<template>
  <div class="layout">
    <layout>
      <Content>
        <navdetail :data="bookdetail" :textsize="textsize" :parenturl="url" :links="artlinks"></navdetail>
      </Content>
    </layout>
  </div>
</template>
<script>

import navdetail from "@/components/nav-detail"
export default {
  name: "detail",
  data() {
    return {
      url: "",
      bookdetail: "",
      artlinks: "",
      textsize:''
    };
  },
  created() {
    this.url = this.$route.query.url;
    this.textsize = this.$route.query.textsize;
  },
  mounted() {
    this.load();
  },
    destroyed(){
    this.$Spin.hide();
    },
  methods: {
    load() {
      this.$Spin.show();
      var value = "api/e1bookdetail";
      var self = this;
      this.axios
        .get(value, {
          params: {
            xsdetail: this.url
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
              console.log("再次加载")
              self.load();
            }
          }
        });
    }
  },
  components: {  navdetail }
};
</script>
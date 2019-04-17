<!--
 * @Description: drag
 * @Author: zy
 * @LastEditors: zy
 * @Date: 2019-04-02 17:50:38
 * @LastEditTime: 2019-04-16 17:21:18
 -->
<template>
  <div id="hello">
    <div id="box-dragger"></div>
    <div id="box-dragger2">哈哈</div>
    <div id="img-box">
      <img src="../assets/logo.png" alt="">
    </div>
    <div id="test"></div>
  </div>
</template>
<script>
import Drag from '../../static/dragger.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    /* eslint-disable no-new */
    new Drag({
      id: 'box-dragger',
      showAngle: true,
      isScale: false
    })
    new Drag({
      id: 'box-dragger2',
      canZoom: false,
      canRotate: false
    })
    new Drag({
      id: 'img-box',
      showAngle: true,
      showPosition: true
    })
    new Drag({
      id: 'test'
    })
  },
  methods: {
    // createDragger (id) {
    //   new Drag({
    //     id: id,
    //     parentNode: 'hello'
    //   })
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#box-dragger {
  width: 200px;
  height: 100px;
  position: absolute;
  left: 500px;
  top: 200px;
  border: 1px solid #f00;
}
#box-dragger2 {
  width: 200px;
  height: 100px;
  position: absolute;
  left: 700px;
  top: 100px;
}
#img-box {
  position: absolute;
  top: 400px;
  left: 400px;
  width: 200px;
  height: 200px;
}
#test {
  position: absolute;
  top: 700px;
  left: 400px;
  width: 200px;
  height: 200px;
  border: 1px solid #00f;
  box-sizing: border-box;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  position: relative;
}
</style>

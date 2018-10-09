<template>
<div>
  <el-container>
    <el-main>
      <el-collapse accordion>
        <!-- v-for(val,key,index) val是内容，key是键值名，index是索引 -->
        <el-collapse-item v-for="(item,key,index) in data" :key="index"  :title="item.name">
          <el-form>
            <el-form-item label="工艺路线1"></el-form-item>
              <el-steps :space="100" :active="item.finished.length" :align-center="true" finish-status="success">
                <!-- 使用插槽嵌套循环 -->
                <slot :item="item">
                  <el-step v-for="(finished,f,index) in item.finished" :key="index"  :title="finished.routel"></el-step>
                  <el-step v-for="(bulid,b,index) in item.bulid" :key="index" :title="bulid.routel"></el-step>
                  <el-step  v-for="(unfinished,u,index) in item.unfinished" :key="index" :title="unfinished.routel"></el-step>
                </slot>
              </el-steps>
          </el-form>
          </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</div>
</template>

<script>
export default {
  name: 'ProjectSch',
  props: {
    proschdata:Array
  },
  data () {
    return {
      data:[]
    }
  },
   // 监听数据的变化
  watch: {
    proschdata : {
      immediate: true,   //如果不加这个属性，父组件第一次传进来的值监听不到
      handler(val) {
        this.data = []
        this.data = val
        // console.log(this.data)
      }  
    }
  }
}
</script>

<style>
.btn {
  margin-top: 20px;
}
</style>
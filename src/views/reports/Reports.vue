<template>
  <div id="reports">
    <el-card>
      <Radar></Radar>
    </el-card>
    <el-card>
      <Pie></Pie>
    </el-card>
    <el-card>
      <Bar></Bar>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
<style lang="less" scoped>
#reports {
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>

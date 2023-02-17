<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <img src="../assets/img/logo.png" />
      <h2>Vue2后台管理系统</h2>
      <el-button  @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu background-color="#f1f2f6" active-text-color="#3c40c6" unique-opened>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>角色列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2-2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3-2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>分类参数</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3-3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品分类</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单列表</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>数据报表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 内容区 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear('token')
      this.$router.push('/')
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: center;
  background-color: #686de0;
  color: #fff;
  text-align: center;
  line-height: 60px;

  img {
    width: 60px;
  }

  .el-button {
    height: 40px;
    align-self: center;
    position: absolute;
    right: 1%;
  }
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
}

.el-main {
  background-image: url(https://flatuicolors.com/static/img/stars-opacity.0979c1.svg);
  background-color: #3c40c6;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
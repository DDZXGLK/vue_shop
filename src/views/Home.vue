<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <img src="../assets/img/logo.png" />
      <h2>Vue2后台管理系统</h2>
      <el-button @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="menuWidth">
        <div class="flexible" @click="flexed()">
          <i :class="iconClassName"></i>
        </div>
        <el-menu
          background-color="#f1f2f6"
          active-text-color="#3c40c6"
          :default-active="defaultActive"
          unique-opened
          router
          :collapse="collapse"
          :collapse-transition="false"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="'/' + menu.path"
            v-for="menu in menuList"
            :key="menu.id"
          >
            <template slot="title">
              <i :class="iconObj[menu.id]"></i>
              <span>{{ menu.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + menuItem.path"
              v-for="menuItem in menu.children"
              :key="menuItem.id"
              @click="saveNavState(menuItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ menuItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 内容区 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      // 菜单列表
      menuList: '',
      // 菜单图标
      iconObj: {
        125: 'el-icon-user',
        103: 'el-icon-setting',
        101: 'el-icon-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-platform',
      },
      // 菜单伸缩图标
      iconFlag: false,
      iconClassName: 'el-icon-s-fold',
      // 菜单是否折叠属性
      collapse: false,
      // 菜单长度
      menuWidth: '200px',
      // 默认激活的菜单
      defaultActive: '',
    }
  },
  methods: {
    // 退出登录
    loginOut() {
      window.sessionStorage.clear('token')
      this.$router.push('/')
    },
    // 获取菜单列表
    async getMenu() {
      const { data } = await this.$request.get('/menus')
      if (data.meta.status !== 200) return this.$message.error(data.meta.msg)
      this.menuList = data.data
    },
    // 菜单栏伸缩
    flexed() {
      this.iconFlag = !this.iconFlag
      if (this.iconFlag) {
        this.iconClassName = 'el-icon-s-unfold'
        this.collapse = true
        this.menuWidth = '64px'
      } else {
        this.iconClassName = 'el-icon-s-fold'
        this.collapse = false
        this.menuWidth = '200px'
      }
    },
    // 保存二级菜单的点击状态
    saveNavState(path) {
      window.sessionStorage.setItem('navPath', '/' + path)
      this.defaultActive = '/' + path
    },
  },
  created() {
    this.getMenu()
    this.defaultActive = window.sessionStorage.getItem('navPath')
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

  .flexible {
    height: 30px;
    display: flex;
    justify-content: center;
    font-size: 25px;
    cursor: pointer;
  }

  i {
    line-height: 30px;
  }
}

.el-main {
  background-image: url(https://flatuicolors.com/static/img/stars-opacity.0979c1.svg);
  background-color: #3c40c6;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
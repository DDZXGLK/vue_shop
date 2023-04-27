<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="query">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button type="primary" @click="add()">添加用户</el-button>
        </el-col>
      </el-row>
      <el-row class="tableArea">
        <el-table :data="tableData" border stripe size="small">
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="username"
            label="姓名"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="email"
            label="邮箱"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="mobile"
            label="电话"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="role_name"
            label="角色"
          ></el-table-column>
          <el-table-column align="center" prop="mg_state" label="状态">
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.mg_state"
                @change="updateState(scope.row.id, scope.row.mg_state)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template v-slot="scope">
              <el-tooltip
                class="item"
                effect="light"
                content="修改用户信息"
                placement="top"
                :enterable="false"
                ><el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="handleEditInfo(scope.row)"
                ></el-button
              ></el-tooltip>
              <el-tooltip
                class="item"
                effect="light"
                content="删除用户信息"
                placement="top"
                :enterable="false"
                ><el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="handleDeleteInfo(scope.row.id)"
                ></el-button
              ></el-tooltip>
              <el-tooltip
                class="item"
                effect="light"
                content="设置用户权限"
                placement="top"
                :enterable="false"
                ><el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                  @click="handleSetPower(scope.row)"
                ></el-button
              ></el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[1, 2, 5, 10, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalpage"
        >
        </el-pagination>
      </el-row>
    </el-card>

    <!--新增用户信息弹框-->
    <el-dialog
      title="新增用户信息"
      :visible.sync="dialogAdd"
      width="50%"
      :close-on-click-modal="false"
      @close="clearRules('addDialog')"
    >
      <el-form :model="addInfo" :rules="addRule" ref="addDialog">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="addInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="addInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px" prop="email">
          <el-input v-model="addInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="100px" prop="mobile">
          <el-input v-model="addInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit('addDialog')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!--编辑用户信息弹框-->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="dialogEdit"
      width="50%"
      :close-on-click-modal="false"
      @close="clearRules('editDialog')"
    >
      <el-form :model="editInfo" :rules="editRule" ref="editDialog">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="editInfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px" prop="email">
          <el-input v-model="editInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="100px" prop="mobile">
          <el-input v-model="editInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit('editDialog')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'users',
  data() {
    var passwordPass = (rule, value, callback) => {
      const passwordRegExp = /^[a-zA-Z0-9_-]{6,16}$/
      if (!passwordRegExp.test(value)) {
        return callback(new Error('密码是以数字、字母、下划线组成6~16位！'))
      } else {
        callback()
      }
    }
    var emailPass = (rule, value, callback) => {
      const emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!emailRegExp.test(value)) {
        return callback(new Error('请输入正确的邮箱!'))
      } else {
        callback()
      }
    }
    var mobilePass = (rule, value, callback) => {
      const emailRegExp =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (!emailRegExp.test(value)) {
        return callback(new Error('请输入正确的电话!'))
      } else {
        callback()
      }
    }
    return {
      // 查询参数
      query: '',
      // 表格数据
      tableData: [],
      // 当前页码
      pagenum: 1,
      // 每页显示条数
      pagesize: 5,
      // 总记录数
      totalpage: 0,
      // 新增用户dialog
      dialogAdd: false,
      // 新增的用户信息
      addInfo: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      // 新增用户表单规则
      addRule: {
        username: [
          {
            required: true,
            type: 'string',
            min: 2,
            max: 15,
            message: '请输入2~15位的用户名!',
            trigger: 'blur',
          },
        ],
        password: [
          { validator: passwordPass, required: true, trigger: 'blur' },
        ],
        email: [{ validator: emailPass, required: true, trigger: 'blur' }],
        mobile: [{ validator: mobilePass, required: true, trigger: 'blur' }],
      },
      // 编辑用户dialog
      dialogEdit: false,
      // 编辑的用户信息
      editInfo: {
        username: '',
        email: '',
        mobile: '',
      },
      // 编辑用户表单规则
      editRule: {
        email: [{ validator: emailPass, required: true, trigger: 'blur' }],
        mobile: [{ validator: mobilePass, required: true, trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 获取用户列表
    async getUsers() {
      const { data } = await this.$request.get('/users', {
        params: { pagenum: this.pagenum, pagesize: this.pagesize },
      })
      if (data.meta.status !== 200) {
        this.$message.error('获取用户列表失败!')
      }
      this.tableData = data.data.users
      this.pagenum = data.data.pagenum
      this.totalpage = data.data.total
    },
    // 表格行自定义颜色
    /* tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return 'success-row'
      }
      return ''
    }, */
    // 选择每页多少条
    handleSizeChange(val) {
      this.pagesize = val
      this.getUsers()
    },
    // 选择当前页
    handleCurrentChange(val) {
      this.pagenum = val
      this.getUsers()
    },
    // 修改用户状态
    async updateState(id, state) {
      const { data } = await this.$request.put(
        'users/' + id + '/state/' + state
      )
      if (data.meta.status !== 200) {
        return this.$message.error(data.meta.msg)
      }
      this.$message.success(data.meta.msg)
    },
    // 清除表单验证规则
    clearRules(formName) {
      this.$refs[formName].resetFields()
    },
    // 查询用户信息
    async search() {
      const { data } = await this.$request.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      })
      if (data.meta.status !== 200) {
        return this.$message.error(data.meta.msg)
      }
      this.$message.success(data.meta.msg)
      this.tableData = data.data.users
      this.pagenum = data.data.pagenum
      this.totalpage = data.data.total
    },
    // 新增弹框
    add() {
      this.dialogAdd = true
    },
    // 确定新增用户信息
    addSubmit(formName) {
      this.$refs[formName].validate(async (result) => {
        if (result) {
          this.dialogAdd = false
          const { data } = await this.$request.post('users', this.addInfo)
          if (data.meta.status !== 201) {
            this.$message.error(data.meta.msg)
          } else {
            this.$message.success(data.meta.msg)
            this.getUsers()
          }
        }
      })
    },
    // 编辑用户信息
    handleEditInfo(row) {
      this.dialogEdit = true
      this.editInfo.id = row.id
      this.editInfo.username = row.username
      this.editInfo.email = row.email
      this.editInfo.mobile = row.mobile
    },
    // 编剧用户信息确定
    editSubmit(formName) {
      this.$refs[formName].validate(async (result) => {
        if (result) {
          this.dialogEdit = false
          const { data } = await this.$request.put(
            'users/' + this.editInfo.id,
            this.editInfo
          )
          if (data.meta.status === 200) {
            this.$message.success(data.meta.msg)
            this.getUsers()
          } else {
            this.$message.error(data.meta.msg)
          }
        }
      })
    },
    // 删除用户信息

    async handleDeleteInfo(id) {
      const result = await this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).catch((err) => {
        this.$message.info('已取消删除!')
        return err
      })
      if (result === 'confirm') {
        const { data } = await this.$request.delete('users/' + id)
        if (data.meta.status !== 200) {
          this.$message.error(data.meta.msg)
        } else {
          this.$message.success(data.meta.msg)
          this.getUsers()
        }
      }
    },
    // 设置用户权限
    handleSetPower(row) {}
  },
  created() {
    this.getUsers()
  },
}
</script>

<style lang="less" scoped>
// 面包屑字体颜色
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
  font-size: 12px;
  color: #fff;
}

::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner{
  color: #fff;
}
::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
  color: #409EFF;
}

.el-card {
  margin-top: 20px;

  .tableArea {
    margin: 20px 0;
  }

  .el-table {
    font-weight: normal;
  }

  .el-pagination {
    text-align: left;
  }
}

.el-dialog {
  .el-input {
    font-size: 14px;
    width: 80%;
  }
}
</style>

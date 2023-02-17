<template>
  <div>
    <!-- 登录 -->
    <div class="container">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="60px">
        <h4>Sign In</h4>
        <el-form-item label="账号:" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="loginIn('formRef')">登录</el-button>
          <el-button type="info" @click="reset('formRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 背景 -->
    <div class="slidershow">
      <div
        class="slidershow--image"
        style="
          background-image: url('https://img0.baidu.com/it/u=3141696369,2557244159&fm=253&fmt=auto&app=120&f=JPEG?w=1608&h=800');
        "
      ></div>
      <div
        class="slidershow--image"
        style="
          background-image: url('https://img0.baidu.com/it/u=3849014316,4121670749&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=800');
        "
      ></div>
      <div
        class="slidershow--image"
        style="
          background-image: url('https://img2.baidu.com/it/u=3252933697,2767366344&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=500');
        "
      ></div>
      <div
        class="slidershow--image"
        style="
          background-image: url('https://img2.baidu.com/it/u=3702474135,4076875638&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500');
        "
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    var checkPassword = (rule, value, callback) => {
      const passwordRegExp = /^[a-zA-Z0-9_-]{6,16}$/
      if (!passwordRegExp.test(value)) {
        return callback(new Error('密码是以数字、字母、下划线组成6~16位！'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: 'admin',
        password: '123456',
      },
      rules: {
        username: [
          {
            required: true,
            type: 'string',
            min: 3,
            max: 15,
            message: '请输入3~15位的用户名！',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            validator: checkPassword,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    // 重置表单
    reset(formName) {
      this.$refs[formName].resetFields()
    },
    // 登录
    async loginIn(formName) {
      var valid = await this.$refs[formName].validate()
      if (!valid) return
      const { data } = await this.$request.post('login', this.form)
      if (data.meta.status == 200) {
        this.$message({
          message: data.meta.msg,
          type: 'success',
        })
        // 登陆成功保存token信息
        window.sessionStorage.setItem('token', data.data.token)
        // 跳转首页
        this.$router.push('/home')
      } else {
        this.$message({
          message: data.meta.msg,
          type: 'warning',
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
body {
  align-items: center;
  background-color: var(--white);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
  position: relative;
}

.container {
  width: 400px;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 10px 20px 10px 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
}

h4 {
  height: 40px;
  font-size: 20px;
  text-align: center;
}

/deep/.el-form-item__label {
  color: #fff;
}

.btn {
  display: flex;
  justify-content: right;
}

@-webkit-keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 4;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 8;
  }
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 4;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 8;
  }
}

.slidershow {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.slidershow--image {
  position: absolute;
  width: 100%;
  height: 100%;
  background: no-repeat 50% 50%;
  background-size: cover;
  -webkit-animation-name: kenburns;
  animation-name: kenburns;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-duration: 16s;
  animation-duration: 16s;
  opacity: 1;
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}

.slidershow--image:nth-child(1) {
  -webkit-animation-name: kenburns-1;
  animation-name: kenburns-1;
  z-index: 3;
}

.slidershow--image:nth-child(2) {
  -webkit-animation-name: kenburns-2;
  animation-name: kenburns-2;
  z-index: 2;
}

.slidershow--image:nth-child(3) {
  -webkit-animation-name: kenburns-3;
  animation-name: kenburns-3;
  z-index: 1;
}

.slidershow--image:nth-child(4) {
  -webkit-animation-name: kenburns-4;
  animation-name: kenburns-4;
  z-index: 0;
}

@-webkit-keyframes kenburns-1 {
  0% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  1.5625% {
    opacity: 1;
  }
  23.4375% {
    opacity: 1;
  }
  26.5625% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  98.4375% {
    opacity: 0;
    -webkit-transform: scale(1.21176);
    transform: scale(1.21176);
  }
  100% {
    opacity: 1;
  }
}

@keyframes kenburns-1 {
  0% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  1.5625% {
    opacity: 1;
  }
  23.4375% {
    opacity: 1;
  }
  26.5625% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  98.4375% {
    opacity: 0;
    -webkit-transform: scale(1.21176);
    transform: scale(1.21176);
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes kenburns-2 {
  23.4375% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  26.5625% {
    opacity: 1;
  }
  48.4375% {
    opacity: 1;
  }
  51.5625% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
}

@keyframes kenburns-2 {
  23.4375% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  26.5625% {
    opacity: 1;
  }
  48.4375% {
    opacity: 1;
  }
  51.5625% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
}

@-webkit-keyframes kenburns-3 {
  48.4375% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  51.5625% {
    opacity: 1;
  }
  73.4375% {
    opacity: 1;
  }
  76.5625% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
}

@keyframes kenburns-3 {
  48.4375% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  51.5625% {
    opacity: 1;
  }
  73.4375% {
    opacity: 1;
  }
  76.5625% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
}

@-webkit-keyframes kenburns-4 {
  73.4375% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  76.5625% {
    opacity: 1;
  }
  98.4375% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes kenburns-4 {
  73.4375% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  76.5625% {
    opacity: 1;
  }
  98.4375% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
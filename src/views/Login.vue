<template>
  <div class="main">
    <h1 style="text-align:center">纵横框架Pro</h1>
    <a-form class="user-layout-login"
            :form="form"
            @submit="handleSubmit">

      <div class="login-mode">
        <div>
          <span :class="options.loginMode=='ACC'?'active':''"
                @click="changeLoginMode('ACC')">账号密码</span>
          <span :class="options.loginMode=='SMS'?'active':''"
                @click="changeLoginMode('SMS')">短信</span>
        </div>
      </div>
      <a-alert v-if="isLoginError"
               type="error"
               showIcon
               style="margin-bottom: 24px;"
               message="账户或密码错误" />

      <!-- 用户名密码登录 -->
      <div v-if="options.loginMode=='ACC'">
        <a-form-item>
          <a-input size="large"
                   type="text"
                   placeholder="用户名"
                   v-decorator="['account', {
                     rules: [{
                       required: true, message: '请输入账号'
                     },{
                       validator: handleUsernameOrEmail
                     }],
                     validateTrigger: 'change'
                   }]">
            <a-icon slot="prefix"
                    type="user"
                    :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password size="large"
                            placeholder="密码"
                            v-decorator="['password', {
                              rules: [{
                                required: true, message: '请输入密码'
                              }],
                              validateTrigger: 'blur'
                            }]">
            <a-icon slot="prefix"
                    type="lock"
                    :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input-password>
        </a-form-item>
        <a-form-item v-if="$store.getAppConfig('_loginCaptcha')">
          <a-input size="large"
                   autocomplete="off"
                   class="x-captcha-image"
                   placeholder="验证码"
                   v-decorator="['validateCode', {
                     rules: [{
                       required: true, message: '请输入验证码'
                     }],
                     validateTrigger: 'blur'
                   }]">
            <a-icon slot="prefix"
                    type="codepen"
                    :style="{ color: 'rgba(0,0,0,.25)' }" />
            <CaptchaImage slot="addonAfter" />
          </a-input>
        </a-form-item>
      </div>

      <!-- 短信验证码登录 -->
      <div v-if="options.loginMode=='SMS'">
        <a-form-item>
          <a-input size="large"
                   type="text"
                   placeholder="手机号"
                   v-decorator="['phoneNumber', {
                     rules: [{
                       required: true, message: '请输入手机号'
                     }],
                     validateTrigger: 'change'
                   }]">
            <a-icon slot="prefix"
                    type="phone"
                    :style="{ color: 'rgba(0,0,0,.25)' }" />
            <span slot="addonAfter"
                  @click="getSmsCode"
                  style="cursor: pointer"
                  v-if="options.sendSmsCode">
              获取验证码
            </span>
            <div class="btn-sms-code btn-sms-code-disabled"
                 slot="addonAfter"
                 v-else>
              {{ options.time }}s后获取
            </div>
          </a-input>
        </a-form-item>
        <a-form-item v-if="$store.getAppConfig('_loginCaptcha')">
          <a-input size="large"
                   autocomplete="off"
                   class="x-captcha-image"
                   placeholder="验证码"
                   v-decorator="['validateCode', {
                     rules: [{
                       required: true, message: '请输入验证码'
                     }],
                     validateTrigger: 'blur'
                   }]">
            <a-icon slot="prefix"
                    type="codepen"
                    :style="{ color: 'rgba(0,0,0,.25)' }" />
            <CaptchaImage slot="addonAfter" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input size="large"
                   autocomplete="off"
                   placeholder="短信验证码"
                   v-decorator="['smsCode', {
                     rules: [{
                       required: true, message: '请输入短信验证码'
                     }],
                     validateTrigger: 'blur'
                   }]">
            <a-icon slot="prefix"
                    type="code"
                    :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>
      </div>

      <a-form-item style="margin-top:24px">
        <a-button size="large"
                  type="primary"
                  htmlType="submit"
                  class="login-button"
                  :loading="state.loginBtn"
                  :disabled="state.loginBtn">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
// import { getURLParam } from 'commons/src/utils'
import { login, getSmsCode, loginBySmsCode } from 'zongheng-pro/api/auth'
import storage from '@zenith/vue-commons/utils/storage'

import CaptchaImage from 'zongheng-pro/components/CaptchaImage.vue'

export default {
  components: { CaptchaImage },
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      captchaImage: '',
      form: this.$form.createForm(this),
      options: {
        loginMode: 'ACC',
        sendSmsCode: true,
        time: 0,
        countDownSeconds: 60
      },
      state: {
        time: 60,
        loginBtn: false,
        smsSendBtn: false
      }
    }
  },
  created () {
    storage.removeToken()
  },
  mounted () {
    if (process.env.NODE_ENV == 'development') {
      this.form.setFieldsValue({
        account: 'admin',
        password: 'Aa123456'
      })
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.state.loginBtn = true
      this.form.validateFields((err, values) => {
        if (err) {
          this.state.loginBtn = false
          return
        }
        if (this.options.loginMode == 'ACC') {
          login(values).then((response) => {
            this.loginSuccess(response)
          }).catch((e) => {
            this.state.loginBtn = false
          })
        } else if (this.options.loginMode == 'SMS') {
          loginBySmsCode(values).then((response) => {
            this.loginSuccess(response)
          }).catch((e) => {
            this.state.loginBtn = false
          })
        }
      })
    },
    loginSuccess (response) {
      // 缓存 token
      storage.setToken(response.token, response.validTime)
      // 跳转到主页或重定向到指定页面
      this.$router.push({
        path: decodeURIComponent('/')
      })
    },
    handleUsernameOrEmail (rule, value, callback) {
      callback()
    },
    changeLoginMode (mode) {
      this.options.loginMode = mode
    },
    getSmsCode () {
      /**
       * TODO 校验手机号及验证码
       */
      const value = this.form.getFieldsValue()
      getSmsCode(value.phoneNumber, value.validateCode).then(() => {
        this.options.sendSmsCode = false
        this.options.time = this.options.countDownSeconds
        this.countDown()
      })
    },
    countDown () {
      if (this.options.time == 0) {
        this.options.sendSmsCode = true
        return
      }
      this.options.time--
      setTimeout(() => {
        this.countDown()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  background-size: 100%;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  position: absolute;
}
.user-layout-login {
  width: 400px;
  margin: auto;
  margin-top: 80px;
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
.login-mode {
  text-align: center;
  margin-bottom: 20px;
  > div {
    display: inline-block;
    > * {
      display: inline-block;
      width: 120px;
      height: 48px;
      font-size: 16px;
      line-height: 3;
      cursor: pointer;
    }
    > .active {
      border-bottom: 2px solid red;
    }
  }
}
/deep/.x-captcha-image {
  .ant-input-group-addon:last-child {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    padding: 0px;
  }
}
</style>

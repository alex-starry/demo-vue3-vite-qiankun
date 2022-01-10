<template>
  <div :class="$style.page__ct">
    <div :class="$style.main__ct">
      <div :class="$style.tip__ct">{{ store.state.title }}欢迎您！</div>
      <el-form :class="$style.form__ct" ref="refForm" :model="form" :rules="formRules" label-width="0">
        <el-form-item prop="username">
          <el-input v-model="form.username" autocomplete="off" size="large" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" autocomplete="off" size="large" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" @click="login(refForm)" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import crypto from 'crypto-js'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import http from '../utils/http'
import { IUser } from '../types'

const router = useRouter()
const store = useStore()

const refForm = ref()

// 验证密码
const validatePass = (rule: any, value: any, callback: any) => {
  // if (!Number.isInteger(value)) {
  //   callback(new Error('Please input digits'))
  // } else {
  //   if (value < 18) {
  //     callback(new Error('Age must be greater than 18'))
  //   } else {
  //     callback()
  //   }
  // }
  callback()
}

const form = reactive({
  username: '',
  password: ''
})
const formRules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }, { validator: validatePass, trigger: 'change' }]
})


/**
 * 加密密码
 * @param {string} val 密码
 */
const encryptPassword = (val: string) => {
  const key = crypto.enc.Latin1.parse('jingyun202088888')
  const password = crypto.AES.encrypt(val, key, {
    iv: key,
    mode: crypto.mode.CBC,
    padding: crypto.pad.ZeroPadding,
  })
  return password.toString()
}

// 登录
const login = async (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) {
      return
    }
    const data = { ...form }
    data.password = encryptPassword(form.password)
    const res: any = await http({
      apiName: 'login',
      requestType: 'form',
      headers: {
        Authorization: 'Basic amluZ3lfYWRtaW46amluZ3lfYWRtaW4',
      },
      data
    })
    const user = JSON.parse(JSON.stringify(store.state.user)) as IUser
    user.id = res.user_info.id,
    user.username = res.user_info.username,
    user.nickname = res.user_info.nickName,
    user.avatar = res.user_info.avatar,
    user.phone = res.user_info.phone,
    user.tenantId = res.user_info.currentTenantId
    user.tenantName = res.user_info.currentTenantName
    user.tenantList = res.user_info.tenantList
    user.appCode = res.user_info.appList[0].code
    user.appName = res.user_info.appList[0].name
    user.appList = res.user_info.appList
    user.tokenType = res.token_type
    user.tokenValue = res.access_token
    user.tokenExpires = Date.now() + res.expires_in * 1000,
    user.tokenRefreshKey = res.refresh_token
    store.commit('SET_USER', user)
    router.push({ name: 'welcome' })
  })
}
</script>

<style module>
.page__ct {
  min-height: 100vh;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  padding-top: 100px;
}
.main__ct {
  width: 380px;
  margin: 0 auto;
}
.tip__ct {
  margin-bottom: 50px;
  /* color: #fff; */
  font-weight: 700;
  font-size: 24px;
  text-align: center;
}
.form__ct {
  background-color: #fff;
  padding: 40px 30px 18px;
  border-radius: 8px;
}
</style>
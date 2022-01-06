# 乾坤微服务
乾坤微服务部署说明

## 主应用（本项目）


## 子应用（rms、cms、formula、order、pay、record、shop、tcm）


### 子应用本地调试
一、进到主应用项目，找到config/config.dev.js文件，在qiankun -> master -> apps中注册子应用，然后启动主应用
例如：rms -> { name: 'qiankun-rms', entry: '//localhost:9001' }

二、进入子应用项目
1、package.json文件，修改如下相应配置
name: qiankun-rms
2、vue.config.js文件，在devServer中增加/修改如下相应配置
port: 9001（项目启动端口）
headers: { 'Access-Control-Allow-Origin': '*' }
3、public/index.html，修改资源路径
public js resources下所有资源去除相对路径（src的首位字符）

四、路由调整
src/router/index.js文件，去除所有路由权限重定向，并修改如下相应配置（base属性要根据主应用config/router.js文件中对应属性填入），
const router = new VueRouter({
  base: '/rms/',
  mode: 'history',
  routes
})

五、乾坤注册
1、找到src/main.js文件，将本目录下的main.js文件内容，按替换前和替换后规则替换（不要死板，有些独自配置自行加上）
2、找到vue.config.js，
在第一行增加如下配置
const { name: packageName } = require('./package')
在configureWebpack -> externals中增加/修改如下相应配置
output: {
  library: `${packageName}-[name]`,
  libraryTarget: 'umd',
  jsonpFunction: `webpackJsonp_${packageName}`
}

六、删除子应用中的顶部导航和左侧导航（仅保留功能区域）
将本目录下的default.vue文件内容，替换src/layout/default.vue（不要死板，有些独自配置自行加上）

七、子应用和主应用通讯
一、src/app.vue文件，修改如下本就配置
mounted () {
  if (window.__POWERED_BY_QIANKUN__) {
    this.actions.onGlobalStateChange((state, prev) => {
      // state: 变更后的状态; prev 变更前的状态
      // console.log('子应用RMS观察者:', state, prev)
      if (state.user) {
        this.$store.commit('SET_USER', state.user)
      } else {
        this.$store.dispatch('showToast', { type: 'error', message: '登录失效，已退出登录。' })
      }
    })
    this.actions.setGlobalState({ a: 'a2' })
  }
},

八、接口调用token获取
找到src/utils/http.js文件
在instance.interceptors.response中将token逻辑调整为如下配置
const { token: { token_type: tokenType, access_token: token }, currentTenantId: tenantId } = store.state.user
if (tokenType && token) {
  config.headers.Authorization = `${tokenType} ${token}`
  config.headers.tenantId = tenantId
}
在instance.interceptors.response中将未登录逻辑调整为如下配置
if (error.response && error.response.status && error.response.status === 401) {
  window.location.href = '/login'
  return Promise.reject(error)
}
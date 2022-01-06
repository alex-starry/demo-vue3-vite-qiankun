/*
 * @Descripttion:
 * @version:
 * @Author: 高涛
 * @Date: 2021-12-14 10:37:03
 * @LastEditors: 高涛
 * @LastEditTime: 2021-12-24 12:58:41
 */
import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin, fakeAccountLogout, fakeAccountTenant, fakeAccountResetPassword } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import actions from '@/shares/actions';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    // 登录
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      // console.log('response', response)
      if (response.ret !== 0) {
        message.error('登录失败，请重试');
        return;
      }
      yield put({
        type: 'changeStatus',
        payload: response,
      });
      const token = { ...response.result };
      delete token.user_info;
      const user = { ...response.result.user_info };
      user.token = token;
      if (Array.isArray(user.appList) && user.appList.length > 0) {
        const currentApp = user.appList[0];
        user.currentAppId = currentApp.id;
        user.currentAppName = currentApp.name;
      } else {
        user.currentAppId = '';
        user.currentAppName = '';
      }
      actions.setGlobalState({ user });
      localStorage.setItem('user', JSON.stringify(user));
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      message.success('🎉 🎉 🎉  登录成功！');
      let { redirect } = params;
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);

          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = '/';
          return;
        }
      }
      history.replace(redirect || '/');
    },
    // 登出
    *logout({ user }, { call }) {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      yield call(fakeAccountLogout, user);
      if (window.location.pathname !== '/user/login' && !redirect) {
        // history.replace({
        //   pathname: '/user/login',
        //   search: stringify({
        //     redirect: window.location.href,
        //   }),
        // });
        window.location.href = '/user/login';
      }
    },
    // 切换租户
    *tenant({ user }, { call }) {
      const response = yield call(fakeAccountTenant, user);
      console.log('response', response);
      window.location.reload();
    },
    // 修改密码
    *resetPassword({ user, params }, { call }) {
      const response = yield call(fakeAccountResetPassword, user, params);
      return response;
    },
  },
  reducers: {
    changeStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;

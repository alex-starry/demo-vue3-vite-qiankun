import { IService } from '../../../types'

const gateway: IService = {
  domain: `${import.meta.env.VITE_GATEWAY}`,
  // 登录
  login: {
    method: 'post',
    url: '/auth/oauth/token?grant_type=password'
  },
  // 用户菜单树
  treeUserMenu: {
    url: '/admin/manage/app/user/menu'
  }
}

export default gateway
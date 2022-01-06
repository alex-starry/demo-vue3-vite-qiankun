import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function queryMenuTree(user) {
  return request(`${env.gateway}/admin/manage/app/user/menu`, {
    method: 'get',
    headers: {
      Authorization: `${user.token.token_type} ${user.token.access_token}`,
      tenantId: user.currentTenantId,
    },
    params: {
      appCode: user.currentAppId,
    },
  });
}

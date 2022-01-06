import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request(`${env.gateway}/auth/oauth/token?grant_type=password`, {
    method: 'POST',
    requestType: 'form',
    headers: {
      Authorization: 'Basic amluZ3lfYWRtaW46amluZ3lfYWRtaW4',
    },
    data: params,
  });
}

export async function fakeAccountLogout(user) {
  return request(`${env.gateway}/auth/token/logout`, {
    method: 'DELETE',
    requestType: 'form',
    headers: {
      Authorization: `${user.token.token_type} ${user.token.access_token}`,
    },
  });
}

export async function fakeAccountResetPassword(user, params) {
  return request(`${env.gateway}/admin/manage/tenant/user/password`, {
    method: 'PUT',
    requestType: 'json',
    headers: {
      Authorization: `${user.token.token_type} ${user.token.access_token}`,
    },
    data: params,
  });
}

export async function fakeAccountTenant(user) {
  return request(`${env.gateway}/auth/oauth/token`, {
    method: 'POST',
    requestType: 'form',
    headers: {
      Authorization: `${user.token.token_type} ${user.token.access_token}`,
      tenantId: user.currentTenantId,
    },
    data: {
      grant_type: 'refresh_token',
      refresh_token: user.token.refresh_token,
    },
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

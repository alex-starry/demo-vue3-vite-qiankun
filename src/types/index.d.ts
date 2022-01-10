import { AxiosRequestConfig } from 'axios'

// 服务（后端）
export interface IService {
  domain: string,
  [key: string]: any
}

// 租户
export interface ITenant {
  id: string
  code: string
  name: string
  industryCode?: string
  industryName?: string
  tenantLogo?: string
  tenantStatus?: 0 | 1 |2
  tenantType?: string
}

// 应用（前端）
export interface IApp {
  id: string
  code: string
  name: string
  icon?: string
  version?: string
}

// 用户
export interface IUser {
  id: string,
  username: string,
  nickname: string,
  avatar: string,
  phone: string,
  tenantId: string,
  tenantName: string,
  tenantList: ITenant[],
  appCode: string,
  appName: string,
  appList: IApp[],
  tokenType: string,
  tokenValue: string,
  tokenExpires: number,
  tokenRefreshKey: string
}

export interface IHttpRequestConfig extends AxiosRequestConfig {
  apiName: string;
  query?: any;
  requestType?: 'form';
}


export interface IHttpResponse {
  ret: number,
  result: any,
  msg: string
}
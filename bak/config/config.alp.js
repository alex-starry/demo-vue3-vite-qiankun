/*
 * @Descripttion:
 * @version:
 * @Author: 高涛
 * @Date: 2021-10-27 10:18:02
 * @LastEditors: 高涛
 * @LastEditTime: 2021-11-04 18:13:34
 */
const domain = '.zaosl.com';
const gateway = `//gateway${domain}`;

export default {
  define: {
    config: {
      domain,
      gateway,
    },
  },
  define: {
    'env.gateway': 'https://gateway.qysofti.com',
  },
  // mfsu: { production: { output: '.mfsu-production' } },
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        // name（唯一 id）、entry（html entry）
        {
          name: 'saas-rms',
          entry: '//app_dev.zaosl.com:9001',
        },
        {
          name: 'saas-cms',
          entry: '//app_dev.zaosl.com:9002',
        },
        // {
        //   name: 'saas-formula',
        //   entry: '//saas-formula.zaosl.com',
        // },
        // {
        //   name: 'saas-order',
        //   entry: '//saas-order.zaosl.com',
        // },
        // {
        //   name: 'saas-pay',
        //   entry: '//saas-pay.zaosl.com',
        // },
        // {
        //   name: 'saas-record',
        //   entry: '//saas-record.zaosl.com',
        // },
        // {
        //   name: 'saas-shop',
        //   entry: '//saas-shop.zaosl.com',
        // },
        // {
        //   name: 'saas-tcm',
        //   entry: '//saas-tcm.zaosl.com',
        // },
        // {
        //   name: 'saas-rms2',
        //   entry: '//saas-rms2.zaosl.com',
        // },
        {
          name: 'saas-cms2',
          entry: '//app_dev.zaosl.com:10002',
        },
        {
          name: 'saas-shop2',
          entry: '//app_dev.zaosl.com:10003',
        },
      ],
    },
  },
};

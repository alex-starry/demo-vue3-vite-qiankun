const domain = '.zaosl.com';
const gateway = `//ssgateway${domain}`;

export default {
  define: {
    config: {
      domain,
      gateway,
    },
  },
  define: {
    'env.gateway': 'https://ssgateway.zaosl.com',
  },
  // mfsu: { production: { output: '.mfsu-production' } },
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        // name（唯一 id）、entry（html entry）
        {
          name: 'saas-rms',
          entry: '//rms.sswz.net',
        },
        // {
        //   name: 'saas-cms',
        //   entry: '//saas-cms.zaosl.com',
        // },
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
          entry: '//cms.sswz.net',
        },
      ],
    },
  },
};

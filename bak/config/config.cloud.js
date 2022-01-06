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
          entry: '//rms.qysofti.com:9001',
        },
        {
          name: 'saas-cms',
          entry: '//cms.qysofti.com:9002',
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
          entry: '//cms2.qysofti.com:10002',
        },
      ],
    },
  },
};

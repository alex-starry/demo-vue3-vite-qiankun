// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  define: {
    'env.gateway': '/mockGateway',
  },
  // mfsu: {},
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        // name（唯一 id）、entry（html entry）
        {
          name: 'saas-rms',
          entry: '//localhost:9001',
        },
        // {
        //   name: 'saas-cms',
        //   entry: '//localhost:9002',
        // },
        // {
        //   name: 'saas-formula',
        //   entry: '//localhost:9003',
        // },
        // {
        //   name: 'saas-order',
        //   entry: '//localhost:9004',
        // },
        // {
        //   name: 'saas-pay',
        //   entry: '//localhost:9005',
        // },
        // {
        //   name: 'saas-record',
        //   entry: '//localhost:9006',
        // },
        // {
        //   name: 'saas-shop',
        //   entry: '//localhost:9007',
        // },
        // {
        //   name: 'saas-tcm',
        //   entry: '//localhost:9008',
        // },
        // {
        //   name: 'saas-rms2',
        //   entry: '//localhost:10001',
        // },
        // {
        //   name: 'saas-cms2',
        //   entry: '//localhost:10002',
        // },
        // {
        //   name: 'saas-demo',
        //   entry: '//localhost:9999',
        // },
      ],
    },
  },
});

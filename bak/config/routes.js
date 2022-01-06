export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/rms',
                microApp: 'saas-rms',
                // microAppProps: {
                //   autoSetLoading: true,
                //   className: 'myContainer',
                //   wrapperClassName: 'myWrapper',
                // }
              },
              {
                path: '/cms',
                microApp: 'saas-cms',
              },
              {
                path: '/formula',
                microApp: 'saas-formula',
              },
              {
                path: '/order',
                microApp: 'saas-order',
              },
              {
                path: '/pay',
                microApp: 'saas-pay',
              },
              {
                path: '/record',
                microApp: 'saas-record',
              },
              {
                path: '/shop',
                microApp: 'saas-shop',
              },
              {
                path: '/tcm',
                microApp: 'saas-tcm',
              },
              {
                path: '/rms2',
                microApp: 'saas-rms2',
              },
              {
                path: '/cms2',
                microApp: 'saas-cms2',
              },
              {
                path: '/demo',
                microApp: 'saas-demo',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './TableList',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];

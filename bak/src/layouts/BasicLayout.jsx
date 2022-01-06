/**
 *  v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useIntl, connect, history } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button, message } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/chamalogo.png';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

/** Use Authorized check all menu item */
// const menuDataRender = (menuList) => {
//   // console.log('menuList', menuList)
//   menuList.map((item) => {
//     const localItem = {
//       ...item,
//       children: item.children ? menuDataRender(item.children) : undefined,
//     };
//     return Authorized.check(item.authority, localItem, null);
//   });
// }

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 蚂蚁集团体验技术部出品`}
    links={[
      {
        key: '',
        title: '',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: '',
        title: '',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
    currentUser,
  } = props;
  const menuDataRef = useRef([]);

  const [menuLoading, setMenuLoading] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const loopMenuItem = (menus) => {
    return menus.map(({ children, path, ...item }) => ({
      ...item,
      path: path || '/',
      children: loopMenuItem(children),
    }));
  };

  const fetchMenuTree = async (user) => {
    // console.log('fetchMenuTree user', user)
    setMenuLoading(true);
    const { ret, msg, result } = await dispatch({
      type: 'user/fetchMenuTree',
      user: user || currentUser,
    });
    if (ret !== 0) {
      message.error(msg || '获取用户菜单失败');
      return;
    }
    // console.log('result', result, loopMenuItem(result));
    setMenuData(loopMenuItem(result));
    // setMenuData([
    //   {
    //     name: '用户列表',
    //     path: '/rms/user/list',
    //   },
    //   {
    //     name: '用户列表2',
    //     path: '',
    //   },
    // ]);
    setMenuLoading(false);
  };

  useEffect(() => {
    fetchMenuTree();
  }, []);

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );
  const { formatMessage } = useIntl();
  return (
    <ProLayout
      // formatMessage={formatMessage}
      {...props}
      {...settings}
      onCollapse={handleMenuCollapse}
      // logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
      logo={logo}
      title="茶马古窖 "
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        // console.log('----', menuItemProps, defaultDom);
        if (!menuItemProps.path || location.pathname === menuItemProps.path) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        // console.log('itemRender', route, params, routes, paths);
        const first = routes.indexOf(route) === 0;
        return first ? <Link to={paths.join('/')}>{route.breadcrumbName}</Link> : <span>{route.breadcrumbName}</span>;
      }}
      footerRender={() => {
        // if (settings.footerRender || settings.footerRender === undefined) {
        //   return defaultFooterDom;
        // }
        return null;
      }}
      menu={{ loading: menuLoading }}
      // menuDataRender={() => menuData}
      menuDataRender={(a, b, c) => {
        return menuData;
      }}
      rightContentRender={() => <RightContent fetchMenuTree={fetchMenuTree} />}
      // postMenuData={(menuData) => {
      //   menuDataRef.current = menuData || [];
      //   return menuData || [];
      // }}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings, user }) => ({
  collapsed: global.collapsed,
  settings,
  currentUser: user.currentUser,
}))(BasicLayout);

import { Menu, Dropdown, Tooltip, Tag, Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { connect, SelectLang } from 'umi';
import actions from '@/shares/actions';
import Avatar from './AvatarDropdown';
import PasswordReset from './PasswordReset';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout, currentUser, dispatch, fetchMenuTree } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleAppChange = async ({ key: appId }) => {
    const user = { ...currentUser };
    const app = user.appList.find((item) => item.id === appId);
    user.currentAppId = app.id;
    user.currentAppName = app.name;
    actions.setGlobalState({ user });
    localStorage.setItem('user', JSON.stringify(user));
    const res = await dispatch({
      type: 'user/fetchCurrent',
    });
    // console.log('handleAppChange', user.currentAppId, currentUser.currentAppId, res.currentAppId)
    fetchMenuTree(res);
  };

  const handleTenantChange = async ({ key: tenantId }) => {
    const user = { ...currentUser };
    const tenant = user.tenantList.find((item) => item.tenantId === tenantId);
    user.currentTenantId = tenant.tenantId;
    user.currentTenantName = tenant.tenantName;
    actions.setGlobalState({ user });
    localStorage.setItem('user', JSON.stringify(user));
    await dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'login/tenant',
      user: currentUser,
    });
  };

  const appMenu = (
    <Menu onClick={handleAppChange}>
      {currentUser.appList.map((tenant) => (
        <Menu.Item key={tenant.id}>{tenant.name}</Menu.Item>
      ))}
    </Menu>
  );

  const tenantMenu = (
    <Menu onClick={handleTenantChange}>
      {currentUser.tenantList.map((tenant) => (
        <Menu.Item key={tenant.tenantId}>{tenant.tenantName}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={className}>
      {/* <Dropdown.Button onClick={handleAppChange} overlay={appMenu} disabled={currentUser.appList.length === 1} style={{ margin: '8px 16px' }}> */}
      <Dropdown.Button overlay={appMenu} disabled={currentUser.appList.length === 1} style={{ margin: '8px 16px' }}>
        {currentUser.currentAppName}
      </Dropdown.Button>
      <Dropdown.Button overlay={tenantMenu} disabled={currentUser.tenantList.length === 1} style={{ marginTop: '8px' }}>
        {currentUser.currentTenantName}
      </Dropdown.Button>
      {/* <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: 'umi ui',
          },
          {
            label: <a href="next.ant.design"></a>,
            value: '',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]} // onSearch={value => {
        //   //console.log('input', value);
        // }}
      /> */}
      {/* <Tooltip title="使用文档">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip> */}
      <Avatar showModal={showModal} />
      <PasswordReset isModalVisible={isModalVisible} onOk={handleOk} />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      {/* <SelectLang className={styles.action} /> */}
    </div>
  );
};

export default connect(({ settings, user }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  currentUser: user.currentUser,
}))(GlobalHeaderRight);

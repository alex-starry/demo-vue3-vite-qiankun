import React from 'react';
import { Inspector } from 'react-dev-inspector';
import actions from '../shares/actions';

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const Layout = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    // console.log('主应用观察者:', state, prev);
  });
  const user = localStorage.getItem('user');
  if (user) {
    actions.setGlobalState({ user: JSON.parse(user) });
  }
  // actions.offGlobalStateChange();
  return <InspectorWrapper>{children}</InspectorWrapper>;
};

export default Layout;

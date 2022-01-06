import cryptoJs from 'crypto-js';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/**
 * 密码加密
 * @param {string} val 密码
 */
const encrypt = (val) => {
  const key = cryptoJs.enc.Latin1.parse('jingyun202088888');
  const password = cryptoJs.AES.encrypt(val, key, {
    iv: key,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.ZeroPadding,
  });
  return password.toString();
};

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const intl = useIntl();

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, password: encrypt(values.password) },
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.logcontainer}>
        <h1>欢迎登录</h1>
        <ProForm
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            searchConfig: {
              submitText: '登录',
            },
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              loading: submitting,
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
          onFinish={(values) => {
            handleSubmit(values);
            return Promise.resolve();
          }}
        >
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误（admin/ant.design)',
              })}
            />
          )}
          <p>账号：</p>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder',
              defaultMessage: '用户名',
            })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.login.username.required" defaultMessage="请输入用户名!" />,
              },
            ]}
          />
          <p>密码：</p>
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
              defaultMessage: '密码',
            })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.login.password.required" defaultMessage="请输入密码！" />,
              },
            ]}
          />
        </ProForm>
      </div>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);

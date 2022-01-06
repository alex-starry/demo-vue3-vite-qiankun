import { Form, Input, Button, message, Modal } from 'antd';
import React, { useState } from 'react';
import { history, connect } from 'umi';
import cryptoJs from 'crypto-js';
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

const PasswordReset = (props) => {
  const { dispatch, isModalVisible, onOk, currentUser } = props;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Success:', values);
    console.log(dispatch, 'dispatch');
    if (dispatch) {
      const res = await dispatch({
        type: 'login/resetPassword',
        user: currentUser,
        params: {
          password: encrypt(values.password),
          newPassword: encrypt(values.newPassword),
        },
      });
      console.log(res, 'response sres');
      if (res.result) {
        handleOk();
        message.success(`密码修改成功`);
        return;
      }
      message.error(`${res.toast}`);
    }
  };

  const handleOk = () => {
    form.resetFields();
    onOk();
  };

  const handleCancel = () => {
    form.resetFields();
    onOk();
  };

  const changenewPassword = (value) => {
    form.setFieldsValue({ newPassword: value.target.value });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const checkNewPassword = (rule, value) => {
    if (value === form.getFieldValue('newPassword')) {
      return Promise.resolve();
    }
    return Promise.reject('两次密码输入不一致');
  };
  return (
    <Modal title="修改密码" footer={null} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="原密码" name="password" rules={[{ required: true, message: '请输入原密码!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[
            { required: true, message: '请输入新密码!' },
            {
              pattern: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$',
              message: '必须包含字母、数字的6-18位字符',
            },
          ]}
        >
          <Input.Password onChange={changenewPassword} />
        </Form.Item>

        <Form.Item
          label="确认新密码"
          name="newPasswordAgain"
          rules={[
            { required: true, message: '请确认新密码!' },
            {
              validator: checkNewPassword,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确认修改
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(PasswordReset);

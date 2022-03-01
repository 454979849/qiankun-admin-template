import React, {useEffect, useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate,useLocation} from 'react-router-dom';
import styles from './index.less';
import {RootState} from 'src/store';
import {redirectAddToken, urlParse} from "@/utils";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // 提交事件
  const onFinish =async (values: { username: string; password: string }) => {
    const postData = {
      username: values.username,
      password: values.password,
    };
    let loginResult = await dispatch.user.login(postData);
    const paramsObj:any = urlParse(location.search);
    if(paramsObj.redirect){
      window.location.href = redirectAddToken(paramsObj.redirect,loginResult.token);
    }else{
      await dispatch.user.fetchMenus()
      navigate('/');
    }

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('login error:', errorInfo)
  }

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-panel']}>
        <Form
          name="basic"
          labelCol={{span: 7}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{required: true, message: '请输入用户名'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{required: true, message: '请输入密码'}]}
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles['login-btn']}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login

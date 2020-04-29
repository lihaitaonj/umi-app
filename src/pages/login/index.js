/*
 * title: 登录
 *
 */
import React from 'react';
import router from 'umi/router'
import jwt_decode from 'jwt-decode';
// import { login } from './services/login';
import { Layout, Icon, Form, Input, Button, message } from 'antd';
import {connect} from 'dva';
// import jwt_decode from 'jwt-decode';

import styles from './index.scss';;

const { Content, Footer } = Layout;
const FormItem = Form.Item;
const iconStyle = { color: 'rgba(0, 0, 0, .25)' };

const index = ({ form, dispatch, loading }) => {
  const handleSubmit = () => {
    //form 校验
    form.validateFields((err, values) => {
      if(!err) {
        // login(values).then(data => router.push('/'));
        dispatch({
          type: "login/login",
          payload: values
        }).then(res => {
          if (res && res.state === 'suc') {
            const token = jwt_decode(res.token);
            // const token = {id: "admin", nickname: "admin", username: "admin", type: '0'};
            const { id, nickname, username, type } = token;
            localStorage.setItem('username', username);
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('userId', id);
            localStorage.setItem('authority', type === '0' ? 'admin' : 'user');
            router.push('/');
          } else {
            message.error(res ? res.msg : '登录失败');
          }
        })
      }
    })
  }
  return (
    <Layout>
      <Content className={styles.content}>
        <div className={styles.form}>
          <h1 style={{ textAlign: 'center' }}>Demo</h1>
          <Form>
            <FormItem>
              {form.getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空',
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={iconStyle} />}
                  placeholder="请输入用户名"
                  autoFocus
                />,
              )}
            </FormItem>
            <FormItem>
              {form.getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '密码不能为空',
                  },
                ],
              })(
                <Input
                  type="password"
                  prefix={<Icon type="lock" style={iconStyle} />}
                  placeholder="请输入密码"
                />,
              )}
            </FormItem>
            <FormItem>
              <Button
                onClick={handleSubmit}
                type="primary"
                style={{ width: '100%' }}
                loading={loading}
              >
                Login
              </Button>
            </FormItem>
          </Form>
        </div>
      </Content>
      <Footer className={styles.footer}>
        lihaitao <Icon type="copyright" />
        2020 4 24
      </Footer>
    </Layout>
  );
}

export default connect(({loading}) => ({
  "loading": loading.effects["login/login"]
}))(Form.create()(index));

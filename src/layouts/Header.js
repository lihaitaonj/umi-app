/*
 * @Descripttion:
 * @Author: lsg
 * @Date: 2020-04-24 15:17:06
 * @LastEditors: lsg
 * @LastEditTime: 2020-04-29 16:44:09
 * @FilePath: \umi-app\src\layouts\Header.js
 */
import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import { router } from 'umi';

const MenuItem = Menu.Item;

const Header = ({ location }) => {
  const loginOut = () => {
    localStorage.clear();
    router.push("/login");
  }
  const menu = (
    <Menu>
      <MenuItem>
        <span onClick={loginOut}>退出</span>
      </MenuItem>
    </Menu>
  );
  return (
    <div className="header">
      <Menu
        className="header-menu"
        mode="horizontal"
        theme="light"
        selectedKeys={[location.pathname]}
      >
        <MenuItem key="/">
          <Link to="/">首页</Link>
        </MenuItem>
        <MenuItem key="/users">
          <Link to="/users">用户</Link>
        </MenuItem>
        <MenuItem key="/reports">
          <Link to="/reports">周报</Link>
        </MenuItem>
        {/* <MenuItem>首页</MenuItem>
        <MenuItem>首页</MenuItem> */}
      </Menu>
      <div className="header-right">
        <Dropdown overlay={menu}>
          <span style={{color: "#999"}}>
            <Icon type="user" style={{ marginRight: 3 }} />
            {localStorage.nickname}
          </span>
        </Dropdown>
      </div>
    </div>
  );
}
export default withRouter(Header);

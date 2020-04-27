/*
 * @Descripttion:
 * @Author: lsg
 * @Date: 2020-04-24 15:17:06
 * @LastEditors: lsg
 * @LastEditTime: 2020-04-26 11:39:55
 * @FilePath: \umi-app\src\layouts\Header.js
 */
import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';

const MenuItem = Menu.Item;

const Header = ({ location }) => {
  const menu = (
    <Menu>
      <MenuItem>
        <span>
          <a href="https://www.baidu.com">退出</a>
        </span>
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
        {/* <MenuItem>首页</MenuItem>
        <MenuItem>首页</MenuItem> */}
      </Menu>
      <div className="header-right">
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="https://www.baidu.com">
            <Icon type="user" style={{ marginRight: 3 }} />
            admin
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
export default withRouter(Header);

/*
 * @Descripttion:
 * @Author: lsg
 * @Date: 2020-04-27 15:13:27
 * @LastEditors: lsg
 * @LastEditTime: 2020-04-27 15:20:52
 * @FilePath: \umi-app\src\components\Table\index.js
 */
import { Table } from 'antd';
import './index.scss';

const index = ({ className, ...rest }) => (
  <Table className={`table-wrapper ${className}`} {...rest} />
);

export default index;

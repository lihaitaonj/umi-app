/*
 * @Descripttion:
 * @Author: lsg
 * @Date: 2020-04-27 15:04:06
 * @LastEditors: lsg
 * @LastEditTime: 2020-04-27 15:10:44
 * @FilePath: \umi-app\src\components\Layout\index.js
 */
import styles from './index.scss';

export const Content = ({className, ...rest}) => (
  <div className={`${styles['content-wrapper']} ${className}`} {...rest} />
)

export const Tool = ({ className, ...rest }) => (
  <div className={`${styles['tool-wrapper']} ${className}`} {...rest} />
);

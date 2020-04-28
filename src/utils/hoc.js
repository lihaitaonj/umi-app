/*
 * @Descripttion:
 * @Author: lsg
 * @Date: 2020-04-28 14:54:35
 * @LastEditors: lsg
 * @LastEditTime: 2020-04-28 15:01:18
 * @FilePath: \umi-app\src\utils\hoc.js
 */
//克隆子元素button 并且添加事件 HOC: higher order components
export const widthClick = (element, handleClick = () => {}) => {
  if(!element) return;
  //判断element是否为DOM对象
  if(Object.prototype.toString.call(element) === '[Object Object]') {
    return <element.type {...element.props} onClick={handleClick} />
  } else {
    return <span onClick={handleClick}>{element}</span>
  }
}

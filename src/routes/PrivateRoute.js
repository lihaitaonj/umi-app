import {router} from 'umi';

export default ({children, match, route}) => {
  if(!localStorage.username && match.path !== "/login") {
    //没有登录 && 直接访问内部页面
    router.push("/login");
  }
  if (localStorage.username && match.psth === "/login") {
    router.push("/");
  }
  if (route.authority && !route.authority.includes(localStorage.authority)) {
    router.push('/');
  }

  return children;
}

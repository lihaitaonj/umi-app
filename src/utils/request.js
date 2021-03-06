import { fetch } from 'dva';
import { notification } from 'antd';
import router from 'umi/router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 *
 * @param {用户名} params.username
 * @param {密码} params.password
 */

export default async function request(url, options) {
  //发起请求 https://cjy-react-interface.herokuapp.com/api/users/login
  return await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .catch(checkErrorStatus);
}

function checkStatus(res) {
  if (res.status >= 200 && res.status <= 300) {
    return res.json();
  }
  const errorText = codeMessage[res.status] || res.msg;
  //提醒错误信息
  notification.error({
    message: `请求错误 ${res.status} ${res.url}`,
    Descripttion: errorText,
  });
  //抛出异常
  const error = new Error(errorText);
  error.name = res.status;
  error.response = res;
  throw error;
}

function checkErrorStatus(err) {
  if (err && err.response) {
    //拿到异常状态
    const { status } = err.response;
    if (status === 403) {
      router.push('/exception/403');
    } else if (status <= 504 && status >= 500) {
      router.push('exception/500');
    } else if (status >= 404 && status <= 422) {
      router.push('exception/404');
    }
  }
}

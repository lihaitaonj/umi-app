import request from '@/utils/request'

/**
 *
 * @param {用户名} params.username
 * @param {密码} params.password
 */

export function login(params) {
  //发起请求 https://cjy-react-interface.herokuapp.com/api/users/login
  return request('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

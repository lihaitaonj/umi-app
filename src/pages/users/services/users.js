import request from '@/utils/request';

export function fetch({page, pageSize}) {
  //发起请求 https://cjy-react-interface.herokuapp.com/api/users/get_users/1/3
  // console.log(page, pageSize);
  return request(`/api/users/get_users/${page}/${pageSize}`);
}

export function add(params) {
  //发起请求 https://cjy-react-interface.herokuapp.com/api/users/add_user
  // console.log(page, pageSize);
  return request(`/api/users/add_user`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}
export function edit(id, params) {
  //发起请求 https://cjy-react-interface.herokuapp.com/api/users/add_user
  // console.log(page, pageSize);
  return request(`/api/users/edit_user/${id}`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
export function remove(id) {
  //发起请求 https://cjy-react-interface.herokuapp.com/api/users/delete_user
  // console.log(page, pageSize);
  return request(`/api/users/delete_user/${id}`, {
    method: 'DELETE',
  });
}

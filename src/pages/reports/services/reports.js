import request from '@/utils/request';

export function fetchAllUsers() {
  //发起请求 https://cjy-react-interface.herokuapp.com/api/users/all_users
  return request(`/api/users/all_users`)
}

export function add(params) {
  //发起请求 https://cjy-react-interface.herokuapp.com/api/users/add_report/userId
  return request(`/api/users/add_report/${localStorage.userId}`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export function fetchMyReports({page, pageSize}) {
  //发起请求 https://cjy-react-interface.herokuapp.com/api/users/reports/${page}/${pageSize}/userId
  return request(`/api/users/reports/${page}/${pageSize}/${localStorage.userId}`);
}

export function fetchInfo(id) {
  //发起请求 https://cjy-react-interface.herokuapp.com/api/users/report_detail/userId/id
  return request(`/api/users/report_detail/${localStorage.userId}/${id}`);
}

export function update(params) {
  //发起请求 https://cjy-react-interface.herokuapp.com/api/users/edit_report/userId/params.id
  return request(`/api/users/edit_report/${localStorage.userId}/${params.id}`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export function remove(id) {
  //发起请求 https://cjy-react-interface.herokuapp.com/api/users/delete_report/userId/id
  return request(`/api/users/delete_report/${localStorage.userId}/${id}`,{
    method: 'DELETE'
  });
}

/*
 * @Descripttion:
 * @Author: lsg
 * @Date: 2020-04-27 16:45:25
 * @LastEditors: lsg
 * @LastEditTime: 2020-04-27 17:45:50
 * @FilePath: \umi-app\src\pages\users\models\users.js
 */
import * as usersServices from '../services/users';
export default {
  namespace: 'users',
  state: {
    list: [],
    total: 0,
    page: 1,
    pageSize: 5
  },
  reducers: {
    setData(state, {payload: {list, total, page}}) {
      return {...state, list, total, page};
    }
  },
  effects: {
    *fetch({payload: {page}}, { call, put, select }) {
      const pageSize = yield select(state => state.users.pageSize);
      const res = yield call(usersServices.fetch, { page, pageSize });
      if(res && res.state === 'success') {
        yield put({type: 'setData', payload: {...res.data, page}});
      } else {
        yield put({type: 'setData', payload: {data: {list: [], total: 0}}})
      }
      // const list = yield select(state => state.users.list);
      // console.log(list)
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      //通过当前路径判断是否自执行
      return history.listen(({pathname}) => {
        if(pathname === '/users') {
          dispatch({type: 'fetch', payload: {page: 1}});
        }
      })
    }
  }
}

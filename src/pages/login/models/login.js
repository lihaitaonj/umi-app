/*
 * @Descripttion:
 * @Author: lsg
 * @Date: 2020-04-28 10:33:07
 * @LastEditors: lsg
 * @LastEditTime: 2020-04-28 10:38:05
 * @FilePath: \umi-app\src\pages\login\models\login.js
 */
import * as loginServices from '../services/login'

export default {
  namespace: "login",
  state: {

  },
  reducers: {
    setData(state) {
      return {...state}
    }
  },
  effects: {
    *fetch({payload}, {call}) {
      return yield call(loginServices.login, payload);
    }
  }
}

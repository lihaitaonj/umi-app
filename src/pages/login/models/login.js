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
    *login({payload}, {call}) {
      return yield call(loginServices.login, payload);
    }
  }
}

import * as reportsServices from '../services/reports';

export default {
  namespace: 'reports',
  state: {
    allUsersList: [],
  },
  reducers: {
    setData(state, {payload}) {
      return { ...state, allUsersList: payload };
    },
  },
  effects: {
    *getAllUsers({ _ }, { call, put }) {
      const res = yield call(reportsServices.fetchAllUsers);
      if (res && res.state === 'success') {
        console.log(res)
        yield put({ type: 'setData', payload: res.data });
      } else {
        yield put({ type: 'setData', payload: { allUsersList: [] } });
      }
    },
  },
};

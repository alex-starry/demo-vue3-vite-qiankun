import { queryCurrent, query as queryUsers, queryMenuTree } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    menuTree: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      let user = localStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
      } else {
        user = yield call(queryCurrent);
      }
      yield put({
        type: 'saveCurrentUser',
        payload: user,
      });
      return user;
    },

    *fetchMenuTree({ user }, { call }) {
      return yield call(queryMenuTree, user);
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },

    setMenuTree(state, action) {
      return { ...state, menuTree: action.payload || [] };
    },
  },
};
export default UserModel;

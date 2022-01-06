import { initGlobalState } from 'qiankun';

const initialState = { a: 'a' };
const actions = initGlobalState(initialState);

export default actions;

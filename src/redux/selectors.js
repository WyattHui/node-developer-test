export const getLoginInfoState = store => store.loginInfo;

export const getLoginInfoUser = store =>
  getLoginInfoState(store) ? getLoginInfoState(store).user || {};

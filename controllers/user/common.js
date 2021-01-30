module.exports = {
  postHandleUser: (user = {}) => {
    let {_id, name, email, date} = user;
    return {_id, name, email, date};
  }
};

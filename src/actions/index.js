import axios from "axios";

import {
  SEND_REQUEST_FIND_USERS,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED
} from "../constants";

const baseUrl = ` https://api.github.com/`;

export const setLogin = login => {
  console.log("setLogin");
  return {
    type: SEND_REQUEST_FIND_USERS,
    login
  };
};

export const fetchUser = login => {
  return dispatch => {
    dispatch(setLogin(login));
    const user = () => axios.get(`https://api.github.com/users/${login}`);
    const repos = () =>
      axios.get(`https://api.github.com/users/${login}/repos`);
    axios
      .all([user(), repos()])
      .then(
        axios.spread((user, repos) =>
          dispatch(
            returnOk({
              ...{},
              ...user.data,
              repos: repos.data
            })
          )
        )
      )
      .catch(err => dispatch(returnFailed(err.response)));
  };
};

function returnOk(response) {
  return {
    type: REQUEST_SUCCESSFUL,
    response
  };
}

function returnFailed(response) {
  return {
    type: REQUEST_FAILED,
    response
  };
}

function getUser(login = "xrusts") {}

import {
  SEND_REQUEST_FIND_USERS,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED
} from "../constants";

const initialState = {
  user: { name: "Unknown user" }
};

const githubUser = (state = initialState, action) => {
  switch (action.type) {
    case SEND_REQUEST_FIND_USERS:
      return {
        ...{},
        ...state,
        ...{
          fetching: true,
          login: action.login
        }
      };
      break;
    case REQUEST_SUCCESSFUL:
      return {
        ...{},
        ...state,
        ...{
          fetching: false,
          user: { ...action.response }
        }
      };
    case REQUEST_FAILED:
      return {
        ...{},
        ...state,
        ...{
          fetching: false,
          user: null,
          errorMessage: {
            ...action.response
          }
        }
      };
      break;
    default:
      return state;
  }
};
export default githubUser;
// schema
// {
//    // https://api.github.com/users/${xrusts}
//   name: string,
//   html_url: string,
//   login: string,
//   type: string,
//   avatar_url: string,
//   repos: [
//     // "repos_url": "https://api.github.com/users/${XrustS}/repos",
//     {
//       id: ID,
//       name: string,
//       stargazers_count: number,
//       html_url: string
//     }
//   ]
// }

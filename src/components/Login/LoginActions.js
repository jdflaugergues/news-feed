import {createActions, handleActions} from 'redux-actions';
import fetch from 'cross-fetch';
import queryString from 'query-string';

const defaultState = {};

export const {authenticateUser} = createActions({
  AUTHENTICATE_USER: async (username, password) => {
    return await authenticate(username, password);
  }
});


export default handleActions({
  [authenticateUser] (state, {payload: {accessToken, profile, user}}) {
    console.log('accessToken', accessToken);
    console.log('profile', profile);
    console.log('user', user);
    return {
      ...state,
      logged: true,
      accessToken,
      profile,
      user
    };
  }
}, defaultState);

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}


function authenticate(username, password, grant_type = 'password', client_id = 'test') {
  return new Promise((resolve, reject) => {

    const queryParams = queryString.stringify({username, password, client_id, grant_type});

    return fetch('/v1/account/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // body: 'username=decouverte@wizbii.com&password=decouvertewizbii&client_id=test&grant_type=password'
      body: queryParams
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        window.localStorage['access-token'] = data['access-token'];
        window.localStorage['profile'] = JSON.stringify(data['profile']);
        resolve({
          accessToken :data['access-token'],
          profile: data.profile,
          user: data.user
        });
      })
      .catch(reject)
  });
}


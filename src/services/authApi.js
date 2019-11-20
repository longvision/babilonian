// import {Auth, API} from 'aws-amplify';

import { userModel } from '~/config/models';

export function signUpUser(username, password) {
  return Auth.signUp({
    username,
    password
    // attributes: {email, picture: '/images/anonymous.png'},
  });
}

export function confirmUser(username, code) {
  return Auth.confirmSignUp(username, code);
}

export function resendCode(username) {
  return Auth.resendSignUp(username);
}

export function signInUser(username, password) {
  return Auth.signIn(username, password);
}

export function forgotPassword(username) {
  return Auth.forgotPassword(username);
}

export function confirmPassword(email, password, code) {
  return Auth.forgotPasswordSubmit(email, code, password);
}

export function changeCurrentPassword(password1, password2) {
  return Auth.currentAuthenticatedUser().then(user => {
    return Auth.changePassword(user, password1, password2);
  });
}

export function getAuthenticatedUser() {
  return Auth.currentAuthenticatedUser();
}

export function logout() {
  return Auth.signOut();
}

export function currentSession() {
  return Auth.currentSession().then(session => {
    return Auth.currentUserInfo().then(user => {
      let attr = {
        sub: user.username,
        userId: user.username,
        ...user.attributes
      };
      const cfg = {
        headers: {
          Authorization: session.idToken.jwtToken
        }
      };
      return API.get('user', '/user', cfg)
        .then(response => {
          userModel.profile.forEach(item => {
            attr[item] = response[item];
          });
          const result = {
            user: { ...attr }
          };
          return result;
        })
        .catch(err => (__DEV__ ? console.tron.log(err) : console.log(err)));
    });
  });
}

export function updateUser(data) {
  return Auth.currentSession().then(session => {
    return Auth.currentAuthenticatedUser().then(() => {
      const cfg = {
        body: data,
        headers: {
          Authorization: session.idToken.jwtToken
        }
      };
      API.put('user', '/user', cfg);
    });
  });
}

// export function currentSession () {
//   return Auth.currentSession().then(session => {
//     return Auth.currentUserInfo()
//       .then(user => {
//         let attr = { sub: user.username, ...user.attributes }
//         const result = {
//           user: { ...attr }
//         }
//         return result
//       })
//   })
// }

// export function updateAttribute (name, value) {
//   return Auth.currentAuthenticatedUser().then(user => {
//     return Auth.updateUserAttributes(user, { [name]: value })
//   })
// }

// export function updateName (value) {
//   return updateAttribute('name', value)
// }

// export function updatePicture (value) {
//   return updateAttribute('picture', value)
// }

// export function updateUser (data) {
//   return Auth.currentSession().then(session => {
//     return Auth.currentAuthenticatedUser().then(() => {
//       const updateUserUrl = `${userUrl}/user`
//       const cfg = {
//         headers: {
//           Authorization: session.idToken.jwtToken
//         }
//       }
//       axios.put(updateUserUrl, data, cfg)
//     })
//   })
// }

// export function deleteTheUser (email, password) {
//   return new Promise((resolve, reject) => {
//     const authData = {
//       Username: email,
//       Password: password
//     }
//     const authDetails = new AuthenticationDetails(authData)
//     const userData = {
//       Username: email,
//       Pool: userPool
//     }
//     const cognitoUser = new CognitoUser(userData)
//     cognitoUser.authenticateUser(authDetails, {
//       onSuccess () {
//         cognitoUser.deleteUser((err, result) => {
//           if (err) {
//             reject(err)
//             return
//           }
//           resolve(result)
//         })
//       },
//       onFailure (err) {
//         reject(err)
//       }
//     })
//   })
// }

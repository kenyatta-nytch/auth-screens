import {updateControls, closeModal, closeSideNav} from './controls.js';
import {renderErrors, getFormData} from './helpers.js'

// api call request
function callAuthApi(route, data, errorclass, successfunc=null) {
  fetch(window.arycarturl+route, { //+'?XDEBUG_SESSION_START=PHPSTORM',
      method: 'POST',
      body: JSON.stringify(data),
      headers: { accept: 'application/json', 'content-type': 'application/json'},
      credentials: 'include',
  }).then((r) => {
      if (!r.ok) {
          renderErrors(errorclass, [`Error: could not connect to shopping cart ${r.status} ${r.statusText}`]);
      } else {
          r.json().then((response) => {
              if (response.success) {
                  updateControls(response);
                  if (successfunc) successfunc();
              }
              else renderErrors(errorclass, [response.error]);
          }).catch((e) => {
              renderErrors(errorclass, [`Error: ${e.message}`]);
          });
      }
  }).catch(e => {
          renderErrors(errorclass, [`Error: could not connect to shopping cart - ${e}`]);
      }
  );
}

// Find out whether user is logged in or not, and retrieve her cart if any
export function getCartInfo() {
  callAuthApi('/getcartinfo', {}, 'signin')
}

// sign up logic/requests
export function signUp(event) {
  event.preventDefault();
  callAuthApi('/registerjs',
      getFormData(document.querySelector('#signup')),
      'signup',
      closeModal)
}

// sign in logic/requests
export function signIn(event) {
  event.preventDefault();
  callAuthApi('/loginjs',
      getFormData(document.querySelector('#signin')),
      'signin',
      () => {  closeModal();})
}

// logout logic
export function logout(event) {
  callAuthApi('/logoutjs', {}, 'signin', closeSideNav)
}
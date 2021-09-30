import {updateControls, closeModal, closeSideNav, stopLoading, successfulReset, notify} from './controls.js';
import {renderErrors, getFormData} from './helpers.js'

// api call request
async function callAuthApi(route, data, errorclass, successfunc=null) {
    try {
        const res = await fetch(window.arycarturl+route, { //+'?XDEBUG_SESSION_START=PHPSTORM',
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: { accept: 'application/json', 'content-type': 'application/json'},
                        credentials: 'include',
                    });

        if (!res.ok) throw new Error(`Error: could not connect to shopping cart ${r.status} ${r.statusText}`);
        const response = await res.json();
        if (!response.success) throw new Error(`Error: ${response.error}`);
        updateControls(response);
        if (successfunc) successfunc();
    } catch(e) {
        renderErrors(errorclass, [e])
    }
}

// Find out whether user is logged in or not, and retrieve her cart if any
export function getCartInfo() {
    callAuthApi('/getcartinfo', {}, 'signin');
}

// sign up logic/requests
export function signUp(event) {
  event.preventDefault();
  callAuthApi('/registerjs',
      getFormData(document.querySelector('#signup')),
      'signup',
      () => {notify('Sign up was successfull!'); stopLoading('#signup_btn', 'Sign Up'); closeModal();})
}

// sign in logic/requests
export function signIn(event) {
  event.preventDefault();
  callAuthApi('/loginjs',
      getFormData(document.querySelector('#signin')),
      'signin',
      () => {notify('Signed in successfully!'); stopLoading('#signin_btn', 'Sign In'); closeModal();})
}

// reset password logic/requests
export function resetPassword(event) {
    event.preventDefault();
    callAuthApi('/forgot-passwordjs',
        getFormData(document.querySelector('#password_reset')),
        'reset',
        () => { successfulReset(); stopLoading('#password_reset_btn', 'Reset Password');})
}

// logout logic
export function logout(event) {
  callAuthApi('/logoutjs', {}, 'signin', () => {notify('Log out Successfull!');closeSideNav()})
}
import {updateControls, enableInput} from './controls.js'

/** 
 * @param {String} html markup string to buld from
 * @returns {Element} the html node tree
 */
export function generateHTML(html) {
  if (!html) return;

  const template = document.createElement("template")
  template.innerHTML = html.trim()
  return template.content.firstElementChild;
}


/** 
 * get form data during submission
 * @param {HTMLFormElement} form HTML form to extract data
 * @returns {Object} data 
 */
export function getFormData(form) {
  let data = {};
  const entries = new FormData(form).entries();
  for (var pair of entries) {
      data[pair[0]] = pair[1]
  }
  return data;
}

/** 
 * render errors during authentication
 * @param {String} type form to render errors to 'signin' or 'signup'
 * @param {Array{String}} errors array of errors
 */
export function renderErrors(type, errors) {
  if (!errors || !Array.isArray(errors)) throw new TypeError("Pass an array of errors to the rederError function");
  if (!type) throw new Error('Provide an operation type to renderErrors');

  updateControls({}); // In case of error, reset all cart/usercontrols
  let signinErrors = document.querySelector('#signin_errors');
  let signupErrors = document.querySelector('#signup_errors');
  let resetErrors = document.querySelector('#reset_errors');

  const errorStrings = errors.map(e => {
      let err = document.createElement("p");
      err.classList.add('error');
      let t = document.createTextNode(e)
      err.appendChild(t);
      return err;
  });

  if (type === 'signin'){
      signinErrors.innerHTML = "";
      errorStrings.forEach(e => signinErrors.appendChild(e));
      enableInput('#signin_btn')
  } else if(type === 'signup') {
      signupErrors.innerHTML = "";
      errorStrings.forEach(e => signupErrors.appendChild(e));
      enableInput('#signup_btn')
  } else if(type === 'reset') {
      resetErrors.innerHTML = "";
      errorStrings.forEach(e => resetErrors.appendChild(e));
      enableInput('#password_reset_btn')
  } else throw new SyntaxError("Pass a string of either 'signin' or 'signup' or 'reset'");
  return;
}
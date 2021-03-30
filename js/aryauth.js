// element where auth code is injected.
let container = document.querySelector('#aryauth');

// load auth code when the DOM is loaded
document.onreadystatechange = function() {
    if (document.readyState === 'interactive') { 
        loadAuthContent();
    }
}

// call to inject the auth code code
function loadAuthContent() { 
    // authentication html code. Injected before referncing its elements.
    container.innerHTML = auth;

    let content = document.querySelector('.content');
    // form controls
    const signinRedirect = document.querySelector('#signin_redirect');
    const signupRedirect = document.querySelector('#signup_redirect');
    const modalCloseBtn = document.querySelector('#modal_close_btn');
    const sidenavCloseBtn = document.querySelector('#close_side_nav');
    const logoutBtn = document.querySelector('#logout');

    // toggle signIn/signUp pages
    signinRedirect.addEventListener('click', () => content.style.marginLeft = '-100%')
    signupRedirect.addEventListener('click', () => content.style.marginLeft = '0')

    // event listensers for close buttons of modal and side nav
    modalCloseBtn.addEventListener('click', toggleModal);
    sidenavCloseBtn.addEventListener('click', toggleSideNav);

    // logout function
    logoutBtn.addEventListener('click', function() {
        switchToModalControl();
        toggleSideNav();
    });
}

// toggle modal
function toggleModal() {
    let modal = document.querySelector('#modal_container');
    if(modal){
        modal.classList.toggle('modal_open');
        modal.classList.toggle('modal_closed');
    }
}

// toggle side nav
function toggleSideNav() {
    let nav = document.querySelector('#side_nav');
    if (nav) {
        nav.classList.toggle('side_nav_closed');
        nav.classList.toggle('side_nav_open');
    }
}

// switch between the main controls of toggling the modal and toggling the side nav
function switchToModalControl() {
    let controls = document.querySelector('#auth_nav_controls');
    controls.innerHTML = signInControl;
}
function switchToNavControl() {
    let controls = document.querySelector('#auth_nav_controls');
    controls.innerHTML = sideNavControl;
}

// get form data during submission
// args: HTML form element
function getFormData(form) {
    let data = {};
    const entries = new FormData(form).entries();
    for (var pair of entries) {
        data[pair[0]] = pair[1]
    }
    
    return data;
}

// sign up logic/requests
function signUp(event) {
    event.preventDefault();
    const signUpForm = document.querySelector('#signup');
    const data = getFormData(signUpForm);
    const errors = ['This email address has already been used']

    setTimeout(() => {
        alert(JSON.stringify(data))
        // renderErrors('signup', errors)
    }, 300)

}

// sign in logic/requests
function signIn(event) {
    event.preventDefault();
    const signInForm = document.querySelector('#signin');
    const data = getFormData(signInForm);
    const errors = ['Incorrect username or password']

    setTimeout(() => {
        switchToNavControl();
        // alert(JSON.stringify(data));
        renderErrors('signin', errors);
    }, 300)
    
}

// call to set form error
// receives an array of error strings
function renderErrors(type, errors) {
    if (!errors || !Array.isArray(errors)) throw new TypeError("Pass an array of errors to the rederError function");
    if (!type) throw new Error('Provide an operation type to renderError');

    let signinErrors = document.querySelector('#signin_errors');
    let signupErrors = document.querySelector('#signup_errors');
    
    const errorStrings = errors.map(e => {
        let err = document.createElement("p");
        err.classList.add('error');
        let t = document.createTextNode(e)
        err.appendChild(t);
        return err;
    });

    if (type === 'signin'){
        errorStrings.forEach(e => signinErrors.appendChild(e));
    } else if(type === 'signup') {
        errorStrings.forEach(e => signupErrors.appendChild(e));
    } else throw new SyntaxError("Pass a string of either 'signin' or 'signup'");
    return;
}

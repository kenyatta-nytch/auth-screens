// element where auth code is injected.
let container = document.querySelector('#aryauth');
let controls = document.querySelector('#aryauth-controls');
controls.style.display = "flex";

window.arycart = {};

// load auth code when the DOM is loaded
document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        loadAuthContent();
    }
}

// call to add the auth code
function loadAuthContent() {
    // authentication html code. Injected before referencing its elements.
    container.innerHTML = auth;

    let content = document.querySelector('.content');
    // form controls
    const signinRedirect = document.querySelector('#signin_redirect');
    const signupRedirect = document.querySelector('#signup_redirect');
    const modalCloseBtn = document.querySelector('#modal_close_btn');
    const sidenavCloseBtn = document.querySelector('#close_side_nav');
    const logoutBtn = document.querySelector('#logout');

    // toggle signIn/signUp pages
    signinRedirect.addEventListener('click', () => content.style.marginLeft = '0')
    signupRedirect.addEventListener('click', () => content.style.marginLeft = '-100%')

    // event listeners for close buttons of modal and side nav
    modalCloseBtn.addEventListener('click', toggleModal);
    sidenavCloseBtn.addEventListener('click', toggleSideNav);

    // logout function
    logoutBtn.addEventListener('click', logout);
}

// toggle modal
function toggleModal() {
    let modal = document.querySelector('#modal_container');
    if(modal){
        modal.classList.toggle('modal_open');
        modal.classList.toggle('modal_closed');
    }
}

function hideModal() {
    let modal = document.querySelector('#modal_container');
    if(modal){
        modal.classList.remove('modal_open');
        modal.classList.add('modal_closed');
    }
    let nav = document.querySelector('#side_nav');
    if (nav) {
        nav.classList.add('side_nav_closed');
        nav.classList.remove('side_nav_open');
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

// insert modal/side nav controls at the right place in the controls container
function insertElementInControls(parent, child) {
    const children = parent.children;
    if (children.length === 1) {
        if (children[0].id !== 'cart-control') {
            children[0].replaceWith(child);
        } else parent.appendChild(child);

    } else if (children.length === 2) {
        children[1].replaceWith(child);

    }else parent.appendChild(child);
}

// switch to the modal controls
function switchToModalControl() {
    let div = document.createElement("div");
    div.id = "modal-control";
    div.innerHTML = signInControl;

    // add modal control second in the controls container
    insertElementInControls(controls, div);
}
// switch to side nav controls
function switchToNavControl() {
    let userEmail = document.querySelector('#user-email');
    let div = document.createElement("div");
    div.id = "nav-control";
    div.innerHTML = sideNavControl;

    if (userEmail) {
        userEmail.innerText = window.loggedUser || 'Please Log In!'
    }

    // add side nav control second in the controls container
    insertElementInControls(controls, div);
}

// return our cart component
function renderCart(value) {
    // create control container and add cart icon html
    let div = document.createElement('div');
    div.id = 'cart-control';
    div.innerHTML = cartIcon(value);

    // insert the cart icon first in the controls
    const children = controls.querySelectorAll('div');
    if (children.length > 0) {
        let parent = children[0].parentElement;
        if (children[0].id === 'cart-control') {
            children[0].replaceWith(div);
        } else {
            parent.insertBefore(div, children[0]);
        }
    } else controls.appendChild(div);
}

// update controls - cart and user display
function updateControls(cartdata) {
    if (cartdata.logged) {
        window.isAryCartLogged = cartdata.logged;
        window.loggedUser = cartdata.user;
        switchToNavControl();
        hideModal();
    } else {
        window.isAryCartLogged = false;
        window.loggedUser = '';
        switchToModalControl();
    }

    if (cartdata.cart) {
        window.arycart.cart = cartdata.cart;
        const count = cartdata.cart.length || 0;
        renderCart(count);
    }
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

function callAuthApi(route, data, errorclass, successfunc=null) {
    fetch(window.arycart.url+route, { //+'?XDEBUG_SESSION_START=PHPSTORM',
        method: 'POST',
        body: JSON.stringify(data),
        headers: { accept: 'application/json', 'content-type': 'application/json'},
        credentials: 'include',
    }).then((r) => {
        if (!r.ok) {
            renderErrors(errorclass, [`Error: could not connect to shopping cart ${r.status} ${r.statusText}`]);
        } else {
            r.json().then((response) => {
                console.log(response)
                if (response.success) {
                    updateControls(response);
                    if (successfunc) successfunc();
                }
                else renderErrors(errorclass, [response.error]);
            }).catch((e) => {
                renderErrors(errorclass, [`Error: could not connect to shopping cart ${r.status} (${r.text()})`]);
            });
        }
    }).catch(e => {
            renderErrors(errorclass, [`Error: could not connect to shopping cart - ${e}`]);
        }
    );
}

// Find out whether user is logged in or not, and retrieve her cart if any
function getCartInfo() {
    callAuthApi('/getcartinfo', {}, 'signin')
}

// sign up logic/requests
function signUp(event) {
    event.preventDefault();
    callAuthApi('/registerjs',
        getFormData(document.querySelector('#signup')),
        'signup')
}

// sign in logic/requests
function signIn(event) {
    event.preventDefault();
    callAuthApi('/loginjs',
        getFormData(document.querySelector('#signin')),
        'signin')
}

function logout(event) {
    callAuthApi('/logoutjs', {}, 'signin', ()=>{hideModal();switchToModalControl();})
}

// call to set form error
// receives an array of error strings
function renderErrors(type, errors) {
    if (!errors || !Array.isArray(errors)) throw new TypeError("Pass an array of errors to the rederError function");
    if (!type) throw new Error('Provide an operation type to renderError');

    updateControls({}); // In case of error, reset all cart/usercontrols
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
        signinErrors.innerHTML = "";
        errorStrings.forEach(e => signinErrors.appendChild(e));
    } else if(type === 'signup') {
        signupErrors.innerHTML = "";
        errorStrings.forEach(e => signupErrors.appendChild(e));
    } else throw new SyntaxError("Pass a string of either 'signin' or 'signup'");
    return;
}

if (document.getElementById('arycarturl')) {
    const urlscript = new URL(document.getElementById('arycarturl').src);
    window.arycart.url = urlscript.origin;
} else {
    throw new Error('arycarturl is not defined. Aryga cart login & use can not work');
}

// whenever the window loads, check if cart is logged if not get cart info
window.onload = function() {
    window.isAryCartLogged ? switchToNavControl() : getCartInfo();
    const count = window.arycart?.cart?.length || 0;
    renderCart(count);
};

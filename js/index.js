const modal = document.querySelector('#modal_container');

// form controls
const signinErrors = document.querySelector('#signin_errors');
const signupErrors = document.querySelector('#signup_errors');
const signinRedirect = document.querySelector('#signin_redirect');
const signupRedirect = document.querySelector('#signup_redirect');
const content = document.querySelector('.content');

signinRedirect.addEventListener('click', function(event) {
    event.preventDefault()
    content.style.marginLeft = '-100%';
})

signupRedirect.addEventListener('click', function(event) {
    event.preventDefault()
    content.style.marginLeft = '0';
})

function openModal(event) {
    event.preventDefault();
    modal.classList.remove('closed');
    modal.classList.add('open');
}

function closeModal(event) {
    event.preventDefault();
    modal.classList.remove('open');
    modal.classList.add('closed');
}

function handleAuth(event) {
    event.preventDefault();

}

// function to call when setting form error
// receives an array of error strings
function renderErrors(errors, type) {
    if (!Array.isArray(errors)) throw new TypeError("Pass an array of errors to the rederError function");
    if (!type) throw new Error('Provide an operation type to renderError');

    
    const errorStrings = errors.map(e => {
        let err = document.createElement("p");
        err.classList.add('error');
        let t = document.createTextNode(e)
        err.appendChild(t);
        return err;
    });
    console.log(errorStrings)

    if (type === 'signin'){
        errorStrings.forEach(e => signinErrors.appendChild(e));
    } else if(type === 'signup') {
        errorStrings.forEach(e => signupErrors.appendChild(e));
    } else throw new SyntaxError("Pass a string of either 'signin' or 'signup'");
    return;
}
// controls for the auth-component and side-nav
const modal = document.querySelector('auth-component');
const sidenav = document.querySelector('side-nav');

// open/close auth modal
window.openModal = openModal
window.closeModal = closeModal

export function closeModal() {
  if (modal && modal.hasAttribute('open')) {
    modal.setAttribute('open', 'false')
  }
}
export function openModal() {
  if (modal && modal.hasAttribute('open')) {
    modal.setAttribute('open', 'true')
  }
}

// open/close side nav
export function closeSideNav() {
  if (sidenav && sidenav.hasAttribute('open')) {
    sidenav.setAttribute('open', 'false')
  }
}
export function openSideNav(event) {
  if (sidenav && sidenav.hasAttribute('open')) {
    if (Object.values(event.path).some(val => val.id === 'cart')) {
      sidenav.setAttribute('content', 'cart')
    }
    if (Object.values(event.path).some(val => val.id === 'sidenav_open_btn')) {
      sidenav.setAttribute('content', 'menu')
    }
    sidenav.setAttribute('open', 'true')
  }
}

/**
 * @param {String} id element id to stop loading & enable
 */
export function stopLoading(id, text) {
  const el = document.querySelector(id);
  if (el) {
    el.removeAttribute('disabled');
    el.innerHTML = text;
  }
}

export function successfulReset() {
  const btn = document.querySelector('#password_reset_btn');
  const info = document.querySelector('#reset_success');
  const email = document.querySelector('#reset_email');
  notify('Password reset Successfully!');

  btn.style.display = 'none';
  email.setAttribute('disabled', '');
  info.style.display = 'block';
}

/**
 * switch btwn sidenav control and auth modal control
 * @param {String} to the control to switch to. 'auth' or 'nav'
 */
export function switchControls(to) {
  const controls = document.querySelector('ary-controls')
  if (to) {
    if (to === 'auth') {
      controls.setAttribute('logged', false)
    }
    if (to === 'nav'){
      controls.setAttribute('logged', true)
    }
  }
}
/**
 * save data and switch to relevant controls
 * @param {Object} cartdata
 */
export function updateControls(cartdata=null) {
  if (cartdata) {
    const {setUser, updateCart} = window.arycartContext.actions

    if (cartdata.logged) {
        window.isAryCartLogged = cartdata.logged;
        setUser(cartdata.user)
        updateCart(cartdata.cart);
        switchControls('nav')
    } else {
        window.isAryCartLogged = false;
        setUser('');
        updateCart([])
        switchControls('auth')
    }
  }
}

/**
 * Initiate the notification popup
 * @param {String} msg String to pass to notification component
 */
export function notify(msg) {
  if (msg && typeof msg === "string") {
    const popup = document.querySelector('popup-notification');
    popup.setAttribute('message', msg);
  }
}
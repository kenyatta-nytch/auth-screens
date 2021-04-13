const modal = document.querySelector('auth-component');
const sidenav = document.querySelector('side-nav');

// open/close auth modal
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
export function openSideNav() {
  if (sidenav && sidenav.hasAttribute('open')) {
    sidenav.setAttribute('open', 'true')
  }
}

/*
  switch btwn sidenav control and auth modal control
  @params to{String} the control to switch to. 'auth' or 'nav'
*/
export function switchControls(to) {
  const controls = document.querySelector('ary-controls')
  if (to) {
    if (to === 'auth') {
      controls.removeAttribute('logged')
    }
    if (to === 'nav'){
      controls.setAttribute('logged', '')
    }
  }
}
/*
  save data and switch to relevant controls
  @params cartdata{Object}
*/
export function updateControls(cartdata) {
  if (cartdata.logged) {
      window.isAryCartLogged = cartdata.logged;
      window.arycart.user = cartdata.user;
      switchControls('nav')
  } else {
      window.isAryCartLogged = false;
      window.arycart.user = '';
      switchControls('auth')
  }

  if (cartdata.cart) {
      window.arycart.cart = cartdata.cart;
  } else {
    window.arycart.cart = []
  }
}
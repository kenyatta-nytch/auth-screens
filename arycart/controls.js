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
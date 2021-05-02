import { store, handlers } from './context.js'
import { AuthComponent, Controls, SideNav } from './components.js'
import { getCartInfo } from './apiCalls.js'

// context initialisations
// to add more state variables, add key-value in INITIAL_STATE then add handler to update in ./context.js
const INITIAL_STATE = {
  user: '',
  cart: []
}
const state = store(INITIAL_STATE)
const actions = handlers(state)

// create application context from initialised values
window.arycartContext = Object.freeze({ state, actions })

// for development
window.arycarturl = 'https://cart4.monmeublesurmesure.fr'

// for production
// if (document.getElementById('arycarturl')) {
//   const urlscript = new URL(document.getElementById('arycarturl').src);
//   window.arycart.url = urlscript.origin;
// } else {
//   throw new Error('arycarturl is not defined. Aryga cart login & use can not work');
// }

// whenever the window loads, check if cart is logged if not get cart info
window.onload = function() {
  window.isAryCartLogged ?? getCartInfo();
};

// create our custom elements
customElements.define('auth-component', AuthComponent)
customElements.define('ary-controls', Controls)
customElements.define('side-nav', SideNav)

import {AuthComponent, Controls, SideNav} from './components.js'
import { getCartInfo } from './apiCalls.js'

window.arycart = {}

// for development
window.arycart.url = 'https://cart4.monmeublesurmesure.fr'

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

customElements.define('auth-component', AuthComponent)
customElements.define('ary-controls', Controls)
customElements.define('side-nav', SideNav)
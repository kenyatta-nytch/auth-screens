import {MODAL, AUTH_CONTROL, SIDENAV_CONTROL, SIDENAV, SIGNIN, SIGNUP, CART_ICON} from './templateConstants.js'
import {openModal, closeModal, openSideNav, closeSideNav} from './controls.js'
import {signIn, signUp, logout} from './apiCalls.js'
import {generateHTML} from './helpers.js'

class Base extends HTMLElement {
  static get observedAttributes() { return ['open'] }

  toggle(type){
    if (this.hasAttribute('open')) {
      if (this.getAttribute('open') === 'true') {
        this.innerContainer.classList.add(`${type}_open`)
        this.innerContainer.classList.remove(`${type}_closed`)
      } else if (this.getAttribute('open') === 'false') {
        this.innerContainer.classList.add(`${type}_closed`)
        this.innerContainer.classList.remove(`${type}_open`)
      }
    }
  }
}

export class Controls extends HTMLElement {
  static get observedAttributes() { return ['logged',] }

  constructor() {
    super()
    this.cartTemplate = generateHTML(CART_ICON).cloneNode(true)
    this.authTemplate = generateHTML(AUTH_CONTROL).cloneNode(true)
    this.navTemplate = generateHTML(SIDENAV_CONTROL).cloneNode(true)

    this.appendChild(this.cartTemplate)
    this.style.display = 'flex'
    this.style.justifyContent = 'flex-end'
    this.style.padding = '5px 10px'
  }

  connectedCallback() {
    this.renderControls()

    window.arycartContext.state.addChangeListener(state => { this.updateCart(state.cart) })
  }

  attributeChangedCallback() {
    this.renderControls()
  }

  insert(control) {
    if (this.children.length == 1) {
      this.appendChild(control)
    }
    if (this.children.length > 1) {
      this.children[1].replaceWith(control)
    }
  }

  updateCart(cart) {
    this.count = Array.isArray(cart) && cart.length || 0
    this.querySelector('#cart-count').innerHTML = this.count
    this.querySelector('#cart-link').setAttribute('href', this.count > 0? '/order':'#')
  }

  renderControls() {
    if (window.isAryCartLogged) {
      this.insert(this.navTemplate)
      this.querySelector('#sidenav_open_btn').addEventListener('click', openSideNav)
    } else {
      this.insert(this.authTemplate)
      this.querySelector('#modal_open_btn').addEventListener('click', openModal)
    }
  }
}

export class AuthComponent extends Base {
  constructor() {
    super()
    this.template = generateHTML(MODAL).cloneNode(true)
    this.signin = generateHTML(SIGNIN).cloneNode(true)
    this.signup = generateHTML(SIGNUP).cloneNode(true)

    this.appendChild(this.template)
    this.innerContainer = this.querySelector('#modal_container')
    this.authContainer = this.querySelector('.content')

    this.authContainer.appendChild(this.signin)
    this.authContainer.appendChild(this.signup)
  }

  connectedCallback() {
    this.querySelector('#modal_close_btn').addEventListener('click', closeModal)
    this.querySelector('#signin').addEventListener('submit', signIn)
    this.querySelector('#signup').addEventListener('submit', signUp)
    this.querySelector('#signin_redirect')
        .addEventListener('click', () => this.authContainer.style.marginLeft = '0')
    this.querySelector('#signup_redirect')
        .addEventListener('click', () => this.authContainer.style.marginLeft = '-100%')
  }

  attributeChangedCallback() {
    this.toggle('modal')
  }
}

export class SideNav extends Base {
  constructor() {
    super()
    this.template = generateHTML(SIDENAV)

    const data = this.template.cloneNode(true)

    this.appendChild(data)
    this.innerContainer = this.querySelector('#side_nav')
  }
  
  connectedCallback() {
    this.querySelector('#close_side_nav').addEventListener('click', closeSideNav)
    this.querySelector('#logout').addEventListener('click', logout)

    window.arycartContext.state.addChangeListener(state => { this.updateUser(state) })
  }

  attributeChangedCallback() {
    this.toggle('side_nav')
  }

  updateUser(state) {
    this.user = state.user
    this.querySelector('#user-email').innerHTML = this.user
  }
}
// Web components classes.
import {MODAL, AUTH_CONTROL, SIDENAV_CONTROL, SIDENAV, SIGNIN, SIGNUP, CART_ICON, GO_TO_CART, productItem, itemsTotal, menuItem} from './templateConstants.js'
import {openModal, closeModal, openSideNav, closeSideNav} from './controls.js'
import {signIn, signUp, logout} from './apiCalls.js'
import {generateHTML} from './helpers.js'

// root class for modal and sidenav
class Base extends HTMLElement {
  static get observedAttributes() { return ['open'] }

  // handle open and closing of respective component
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

// ary-controls
// Hold cart component and control buttons for modal and sidenav
// return modal control when no signin. return sidenav control when user signin
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
    this.querySelector('#cart').addEventListener('click', openSideNav)
    // add a callback to application state context to be called when state changes.
    // updates cart whenever cart available in state changes
    window.arycartContext.state.addChangeListener(state => { this.updateCart(state.cart) })
  }

  attributeChangedCallback() {
    this.renderControls()
  }

  // insert controls after the cart component
  insert(control) {
    if (this.children.length == 1) {
      this.appendChild(control)
    }
    if (this.children.length > 1) {
      this.children[1].replaceWith(control)
    }
  }

  // Update cart number display and link
  updateCart(cart) {
    this.count = Array.isArray(cart) && cart.length || 0
    this.querySelector('#cart-count').innerHTML = this.count
    // this.querySelector('#cart-link').setAttribute('href', this.count > 0? '/order':'#')
  }

  // render the appropriate controls when logged in or out
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

// auth-component
// render signin/signup forms giving access to authentication process.
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

// side-nav
// render side navbar with user details only when user is logged in
export class SideNav extends Base {
  constructor() {
    super()
    // links to account menu
    this.menuItems = [
      {href: '/myprojects', label: 'My projects'},
      {href: '/myorders', label: 'My orders'},
      {href: '/account', label: 'My account'},
      {id: 'logout', href: '#', label: 'Logout'},
    ]
    this.cart = window.arycartContext.state.cart    // get current cart value
    this.template = generateHTML(SIDENAV)

    const data = this.template.cloneNode(true)

    this.appendChild(data)
    this.body = this.querySelector('.side_nav_body')
    this.innerContainer = this.querySelector('#side_nav')
  }
  
  connectedCallback() {
    this.setAttribute('content', 'cart')    // sets sidenav to render cart contents initially
    this.querySelector('#close_side_nav').addEventListener('click', closeSideNav)

    // render contents in the sidenav body
    this.renderMenu()
    this.renderCartContent()

    // callback to update user email and cart content when user in state changes
    window.arycartContext.state.addChangeListener(state => { this.updateUser(state) })
    window.arycartContext.state.addChangeListener(state => { this.renderCartContent(state) })
  }

  attributeChangedCallback() {
    this.toggle('side_nav')
    this.renderMenu()
    this.renderCartContent()
  }

  // add logged in user email to side nav
  updateUser(state) {
    this.user = state.user
    this.querySelector('#user-email').innerHTML = this.user
  }

  // display cart items
  renderCartContent(state) {
    if (state) this.cart = state.cart;    // update local cart property when called by state update
    
    // create list when side-nav content is cart
    if(this.hasAttribute('content') && this.getAttribute('content') === 'cart') {
      this.body.innerHTML = ''    // clear side-nav body contents

      // wrapper for items
      const list = document.createElement("div")
      list.id = 'cart-items';
      this.body.appendChild(list);

      // go to cart button
      this.body.appendChild(generateHTML(GO_TO_CART).cloneNode(true))

      // calculate total and render item cards for each item in cart
      if (this.cart.length > 0) {
        let total = 0
        this.cart.forEach(item => {
          total += (item.product.price * item.quantity)
          let cartItem = generateHTML(productItem(item)).cloneNode(true)
          cartItem.addEventListener('click', () => {window.location = `/meuble/${item.product.id}`})
          this.body.querySelector('#cart-items').appendChild(cartItem)
        })

        const totalComponent = generateHTML(itemsTotal(total)).cloneNode(true)
        this.body.querySelector('#cart-items').appendChild(totalComponent)
      } else {
        const noItems = document.createTextNode("No items in cart.")
        this.body.querySelector('#cart-items').appendChild(noItems)
      }
    }
  }

  // display account menu
  renderMenu() {
    if(this.hasAttribute('content') && this.getAttribute('content') === 'menu') {
      this.body.innerHTML = ''
      this.menuItems.forEach(item => {
        let link = generateHTML(menuItem(item)).cloneNode(true);
        this.body.appendChild(link)
      })
      this.querySelector('#logout').addEventListener('click', logout)
    }
  }
}

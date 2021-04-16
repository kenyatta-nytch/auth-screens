// Our proxy state with observers/listensers and handlers for our state
const clone = x => JSON.parse(JSON.stringify(x))
const freeze = state => Object.freeze(clone(state))

// state
export const store = initialState => {
  // callbacks for anytime state is changes
  let listeners = []

  // intercept changes to state object with a set trap and run each listed callbacks
  const proxy = new Proxy(clone(initialState), {
    set: (target, prop, value) => {
      target[prop] = value
      listeners.forEach(listener => listener(freeze(proxy)))
      return true
    }
  })

  // add a new callback to the list of callbacks
  proxy.addChangeListener = callback => {
    listeners.push(callback)
    callback(freeze(proxy))
  }

  return proxy
}

// actions
// methods called when changing state
export const handlers = state => {
  const setUser = user => {
    state.user = user
  }

  const updateCart = cart => {
    state.cart = cart
  }

  return {
    setUser,
    updateCart
  }
}
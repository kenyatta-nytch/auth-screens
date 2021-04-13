const clone = x => JSON.parse(JSON.stringify(x))
const freeze = state => Object.freeze(clone(state))

export default initialState => {
  let listeners = []

  const proxy = new Proxy(clone(initialState), {
    set: (target, prop, value) => {
      target[prop] = value
      listeners.forEach(listener => listener(freeze(proxy)))
      return true
    }
  })

  proxy.addChangeListener = callback => {
    listeners.push(callback)
    callback(freeze(proxy))
  }

  return proxy
}
export default state => {
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
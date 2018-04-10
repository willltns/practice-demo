import shop from '../../api/shop';

const state = {
  added: [],
  checkoutStatus: ''
};

const getters = {
  checkoutStatus: state => state.checkoutStatus,

  cartList: (state, getters, rootState) => state.added.map(({id, quantity}) => {
    const product = rootState.products.all.find(product => product.id === id);
    return {
      ...product,
      quantity
    }
  }),

  cartTotalPrice: (state, getters) => getters.cartList.reduce((total, cartProduct) => {
    return total + cartProduct.price * cartProduct.quantity
  }, 0)
};

const mutations = {
  addNewCartItem (state, {id}) {
    state.added.push({
      id,
      quantity: 1
    })
  },

  addCartQuantity: (state, addedProduct) => addedProduct.quantity ++,

  setCartList: (state,{cartList}) => state.added = cartList,

  setCheckoutStatus: (state, status) => state.checkoutStatus =status
};

const actions = {
  addToCart ({ commit, state}, product) {
    commit('setCheckoutStatus', null);
    if (product.inventory > 0) {
      const addedProduct = state.added.find( addedProduct => addedProduct.id === product.id);
      if (addedProduct) {
        // add quantity
        commit('addCartQuantity', addedProduct);
      } else {
        // add new item
        commit('addNewCartItem', product);
      }
      //decrement 1 inventory from this.kind of product
      commit('decrementInventory', product);
    }
  },

  checkout ({commit, state}, cartList) {
    const savedCartList = [...state.added];
    commit('setCheckoutStatus', null);
    // empty cart
    commit('setCartList',{cartList: []});
    shop.buyProducts(
      cartList,
      () => commit('setCheckoutStatus', 'successful'),
      () => {
        commit('setCheckoutStatus', 'failed');
        //failed to checkout and rollback cartList
        commit('setCartList', {cartList: savedCartList});
      }
    )
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}

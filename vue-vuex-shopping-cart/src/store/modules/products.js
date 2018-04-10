import shop from '../../api/shop';

const state = {
  all: []
};

const getters = {
  allProducts: state => state.all
};

const mutations = {
  setProducts (state, products) {
    state.all = products;
  },

  decrementInventory (state, {id}) {
    const product = state.all.find(product => product.id === id);
    product.inventory--;
  }
};

const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit('setProducts', products);
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}

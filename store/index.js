export const mutations = {
  SET_AUTH_DATA: (state, data) => {
    window.$nuxt.$cookies.set('_token', data.token, {
      path: '/',
    });
    window.$nuxt.$cookies.set('_userId', data.userId, {
      path: '/',
    })
  },

  REMOVE_AUTH_DATA: (state) => {
    window.$nuxt.$cookies.remove('_token');
    window.$nuxt.$cookies.remove('_userId');
  },
}

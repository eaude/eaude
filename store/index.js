import Vuex from 'vuex'
import axios from '~/plugins/axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      authUser: null
    },
    mutations: {
      SET_USER: function (state, user) {
        state.authUser = user
      }
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        if (req.session && req.session.passport) {
          commit('SET_USER', req.session.passport)
        }
      },
      login ({ commit }, { username, password }) {
        return axios('/api/login', {
          // Send the client cookies to the server
          credentials: 'same-origin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            email: username,
            password
          }
        })
          .then((res) => {
            commit('SET_USER', res.data)
          })
      },
      logout ({ commit }) {
        return fetch('/api/logout', {
          // Send the client cookies to the server
          credentials: 'same-origin',
          method: 'POST'
        })
          .then(() => {
            commit('SET_USER', null)
          })
      },
      uploadImage ({ commit }, formData) {
        return axios.post('/api/post/create', {
          formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
    }
  })
}

export default createStore

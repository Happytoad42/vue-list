import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '../services/EventService'

import * as user from '@/store/modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  state: {
    categories: [
      'education',
      'sustainability',
      'food',
      'community',
      'recreation',
      'animals'
    ],
    events: [],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(res => {
          commit('SET_EVENTS_TOTAL', res.headers['x-total-count'])
          commit('SET_EVENTS', res.data)
        })
        .catch(err => console.log(err.response))
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(res => {
            commit('SET_EVENT', res.data)
          })
          .catch(err => console.log(err))
      }
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})

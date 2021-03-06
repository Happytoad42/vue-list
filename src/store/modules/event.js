import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  eventsTotal: 0,
  perPage: 3,
  event: {}
}

export const mutations = {
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
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Event created successfully'
        }

        dispatch('notification/add', notification, { root: true })
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating event: ' + err.message
        }

        dispatch('notification/add', notification, { root: true })
        throw err
      })
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then(res => {
        commit('SET_EVENTS_TOTAL', res.headers['x-total-count'])
        commit('SET_EVENTS', res.data)
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + err.message
        }

        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id).then(res => {
        commit('SET_EVENT', res.data)
        return res.data
      })
    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}

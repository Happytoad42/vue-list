import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import EventCreate from '../views/EventCreate.vue'
import NotFound from '../views/NotFound'
import NetworkIssue from '../views/NetworkIssue'
import Example from '../views/Example'

import NProgress from 'nprogress'
import store from '@/store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('event/fetchEvent', routeTo.params.id)
        .then(event => {
          routeTo.params.event = event
          next()
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            next({ name: '404', params: { resourse: 'event' } })
          }
          next({ name: 'network-issue' })
        })
    }
  },
  {
    path: '/example',
    component: Example
  },
  {
    path: '/event-create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '*',
    redirect: { name: '404', params: { resourse: 'page' } }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((routeTo, fouteFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router

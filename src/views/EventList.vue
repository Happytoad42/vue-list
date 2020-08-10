<template>
  <div>
    <h1>Events for {{ user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{
          name: 'event-list',
          query: { page: page - 1 }
        }"
        rel="prev"
        >Previous page
      </router-link>
      |
    </template>
    <template v-if="event.eventsTotal > this.page * 3">
      <router-link
        :to="{
          name: 'event-list',
          query: { page: page + 1 }
        }"
        rel="next"
        >Next page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    EventCard
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['user', 'event'])
  },
  created() {
    this.perPage = 3
    this.fetchEvents({
      perPage: this.perPage,
      page: this.page
    })
  },
  methods: mapActions('event', ['fetchEvents'])
}
</script>

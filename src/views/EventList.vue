<template>
  <div>
    <h1>Event for {{ user.user.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
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
    <template v-if="this.eventsTotal > this.page * 3">
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
import { mapState } from 'vuex'
export default {
  components: {
    EventCard
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['user', 'events', 'eventsTotal'])
  },
  created() {
    this.$store.dispatch('fetchEvents', { perPage: 3, page: this.page })
  }
}
</script>

<template>
  <div>
    <h1>Create an event, {{ user.name }}</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        :options="categories"
        label="Select a category"
        v-model="event.category"
        :value="event.category"
        class="field"
      />
      <h3>Name and describe your event</h3>
      <BaseInput
        type="text"
        label="Title"
        placeholder="Set a title"
        v-model="event.title"
        :value="event.title"
        class="field"
      />
      <BaseInput
        type="text"
        label="Description"
        placeholder="Add a description"
        v-model="event.description"
        :value="event.description"
        class="field"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        type="text"
        label="Location"
        placeholder="Add a location"
        v-model="event.location"
        :value="event.location"
        class="field"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <DatePicker v-model="event.date" placeholder="Select a date" />
      </div>
      <BaseSelect
        label="Select time of event"
        :options="times"
        v-model="event.times"
        :value="event.times"
        class="field"
      />
      <BaseButton type="submit" buttonClass="-fill-gradient">
        <span>Submit</span>
      </BaseButton>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

export default {
  components: {
    DatePicker
  },
  data() {
    const times = []
    for (let i = 1; i < 24; i++) {
      times.push(i.toString().padStart(2, '0') + ':00')
    }
    return {
      times,
      user: this.$store.state.user,
      categories: this.$store.state.categories,
      event: this.createNewEventObject()
    }
  },
  methods: {
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          NProgress.done()
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createNewEventObject()
        })
        .catch(err => {
          NProgress.done()
          console.log(err)
        })
    },
    createNewEventObject() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 1000000)

      return {
        user,
        id,
        organizer: user,
        category: '',
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>

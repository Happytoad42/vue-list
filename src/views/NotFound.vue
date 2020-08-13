<template>
  <div>
    <h1>Error!</h1>
    <h3>The {{ resourse }} you are looking for does not exist</h3>
    <router-link :to="{ name: 'event-list' }">Back to the Homepage</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resourse: {
      type: String,
      required: true
    }
  }
}
</script>

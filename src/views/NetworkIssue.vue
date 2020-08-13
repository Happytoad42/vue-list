<template>
  <div>
    <h1>Error</h1>
    <h3>You are probably having newtwork issues.</h3>
    <p>Please click the back link below or try reloading this page</p>
    <router-link :to="{ name: 'event-list' }">Back to Homepage</router-link>
  </div>
</template>

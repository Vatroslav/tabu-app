<template>
  <div>
    <h1>Results Page</h1>
    <p>Welcome to the Results page!</p>
    <div id="user_details" v-if="userDetails">
      <h2>User Details</h2>
      <p>Name: {{ userDetails.name }}</p>
      <p>Email: {{ userDetails.email }}</p>
      <p>Profile Picture: <img :src="userDetails.picture" alt="Profile Picture"></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Results',
  computed: {
    ...mapState(['userDetails'])
  }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>

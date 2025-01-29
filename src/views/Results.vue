<template>
  <div>
    <Navbar />
    <div class="results">
      <h1>Results Page</h1>
      <p>Welcome to the Results page!</p>
      <!--
      <div id="user_details" v-if="userDetails">
        <h2>User Details</h2>
        <p>Name: {{ userDetails.name }}</p>
        <p>Email: {{ userDetails.email }}</p>
      </div>
      -->
    </div>
  </div>
</template>

<style scoped>
.results {
  margin-top: 97px; /* Adjust this value to ensure content starts below the navbar */
}
</style>

<script>
import { mapState } from 'vuex';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Results',
  components: {
    Navbar
  },
  computed: {
    ...mapState(['userDetails']),
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>

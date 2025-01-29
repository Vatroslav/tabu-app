<template>
  <div class="results">
    <img src="/tabu_small_logo_app.webp" alt="Tabu Small Logo" class="small-logo-app" />
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

@media (max-width: 768px) {
  .small-logo-app {
    top: calc(50% - 150px); /* Adjust this value to position the logo slightly above the text */
    text-align: center;
  }
}

@media (min-width: 768px) {
  .small-logo-app {
    position: absolute;
    left: 10px;
    top: 10px;
    max-height: 50vh;
    max-width: 50vw;
    z-index: 1;
    padding: 10px;
  }
}
</style>

<template>
  <div>
    <Navbar />
    <div class="results">
      <h1>My salary comparison</h1>
      <p class="label">My salary</p>
      <div class="salary-container">
        <p class="salary">1,234€</p>
        <p class="salary-label">net salary</p>
      </div>

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
.results {
  margin-top: 97px; /* Adjust this value to ensure content starts below the navbar */
  text-align: left;
  padding-left: 20px;
}

@media (min-width: 768px) {
  h1 {
    font-size: 48px;
    font-weight: bold;
    color: #333333;
    position: relative;
    display: inline-block;
    margin-bottom: 50px;
  }

  h1::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10px;
    z-index: -1;
    background-color: #D9FF80;
  }

  .salary-container {
    display: flex;
    flex-direction: column;
    width: fit-content; /* Container width becomes text size */
  }

  .label {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 5px;
    margin: 0;
    line-height: 1;
  }

  .salary {
    font-size: 72px;
    font-weight: bold;
    color: #FF9883;
    margin: 0;
    line-height: 1;
  }

  .salary-label {
    font-size: 18px;
    color: #333333;
    margin-top: 5px;
    text-align: right; /* Aligns right within the container */
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    position: relative;
    display: inline-block;
    margin-bottom: 50px;
  }

  h1::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5px;
    z-index: -1;
    background-color: #D9FF80;
  }

  .salary-container {
    display: flex;
    flex-direction: column;
    width: fit-content; /* Container width becomes text size */
  }

  .label {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 5px;
    margin: 0;
    line-height: 1;
  }

  .salary {
    font-size: 48px;
    font-weight: bold;
    color: #FF9883;
    margin: 0;
    line-height: 1;
  }

  .salary-label {
    font-size: 12px;
    color: #333333;
    margin-top: 5px;
    text-align: right; /* Aligns right within the container */
  }
}
</style>

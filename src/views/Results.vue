<template>
  <div>
    <Navbar />
    <div class="results">
      <h1>My salary comparison</h1>
      <p class="label">My salary</p>
      <div class="salary-container">
        <p class="salary">1,234 €</p>
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

h1 {
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
  z-index: -1;
  background-color: #D9FF80;
}

.salary-container {
  display: flex;
  flex-direction: column;
  width: fit-content; /* Container width becomes text size */
}
  
.label {
  font-weight: bold;
  color: #333333;
  margin-bottom: 40px;
  line-height: 1;
}

.salary {
  font-weight: bold;
  color: #FF9883;
  margin: 0;
  line-height: 1;
}

.salary-label {
  color: #333333;
  margin-top: 5px;
  text-align: right; /* Aligns right within the container */
}

@media (min-width: 768px) { /* Large screens */
  h1 {
    font-size: 48px;
  }

  h1::after {
    height: 10px;
  }

  .label {
    font-size: 24px;
  }

  .salary {
    font-size: 72px;
  }

  .salary-label {
    font-size: 18px;
  }
}

@media (max-width: 768px) { /* Mobile phones */
  h1 {
    font-size: 24px;
  }

  h1::after {
    height: 5px;
  }

  .label {
    font-size: 24px;
  }

  .salary {
    font-size: 48px;
  }

  .salary-label {
    font-size: 12px;
  }
}
</style>

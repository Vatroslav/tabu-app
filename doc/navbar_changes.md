# Navbar Changes

## Overview
Created a new navbar component and added it to the Results page. Ensured the navbar is not visible on the Login page. Moved the small logo from the Results page to the navbar. Moved the CSS for the logo from the Results page to the navbar component. Ensured the Navbar component is correctly imported and used in the Results page. Corrected the template structure in the Results page. Removed the links from the navbar. Updated the navbar styles to set the background color to white, position it behind the big logo from index.html, and set the height to 57px. Adjusted the z-index of the navbar to -2 and set its position to absolute with top: 0, left: 0, and width: 100%.

## Changes Made
1. Created a new navbar component (`src/components/Navbar.vue`).
2. Added the navbar to the Results page (`src/views/Results.vue`).
3. Verified that the navbar is not included in the Login page (`src/views/Login.vue`).
4. Moved the small logo from the Results page to the navbar.
5. Moved the CSS for the logo from the Results page to the navbar component.
6. Ensured the Navbar component is correctly imported and used in the Results page.
7. Corrected the template structure in the Results page.
8. Removed the links from the navbar.
9. Updated the navbar styles to set the background color to white, position it behind the big logo from index.html, and set the height to 77px.
10. Adjusted the z-index of the navbar to -2 and set its position to absolute with top: 0, left: 0, and width: 100%.

## Files Modified
- `src/components/Navbar.vue`
- `src/views/Results.vue`

## Final Content of Modified Files

### `src/components/Navbar.vue`
```vue
<template>
  <nav>
    <img src="/tabu_small_logo_app.webp" alt="Tabu Small Logo" class="small-logo-app" />
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
nav {
  background-color: white;
  height: 77px;
  z-index: -2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
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
```

### `src/views/Results.vue`
```vue
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

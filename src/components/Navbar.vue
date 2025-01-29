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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline;
  margin-right: 1em;
}

a {
  color: white;
  text-decoration: none;
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

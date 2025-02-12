# Views

The project includes several main views organized in the `src/views` directory.

## Key Views

- **AboutView.vue**: The about page view.
- **HomeView.vue**: The home page view.
- **LoginView.vue**: The login page view.
- **ResultsView.vue**: The results page view.

## View Structure

### AboutView.vue

```vue
<template>
  <div class="about-view">
    <!-- About view content -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutView',
  // View logic
})
</script>

<style scoped>
.about-view {
  /* Styles for about view */
}
</style>
```

### HomeView.vue

```vue
<template>
  <div class="home-view">
    <!-- Home view content -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  // View logic
})
</script>

<style scoped>
.home-view {
  /* Styles for home view */
}
</style>
```

### LoginView.vue

```vue
<template>
  <div class="login-view">
    <!-- Login view content -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginView',
  // View logic
})
</script>

<style scoped>
.login-view {
  /* Styles for login view */
}
</style>
```

### ResultsView.vue

```vue
<template>
  <div class="results-view">
    <!-- Results view content -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ResultsView',
  // View logic
})
</script>

<style scoped>
.results-view {
  /* Styles for results view */
}
</style>

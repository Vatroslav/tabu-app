# Components

The project includes several Vue components organized in the `src/components` directory.

## Key Components

- **HomeItem.vue**: Component used in the home view.
- **LoginItem.vue**: Component used in the login view.
- **NavbarItem.vue**: Component for the navigation bar.
- **icons/**: Directory for icon components.
- **__tests__/**: Directory for component tests.

## Component Structure

### HomeItem.vue

```vue
<template>
  <div class="home-item">
    <!-- Home item content -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeItem',
  // Component logic
})
</script>

<style scoped>
.home-item {
  /* Styles for home item */
}
</style>
```

### LoginItem.vue

```vue
<template>
  <div class="login-item">
    <!-- Login item content -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginItem',
  // Component logic
})
</script>

<style scoped>
.login-item {
  /* Styles for login item */
}
</style>
```

### NavbarItem.vue

```vue
<template>
  <nav class="navbar">
    <!-- Navigation bar content -->
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavbarItem',
  // Component logic
})
</script>

<style scoped>
.navbar {
  /* Styles for navigation bar */
}
</style>
```

## Icons

The `icons` directory contains icon components used throughout the application.

## Tests

The `__tests__` directory contains test files for the components, ensuring they function as expected.

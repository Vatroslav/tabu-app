# Components

The project includes several Vue components organized in the `src/components` directory.

## Key Components

- **HomeItem.vue**: Component used in the home view.
- **LoginItem.vue**: Component used in the login view.
- **NavbarItem.vue**: Component for the navigation bar.
- **SubmissionItem.vue**: Component used in the submission view.
- **icons/**: Directory for icon components.
- **__tests__/**: Directory for component tests.

## Component Structure

### HomeItem.vue

### SubmissionItem.vue

```vue
<template>
  <div class="submission-item">
    <h2>Submission Details</h2>
    <p><strong>Message:</strong> {{ submission.message }}</p>
    <p><strong>Contract Type:</strong> {{ submission.contract_type }}</p>
    <p><strong>Country Salary:</strong> {{ submission.country_salary }}</p>
    <p><strong>Position:</strong> {{ submission.position }}</p>
    <p><strong>Position Group:</strong> {{ submission.position_group }}</p>
    <p><strong>Seniority:</strong> {{ submission.seniority }}</p>
    <p><strong>Tech:</strong> {{ submission.tech }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SubmissionItem',
  props: {
    submission: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>
.submission-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px 0;
}
</style>
```

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

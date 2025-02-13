# Views

The project includes several main views organized in the `src/views` directory.

## Key Views

- **AboutView.vue**: The about page view.
- **HomeView.vue**: The home page view.
- **LoginView.vue**: The login page view.
- **ResultsView.vue**: The results page view.
- **SubmissionView.vue**: The submission page view.

## View Structure

### AboutView.vue

### SubmissionView.vue

```vue
<template>
  <div class="submission-view">
    <h1>Submission Check</h1>
    <SubmissionItem v-if="submission" :submission="submission" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import SubmissionItem from '../components/SubmissionItem.vue'
import { submissionCheck } from '../services/submission'

export default defineComponent({
  name: 'SubmissionView',
  components: {
    SubmissionItem
  },
  setup() {
    const submission = ref(null)
    const error = ref('')

    onMounted(async () => {
      const userDataString = localStorage.getItem('userData')
      if (userDataString) {
        const userData = JSON.parse(userDataString)
        const id = userData.id
        if (id) {
          try {
            const data = await submissionCheck(id)
            submission.value = data.data.response
          } catch (err: unknown) {
            if (err instanceof Error) {
              error.value = err.message
            } else {
              error.value = String(err)
            }
          }
        } else {
          error.value = 'Unique ID is required'
        }
      } else {
        error.value = 'User data not found'
      }
    })

    return {
      submission,
      error
    }
  }
})
</script>

<style scoped>
.submission-view {
  padding: 20px;
}
</style>
```

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

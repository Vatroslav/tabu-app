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
            submission.value = data.response
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

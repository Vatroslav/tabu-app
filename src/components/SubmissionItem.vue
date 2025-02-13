<template>
  <div class="submission-item">
    <h2>Submission Details</h2>
    <p><strong>Unique ID:</strong> {{ submission.unique_id }}</p>
    <p><strong>Status:</strong> {{ submission.status }}</p>
    <p><strong>Message:</strong> {{ submission.message }}</p>
    <!-- Add more fields as needed -->
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

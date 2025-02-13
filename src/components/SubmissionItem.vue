<template>
  <div class="submission-item">
    <h2>Submission Details</h2>
    <p><strong>Unique ID:</strong> {{ submission.unique_id }}</p>
    <p><strong>Status:</strong> {{ submission.status }}</p>
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

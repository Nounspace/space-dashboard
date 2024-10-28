<!-- ../components/Leaderboard.vue -->
<template>
  <div class="leaderboard-container">
    <h2 class="leaderboard-title">{{ title }}</h2>
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in entries" :key="index">
          <td class="user-cell">
            <a :href="`https://nounspace.com/s/${entry.username}`" target="_blank" class="user-link">
              <img v-if="entry.pfp_url" :src="entry.pfp_url" alt="Profile Picture" class="profile-pic" />
              <span>{{ entry.display_name }}</span>
            </a>
          </td>
          <td>{{ entry.amount_received }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  entries: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.leaderboard-container {
  padding: 10px;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  width: 100%;
}

.leaderboard-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
}

.leaderboard-table th,
.leaderboard-table td {
  border: 1px solid #eeeeee;
  padding: 8px;
  text-align: left;
}

.leaderboard-table th {
  background-color: #f4f4f4;
  font-weight: 700;
}

.leaderboard-table tbody tr:hover {
  background-color: #f0f0f0;
}

.profile-pic {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
  vertical-align: middle;
}

.user-cell {
  display: flex;
  align-items: center;
}
</style>

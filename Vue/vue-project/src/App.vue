<script setup>
import { ref, onMounted } from 'vue'

const rawData = ref(null)
const loading = ref(true)
const error = ref(null)
const headers = ref([])
const rows = ref([])

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/sheet-data');
    if (!response.ok) {
      error.value = 'The server couldn’t load the sheet data. Try again in a moment';
      return;
    }
    const json = await response.json()
    headers.value = json.data[0];
    rows.value = json.data.slice(1);
  } catch (err) {
    error.value = 'Unable to connect to server';
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <main>
    <h1>Budget Dashboard</h1>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <table v-else>
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, r) in rows" :key="r">
          <td v-for="(header, c) in headers" :key="c">{{ row[c] ?? '' }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
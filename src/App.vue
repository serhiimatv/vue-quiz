<script setup lang="ts">

</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="purple-darken-2 pr-16 ga-15" elevation="3">
      <v-app-bar-title class="app-title">Вікторина</v-app-bar-title>
      <RouterLink class="app-link" to="/">Головна</RouterLink>
      <RouterLink class="app-link" to="/builder">Конструктор вікторини</RouterLink>
    </v-app-bar>

    <RouterView />
  </v-layout>
</template>

<style scoped>
.app-title {
  font-size: 30px;
  font-style: bold;
}

.app-link {
  color: white;
  text-decoration: none;
  margin-right: 10px;
  font-size: 20px;
}
.active {
  text-decoration: underline;
}
</style>

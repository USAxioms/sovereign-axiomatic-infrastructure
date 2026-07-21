<template>
  <nav class="navbar">
    <h1 class="logo">ADVANCEER</h1>
    <ul class="links">
      <li><router-link to="/">Home</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
// Simple global navigation bar.
// Expand as needed.
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #222;
  color: #fff;
}
.logo {
  font-size: 1.4rem;
  font-weight: bold;
}
.links {
  list-style: none;
  display: flex;
  gap: 1rem;
}
a {
  color: #fff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>

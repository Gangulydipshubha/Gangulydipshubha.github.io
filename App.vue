<script setup>
import HelloWorld from './components/Visualizer.vue'
</script>

<template>
  <div style="background:#0f172a;height:100vh;padding:30px;color:white;">
    <h1>Expression Visualizer 🎯</h1>
    <Visualizer/>
  </div>
</template>

<script>
import Visualizer from "./components/Visualizer.vue";
export default { components: { Visualizer } };
</script>

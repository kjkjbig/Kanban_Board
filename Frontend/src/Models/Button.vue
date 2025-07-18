<template>
  <button :class="Class" @click="onClick">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  Class: string
  onClick?: () => void
}>()
</script>
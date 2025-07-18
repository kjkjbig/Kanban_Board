<template>
  <div class="w-screen h-screen bg-white">
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-3xl font-bold mb-4">Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" class="mb-2 p-2 border" />
        <input v-model="password" type="password" placeholder="Password" class="mb-2 p-2 border mx-1" />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2">Login</button>
      </form>
      <p class="text-3xl font-bold">or</p>
      <button @click="register" class="bg-yellow-400 text-white px-4 py-2 mt-3">Register</button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/login', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    console.log('success')
    router.push('/Kanban')
  } catch (err) {
    console.log(err)
    error.value = 'Invalid email or password'
  }
}

const register = async () => {
    try {
        router.push('/register')
    }catch (err) {
        console.log(err)
        error.value = 'error'
    }
}
</script>

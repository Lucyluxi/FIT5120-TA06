<!-- src/views/AuthView.vue -->
<template>
    <div class="w-screen h-screen flex items-center justify-center">
      <div class="flex flex-col items-center justify-center">
        <h2 class="text-2xl mb-4">Enter Password</h2>
        <input
          type="password"
          v-model="passwordInput"
          placeholder="Password"
          class="border p-2 rounded mb-4"
        />
        <button @click="checkPassword" class="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
        <p v-if="error" class="text-red-500 mt-2">Incorrect password. Try again.</p>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const passwordInput = ref('')
  const error = ref(false)
  
  const checkPassword = () => {
    if (passwordInput.value === '123456') {
      localStorage.setItem('authenticated', 'true')
      error.value = false
      router.replace('/')
    } else {
      error.value = true
    }
  }
  </script>
  
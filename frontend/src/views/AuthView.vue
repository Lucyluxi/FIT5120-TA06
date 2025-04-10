<template>
    <div class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white" style="z-index: 9999;">
      <div class="card p-4 shadow" style="min-width: 300px;">
        <h4 class="mb-3 text-center">Enter Password</h4>
        <input
          type="password"
          v-model="passwordInput"
          class="form-control mb-3"
          placeholder="Password"
        />
        <button
          @click="checkPassword"
          class="btn btn-primary w-100"
        >
          Submit
        </button>
        <div v-if="error" class="text-danger mt-2 text-center">
          Incorrect password. Try again.
        </div>
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
      sessionStorage.setItem('authenticated', 'true')
      error.value = false
      router.replace('/')
    } else {
      error.value = true
    }
  }
  </script>
  
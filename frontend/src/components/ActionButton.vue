<template>
    <button class="action-button" @click="$emit('click')">
      {{ label }}
    </button>
  </template>
  
  <script>
  export default {
    name: "ActionButton",
    props: {
      label: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .action-button {
    background-color: #e08f55;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  .action-button:hover {
    background-color: #cf7b40;
  }
  </style>
  
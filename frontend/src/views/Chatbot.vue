<template>
  <div class="chatbot-container" :class="{ 'chatbot-open': isOpen }">
    <!-- Chatbot Button -->
    <button class="chatbot-toggle" @click="toggleChatbot">
      💬 Chat
    </button>

    <!-- Chatbot Window -->
    <div v-if="isOpen" class="chatbot-window">
      <div class="chatbot-header">
        <button @click="toggleChatbot">✖</button>
      </div>
      <div class="chatbot-body">
        <p>Hello 👋 </p>
        <p>How can we help you today?</p>
        <ul>
          <li>
            <button @click="sendMessage('I\'d like help with organising care services for myself, or a loved one.')">
              I'd like help with organising care services for myself, or a loved one.
            </button>
          </li>
          <li>
            <button @click="sendMessage('I\'d like help with organising disability supports for myself, or a loved one.')">
              I'd like help with organising disability supports for myself, or a loved one.
            </button>
          </li>
          <li>
            <button @click="sendMessage('I\'m looking for work')">I'm looking for work</button>
          </li>
          <li>
            <button @click="sendMessage('I have a different question')">I have a different question</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleChatbot() {
      this.isOpen = !this.isOpen;
    },
    sendMessage(message) {
      console.log(`User selected: ${message}`);
      this.toggleChatbot();
    },
  },
};
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chatbot-toggle {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
}

.chatbot-window {
  width: 300px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 15px;
  margin-bottom: 10px;
}

.chatbot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 5px;
}

.chatbot-header h3 {
  margin: 0;
}

.chatbot-body ul {
  list-style: none;
  padding: 0;
}

.chatbot-body button {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
}

.chatbot-body button:hover {
  background-color: #007bff;
  color: #fff;
}
</style>

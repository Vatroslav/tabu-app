import { ref } from 'vue';

class WebSocketService {
  constructor() {
    this.socket = ref(null);
    this.url = process.env.VUE_APP_WSS_URL;
  }

  connect() {
    this.socket.value = new WebSocket(this.url);

    this.socket.value.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.value.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    this.socket.value.onclose = () => {
      console.log('WebSocket disconnected');
    };

    this.socket.value.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message) {
    if (this.socket.value && this.socket.value.readyState === WebSocket.OPEN) {
      this.socket.value.send(message);
    }
  }

  disconnect() {
    if (this.socket.value) {
      this.socket.value.close();
    }
  }
}

export default WebSocketService;

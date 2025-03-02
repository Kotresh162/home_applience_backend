const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log('Connected to WebSocket server');

  setInterval(() => {
    const telemetryData = {
      deviceId: 'device-123',
      telemetry: {
        temperature: Math.random() * 50,
        powerUsage: Math.random() * 100
      }
    };

    ws.send(JSON.stringify(telemetryData));
    console.log('Sent:', telemetryData);
  }, 5000); // Send data every 5 seconds
});

ws.on('message', (message) => {
  console.log('Received update from server:', message);
});

ws.on('close', () => console.log('Disconnected from WebSocket server'));

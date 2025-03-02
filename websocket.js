const WebSocket = require('ws');
const EnergyConsumption = require('./models/EnergyConsumption');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      const { userId, deviceId, deviceName, energyUsed } = data;

      const energyRecord = new EnergyConsumption({ userId, deviceId, deviceName, energyUsed });
      await energyRecord.save();

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ userId, deviceId, deviceName, energyUsed, timestamp: new Date() }));
        }
      });

    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

module.exports = wss;

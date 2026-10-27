const mineflayer = require('mineflayer');
const http = require('http');

// 1. Create a tiny web server so Railway detects an open port and stops hanging on "Deploying"
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Minecraft Bot is running 24/7!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Web server is listening on port ${PORT}`);
});

// 2. Your Minecraft Bot Code
const bot = mineflayer.createBot({
  host: 'Gpinoyserver.aternos.me', // Replace with your Aternos IP
  port: 59345,                  // Replace with your port number
  username: 'Mod',           // Bot username
  version: false                    // Auto-detect version
});

bot.on('spawn', () => {
  console.log('Bot has successfully joined the server!');
});

bot.on('error', (err) => {
  console.log('An error occurred:', err);
});

bot.on('end', () => {
  console.log('Bot disconnected. Reconnecting...');
  setTimeout(() => {
    process.exit(1); // Restarts the service to try again
  }, 5000);
});

const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'Gpinoyserver.aternos.me',
  port: 59345,
  username: 'Mod',
  version: false // Automatically detects version
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
    process.exit(1); // Forces Railway to restart the bot
  }, 5000);
});

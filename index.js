const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is safe'));
app.listen(process.env.PORT || 3000);

const CONFIG = {
  host: 'Gpinoyserver.aternos.me',
  port: 59345,
  username: 'Mod',
  version: false,
  auth: 'offline'
};

function createBot() {
  const bot = mineflayer.createBot(CONFIG);
  bot.on('spawn', () => {
    console.log('SAFE SPAWN!');
    bot.physicsEnabled = false; // DILI NA MO HULOG
  });
  bot.on('end', () => setTimeout(createBot, 60000));
  bot.on('kicked', () => setTimeout(createBot, 60000));
  bot.on('error', () => setTimeout(createBot, 60000));
}
createBot(); 
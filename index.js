const { createBot } = require('mineflayer-viaproxy');
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot 26.52 Online - Mod is AFK!'));
app.listen(process.env.PORT || 3000);

async function start() {
  console.log('Starting Bot 26.52...');
  try {
    const bot = await createBot({
      host: 'Gpinoyserver.aternos.me',
      port: 59345,
      username: 'Mod',
      auth: 'offline',
      version: '26.52'
    });

    bot.on('spawn', () => {
      console.log('JOINED 26.52!');
      bot.chat('/minecraft:tp 0 200 0');
    });

    bot.on('end', () => {
      console.log('Bot disconnected, reconnecting in 10s...');
      setTimeout(start, 10000);
    });

    bot.on('error', (err) => {
      console.log('Error:', err.message);
      setTimeout(start, 10000);
    });

  } catch (e) {
    console.log('Failed to start, retrying...', e.message);
    setTimeout(start, 10000);
  }
}
start();
const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('AFK Bot Stable!'));
app.listen(process.env.PORT || 3000);

const CONFIG = {
  host: 'Gpinoyserver.aternos.me',
  port: 59345,
  username: 'Mod',
  version: false,
  auth: 'offline'
};

let timer;
function createBot() {
  console.log('Starting stable bot...');
  const bot = mineflayer.createBot({
    host: CONFIG.host,
    port: CONFIG.port,
    username: CONFIG.username,
    version: CONFIG.version,
    auth: CONFIG.auth,
    hideErrors: true
  });

  bot.on('spawn', () => {
    console.log('STABLE! Bot joined - walay lihok!');
  });

  bot.on('end', () => reconnect());
  bot.on('kicked', (r) => { console.log('Kicked:', r); reconnect(); });
  bot.on('error', (e) => { console.log('Error:', e.message); reconnect(); });

  function reconnect() {
    if (timer) return;
    console.log('Reconnect after 60 sec...');
    timer = setTimeout(() => { timer = null; createBot(); }, 60000);
  }
}
createBot();
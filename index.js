const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('AFK Bot is Running 24/7! Boss Plouu!'));
app.listen(process.env.PORT || 3000, () => console.log('Web server running'));

// ===== ILISI NI BOSS - IMONG ATERNOS SERVER =====
const CONFIG = {
  host: 'Gpinoyserver.aternos.me',
  port: 59345,
  username: 'Mod',
  version: false, // AUTO-DETECT - AYAW NA ILISI OG 26.3!
  auth: 'offline'
};

let bot;
let timer;

function createBot() {
  console.log('Starting bot...');
  bot = mineflayer.createBot({
    host: CONFIG.host,
    port: CONFIG.port,
    username: CONFIG.username,
    version: CONFIG.version,
    auth: CONFIG.auth
  });

  bot.loadPlugin(pathfinder);

  bot.on('spawn', () => {
    console.log('Bot joined!');
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);

    setInterval(() => {
      try { bot.chat('AFK Bot active 24/7!'); } catch(e){}
    }, 300000);

    setInterval(() => {
      if(!bot || !bot.entity) return;
      const x = bot.entity.position.x + (Math.random()*6-3);
      const z = bot.entity.position.z + (Math.random()*6-3);
      const y = bot.entity.position.y;
      try {
        bot.pathfinder.setMovements(new Movements(bot));
        bot.pathfinder.setGoal(new goals.GoalNear(x, y, z, 1));
      } catch(e){}
    }, 45000);
  });

  bot.on('end', reconnect);
  bot.on('kicked', (r) => { console.log('Kicked:', r); reconnect(); });
  bot.on('error', (e) => { console.log('Error:', e.message); reconnect(); });
}

function reconnect() {
  if(timer) return;
  console.log('Reconnect in 10s...');
  timer = setTimeout(() => { timer=null; createBot(); }, 10000);
}

createBot();

const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('AFK Bot is Running 24/7! Boss Plouu!'));
app.listen(process.env.PORT || 3000, () => console.log('Web server running'));

const CONFIG = {
  host: 'Gpinoyserver.aternos.me',
  port: 59345,
  username: 'Mod',
  version: false,
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
    auth: CONFIG.auth,
    checkTimeoutInterval: 60*1000
  });

  bot.on('spawn', () => {
    console.log('Bot joined! AFK Mode ON');
    // DILI NA MO JUMP O MO LAKAW - PARA DILI MA KICK
    bot.setControlState('sneak', true);
    
    // Chat matag 5 minutes lang para dili spam
    setInterval(() => {
      try { 
        if(bot && bot.entity) bot.chat('AFK Bot active!'); 
      } catch(e){}
    }, 300000);
  });

  bot.on('end', () => {
    console.log('Bot disconnected');
    reconnect();
  });
  
  bot.on('kicked', (r) => { 
    console.log('Kicked:', r); 
    reconnect(); 
  });
  
  bot.on('error', (e) => { 
    console.log('Error:', e.message); 
    reconnect(); 
  });
}

function reconnect() {
  if(timer) return;
  console.log('Reconnect in 15 seconds... para dili ma spam login');
  timer = setTimeout(() => {
    timer = null;
    createBot();
  }, 15000); // 15 SECONDS - DILI NA 10s
}

createBot();
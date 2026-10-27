const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
app.get('/', (req,res)=>res.send('Bot Online - Auto Version'));
app.listen(process.env.PORT || 3000);

const config = {
  host: 'Gpinoyserver.aternos.me',
  port: 59345,
  username: 'Mod',
  version: false
};

function start(){
  console.log('Connecting Mod...');
  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: false,
    auth: 'offline',
    hideErrors: true
  });
  
  bot.on('spawn', ()=>{
    console.log('MOD JOINED! - VERSION OK NA!');
    bot.chat('/minecraft:tp 0 200 0');
  });
  
  bot.on('kicked', (r)=>{console.log('KICKED:',r); setTimeout(start,15000)});
  bot.on('error', (e)=>{console.log('ERROR:',e); setTimeout(start,15000)});
  bot.on('end', ()=>{console.log('END - RECONNECTING'); setTimeout(start,15000)});
}
start();
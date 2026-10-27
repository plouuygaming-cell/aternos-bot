const { createBot } = require('mineflayer-viaproxy');
const express = require('express');
const app = express();
app.get('/', (req,res)=>res.send('Bot 26.52 Online'));
app.listen(process.env.PORT || 3000);
async function start(){
  const bot = await createBot({
    host: 'Gpinoyserver.aternos.me',
    port: 59345,
    username: 'Mod',
    auth: 'offline'
  });
  bot.on('spawn', ()=>{console.log('JOINED 26.52!'); bot.chat('/minecraft:tp 0 200 0');});
  bot.on('end', ()=>setTimeout(start,10000));
}
start();
const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
app.get('/', (req,res)=>res.send('Bot Online'));
app.listen(process.env.PORT || 3000);

const config = {
  host: 'Gpinoyserver.aternos.me',
  port: 59345,
  username: 'Mod',
  version: '1.20.1'
};

function start(){
  const bot = mineflayer.createBot({
    ...config,
    auth: 'offline',
    checkTimeoutInterval: 60000,
    hideErrors: true
  });
  
  bot.on('spawn', ()=>{
    console.log('JOINED!');
    bot.waitForChunksToLoad(()=>{
      bot.chat('/minecraft:tp 0 100 0');
    });
  });
  
  bot.on('kicked', (r)=>{console.log('kicked',r); setTimeout(start,30000)});
  bot.on('end', ()=>setTimeout(start,30000));
}
start();
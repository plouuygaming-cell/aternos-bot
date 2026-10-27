const { createBot } = require('mineflayer-viaproxy');
const express = require('express');
const app = express();
app.get('/', (req,res)=>res.send('Bot 26.3 Online'));
app.listen(process.env.PORT || 3000);

async function start(){
  console.log('Connecting to 26.3 server...');
  const bot = await createBot({
    host: 'Gpinoyserver.aternos.me',
    port: 59345,
    username: 'Mod',
    auth: 'offline'
  });

  bot.on('spawn', ()=>{
    console.log('MOD JOINED 26.3!');
    bot.chat('/minecraft:tp 0 200 0');
  });
  
  bot.on('kicked', (r)=>{console.log('KICKED',r); setTimeout(start,15000)});
  bot.on('end', ()=>setTimeout(start,15000));
}
start();
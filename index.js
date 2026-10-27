const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bedrock AFK Bot Online!'));
app.listen(process.env.PORT || 3000);

const CONFIG = {
  host: 'Gpinoyserver.aternos.me',
  port: 59345,
  username: 'Mod',
  offline: true
};

function createBot() {
  console.log('Connecting as Bedrock Mod...');
  const client = bedrock.createClient({
    host: CONFIG.host,
    port: CONFIG.port,
    username: CONFIG.username,
    offline: true,
    version: '1.20.80'
  });
  client.on('spawn', () => {
    console.log('BEDROCK MOD JOINED - OK NA!');
  });
  client.on('close', () => {
    setTimeout(createBot, 60000);
  });
  client.on('error', () => {
    setTimeout(createBot, 60000);
  });
}
createBot();
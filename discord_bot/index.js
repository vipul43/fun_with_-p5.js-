require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.CLIENT_LOGIN);

client.on('ready', readyDiscord);
function readyDiscord() {
    console.log('Bot is online');
}

client.on('message', gotMessage);
function gotMessage(msg) {
    // console.log(msg);
    if(msg.content === '!hi'){
        msg.reply('hi there');
    }
    if(msg.channel.id === process.env.DCP_CHANNEL_ID && msg.content === '!quest'){
        msg.reply('didn\'t solve any question');
    }
}

//ideas
// 1) Magic 8 ball --> !8
// 2) daily cp problem generator -> !mine && status of dcp -> !quest
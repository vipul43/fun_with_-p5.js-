require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.CLIENT_LOGIN);
client.on('ready', readyDiscord);
client.on('message', gotMessage);

const fetch = require('node-fetch');

// log space


async function gotMessage(msg) {
    // console.log(msg);
    if(msg.content[0] === '!'){
        if(msg.content === '!hi'){
            reply(msg);
        } else if(msg.channel.id === process.env.DCP_CHANNEL_ID && msg.content === '!quest'){
            quest(msg);
        } else if(msg.channel.id === process.env.DCP_CHANNEL_ID && msg.content === '!mine') {
            mine(msg);
        } else if(msg.content === '!8') {
            eight(msg);
        }


        else {
            trythese(msg);
        }
    }
}
function readyDiscord() {
    client.user.setActivity("you", { type: "LISTENING"})
    console.log("Bot is online👍🏻");
}
function reply(msg){
    msg.reply("hi there👋");
}
function quest(msg){
    msg.reply("Here is your generated question");
}
function mine(msg){
    msg.reply("You are on level x");
}
async function eight(msg){
    const mood = generateRandomMood();
    const url = `https://api.tenor.com/v1/random?q=${mood}&key=${process.env.TENOR_KEY}&limit=11&locale=en&ar_range=standard`;
    const response = await fetch(url);
    const json = await response.json();
    const results = json.results;
    // console.log(json);
    msg.reply('shaking...'); //add loading animation here
    msg.channel.send(results[Math.floor(Math.random() * results.length)].url);
}
function trythese(msg){
    msg.reply('I didn\'t get what you are trying to say😅 \nTry these instead\n 👉🏻!hi\n👉🏻!mine\n👉🏻!quest');
}
function generateRandomMood(){
    const categories = ["excited", "movies", "happy"];
    return categories[Math.floor(Math.random() * categories.length)];
}
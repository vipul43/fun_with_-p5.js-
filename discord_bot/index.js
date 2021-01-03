require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.CLIENT_LOGIN);
client.on('ready', readyDiscord);
client.on('message', gotMessage);

const fetch = require('node-fetch');

function readyDiscord() {
    client.user.setActivity("you", { type: "LISTENING"})
    console.log("Bot is online👍🏻");
}
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
    const randChoice = Math.floor(Math.random() * 3);
    if(randChoice==0){
        gifGenerator(msg);
    } else if(randChoice==1){
        quoteGenerator(msg);
    } else {
        imageGenerator(msg);
    }
}
function trythese(msg){
    msg.reply('I didn\'t get what you are trying to say😅 \nTry these instead\n 👉🏻!hi\n👉🏻!mine\n👉🏻!quest');
}

// HELPER FUNCTIONS

async function gifGenerator(msg){
    const categories = ["excited", "movies", "happy", "smile", "laugh"];
    const mood = categories[Math.floor(Math.random() * categories.length)];
    const url = `https://api.tenor.com/v1/random?q=${mood}&key=${process.env.TENOR_KEY}&limit=11&locale=en&ar_range=standard`;
    const response = await fetch(url);
    const json = await response.json();
    const results = json.results;
    // console.log(json);
    msg.reply(`shaking...here is your gif to relax😍\n${results[Math.floor(Math.random() * results.length)].url}`);
}
async function quoteGenerator(msg){
    const url = `https://api.quotable.io/random`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(`${data.content} —${data.author}`);
    msg.reply(`shaking...here is your quote to ponder💯\n"${data.content}" —${data.author}`);
}
async function imageGenerator(msg){
    const url = `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(`${data.urls.regular}`);
    msg.reply(`shaking...here is your image to enjoy👍🏻\n${data.urls.regular}`);
}
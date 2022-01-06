const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const ms = require("parse-ms");


exports.run = async (client, message, args) => {
  const db = new Database("./Servers/license", "license");
  const dbs = new Database("./Servers/times", "license");

  const tr = await dbs.get(`str.${message.guild.id}`);
  const trs = await dbs.get(`strs.${message.guild.id}`);

  let pad_zero = num => (num < 10 ? '0' : '') + num;

  if (trs - (Date.now() - tr) > 0) {
    let timeObj = ms(trs - (Date.now() - tr));

    let days = pad_zero(timeObj.days).padStart(2, "0"),
    hours = pad_zero(timeObj.hours).padStart(2, "0"),
      mins = pad_zero(timeObj.minutes).padStart(2, "0"),
      secs = pad_zero(timeObj.seconds).padStart(2, "0");
    let finalTime = `${days}일${hours}시간${mins}분${secs}초`;
    message.reply({embed: { color: "RED", description: `남은기간: ${finalTime}`}})
  } 
  if (trs - (Date.now() - tr) < 0) {
    let finalTime = `남은시간이 없습니다.`;
    message.reply({embed: { color: "RED", description: `남은기간: ${finalTime}`}})
  }
  if (!tr || !trs) {
    let finalTime = `등록된 시간이 없습니다`;
    message.reply({embed: { color: "RED", description: `남은기간: ${finalTime}`}})
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "남은기간",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["남은기간"],
  cooldown: 0
}

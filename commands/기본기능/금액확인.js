const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const dbs = new Database("./Servers/" + message.guild.id, "Channels");
  let chan = dbs.get(`Self.${message.guild.id}`)
  if (message.channel.id !== chan) {
      message.delete()
      return message.reply("조회가능한 채널이 아닙니다.")
  }

  const db = new Database("./Servers/" + message.guild.id, "UserCoin");

  var coin = await db.get(`UserCoin.${message.author.id}`) || 0;
  var Accumulate = await db.get(`UserAccumulate.${message.author.id}`) || 0;

  message.reply({embed: { color: "RANDOM", description: `${message.author}님의 금액은 현재: ${coin.toLocaleString()}원 입니다. \n누적금액은 현재: ${Accumulate.toLocaleString()}원 입니다.`}})
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "금액확인",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["금액확인"],
  cooldown: 0
}

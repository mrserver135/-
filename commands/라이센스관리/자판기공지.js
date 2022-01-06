const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  var messages = message.content.split(" ").slice(1).join(" ");

  client.guilds.cache.forEach((guild) => {
    console.log(guild.name);
    const channel = guild.channels.cache.find((x) => x.name == '📍│자판기공지│📍' || x.name == '📍│자판기공지')
    if (!channel) return
    channel.send(messages).catch(err => { message.reply(`${guild.name}서버에 메시지를 보내지 못했습니다.`)})
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "공지",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["공지"],
  cooldown: 0
}

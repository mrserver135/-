const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  client.guilds.cache.forEach((guild) => {
    let channel = message.guild.channels.cache.get("833149794208710726")
    channel.send(guild.name)
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "목록",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["목록"],
  cooldown: 0
}

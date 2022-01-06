const Discord = require("discord.js");
const { prependListener } = require("process");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {

  var filename = message.content.split(" ").slice(1, 2).join(" ");
  if (!filename) return message.reply("수수료 계산할 값을 적어주세요")

  var percent = message.content.split(" ").slice(2, 3).join(" ");
  if (isNaN(percent)) return message.reply("퍼센트는 숫자로만 적어주세요")
  if (!percent) return message.reply("퍼센트의 값을 적어주세요 적어주세요")

  var all = filename * (1 + percent / 100)

  message.reply({embed: { color: "RANDOM", description: `${all}원 입니다.`}})
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "수수료계산기",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["수수료계산기"],
  cooldown: 0
}

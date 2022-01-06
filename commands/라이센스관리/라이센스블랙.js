const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const db = new Database("./Servers/license", "blacklist");

  var id = args[0];
  if (!id) return message.reply("서버 아이디를 입력해주세요")

  if (!args[1]) return message.reply("블랙리스트에 등록하려면 `활성화` | 제거하려면 `비활성화` 를 입력해주세요")

  if (args[1] == "활성화") {
    await db.set(`state.${id}`, true)
    message.reply({embed: { color: "GREEN", description: "해당서버가 블랙리스트에 등록되었습니다."}})
  }

  if (args[1] == "비활성화") {
    await db.set(`state.${id}`, false)
    message.reply({embed: { color: "GREEN", description: "해당서버를 블랙리스트에서 제거했습니다."}})
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "라센블랙",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["라센블랙"],
  cooldown: 0
}

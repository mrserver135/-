const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const db = new Database("./Servers/license", "license");

  const time = message.content.split(" ").slice(1, 2).join(" ");
  let ti = ["1분", "1일", "7일", "15일", "30일"];
  if (!time) return message.reply("라이센스키의 날짜를 적어주세요")
  if (!ti.includes(time)) return message.reply(`${ti} 중 발급하실 날자를 적어주세요`)

  const s = message.content.split(" ").slice(2, 3).join(" ");
  if (!s) return message.reply("발급량을 적어주세요")

  if (message.channel) {
    times = time
      .replace("1분", "60000")
      .replace("1일", "8.64e+7")
      .replace("7일", "6.048e+8")
      .replace("15일", "1.296e+9")
      .replace("30일", "2.592e+9")
  }

  i = 0;
  let str = ``
  while (i < s) {
    var key = `kor-${randomString()}`;
    await db.set(`license.${key}`, times)
    str += `${key}\n`
    i = i + 1
  }
  await message.channel.send(str)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};

function randomString() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 16;
  var randomstring = '';
  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
}


exports.help = {
  name: "발급",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["발급"],
  cooldown: 0
}

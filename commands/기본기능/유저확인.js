const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const dbs = new Database("./Servers/" + message.guild.id, "Channels");
  let chan = dbs.get(`Self.${message.guild.id}`)
  if (message.channel.id !== chan) {
      message.delete()
      return message.reply("조회가능한 채널이 아닙니다.")
  }

  const User = message.mentions.members.first() || message.author;

  const db = new Database("./Servers/" + message.guild.id, "UserCoin");
  const sdb = new Database("./Servers/" + message.guild.id, "Recommended");

  var coin = await db.get(`UserCoin.${User.id}`) || 0;
  var Accumulate = await db.get(`UserAccumulate.${User.id}`) || 0;
  var CC = await db.get(`ChargeCount.${User.id}`) || 0;
  var BC = await db.get(`BuyCount.${User.id}`) || 0;
  var Re = await sdb.get(`ReCm.${User.id}`) || 0;

  const embed = new Discord.MessageEmbed()
  .setDescription(`${User}님의 정보`)
  .addField("보유금액", "```" + coin + "```")
  .addField("누적충전금액", "```" + Accumulate + "```", true)
  .addField("누적충전횟수", "```" + CC + "```", true)
  .addField("누적구매횟수", "```" + BC + "```", true)
  .addField("추천횟수", "```" + Re + "```")

  message.channel.send(embed);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "유저확인",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["유저확인"],
  cooldown: 0
}

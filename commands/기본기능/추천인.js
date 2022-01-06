const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const ms = require("ms");


exports.run = async (client, message, args) => {



  const udb = new Database("./Servers/" + message.guild.id, "Recommended");
  const usdb = new Database("./Servers/" + message.guild.id, "UserCoin");

  let ReCms = await udb.get(`ReCms.${message.author.id}`);
  if (ReCms == true) return message.reply({embed: {color: "RED", description: `이미 추천을 하셨습니다.`}})

  const User = message.mentions.members.first();
  if (!User) return message.reply("추천할 유저를 멘션해주세요")

  if (User.id === message.author.id) return message.reply({embed: {color: "RED", description: `자기자신을 추천할 수 없습니다.`}})

  let ReCm1 = await udb.get(`UserRe.${message.guild.id}`) || 0;
  let ReCm2 = await udb.get(`ReUser.${message.guild.id}`) || 0;

  await udb.add(`ReCm.${User.id}`, 1);
  await udb.set(`ReCms.${message.author.id}`, true)
  await usdb.add(`UserCoin.${message.author.id}`, ReCm1)
  await usdb.add(`UserCoin.${User.id}`, ReCm2)

  await message.reply({embed: {color: "GREEN", description: `추천이 완료되었습니다.`}})
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "추천인",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["추천인"],
  cooldown: 0
}

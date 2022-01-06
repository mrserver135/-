const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {

  // const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  // var users = svdb.get(`admin.${message.guild.id}`)

  // if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("당신은 권한이없습니다.");
  
  const db = new Database("./Servers/" + message.guild.id, "UserCoin");
  var User = message.mentions.members.first();
  if (!User) return message.reply(`충전채널을 초기화할 유저를 멘션해주세요`)
  await db.set(`ChargePage.${User.id}`, false);
  message.reply({ embed: { color: "GREEN", description: `초기화 되었습니다.` } })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};

async function promptMessage(message, author, time, reactions) {

  time *= 1000;

  for (const reaction of reactions) {
    await message.react(reaction);
  }

  const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

  return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

}


exports.help = {
  name: "충전채널초기화",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["충전채널초기화"],
  cooldown: 0
}

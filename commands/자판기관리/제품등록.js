const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const fs = require('fs');


exports.run = async (client, message, args) => {

  // const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  // var users = svdb.get(`admin.${message.guild.id}`)
  
  // if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("당신은 권한이없습니다.");

  files = message.content.split(" ").slice(1, 2).join(" ");
  if (!files || files === "") return message.reply(`생성할 제품이름을 적어주세요`)

  const embed = new Discord.MessageEmbed()
    .setTitle(`제품 관리`)
    .setDescription(`원하는 기능의 이모지를 선택하여주세요`)
    .addField(`선택 1️⃣`, `**제품등록하기**\n\`\`\`해당 기능은 판매할 제품을\n등록하는 명령어입니다\`\`\``)
  const msg = await message.reply(embed).then(async m => {
    const db = new Database("./Servers/" + message.guild.id, "file");
    var emoji = await promptMessage(m, message.author, 10000, ["1️⃣"]);

    if (emoji == "1️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      await m.edit({ embed: { color: "GREEN", description: "제품가격을 입력해주세요." } })
      file = false;
    }

  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};

async function promptMessage(message, author, time, reactions) {

  time *= 1000;

  for (const reaction of reactions) {
    message.react(reaction);
  }

  const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

  return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

}


exports.help = {
  name: "제품등록",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["제품등록"],
  cooldown: 0
}

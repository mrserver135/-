const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const ms = require("ms");
const request = require('request');


exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
  .setTitle("충전하기")
  .setDescription("원하는 충전 방식을 선택하여주세요")
  .addField(`선택 1️⃣`, `**계좌로충전하기**\n\`\`\`계좌는 반자동이며 입금 후 확인신청을\n보내야 받으실 수 있습니다.\`\`\``)
  .addField(`선택 2️⃣`, `**문상으로충전하기**\n\`\`\`문상충전은 선택 후 핀번호만 입력해주시면됩니다.\`\`\``)
  .addField(`선택 3️⃣`, `**해피로충전하기**\n\`\`\`준비중인 서비스입니다.\`\`\``)
  await message.reply(embed).then(async m => {
    var emoji = await promptMessage(m, message.author, 10000, ["1️⃣", "2️⃣", "3️⃣"])
    if (emoji == "1️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      await message.reply({ embed: { color: "GREEN", description: "입금자명을 입력해주세요." } })
      sen = false;
    }
    if (emoji == "2️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      await message.reply({ embed: { color: "GREEN", description: "핀번호를 입력해주세요." } })
      chch = false;
    }
    if (emoji == "3️⃣") {
      await message.reply(`준비중인 서비스입니다.`)
    }
  })
}


async function promptMessage(message, author, time, reactions) {

  time *= 1000;

  for (const reaction of reactions) {
    await message.react(reaction);
  }

  const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

  return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "충전하기",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["충전하기"],
  cooldown: 0
}

const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const fs = require('fs');


exports.run = async (client, message, args) => {

  // const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  // var users = svdb.get(`admin.${message.guild.id}`)

  // if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("당신은 권한이없습니다.");

  users = message.mentions.members.first();
  if (!users || users === "") return message.reply(`제품이름을 함께 적어주세요 ex) ${client.config.prefix}유저관리 유저멘션`)

  const embed = new Discord.MessageEmbed()
    .setTitle(`제품 관리`)
    .setDescription(`원하는 기능의 이모지를 선택하여주세요`)
    .addField(`선택 1️⃣`, `**금액지급하기**\n\`\`\`해당 기능은 유저의 금액을 강제로\n충전하는 명령어입니다.\`\`\``)
    .addField(`선택 2️⃣`, `**금액차감하기**\n\`\`\`해당 기능은 유저의 금액을 강제로\n차감하는 명령어입니다.\`\`\``)
    .addField(`선택 3️⃣`, `**블랙관리하기**\n\`\`\`해당 기능은 유저의 블랙리스트를\n관리하는 명령어입니다.\`\`\``)
    .addField(`선택 4️⃣`, `**경고부여하기**\n\`\`\`해당 기능은 유저의 경고를\n부여하는 명령어입니다.\`\`\``)
    .addField(`선택 5️⃣`, `**경고제거하기**\n\`\`\`해당 기능은 유저의 경고를\n제거하는 명령어입니다.\`\`\``)
  const msg = await message.reply(embed).then(async m => {
    const db = new Database("./Servers/" + message.guild.id, "file");
    var emoji = await promptMessage(m, message.author, 10000, ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]);

    if (emoji == "1️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      await m.edit({ embed: { color: "GREEN", description: "지급할 금액을 적어주세요." } })
      uco = false;
    }

    if (emoji == "2️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      await m.edit({ embed: { color: "GREEN", description: "차감할 금액을 적어주세요." } })
      u = false;
    }

    if (emoji == "3️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      await m.edit({ embed: { color: "GREEN", description: "블랙리스트에 추가하려면 ✅ 블랙리스트에서 제거하려면 ❌ 를 눌러주세요." } }).then(async m => {
        var em = await promptMessage(m, message.author, 10000, ["✅", "❌"]);
        const dbs = new Database("./Servers/" + message.guild.id, "UserState");
        if (em == "✅") {
          await dbs.set(`state.${users.id}`, 0)
          message.reply({ embed: { color: "GREEN", description: "해당유저가 블랙리스트에 등록되었습니다." } })
        }

        if (em == "❌") {
          await dbs.set(`state.${users.id}`, true)
          message.reply({ embed: { color: "GREEN", description: "해당유저를 블랙리스트에서 제거했습니다." } })
        }
      })
    }

    if (emoji == "4️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      let db = new Database("./Servers/" + message.guild.id, "UserCoin");
      await db.add(`UserWarn.${users.id}`, 1)
      var warn = await db.get(`UserWarn.${users.id}`);

      await message.reply({ embed: { color: "RED", description: `경고가 1회 부여되어 ${users}님의 경고는 ${warn}회 입니다.` } })
      await users.send({ embed: { color: "RED", description: `경고가 1회 부여되어 ${users}님의 경고는 ${warn}회 입니다.` } })
    }

    if (emoji == "5️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      let db = new Database("./Servers/" + message.guild.id, "UserCoin");
      await db.subtract(`UserWarn.${users.id}`, 1)
      var warn = await db.get(`UserWarn.${users.id}`);

      await message.reply({ embed: { color: "RED", description: `경고가 1회 제거되어 ${users}님의 경고는 ${warn}회 입니다.` } })
      await users.send({ embed: { color: "RED", description: `경고가 1회 제거되어 ${users}님의 경고는 ${warn}회 입니다.` } })

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
  name: "유저관리",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["유저관리"],
  cooldown: 0
}

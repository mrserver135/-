const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const ms = require("ms");


exports.run = async (client, message, args) => {

  const udb = new Database("./Servers/" + message.guild.id, "UserCoin");

  if (args[0] == "채널삭제") {
    message.channel.delete()
    await udb.set(`ChargePage.${message.author.id}`, false);
  }

  const dbs = new Database("./Servers/" + message.guild.id, "Channels");
  let chan = dbs.get(`Buycha.${message.guild.id}`)
  if (message.channel.id !== chan) {
    message.delete()
    return message.reply("충전채널 생성가능한 곳이 아닙니다.")
  }

  const db = new Database("./Servers/" + message.guild.id, "Channels");

  var categoryID = db.get(`ChargeCate.${message.guild.id}`)

  var userName = message.author.username;

  var True = await udb.get(`ChargePage.${message.author.id}`)

  if (True == true) {
    message.reply("당신의 채널은 이미 열려있습니다.")
    return
  }

  if (!True) {
    await udb.set(`ChargePage.${message.author.id}`, true);
    message.guild.channels.create(userName.toLowerCase() + "-" + "충전채널", { type: 'text' }).then(
      (createdChannel) => {
        createdChannel.setParent(categoryID).then(
          (settedParent) => {
            settedParent.updateOverwrite(message.author.id, {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true
            });

            settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false
            });

            var embedParent = new Discord.MessageEmbed()
              .setTitle(`[${message.guild.name}] ${message.author.username}님의 충전채널입니다.`)
              .setDescription(`해당채널은 오픈후 5분 뒤에 삭제됩니다. / 충전을 진행해주세요 \n\`${client.config.prefix}충전하기\` 입력하신후 원하시는 결제방식을 선택후 결제진행해주시면됩니다.`)
              .setFooter(`${message.author.username}님의 충전채널`);

            settedParent.send(`${message.author}`, embedParent)

            message.reply(`<#${createdChannel.id}> 채널로 이동하여 충전을 진행해주세요!`)
          })
      }
    )
  }

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
  name: "충전",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["충전"],
  cooldown: 0
}

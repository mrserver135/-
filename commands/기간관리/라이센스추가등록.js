const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const ms = require("parse-ms");


exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("당신은권한이없습니다.")
  const ssdb = new Database("./Servers/license", "blacklist");
  const t = await ssdb.get(`state.${message.author.id}`);
  if (t == true) return message.reply({embed: { color: "RED", description: "블랙리스트에 등록되어있습니다."}})
  const db = new Database("./Servers/license", "license");
  const dbs = new Database("./Servers/times", "license");
  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  const time = message.content.split(" ").slice(1, 2).join(" ");
  if (!time) return message.reply("라이센스키를 적어주세요")

  let msg = await message.reply({ embed: { color: "RANDOM", description: "라이센스키를 등록중입니다. 잠시만기다려주세요" } })

  let pad_zero = num => (num < 10 ? '0' : '') + num;
  let trss = await dbs.get(`tr.${message.guild.id}.stat`);
  if (trss === true) return message.reply({embed: {color: "RED", description: "이미 등록되어있습니다. 기간을 연장하려면 `!연장` 명령어를 사용해주세요!"}})
  let str = await dbs.get(`tr.${message.author.id}`);
  let license = await db.get(`license.${time}`);
  if (license === true) return msg.edit({ embed: { color: "RED", description: "이미 사용된 라이센스키 입니다." } })
  if (!license) return msg.edit({ embed: { color: "RED", description: "잘못된 라이센스키입니다." } })
  if (license) {
    if (license === "60000") {
      await dbs.add(`trs.${message.author.id}`, 60000)
      await dbs.add(`strs.${message.guild.id}`, 60000)
      await dbs.set(`str.${message.guild.id}`, Date.now())
      await dbs.set(`tr.${message.guild.id}.stat`, true)
      await svdb.set(`admin.${message.guild.id}`, message.author.id)
      await db.set(`license.${time}`, true)
      let str = await dbs.get(`str.${message.guild.id}`);
      let timeObj = ms(60000 - (Date.now() - str));
      let days = pad_zero(timeObj.days).padStart(2, "0"),
      hours = pad_zero(timeObj.hours).padStart(2, "0"),
        mins = pad_zero(timeObj.minutes).padStart(2, "0"),
        secs = pad_zero(timeObj.seconds).padStart(2, "0");
      let finalTime = `${days}일${hours}시간${mins}분${secs}초`;
      await msg.edit({embed: { color: "RANDOM", description: `${message.author}님 등록이 완료되셨습니다. 남은시간: ${finalTime}`}})
      return
    }
    if (license === "8.64e+7") {
      await dbs.add(`trs.${message.author.id}`, 8.64e+7)
      await dbs.add(`strs.${message.guild.id}`, 8.64e+7)
      await dbs.set(`str.${message.guild.id}`, Date.now())
      await dbs.set(`tr.${message.guild.id}.stat`, true)
      await svdb.set(`admin.${message.guild.id}`, message.author.id)
      await db.set(`license.${time}`, true)
      let str = await dbs.get(`str.${message.guild.id}`);
      let timeObj = ms(8.64e+7 - (Date.now() - str));
      let days = pad_zero(timeObj.days).padStart(2, "0"),
      hours = pad_zero(timeObj.hours).padStart(2, "0"),
        mins = pad_zero(timeObj.minutes).padStart(2, "0"),
        secs = pad_zero(timeObj.seconds).padStart(2, "0");
      let finalTime = `${days}일${hours}시간${mins}분${secs}초`;
      await msg.edit({embed: { color: "RANDOM", description: `${message.author}님 등록이 완료되셨습니다. 남은시간: ${finalTime}`}})
      return
    }
    if (license === "6.048e+8") {
      await dbs.add(`trs.${message.author.id}`, 6.048e+8)
      await dbs.add(`strs.${message.guild.id}`, 6.048e+8)
      await dbs.set(`str.${message.guild.id}`, Date.now())
      await dbs.set(`tr.${message.guild.id}.stat`, true)
      await svdb.set(`admin.${message.guild.id}`, message.author.id)
      await db.set(`license.${time}`, true)
      let str = await dbs.get(`str.${message.guild.id}`);
      let timeObj = ms(6.048e+8 - (Date.now() - str));
      let days = pad_zero(timeObj.days).padStart(2, "0"),
      hours = pad_zero(timeObj.hours).padStart(2, "0"),
        mins = pad_zero(timeObj.minutes).padStart(2, "0"),
        secs = pad_zero(timeObj.seconds).padStart(2, "0");
      let finalTime = `${days}일${hours}시간${mins}분${secs}초`;
      await msg.edit({embed: { color: "RANDOM", description: `${message.author}님 등록이 완료되셨습니다. 남은시간: ${finalTime}`}})
      return
    }
    if (license === "1.296e+9") {
      await dbs.add(`trs.${message.author.id}`, 1.296e+9)
      await dbs.add(`strs.${message.guild.id}`, 1.296e+9)
      await dbs.set(`str.${message.guild.id}`, Date.now())
      await dbs.set(`tr.${message.guild.id}.stat`, true)
      await svdb.set(`admin.${message.guild.id}`, message.author.id)
      await db.set(`license.${time}`, true)
      let str = await dbs.get(`str.${message.guild.id}`);
      let timeObj = ms(1.296e+9 - (Date.now() - str));
      let days = pad_zero(timeObj.days).padStart(2, "0"),
      hours = pad_zero(timeObj.hours).padStart(2, "0"),
        mins = pad_zero(timeObj.minutes).padStart(2, "0"),
        secs = pad_zero(timeObj.seconds).padStart(2, "0");
      let finalTime = `${days}일${hours}시간${mins}분${secs}초`;
      await msg.edit({embed: { color: "RANDOM", description: `${message.author}님 등록이 완료되셨습니다. 남은시간: ${finalTime}`}})
      return
    }
    if (license === "2.592e+9") {
      await dbs.add(`trs.${message.author.id}`, 2.592e+9)
      await dbs.add(`strs.${message.guild.id}`, 2.592e+9)
      await dbs.set(`str.${message.guild.id}`, Date.now())
      await dbs.set(`tr.${message.guild.id}.stat`, true)
      await svdb.set(`admin.${message.guild.id}`, message.author.id)
      await db.set(`license.${time}`, true)
      let tr = await dbs.get(`tr.${message.guild.id}`);
      let timeObj = ms(2.592e+9 - (Date.now() - tr));
      let days = pad_zero(timeObj.days).padStart(2, "0"),
      hours = pad_zero(timeObj.hours).padStart(2, "0"),
        mins = pad_zero(timeObj.minutes).padStart(2, "0"),
        secs = pad_zero(timeObj.seconds).padStart(2, "0");
      let finalTime = `${days}일${hours}시간${mins}분${secs}초`;
      await msg.edit({embed: { color: "RANDOM", description: `${message.author}님 등록이 완료되셨습니다. 남은시간: ${finalTime}`}})
      return
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "추가등록",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["추가등록"],
  cooldown: 0
}

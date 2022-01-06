const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const fs = require('fs');
const readline = require('readline');


exports.run = async (client, message, args) => {



  const dbs = new Database("./Servers/" + message.guild.id, "Channels");
  let chan = dbs.get(`Buy.${message.guild.id}`)
  if (message.channel.id !== chan) {
    message.delete()
    return message.reply("구매가능한 채널이 아닙니다.")
  }
  const udb = new Database("./Servers/" + message.guild.id, "UserCoin");
  const fdb = new Database("./Servers/" + message.guild.id, "file");
  const sdb = new Database("./Servers/" + message.guild.id, "UserState");

  var st = await sdb.get(`state.${message.author.id}`);
  if (!st || st == 0) return message.reply({ embed: { color: "RED", description: "가입되어 있지않거나 블랙리스트에 등록되어있습니다." } })

  var filename = message.content.split(" ").slice(1, 2).join(" ");
  if (!filename) return message.reply("구매할 제품의 이름을 적어주세요")

  var fileprice = message.content.split(" ").slice(2, 3).join(" ");
  if (fileprice.length > 3) return message.reply("최소 1개에서 999개 구매 가능합니다")
  if (fileprice.charAt(0) == "0") return message.reply("제대로된 형식에 맞게 명령어를 작성해주세요")
  if (fileprice === "0" || fileprice === "00" || fileprice === "000") return message.reply("0개 구매는 불가능 합니다")
  if (!fileprice) return message.reply("구매 수량을 적어주세요")
  if (isNaN(fileprice)) return message.reply("숫자형태로만 적어주세요")
  if (fileprice.includes("-")) return message.reply("마이너스 구매는 불가능 합니다")
  if (fileprice.includes(".")) return message.reply("소수점 형태 구매는 불가능 합니다")

  var dfile = await fdb.get(`dfile.${filename}`);
  var ucoin = await udb.get(`UserCoin.${message.author.id}`);
  var fileSale = await fdb.get(`fileSale.${filename}`);
  var role = await udb.get(`UserBuyRole.${message.guild.id}`);
  var Role = await message.member.roles.cache.get(role);
  var addRole = await message.guild.roles.cache.get(role);
  var channelid = await dbs.get(`BuyLog.${message.guild.id}`);
  var channel = await message.guild.channels.cache.get(channelid);
  var fileNum = await fdb.get(`dfileStocks.${filename}`);
  var filemessage = await fdb.get(`filemessage.${filename}`) || "등록된 메시지가 없습니다.";
  var files = dfile * fileprice;

  if (dfile === null) return message.reply({ embed: { color: "RED", description: `${filename} 제품은 없는 제품입니다.` } })
  if (!dfile) return message.reply({ embed: { color: "RED", description: `${filename} 제품은 없는 제품입니다.` } })
  if (fileprice > fileNum) return message.reply({ embed: { color: "RED", description: `${filename}을 구매할 수 없습니다. 재고가 없습니다` } })

  await isFileEmpty(`./Basicfile/Helpers/Servers/${message.guild.id}/${filename}.txt`).then(async (isEmpty) => {
    console.log("empty:", isEmpty)
    if (isEmpty === true) return message.reply({ embed: { color: "RED", description: `${filename}을 구매할 수 없습니다. 재고가 없습니다` } })

    if (fileSale) {
      if (fileSale > ucoin) return message.reply({ embed: { color: "RED", description: `${filename}을 구매할 수 없습니다. 잔액을 확인해주세요` } })
      await udb.subtract(`UserCoin.${message.author.id}`, files);
      let m = await message.reply({ embed: { color: "GREEN", description: `${filename} 제품 구매가 완료되었습니다. DM 을 확인해주세요!` } })
      let ms = await channel.send({ embed: { color: "RANDOM", description: `${message.author}님 ${filename} 제품 ${fileprice}개를 구매해주셔서 감사합니다.` } })
      var i = 0;
      let array = await fs.readFileSync(`./Basicfile/Helpers/Servers/${message.guild.id}/${filename}.txt`).toString().split("\n");
      let mes = `${array[i]}\n`;
      while (i < fileprice) {
        if (fileprice == "1") {

        } else {
          mes += `${array[i]}\n`;
        }
        await fdb.subtract(`dfileStocks.${filename}`, 1);
        i = i + 1
      }
      const embed = new Discord.MessageEmbed()
        .setTitle(`[${message.guild.name}] 자판기 구매내역`)
        .setColor("RANDOM")
        .setDescription(`${filename} 제품을 구매해주셔서 감사합니다.`)
        .addField(`제품설명`, filemessage)
        .addField(`제품`, "```" + mes + "```")
      await message.author.send(embed)
      await udb.add(`BuyCount.${message.author.id}`, fileprice)
      fs.readFile(`./Basicfile/Helpers/Servers/${message.guild.id}/${filename}.txt`, 'utf8', async function (err, data) {
        if (err) {
          console.log(err)
        }
        var linesExceptFirst = data.split('\n').slice(fileprice).join('\n');
        fs.writeFile(`./Basicfile/Helpers/Servers/${message.guild.id}/${filename}.txt`, linesExceptFirst, function (err) {
          if (err) {
            console.log(err)
          }
        });
      });
      if (!Role) return message.member.roles.add(addRole);
      return
    }

    if (!fileSale || fileSale == 0) {
      if (!ucoin || files > ucoin || dfile > ucoin || ucoin === 0) return message.reply({ embed: { color: "RED", description: `${filename}을 구매할 수 없습니다. 잔액을 확인해주세요` } })
      await udb.subtract(`UserCoin.${message.author.id}`, files);
      let m = await message.reply({ embed: { color: "GREEN", description: `${filename} 제품 구매가 완료되었습니다. DM 을 확인해주세요!` } })
      let ms = await channel.send({ embed: { color: "RANDOM", description: `${message.author}님 ${filename} 제품 ${fileprice}개를 구매해주셔서 감사합니다.` } })
      var i = 0;
      let array = await fs.readFileSync(`./Basicfile/Helpers/Servers/${message.guild.id}/${filename}.txt`).toString().split("\n");
      let mes = `${array[i]}\n`;
      while (i < fileprice) {
        if (fileprice == "1") {

        } else {
          mes += `${array[i]}\n`;
        }
        await fdb.subtract(`dfileStocks.${filename}`, 1);
        i = i + 1
      }
      const embed = new Discord.MessageEmbed()
        .setTitle(`[${message.guild.name}] 자판기 구매내역`)
        .setColor("RANDOM")
        .setDescription(`${filename} 제품을 구매해주셔서 감사합니다.`)
        .addField(`제품설명`, filemessage)
        .addField(`제품`, "```" + mes + "```")
      await message.author.send(embed)
      await udb.add(`BuyCount.${message.author.id}`, fileprice)
      fs.readFile(`./Basicfile/Helpers/Servers/${message.guild.id}/${filename}.txt`, 'utf8', async function (err, data) {
        if (err) {
          console.log(err)
        }
        var linesExceptFirst = data.split('\n').slice(fileprice).join('\n');
        fs.writeFile(`./Basicfile/Helpers/Servers/${message.guild.id}/${filename}.txt`, linesExceptFirst, function (err) {
          if (err) {
            console.log(err)
          }
        });
      });
      if (!Role) return message.member.roles.add(addRole);
      return
    }

  }).catch((err) => {
    console.log("error reading the file");
  });
}

function isFileEmpty(filename, ignoreWhitespace = true) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve((!ignoreWhitespace && data.length == 0) || (ignoreWhitespace && !!String(data).match(/^\s*$/)))
    });
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "구매",
  description: "",
  usage: "!구매 제품이름 수량",
  example: "!구매 test 1"
}

exports.conf = {
  aliases: ["구매"],
  cooldown: 0
}

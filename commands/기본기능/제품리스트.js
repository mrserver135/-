const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {



  const dbs = new Database("./Servers/" + message.guild.id, "Channels");
  let chan = dbs.get(`List.${message.guild.id}`)
  if (message.channel.id !== chan) {
      message.delete()
      return message.reply("제품리스트 확인 가능한 채널이 아닙니다.")
  }
  const fdb = new Database("./Servers/" + message.guild.id, "file");

  var datalink = await fdb.get(`dfile`) || {};
  var data2 = await fdb.get(`fileSale`) || {};
  var data4 = await fdb.get(`dfileStocks`) || {};

  var list4 = Object.keys(datalink).map(__data => {
    return {
      Id: __data,
      Value: (datalink[__data]),
      Value2: (data2[__data]),
      Value3: (data4[__data] || 0)
    };
  }).sort((x, y) => y.Value - x.Value);

  var embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(`[${message.guild.name}] 제품리스트`)
  list4.splice(0, 100).map((items, indexs) => { 
    if(items.Value === null) {
      return
    }
    if (items.Value2) {
      embed.addField(`**${items.Id}**`, `**가격**: ~~${items.Value.toLocaleString()}~~ ${items.Value2.toLocaleString()}원 \n **재고**: ${items.Value3.toLocaleString()}개`, true)
      return
    }
    embed.addField(`**${items.Id}**`, `**가격**: ${items.Value.toLocaleString()}원 \n**재고**: ${items.Value3.toLocaleString()}개`, true)
  })
  message.reply(embed)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
};


exports.help = {
  name: "제품목록",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["제품목록"],
  cooldown: 0
}

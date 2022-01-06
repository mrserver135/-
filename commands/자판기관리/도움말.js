const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");

exports.run = async (client, message, args) => {



  let prefix = client.config.prefix;

  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`) || 0;
  
  if (!args[0]) {
    let module = client.helps.array();
    
    if (!users.includes(message.author.id)) module = client.helps.array().filter(x => !x.hide);
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail("https://media.discordapp.net/attachments/767301017670385707/789394435220963388/unnamed.png")
    .setTimestamp(new Date())
    .setDescription(`\`${prefix}도움말 [명령어]\` 명령어를 구체적이게 볼수있습니다.`)
    .setTitle("자판기봇")
    for (const mod of module) {
      embed.addField(`${mod.name}`, mod.cmds.map(x => `\`${x}\``).join("\n"), true);
    }
    
    return message.channel.send(embed);
  } else {
    let cmd = args[0];
    
    if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
      let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      let name = command.help.name;
      let desc = command.help.description;
      let cooldown = command.conf.cooldown + " 초(s)";
      let aliases = command.conf.aliases.join(", ") ? command.conf.aliases.join(", ") : "명칭이 없습니다.";
      let usage = command.help.usage ? command.help.usage : "사용법이 없습니다.";
      let example = command.help.example ? command.help.example : "예시가 없습니다.";
      
      let embed = new Discord.MessageEmbed()
      .setColor(0x7289DA)
      .setTitle(name)
      .setDescription(desc)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter("[] = 선택 사항, <> =  필수, 명령어을 입력할때 앞 기호들은 포함하지 말아주세요!")
      .addField("쿨타임", cooldown)
      .addField("명칭", aliases, true)
      .addField("사용법", usage, true)
      .addField("예시", example, true)
      
      return message.channel.send(embed);
    } else {
      return message.channel.send({embed: {color: "RED", description: "없는 명령어입니다!"}});
    }
  }
}

exports.help = {
  name: "도움말",
  description: "모든 명령어를 보여줍니다.",
  usage: "!도움말 [명령어]",
  example: "!도움말 별명변경"
}

exports.conf = {
  aliases: ["?"],
  cooldown: 0
}

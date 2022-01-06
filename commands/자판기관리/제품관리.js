const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");
const fs = require('fs');


exports.run = async (client, message, args) => {

  // const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  // var users = svdb.get(`admin.${message.guild.id}`)
  
  // if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("당신은 권한이없습니다.");

  files = message.content.split(" ").slice(1, 2).join(" ");
  if (!files || files === "") return message.reply(`제품이름을 함께 적어주세요 ex) ${client.config.prefix}제품관리 제품이름`)

  const embed = new Discord.MessageEmbed()
    .setTitle(`제품 관리`)
    .setDescription(`원하는 기능의 이모지를 선택하여주세요`)
    // .addField(`선택 1️⃣`, `**제품등록하기**\n\`\`\`해당 기능은 판매할 제품을\n등록하는 명령어입니다\`\`\``)
    .addField(`선택 1️⃣`, `**재고충전하기**\n\`\`\`해당 기능은 판매할 제품의\n재고를 충전하는 명령어입니다.\`\`\``)
    .addField(`선택 2️⃣`, `**메시지등록하기**\n\`\`\`해당 기능은 판매할 제품을\n유저가 구매했을때 전송되는 메시지를\n등록하는 명령어입니다.\`\`\``)
    .addField(`선택 3️⃣`, `**제품제거하기**\n\`\`\`해당 기능은 제품의 재고가 없거나\n판매 중단했을때 사용하는 명령어입니다.\`\`\``)
    .addField(`선택 4️⃣`, `**재고새로고침하기**\n\`\`\`해당 기능은 재고가 정상적이지\n않거나 할때 새로고침하기위한 명령어입니다.\`\`\``)
    .addField(`선택 5️⃣`, `**제품할인하기**\n\`\`\`해당 기능은 상품할인을 할때 사용하는 명령어입니다.\`\`\``)
    .addField(`선택 6️⃣`, `**할인종료하기**\n\`\`\`해당 기능은 상품할인을 종료할때 사용하는 명령업니다.\`\`\``)
  const msg = await message.reply(embed).then(async m => {
    const db = new Database("./Servers/" + message.guild.id, "file");
    var emoji = await promptMessage(m, message.author, 10000, ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"]);

    // if (emoji == "1️⃣") {
    //   noticeM = message.author.id;
    //   noticeC = message.channel.id;
    //   await m.edit({ embed: { color: "GREEN", description: "제품가격을 입력해주세요." } })
    //   file = false;
    // }

    if (emoji == "1️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      var f = await db.get(`dfile.${files}`);
      if (!f || f == null) return m.edit(`관리하기전 제품을 등록해주세요. 없는 제품입니다. \n예시) ${client.config.prefix}제품관리 제품이름 을 치신후 1번을 선택하여주세요`)
      await m.edit({ embed: { color: "GREEN", description: "재고값을 입력해주세요." } })
      dfile = false;
    }

    if (emoji == "2️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      var f = await db.get(`dfile.${files}`);
      if (!f || f == null) return m.edit(`관리하기전 제품을 등록해주세요. 없는 제품입니다. \n예시) ${client.config.prefix}제품관리 제품이름 을 치신후 1번을 선택하여주세요`)
      await m.edit({ embed: { color: "GREEN", description: "등록할 메시지를 적어주세요." } })
      fmsg = false;
    }

    if (emoji == "3️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      var f = await db.get(`dfile.${files}`);
      if (!f || f == null) return m.edit(`관리하기전 제품을 등록해주세요. 없는 제품입니다. \n예시) ${client.config.prefix}제품관리 제품이름 을 치신후 1번을 선택하여주세요`)
      const fdb = new Database("./Servers/" + message.guild.id, "file");
      await fdb.set(`dfile.${files}`, null);
      await fdb.set(`dfileStocks.${files}`, null);
      await fdb.set(`filemessage.${files}`, null);
      fs.unlink(`./Basicfile/Helpers/Servers/${message.guild.id}/${files}.txt`, function (err) {
        if (err) throw err;
        console.log('정상적으로 삭제됨');
      });
      await m.edit({ embed: { color: "GREEN", description: "제품제거가 완료되었습니다." } })
    }

    if (emoji == "4️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      var f = await db.get(`dfile.${files}`);
      if (!f || f == null) return m.edit(`관리하기전 제품을 등록해주세요. 없는 제품입니다. \n예시) ${client.config.prefix}제품관리 제품이름 을 치신후 1번을 선택하여주세요`)
      const fdb = new Database("./Servers/" + message.guild.id, "file");
      var array = fs.readFileSync(`./Basicfile/Helpers/Servers/${message.guild.id}/${files}.txt`).toString().split("\n");
      var is = 0;
      for (i in array) {
        is = is + 1;
      }
      await fdb.set(`dfileStocks.${files}`, 0)
      await fdb.add(`dfileStocks.${files}`, is)
      var ds = await fdb.get(`dfileStocks.${files}`);
      var embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`[${message.guild.name}] 제품 재고 조회`)
        .addField(`재고 갯수: ${ds}개`, `새로고쳐짐`)
      message.reply(embed)
    }

    if (emoji == "5️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      var f = await db.get(`dfile.${files}`);
      if (!f || f == null) return m.edit(`관리하기전 제품을 등록해주세요. 없는 제품입니다. \n예시) ${client.config.prefix}제품관리 제품이름 을 치신후 1번을 선택하여주세요`)
      const fdb = new Database("./Servers/" + message.guild.id, "file");
      await m.edit({ embed: { color: "GREEN", description: "할인할 퍼센트 값을 적어주세요." } })
      fsale = false;
    }

    if (emoji == "6️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      var f = await db.get(`dfile.${files}`);
      if (!f || f == null) return m.edit(`관리하기전 제품을 등록해주세요. 없는 제품입니다. \n예시) ${client.config.prefix}제품관리 제품이름 을 치신후 1번을 선택하여주세요`)
      const fdb = new Database("./Servers/" + message.guild.id, "file");
      await fdb.set(`fileSale.${files}`, 0);
      await m.edit({ embed: { color: "GREEN", description: `${files} 제품할인이 종료되었습니다. 현재: ${f}원 입니다.` } })
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
  name: "제품관리",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["제품관리"],
  cooldown: 0
}

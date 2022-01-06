const Discord = require("discord.js");
const Database = require("../../Basicfile/Helpers/Database");


exports.run = async (client, message, args) => {

  const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

  var users = svdb.get(`admin.${message.guild.id}`)
  
  if (!users.includes(message.author.id)) return message.reply("당신은 자판기관리자가아닙니다.")

  const embed = new Discord.MessageEmbed()
    .setTitle(`자판기 관리`)
    .setDescription(`원하는 기능의 이모지를 선택하여주세요`)
    .addField(`선택 1️⃣`, `**채널셋팅하기**\n\`\`\`해당 기능은 자동으로 자판기채널을 생성해주며\n채널지정또한 자동으로 지정됩니다.\`\`\``)
    .addField(`선택 2️⃣`, `**아이디비번지정하기**\n\`\`\`해당 기능은 유저가 충전진행시\n충전한 아이디, 비번을 지정하는 명령어입니다.\`\`\``)
    .addField(`선택 3️⃣`, `**계좌지정하기**\n\`\`\`해당 기능은 유저가 계좌충전진행시\n반자동 기능인 입금링크를 생성하기위한\n계좌번호와 은행을 지정하는 명령어입니다.\`\`\``)
    .addField(`선택 4️⃣`, `**역할지정하기**\n\`\`\`해당 기능은 유저가 구매를 했을때\n자동으로 구매자 역할을 지급하는 명령어입니다.\`\`\``)
  const msg = await message.reply(embed).then(async m => {
    const db = new Database("./Servers/" + message.guild.id, "Channels");
    var emoji = await promptMessage(m, message.author, 10000, ["1️⃣", "2️⃣", "3️⃣", "4️⃣"]);

    if (emoji == "1️⃣") {
      const s = await message.reply({ embed: { color: `GREEN`, description: `잠시만 기다려주세요!` } })
      await message.guild.channels.create('🎇│구매하기', { type: 'category' }, [{
        id: message.guild.id,
        deny: ['CONNECT']
      }]).then(category => {
        category.setPosition(0)
        message.guild.channels.create('💳│자판기사용법│💳', { type: 'text' }, [{
          id: message.guild.id,
          deny: ['CONNECT']
        }]).then(channel1 => {
          channel1.setParent(category.id)
          let cha1 = channel1.id
          message.guild.channels.create('💳│가입하기│💳', { type: 'text' }, [{
            id: message.guild.id,
            deny: ['CONNECT']
          }]).then(channel2 => {
            channel2.setParent(category.id)
            let cha2 = channel2.id
            message.guild.channels.create('💳│제품목록│💳', { type: 'text' }, [{
              id: message.guild.id,
              deny: ['CONNECT']
            }]).then(channel3 => {
              channel3.setParent(category.id)
              let cha3 = channel3.id
              message.guild.channels.create('💳│구매하기│💳', { type: 'text' }, [{
                id: message.guild.id,
                deny: ['CONNECT']
              }]).then(channel4 => {
                channel4.setParent(category.id)
                let cha4 = channel4.id
                message.guild.channels.create('💳│금액확인하기│💳', { type: 'text' }, [{
                  id: message.guild.id,
                  deny: ['CONNECT']
                }]).then(channel5 => {
                  channel5.setParent(category.id)
                  let cha5 = channel5.id
                  message.guild.channels.create('💳│충전채널│💳', { type: 'text' }, [{
                    id: message.guild.id,
                    deny: ['CONNECT']
                  }]).then(async channel6 => {
                    channel6.setParent(category.id)
                    let cha6 = channel6.id
                    await db.set(`List.${message.guild.id}`, cha3), db.set(`Buy.${message.guild.id}`, cha4), db.set(`Self.${message.guild.id}`, cha5), db.set(`Card.${message.guild.id}`, cha2), db.set(`Buycha.${message.guild.id}`, cha6)
                  })
                })
              })
            })
          })
        })
      })

      await message.guild.channels.create('📡│로그페이지', { type: 'category' }, [{
        id: message.guild.id,
        deny: ['CONNECT']
      }]).then(async category => {
        category.setPosition(0)
        await db.set(`ChargeCate.${message.guild.id}`, category.id);
        await message.guild.channels.create('🛒│구매로그', { type: 'text' }, [{
          id: message.guild.id,
          deny: ['CONNECT']
        }]).then(channel1 => {
          channel1.setParent(category.id)
          let cha1 = channel1.id
          message.guild.channels.create('📲│충전로그', { type: 'text' }, [{
            id: message.guild.id,
            deny: ['CONNECT']
          }]).then(async channel2 => {
            channel2.setParent(category.id)
            let cha2 = channel2.id
            await db.set(`BuyLog.${message.guild.id}`, cha1), db.set(`Log.${message.guild.id}`, cha2)
          })
        })
      })

      await message.guild.channels.create('🔌│충전페이지', { type: 'category' }, [{
        id: message.guild.id,
        deny: ['CONNECT']
      }]).then(async category => {
        category.setPosition(0)
        await db.set(`ChargeCate.${message.guild.id}`, category.id);
      })

      await s.edit({ embed: { color: "GREEN", description: "셋팅이 완료되었습니다." } })
    }

    if (emoji == "2️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      await message.reply({ embed: { color: "GREEN", description: "컬쳐랜드 아이디를 입력해주세요." } })
      chidss = false;
    }

    if (emoji == "3️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      await message.reply({ embed: { color: "GREEN", description: "자신의 계좌 은행명을 입력해주세요" } })
      bank = false;
    }

    if (emoji == "4️⃣") {
      noticeM = message.author.id;
      noticeC = message.channel.id;
      await message.reply({ embed: { color: "GREEN", description: "지정하실 역할을 멘션해주세요" } })
      role = false;
    }
  })
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
  name: "셋팅",
  description: "",
  usage: "",
  example: ""
}

exports.conf = {
  aliases: ["셋팅"],
  cooldown: 0
}

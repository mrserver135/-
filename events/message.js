const Discord = require("discord.js"), cooldowns = new Discord.Collection();
const Database = require("../Basicfile/Helpers/Database");
const fs = require('fs');
const request = require('request');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
options.addArguments('--headless')
options.addArguments('disable-gpu')
options.addArguments('disable-infobars')

module.exports = async (client, message, args) => {

  let m1 = message.content.split(" ").slice(1, 2).join(" ");
  let m2 = message.content.split(" ").slice(2, 3).join(" ");
  if (message.content === `${client.config.prefix}셋팅`) {

  } else {
    if (message.author.bot || message.author === client.user) return;
  }

  const db = new Database("./Servers/license", "blacklist");

  let serid = await db.get(`state.${message.guild.id}`);

  if (serid == true) return message.reply(`사용하실 수 없습니다. 자판기관리자에게 문의주세요`)
  if (!serid) {

  }

  const tdb = new Database("./Servers/times", "license");

  let tr = await tdb.get(`trstat.${message.guild.id}`);
  let str = await tdb.get(`str.${message.guild.id}`);
  let strs = await tdb.get(`strs.${message.guild.id}`);
  const trs = await tdb.get(`str.${message.guild.id}`);
  const trss = await tdb.get(`strs.${message.guild.id}`);

  let ms1 = message.content.split(" ").slice(1, 2).join(" ");

  if (strs - (Date.now() - str) < 0) {
    if (message.content === `${client.config.prefix}발급 ${m1} ${m2}` || message.content === `${client.config.prefix}등록 ${m1}` || message.content === `${client.config.prefix}남은기간` || message.content === `${client.config.prefix}등록` || message.content === `${client.config.prefix}발급` || message.content === `${client.config.prefix}연장 ${m1}`) {

    } else {
      return
    }
  }
  if (!tr || tr == false) {
    if (message.content === `${client.config.prefix}발급 ${m1} ${m2}` || message.content === `${client.config.prefix}등록 ${m1}` || message.content === `${client.config.prefix}남은기간` || message.content === `${client.config.prefix}등록` || message.content === `${client.config.prefix}발급` || message.content === `${client.config.prefix}연장 ${m1}`) {

    } else {
      return
    }
  }
  if (!trs || !trss) {
    if (message.content === `${client.config.prefix}발급 ${m1} ${m2}` || message.content === `${client.config.prefix}등록 ${m1}` || message.content === `${client.config.prefix}남은기간` || message.content === `${client.config.prefix}등록` || message.content === `${client.config.prefix}발급` || message.content === `${client.config.prefix}연장 ${m1}`) {

    } else {
      return
    }
  }

  // 컬쳐랜드 아이디비번

  if (chidss == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const svdb = new Database("./Servers/" + message.guild.id, "serverstate");
        message.delete()
        userAnswer1 = message.content;
        await message.reply({ embed: { color: "GREEN", description: "비밀번호를 입력해주세요" } })
        await svdb.set(`chid.${message.guild.id}`, userAnswer1);
        chidss = true; chpwss = false;
        return
      }
    }
  }

  if (chpwss == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const svdb = new Database("./Servers/" + message.guild.id, "serverstate");
        message.delete()
        userAnswer2 = message.content;
        await message.reply({ embed: { color: "GREEN", description: "완료되었습니다." } })
        await svdb.set(`chpw.${message.guild.id}`, userAnswer2);
        chpwss = true;
        return
      }
    }
  }

  // 계좌 은행명 번호

  if (bank == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const svdb = new Database("./Servers/" + message.guild.id, "serverstate");
        userAnswer1 = message.content;
        await message.reply({ embed: { color: "GREEN", description: "계좌번호를 적어주세요" } })
        await svdb.set(`bank.${message.guild.id}`, userAnswer1);
        bank = true; bankid = false;
        return
      }
    }
  }

  if (bankid == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const svdb = new Database("./Servers/" + message.guild.id, "serverstate");
        userAnswer2 = message.content;
        await message.reply({ embed: { color: "GREEN", description: "완료되었습니다." } })
        await svdb.set(`bankid.${message.guild.id}`, userAnswer2);
        bankid = true;
        return
      }
    }
  }

  // 구매자 역할지정

  if (role == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const svdb = new Database("./Servers/" + message.guild.id, "UserCoin");
        var Role = message.mentions.roles.first();
        userAnswer1 = Role.id;
        await message.reply({ embed: { color: "GREEN", description: "역할 지정이 완료되었습니다." } })
        await svdb.set(`UserBuyRole.${message.guild.id}`, userAnswer1);
        role = true;
        return
      }
    }
  }

  // 제품등록

  if (file == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const db = new Database("./Servers/" + message.guild.id, "file");
        prices = message.content;
        await db.set(`dfile.${files}`, prices);
        await fs.writeFile(`./Basicfile/Helpers/Servers/${message.guild.id}/${files}.txt`, ' ', function (err) { if (err === null) { console.log(`성공적으로 생성됨`); } else { console.log('오류'); } });
        await message.reply({ embed: { color: "GREEN", description: `${files} 제품이 등록되었습니다. 가격: ${prices}` } })
        file = true;
        return
      }
    }
  }

  // 재고충전

  if (dfile == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const db = new Database("./Servers/" + message.guild.id, "file");
        dstocks = message.content;
        await fs.appendFile(`./Basicfile/Helpers/Servers/${message.guild.id}/${files}.txt`, '\ufeff' + `${dstocks}\n`, function (err) { });
        var is = 0;
        var array = await dstocks.toString().split("\n");
        for (i in array) {
          is = is + 1;
        }
        await db.add(`dfileStocks.${files}`, is);
        let filestock = await db.get(`dfileStocks.${files}`);
        const embed = new Discord.MessageEmbed()
          .setTitle(`[${message.guild.name}] 재고충전내역`)
          .setColor("#FF0000")
          .addField("제품이름", files)
          .addField("재고량", "```" + filestock + "```")
          .addField("재고값", "```" + `\n${dstocks}` + "```")
        message.reply(embed)
        dfile = true;
        return
      }
    }
  }

  // 메시지등록

  if (fmsg == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const db = new Database("./Servers/" + message.guild.id, "file");
        fmsgs = message.content;
        await db.set(`filemessage.${files}`, fmsgs);
        var embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`[${message.guild.name}] 메시지등록안내`)
          .addField(`${files} 제품의 등록된 메시지`, `${fmsgs}`)
        message.reply(embed)
        fmsg = true;
        return
      }
    }
  }

  // 상품할인

  if (fsale == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const db = new Database("./Servers/" + message.guild.id, "file");
        fsales = message.content;
        var sfile = await db.get(`dfile.${files}`);
        var all = sfile * (1 - fsales / 100);
        await db.set(`fileSale.${files}`, all);
        message.reply({ embed: { color: "RANDOM", description: `${files} 제품에 ${fsales}% 를 할인하여 현재: ${all}원 입니다.` } })
        fsale = true;
        return
      }
    }
  }

  // 금액지급

  if (uco == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const db = new Database("./Servers/" + message.guild.id, "UserCoin");
        ucoi = message.content;
        await db.add(`UserCoin.${users.id}`, ucoi)
        await db.add(`UserAccumulate.${users.id}`, ucoi);
        await db.add(`ChargeCount.${users.id}`, 1);
        message.reply({ embed: { color: "RANDOM", description: `${users}님에게 ${ucoi}원을 지급했습니다.` } })
        uco = true;
        return
      }
    }
  }

  // 금액차감

  if (u == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const db = new Database("./Servers/" + message.guild.id, "UserCoin");
        uc = message.content;
        await db.subtract(`UserCoin.${users.id}`, uc)
        message.reply({ embed: { color: "RANDOM", description: `${users}님에게 ${uc}원을 차감했습니다.` } })
        u = true;
        return
      }
    }
  }

  // 계좌충전

  if (sen == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const db = new Database("./Servers/" + message.guild.id, "UserCoin");
        en = message.content;
        message.reply({ embed: { color: "GREEN", description: `입금 금액을 입력해주세요.` } })
        sen = true; sens = false;
        return
      }
    }
  }

  if (sens == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const db = new Database("./Servers/" + message.guild.id, "UserCoin");
        ens = message.content;
        const msg = await message.reply({ embed: { color: "GREEN", description: "계좌 링크를 생성중입니다." } })

        const svdb = new Database("./Servers/" + message.guild.id, "serverstate");
        const udb = new Database("./Servers/" + message.guild.id, "UserCoin");

        const id = await svdb.get(`bank.${message.guild.id}`)
        if (id == "" || !id) return msg.edit({ embed: { color: "RED", description: "계좌 링크를 생성하던 도중 에러가 발생하였습니다. (오류코드: unknown bank)" } }), sens = true;
        const num = await svdb.get(`bankid.${message.guild.id}`)
        if (num == "" || !num) return msg.edit({ embed: { color: "RED", description: "계좌 링크를 생성하던 도중 에러가 발생하였습니다. (오류코드: unknown bankid)" } }), sens = true;

        await request({
          method: 'POST',
          url: 'https://toss.im/transfer-web/linkgen-api/link',
          headers: {
            'Content-Type': 'application/json'
          },
          body: `{  \"apiKey\": \"c39ed168f60d441484f48d04228b32c8\",  \"bankName\": \"${id}\",  \"bankAccountNo\": \"${num}\",  \"amount\": ${ens},  \"message\": \"입금완료됨\"}`
        }, async function (error, response, body) {
          var link;
          link = body.replace(/":"/gi, "")
          link2 = link.replace(/"/gi, "")
          link3 = link2.replace(/}/gi, "")
          link4 = link3.replace(/{/gi, "")
          link5 = link4.replace(/":{"/gi, "")
          link6 = link5.replace(/","/gi, "")
          link7 = link6.replace(/%/gi, "")
          link8 = link7.replace(/,/gi, "")
          link9 = link8.replace(/,/gi, "")
          link10 = link9.replace(/resultTypeSUCCESSsuccess:schemesupertoss:/, "")
          link11 = link10.replace("//send?bank=", "")
          link12 = link11.replace(`${ens}`, "")
          link13 = link12.replace(/&msg=EC9E85EAB888EC9984EBA38CEB90A8/, "")
          link14 = link13.replace(`${num}`, "")
          link15 = link14.replace(`${id}`, "")
          link16 = link15.replace(/&origin=linkgen&amount=/, "")
          link17 = link16.replace(/&accountNo=/, "")
          link18 = link17.replace(/link/, "")
          await msg.edit({ embed: { color: "GREEN", description: `입금 링크: ${link18} \n\n입금을 완료했다면 ✅를 눌러주세요` } }).then(async m => {
            var emoji = await promptMessage(m, message.author, 10000, ["✅", "❌"]);

            if (emoji === "✅") {

              await msg.edit({ embed: { color: "GREEN", description: "입금신청이 완료되었습니다. 관리자승인이 필요합니다.\n\n잠시만기다려주세요." } })

              var admin = message.guild.members.cache.get(svdb.get(`admin.${message.guild.id}`));
              await admin.send({ embed: { color: "GREEN", description: `${message.author}님이 충전요청을 하셧습니다. \n\n성함: ${en} 입금가격: ${ens}\n\n위 정보와 같이 입금이 되었다면 밑 설명에 맞게 실행해주세요!\n\n**승인전필수확인**\n\n승인처리를 하시려면 ✅를 거부처리를 하시려면 ❌를 눌러주세요\n해당봇은 계좌를 확인할수 있는방법이 없습니다. 그러니 직접 입금확인을 하신후에\n승인처리를 해주세요!` } }).then(async m => {
                var emoji = await promptMessage(m, admin, 10000, ["✅", "❌"]);

                if (emoji === "✅") {
                  await msg.edit({ embed: { color: "GREEN", description: "관리자의 의해 충전신청이 승인되었습니다. 잠시만기다려주세요." } })
                  const chdb = new Database("./Servers/" + message.guild.id, "charge");

                  var fc = await chdb.get(`charge.${message.guild.id}`);

                  if (!fc) {
                    await udb.add(`ChargeCount.${message.author.id}`, 1);
                    await udb.add(`UserCoin.${message.author.id}`, ens);
                    await udb.add(`UserAccumulate.${message.author.id}`, ens);
                  }

                  if (fc) {
                    var firstCharge = await udb.get(`FirstCharge.${message.author.id}`);
                    if (!firstCharge) {
                      var all = await ens * (1 + fc / 100);
                      await udb.add(`ChargeCount.${message.author.id}`, 1);
                      await udb.set(`FirstCharge.${message.author.id}`, true);
                      await udb.add(`UserCoin.${message.author.id}`, all);
                      await udb.add(`UserAccumulate.${message.author.id}`, ens);
                    }

                    if (firstCharge == true) {
                      await udb.add(`ChargeCount.${message.author.id}`, 1);
                      await udb.add(`UserCoin.${message.author.id}`, ens);
                      await udb.add(`UserAccumulate.${message.author.id}`, ens);
                    }
                  }

                  const serverid = client.guilds.cache.get(message.guild.id)
                  const cdb = new Database("./Servers/" + message.guild.id, "Channels");
                  const channelid = await cdb.get(`Log.${message.guild.id}`)
                  var channel = serverid.channels.cache.get(channelid)

                  var svcoin = await udb.get(`UserCoin.${message.author.id}`);
                  var accumulate = await udb.get(`UserAccumulate.${message.author.id}`);

                  await msg.edit(`${message.author}`, { embed: { color: "RED", description: `**계좌충전내역**\n\n충전된금액: ${ens.toLocaleString()}원\n\n서버코인: ${svcoin.toLocaleString()}원\n\n누적금액: ${accumulate.toLocaleString()}원` } })

                  channel.send(`${message.author}`, { embed: { color: "RED", description: `**계좌충전내역**\n\n충전된금액: ${ens.toLocaleString()}원\n\n서버코인: ${svcoin.toLocaleString()}원\n\n누적금액: ${accumulate.toLocaleString()}원` } })
                } else if (emoji === "❌") {
                  await msg.edit(`${message.author}`, { embed: { color: "RED", description: "관리자의 의해 충전신청이 거부되었습니다." } })
                }
              })
            } else if (emoji === "❌") {

              await msg.edit({ embed: { color: "RED", description: "입금신청이 취소되었습니다.\n\n이미 입금을 하시고 취소를 누르셨다면 환불을 어렵습니다." } })

            }
          })
        });
        sens = true;
        return
      }
    }
  }

  // 문화상품권충전

  if (chch == false) {
    if (noticeM == message.author.id) {
      if (noticeC == message.channel.id) {
        const d = new Database("./Servers/" + message.guild.id, "cool");
        if (await d.get(`cool.${message.author.id}`) == true) return
        chp = message.content;
        const svdb = new Database("./Servers/" + message.guild.id, "serverstate");

        var chid = await svdb.get(`chid.${message.guild.id}`)
        var chpw = await svdb.get(`chpw.${message.guild.id}`)

        const ID = chid;
        if (ID == "" || !chid) return message.reply({ embed: { color: "RED", description: "충전오류입니다. 관리진에게 문의하세요. (오류코드: unknown ID)" } });
        const PW = chpw;
        if (PW == "" || !chpw) return message.reply({ embed: { color: "RED", description: "충전오류입니다. 관리진에게 문의하세요. (오류코드: unknown PW)" } });

        const db = new Database("./Servers/" + message.guild.id, "UserCoin");

        const serverid = client.guilds.cache.get(message.guild.id)

        const driver = new Builder()
          .forBrowser('chrome')
          .setChromeOptions(options)
          .build();

        const cdb = new Database("./Servers/" + message.guild.id, "Channels");
        const channelid = await cdb.get(`Log.${message.guild.id}`)
        var channel = serverid.channels.cache.get(channelid)

        if (!chp) return (await driver).quit(), message.reply({ embed: { color: "RED", description: "핀번호를 입력해주세요 ex) 0000-0000-0000-000000 or 0000-0000-0000-0000" } }), channel.send(`${message.author} 님이 충전을 시도했습니다.`)
        const startembed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription("상품권을 충전중입니다. 잠시만기다려주세요.")
        const m = await message.channel.send(`${message.author}`, startembed)
        await d.set(`cool.${message.author.id}`, true)

        var Userwarn = await db.get(`UserWarn.${message.author.id}`) || 0;
        if (Userwarn == 2) {
          chch = true;
          await d.set(`cool.${message.author.id}`, false)
          startembed
            .setColor("RED")
            .setDescription(`경고 2번에 도달하여 더이상 충전이 불가능합니다.`)
          return await m.edit(`${message.author}`, startembed)
        }

        var cooltime = await db.get(`CoolTime.${message.guild.id}`);
        if (cooltime == true) {
          chch = true;
          await d.set(`cool.${message.author.id}`, false)
          startembed
            .setColor("RED")
            .setDescription(`현재 다른유저가 충전중입니다. 잠시만기다려주세요!`)
          return await m.edit(`${message.author}`, startembed)
        }

        await db.set(`CoolTime.${message.guild.id}`, true)
        var start = await new Date().getTime();
        await charge_pin();
        var end = await new Date().getTime();
        var diff = end - start;
        message.channel.send("걸린시간: " + diff + "밀리초")

        async function charge_pin(callbackFunc) {
          try {

            const url = 'https://m.cultureland.co.kr/mmb/loginMain.do';
            const url2 = 'https://m.cultureland.co.kr/csh/cshGiftCard.do';

            await driver.get(url);

            await driver.findElement(By.name('userId')).sendKeys(ID, Key.RETURN)
            await driver.findElement(By.name('passwd')).click();
            var s = 0;
            for (var i of PW) {
              s = s + 1;
              if (!isNaN(i)) {
                await driver.findElement(By.xpath("//img[@alt='" + i + "']")).click();
              } else if (i == "&") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='엠퍼샌드']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "%") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='퍼센트']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "`") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='어금기호']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "~") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='물결표시']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "!") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='느낌표']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "@") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='골뱅이']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "#") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='샾']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "$") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='달러기호']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "^") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='꺽쇠']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "*") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='별표']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "+") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='더하기']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "-") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='빼기']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "=") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='등호']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "(") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='왼쪽괄호']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              }  else if (i == ")") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='오른쪽괄호']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "_") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='밑줄']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == `/`) {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='슬래시']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "|") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='수직막대']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == ";") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='세미콜론']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == ":") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='콜론']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "?") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='물음표']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == ",") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='쉼표']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == ".") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='마침표']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == "'") {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='작은따옴표']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == '"') {
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
                await driver.findElement(By.xpath("//img[@alt='따옴표']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_sp']")).click();
              } else if (i == i.toUpperCase()) {
                await driver.findElement(By.xpath("//*[@id='mtk_cp']")).click();
                await driver.findElement(By.xpath("//img[@alt='대문자" + i + "']")).click();
                await driver.findElement(By.xpath("//*[@id='mtk_cp']")).click();
              } else if (i == i.toLowerCase()) {
                await driver.findElement(By.xpath("//img[@alt='" + i + "']")).click();
              }
            }

            if (await s < 12) {
              await driver.findElement(By.xpath("//*[@id='mtk_done']")).click();
              await driver.findElement(By.id('btnLogin')).click();
            }
            if (await s == 12) {
              await driver.findElement(By.id('btnLogin')).click();
            }



            await driver.get(url2);

            await driver.wait(until.elementLocated(By.id('btnCshFrom')), 1).catch(async err => {
              m.edit({ embed: { color: "RED", description: `로그인에 실패하였습니다. \n(아이디비번을 확인해주시거나 만약 일치하다면 재시도를 해주세요)` } }), chch = true;
              await db.set(`CoolTime.${message.guild.id}`, false)
            })

            await driver.findElement(By.id("txtScr11")).sendKeys(chp.substring(0, 4));
            await driver.findElement(By.id("txtScr12")).sendKeys(chp.substring(5, 9));
            await driver.findElement(By.id("txtScr13")).sendKeys(chp.substring(10, 14));

            for (var i of chp.substring(15)) {
              (await driver.findElement(By.xpath("//img[@alt='" + i + "']"))).click();
            }

            await driver.findElement(By.id('btnCshFrom')).click();

            await driver.wait(until.elementLocated(By.id('inSafeSub')), 1);
            function won() {
              return new Promise(won => {
                setTimeout(async () => {
                  won((await (await driver).findElement(By.xpath("//*[@id='wrap']/div[3]/section/dl/dd"))).getAttribute("innerHTML"))
                }, 0)
              })
            }
            const wons = await won();

            function pins() {
              return new Promise(pins => {
                setTimeout(async () => {
                  pins((await (await driver).findElement(By.xpath("//*[@id='wrap']/div[3]/section/div/table/tbody/tr/td[2]"))).getAttribute("innerHTML"))
                }, 0)
              })
            }
            const pinNum = await pins();

            function state() {
              return new Promise(state => {
                setTimeout(async () => {
                  state((await (await driver).findElement(By.xpath("//*[@id='wrap']/div[3]/section/div/table/tbody/tr/td[3]/b"))).getAttribute("innerHTML"))
                }, 0)
              })
            }
            const stats = await state();
            if (wons == "0원") {
              if (stats == "상품권 번호 불일치") {
                await db.add(`UserWarn.${message.author.id}`, 1);
                var Warn = await db.get(`UserWarn.${message.author.id}`);
                const embed1 = new Discord.MessageEmbed()
                  .setTitle(`충전내역`)
                  .setDescription("상품권 번호 불일치 경고가 부여되었습니다.")
                  .addField("경고횟수", Warn)
                  .addField("충전된금액", wons)
                  .addField("핀번호", pinNum)
                  .addField("상품권상태", stats)
                channel.send(`${message.author}`, embed1)
                await db.set(`CoolTime.${message.guild.id}`, false)
                await d.set(`cool.${message.author.id}`, false)
              } else if (stats == "이미 등록된 문화상품권") {
                await db.add(`UserWarn.${message.author.id}`, 1);
                var Warn = await db.get(`UserWarn.${message.author.id}`);
                const embed1 = new Discord.MessageEmbed()
                  .setTitle(`충전내역`)
                  .setDescription("이미 등록된 문화상품권 경고가 부여되었습니다.")
                  .addField("경고횟수", Warn)
                  .addField("충전된금액", wons)
                  .addField("핀번호", pinNum)
                  .addField("상품권상태", stats)
                channel.send(`${message.author}`, embed1)
                await db.set(`CoolTime.${message.guild.id}`, false)
                await d.set(`cool.${message.author.id}`, false)
              } else if (stats == "판매 취소된 문화상품권") {
                await db.add(`UserWarn.${message.author.id}`, 1);
                var Warn = await db.get(`UserWarn.${message.author.id}`);
                const embed1 = new Discord.MessageEmbed()
                  .setTitle(`충전내역`)
                  .setDescription("판매 취소된 문화상품권 경고가 부여되었습니다.")
                  .addField("경고횟수", Warn)
                  .addField("충전된금액", wons)
                  .addField("핀번호", pinNum)
                  .addField("상품권상태", stats)
                channel.send(`${message.author}`, embed1)
                await db.set(`CoolTime.${message.guild.id}`, false)
                await d.set(`cool.${message.author.id}`, false)
              }
              startembed
                .setTitle(`충전내역`)
                .setDescription(`${message.author}님의 충전내역입니다.`)
                .addField("충전된금액", wons)
                .addField("핀번호", pinNum)
                .addField("상품권상태", stats)

              m.edit(`${message.author}`, startembed)
              await db.set(`CoolTime.${message.guild.id}`, false)
              await d.set(`cool.${message.author.id}`, false)
              return
            }

            var coins = wons.replace(/[^0-9]/g, '');

            const chdb = new Database("./Servers/" + message.guild.id, "charge");

            var fc = await chdb.get(`charge.${message.guild.id}`);

            if (!fc) {
              await db.add(`UserCoin.${message.author.id}`, coins);
              await db.add(`UserAccumulate.${message.author.id}`, coins);
            }

            if (fc) {
              var firstCharge = await db.get(`FirstCharge.${message.author.id}`);
              if (!firstCharge) {
                var all = await coins * (1 + fc / 100);
                await db.set(`ChargeCount.${message.author.id}`, 1);
                await db.set(`FirstCharge.${message.author.id}`, true);
                await db.add(`UserCoin.${message.author.id}`, all);
                await db.add(`UserAccumulate.${message.author.id}`, coins);
              }

              if (firstCharge == true) {
                await db.set(`ChargeCount.${message.author.id}`, 1);
                await db.add(`UserCoin.${message.author.id}`, coins);
                await db.add(`UserAccumulate.${message.author.id}`, coins);
              }
            }

            var svcoin = await db.get(`UserCoin.${message.author.id}`);
            var accumulate = await db.get(`UserAccumulate.${message.author.id}`);

            startembed
              .setTitle(`충전내역`)
              .setDescription(`${message.author}님의 충전내역입니다.`)
              .addField("유저이름", message.author)
              .addField("충전된금액", wons)
              .addField("핀번호", pinNum)
              .addField("상품권상태", stats)
              .addField("서버코인", svcoin.toLocaleString() + "원")
              .addField("누적금액", accumulate.toLocaleString() + "원")

            await m.edit(`${message.author}`, startembed)

            const yesembed = new Discord.MessageEmbed()
              .setTitle(`충전내역`)
              .addField("유저이름", message.author)
              .addField("충전된금액", wons)
              .addField("핀번호", pinNum)
              .addField("상품권상태", stats)
              .addField("서버코인", svcoin.toLocaleString() + "원")
              .addField("누적금액", accumulate.toLocaleString() + "원")

            channel.send(`${message.author}`, yesembed)
          } finally {
            await driver.quit()
            await d.set(`cool.${message.author.id}`, false)
            await db.set(`CoolTime.${message.guild.id}`, false)
          }
        };
        chch = true;
        return
      }
    }
  }

  let prefix = client.config.prefix;

  client.emit('experience', message);

  if (!message.content.startsWith(prefix)) return;

  let argss = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = argss.shift().toLowerCase();
  let sender = message.author;

  message.flags = []
  while (argss[0] && argss[0][0] === "-") {
    message.flags.push(argss.shift().slice(1));
  }

  let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!commandFile) return;


  if (!cooldowns.has(commandFile.help.name)) cooldowns.set(commandFile.help.name, new Discord.Collection());

  const member = message.author;
  now = Date.now(),
    timestamps = cooldowns.get(commandFile.help.name),
    cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;

  if (!timestamps.has(member.id)) {
    if (!client.config.owners.includes(message.author.id)) {

      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(`명령어를 다시 사용하려면 **${timeLeft.toFixed(1)}**초 기다려주세요`);
    }

    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
  }

  try {
    if (!commandFile) return;
    commandFile.run(client, message, argss);
  } catch (error) {
    console.log(error.message);
  } finally {

    console.log(`${sender.tag} (${sender.id}) 사용함: ${cmd}`);
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
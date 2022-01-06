const fs = require("fs");
const { Collection, Client } = require("discord.js");
const Discord = require("discord.js");
const Invites = new Collection();

module.exports = client => {
  console.log("봇이 정상적으로 실행되었습니다 모든문의는 MR.SERVER#9128");
  console.log("배포밎,수정:MR.SERVER#9128");
  console.log("봇이 정상적으로 실행되었습니다 모든문의는 MR.SERVER#9128");
  (async function () {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    };
    answered1 = true;
    answered2 = true;
    answered3 = true;
    userAnswer1 = "";
    userAnswer2 = "";
    userAnswer3 = "";
    var i = 0;
    while (i < 10) {
      client.user.setPresence({
        activity: {
          name: `${client.guilds.cache.size}개의 서버에서 서비스이용중`,
          type: 'STREAMING',
          url: 'https://www.twitch.tv/korea75249/about'
        }
      })
      await sleep(5000)
      client.user.setPresence({
        activity: {
          name: `MR.SERVER#9128커뮤니티 https://discord.gg/E4tWYqA7CE`,
          type: 'STREAMING',
          url: 'https://www.twitch.tv/korea75249/about'
        }
      })
      await sleep(5000)
    }
  })();

  noticeM = "";
  noticeC = "";
  files = "";

  // 컬쳐랜드아이디비번
  chidss = true;
  chpwss = true;
  chids = "";
  chids = "";
  // 계좌
  bank = true;
  bankid = true;
  banks = "";
  bankids = "";
  // 역할지정
  role = true;
  // 제품등록
  file = true;
  prices = "";
  // 재고충전
  dfile = true;
  dstocks = "";
  // 메시지등록
  fmsg = true;
  fmsgs = "";
  // 상품할인
  fsale = true;
  fsales = "";
  // 금액지급
  uco = true;
  ucoi = "";
  // 금액차감
  u = true;
  uc = "";
  // 계좌충전
  sen = true;
  sens = true;
  en = "";
  ens ="";
  // 문상충전
  chch = true;
  chp = "";
  // 충전채널초기화
  chaC = true;
}
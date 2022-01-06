const Discord = require("discord.js"),
  fs = require("fs");



module.exports = client => {
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  client.helps = new Discord.Collection();

  fs.readdir("./commands/", (err, categories) => {
    console.log("봇에게 연결중...");
    console.log("--------------------------------");
    console.log("명령어 불러오는중...");
    console.log("--------------------------------");
    console.log(`전체 ${categories.length} 카테고리`);
    if (err) console.log(err)

    categories.forEach(category => {
      let moduleConf = require(`../commands/${category}/모듈.json`);
      moduleConf.path = `./commands/${category}`;
      moduleConf.cmds = [];
      if (!moduleConf) return;
      client.helps.set(category, moduleConf);

      fs.readdir(`./commands/${category}`, (err, files) => {

        console.log(`[COMMAND] 명령어: ${files.length - 1}개 카테고리: ${category}`);
        if (err) console.log(err);
        let commands = new Array();

        files.forEach(file => {
          if (!file.endsWith(".js")) return;
          let prop = require(`../commands/${category}/${file}`);
          let cmdName = file.split(".")[0];

          client.commands.set(prop.help.name, prop)

          prop.conf.aliases.forEach(alias => {
            client.aliases.set(alias, prop.help.name);
          })

          client.helps.get(category).cmds.push(prop.help.name);

        })
      })
    })
  })
}

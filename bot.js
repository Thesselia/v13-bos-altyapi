const Discord = require('discord.js');
//lient = new Discord.Client({ intents: ['GUILDS', 'GUILD_MEMBERS', ''] });
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');


const { Client, Intents } = require('discord.js');

const myIntents = new Intents(32509);

const client = new Client({ intents: myIntents  });

// more examples about manipulating the bitfield








require("./util/eventLoader.js")(client)
/*var rpc = require("discord-rpc")
client.on('ready', () => {
    client.api.applications(client.user.id).guilds("818975235873308692").commands.post({
        data: {
            name: "yardim",
            description: "Yardım Komutu"
            // possible options here e.g. options: [{...}]
        }
    });


    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if (command === 'yardim'){ 
            // here you could do anything. in this sample
            // i reply with an api interaction
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        command: "yardım" 
                    }
                }
            })
        }
    });
});*/

/*
const cliento = new rpc.Client({ transport: 'ipc' })
cliento.on('ready', () => {
cliento.request('SET_ACTIVITY', {
pid: process.pid,
activity : {
details : "Cat Bot ❤️",
assets : {
large_image : "https://cdn.discordapp.com/avatars/777239707818000425/613051b47bd7f53d39998fd0fb339591.webp?size=2048",
large_text : "Made By AntiCode Development" // bu gözükmeyebilir!!
},
buttons : [{label : "AntiCode Development" , url : "https://discord.gg/k8qUR8dY"},{label : "AntiCode Development Instagram",url : "https://instagram.com/anticode.development"}] //kendinize göre yazın
}
})
})
*/
/*client.on('disconnect', message => {
    const kanal = client.channels.cache.get('818128225120157706')
    kanal.send(`Su içip geliyorum`)
});*/

/*client.on('resume', message => {
    const kanal = client.channels.cache.get('818128257207238666')
    kanal.send(`Sa ben döndüm`)
});*/

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return;
   } 
  let permlvl = 0;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 5;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
/*onst embedxd = new Discord.MessageEmbed() 

.setDescription
(
 `Pingim ${client.ws.ping} ms!`
) 
client.on("ready", () => {
  client.api.applications(client.user.id).commands.post({
    data: {
      name: 'ping',
      description: 'Botun Pingini Görün <3 Anticode'
    }
  })
});
client.ws.on('INTERACTION_CREATE', async interaction => {
  const command = interaction.data.name();

  if (command == 'yardımtest') {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          embeds: [ embedxd ]
        }
      }
    })
  }
});*/

client.login(ayarlar.token);
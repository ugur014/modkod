const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Herkes Köledir");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
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
        } catch (e) {
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
        } catch (e) {
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
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   l0RDconsole.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// }); //DEVİLHOUSE//

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\
client.on("guildMemberUpdate", (oldMember, newMember) => {
    if(oldMember.user.bot === true) return
    let guild = client.guilds.get("748611978833952990")
    let role = guild.roles.get("768537323545296956")
    let log = guild.channels.get("748619434448388167")
    if((!guild.member(oldMember).roles.has("756236003198369805")) && (guild.member(newMember).roles.has("756236003198369805"))) {
    let embed = new Discord.RichEmbed()
    .setTimestamp()
    .setAuthor(`${newMember.user.tag} sevindik!`, newMember.user.avatarURL)
    .setDescription(`** <@!${newMember.id}> sunucumuzu boostlayıp, bize destek verdiğin için teşekkürler! \n\n<@&${"756236003198369805"}> rolün verildi!\n Artık tüm kodlara erişimin var!\n\nUptime Premium Verildi :)**`)
    .setFooter(`${guild.name}`, guild.iconURL)
    .setColor("GREEN")
    guild.channels.get("748619434448388167").send(embed)
    } else {
    if((guild.member(oldMember).roles.has("756236003198369805")) && (!guild.member(newMember).roles.has("756236003198369805"))) {
    let embed = new Discord.RichEmbed()
    .setTimestamp()
    .setAuthor(`${newMember.user.tag} üzüldük!`, newMember.user.avatarURL)
    .setDescription(`** <@!${newMember.id}> sunucumuzdan boostu kaldırdı, bu zamana kadar bizi desteklediğin için teşekkürler!**`)
    .setFooter(`${guild.name}`, guild.iconURL)
    .setColor("RED")
    guild.channels.get("748619434448388167").send(embed)
    }}
    });
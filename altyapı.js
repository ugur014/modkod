const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
  var rol = "768537323545296956"
  if (!message.member.roles.get("768537323545296956")) return message.channel.send("Bu komutu sadece **<@768537323545296956>** kullanabilir!")
  
  let kodIsım = args[0]
  if(!kodIsım) return message.channel.send("Bir kod ismi **belirt!**")
  
  let kodLink = args[1]
  if(!kodLink) return message.channel.send("Bir komut linki **belirt!**")
  
  
  let kodMain = args[2]
  if(!kodMain) return message.channel.send("Bir komut main linki **belirt!Eğer Yoksa Yok Yaz**")
  
  message.guild.createChannel(kodIsım, {
    type: "text",
    parent: "768537544899559434"
  }).then(channel => {
    
    let emo = client.emojis.find("id", "771635827057885185")
    let embed = new Discord.RichEmbed()
    .setAuthor("Uptime - Komut Paylaşıldı")
    .addField(" Yetkili Bilgileri", `${emo}  Yetkili İsim \`${message.author.tag}\` \n ${emo}  Yetkili ID \`${message.author.id}\``)
    .addField(" Kod Bilgileri", `${emo}  Kod İsmi \`${kodIsım}\` \n${emo}  Kod Kategorisi \`JavaScript\` `)
    .setColor("#ffff00")
    
    message.channel.send(`\`${kodIsım}\` adlı kod **paylaşıldı!**`)
    
 client.channels.get(ayarlar.kayit).send(embed)
    
    const kod = new Discord.RichEmbed()
    .setAuthor(`"${kodIsım}" Adlı Kod Paylaşıldı!`)
    .addField("Komut Hakkında",`${emo} Yetkili İsim \`${message.author.tag}\` \n${emo}  Yetkili ID \`${message.author.id}\` \n${emo}  Kod Main Linki __ [Main Dosyasi](${kodMain})__\n${emo} Kod Komut Linki __[Koda Fırla](${kodLink})__`)
    .setTimestamp()
    .setColor("#ffff00")
    channel.send(kod)
  
  })
  
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kod', 'kodpaylaş'],
    permLevel: 0
  };
  
exports.help = {
 name: 'kod-paylaş',
 description: 'kod paylaşmaya yarar',
 usage: '!altyapı <kod isim> <kod linki>'
};

///////<a:hype:720991905554497697>
//////////<a:elmas:720992252184494091>
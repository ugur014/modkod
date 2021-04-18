const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
  var rol = "340042888710979585"
  if (!message.member.roles.has("768537323545296956")) return message.channel.send("Bu komutu sadece **Kod Paylaşım Ekibi** kullanabilir!")
  
  
  let kodIsım = args[0]
  if(!kodIsım) return message.channel.send("Bir altyapı ismi **belirt!**")
  
  let kodLink = args[1]
  if(!kodLink) return message.channel.send("Bir altyapı linki **belirt!**")
  
  
  message.guild.createChannel(kodIsım, {
    type: "text",
    parent: "768708165222006794"
  }).then(channel => {
    
    let embed = new Discord.RichEmbed()
    .setAuthor("Bir altyapı paylaşıldı!")
    .addField("Yetkili Bilgileri", `Yetkili İsim: \`${message.author.tag}\` \nYetkili ID: \`${message.author.id}\``)
    .addField("Altyapı Bilgileri", `Altyapı İsmi: \`${kodIsım}\` `)
    .setColor("#00ff96")
    
    message.channel.send(`\`${kodIsım}\` adlı altyapı **paylaşıldı!**`)
    
 client.channels.get(ayarlar.kayit).send(embed)
    
    let emo = client.emojis.find("id", "771635827057885185")
    const kod = new Discord.RichEmbed()
    .setAuthor(`" ${kodIsım} " adlı altyapı paylaşıldı!`)
    .addField(" Altyapı Hakkında",`${emo} Yetkili İsim: \`${message.author.tag}\` \n${emo}  Yetkili ID: \`${message.author.id}\` \n${emo}  Altyapı Linki: [Altyapıya Fırla!](${kodLink})`)
    .setTimestamp()
    .setColor("#00ff96")
    channel.send(kod)
  
  })
  
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['altyapıP', 'akodpaylaş'],
    permLevel: 0
  };
  
exports.help = {
 name: 'akod-paylaş',
 description: 'kod paylaşmaya yarar',
 usage: '!kod <kod isim> <kod linki>'
};
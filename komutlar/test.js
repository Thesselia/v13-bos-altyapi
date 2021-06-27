const Discord = require("discord.js") 
exports.run = async (client, message, args) => {
 message.channel.send("Discord.js V13!") 
  
 } 

exports.help = {
  name: "test" 
} 
  
exports.conf = {
  guildOnly: true, 
  enabled: true, 
  aliases: []
 } 

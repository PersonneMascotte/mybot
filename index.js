const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json")
const ms = require("ms");
prefixe = "/"

client.on("ready", () => {
    console.log("CanardBot is starting...");
    client.user.setStatus("dnd");
    client.user.setActivity("CANARDBOT | discord.gg/hUmuevCBE6");
}); // activity

client.on('guildMemberAdd', async member => {

  let bienvenue = client.channels.cache.get("754635871428280333");
  var bienvenue_embed = new Discord.MessageEmbed()
  .setTitle("Oh ! Mais qui je vois, un Nouveau membre")
  .setDescription("Bienvenue à  <@" + member.user.id + "> sur Canard Land")
  .setColor("RANDOM")
  .setFooter('CanardLand • Message de Bienvenue');
  bienvenue.send(bienvenue_embed)
}); //bienvenue

client.on("raw", event => {

  /*if(event.t === "MESSAGE_REACTION_ADD"){
    if(event.d.message_id === "807654959633924147"){
        let member = client.guilds.cache.get(event.d.guild_id).member.cache.get(event.d.user_id)


        if(event.d.emoji.id === "812310926480506881"){
          member.guild.channel.create(`${member.username}`, {type: "text"}).then(chan => {
            let category = member.guild.channels.cache.get("806793659554725908", c => type == "category")
            chan.setParent(category)

            let role1 = member.guild.roles.cache.get("799540808080031764")
            let role2 = member.guild.roles.cache.get("803692148398227466")
            let role3 = member.guild.roles.cache.get("754635871428280331")

            chan.updateOverwrite(role1, {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true
            })

            chan.updateOverwrite(role2, {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true
            })

            chan.updateOverwrite(role3, {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false
            })
          }).catch(console.error)
        }
    }
  }; //ticket*/

  if(event.t === "MESSAGE_REACTION_ADD"){
    if(event.d.message_id === "799717980110979124"){
      let member = client.guilds.cache.get(event.d.guild_id).members.cache.get(event.d.user_id)
      if(event.d.emoji.id === "756804327255048262"){
        member.roles.add("807660005670256671")
      }
    }
  };//role de base
});


client.on("message", async message => {
  if(message.content.startsWith(`${prefixe}clear`)){
      if(message.member.hasPermission("ADMINISTRATOR")){
          let dl = message.content.split(" ").join(" ").slice(7)
          if(!dl || isNaN(dl) || dl > 100 || dl < 1) return message.reply("veuillez choisir un nombre entre 1 et 100")
          
          message.channel.bulkDelete(dl).then(message.channel.send("je viens de supprimer "+dl+" messages")).delete();
          
      }
  }
}); //clear 

client.on("message", async message => {
if (message.content.startsWith("/suggestion")) {
  const args = message.content.slice("/suggestions".length).trim().split(' ');

  if(args.length < 1) {
      return message.channel.send("**Erreur de syntaxe veuillez executer la commande: **``/suggestion <Votre suggestion>``**.**").then(message => message.delete({ timeout: 4000 }));
  }

  const sugEmbed = new Discord.MessageEmbed()
      .setColor("#e74c3c")
      .setTitle('Suggestion de ' + message.author.username)
      .setDescription("" + args.join(' '))
  client.channels.cache.find(channel => channel.id === "804764188835577876").send(sugEmbed).then(function (reponse){
      reponse.react('✅');
      reponse.react('➖');
      reponse.react('❌');
  });

  message.delete();

  (await message.channel.send("**Merci de votre suggestion !**")).delete({ timeout: 4000 });
}}); //suggestion

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(`${prefixe}kick`)) {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Tu refais ça je te ban ")
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick('raison')
          .then(() => {
            message.reply(`${user.tag} a bien était kick, issou`);
          })
          .catch(err => {
            message.reply("j'arrive pas à kick la personne");
            console.error(err);
          });
      } else {
        message.reply("Tu ne peux pas kick cette personne");
      }
    } else {
      message.reply("MENTION si tu veux kick");
    }

  }
}); //kick

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(`${prefixe}ban`)) {
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Tu refais ça tu es mort")
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({
            reason: 'Tu es méchant!',
          })
          .then(() => {
            message.reply(`${user.tag} a bien était BAN, https://tenor.com/view/banned-thor-gif-6072837`);
          })
          .catch(err => {
            message.reply("j'arrive pas à ban la personne");
            console.error(err);
          });
      } else {
        message.reply("Tu ne peux pas ban cette personne");
      }
    } else {
      message.reply("MENTION si tu veux ban");
    }
  }
}); //ban

client.on("message", async message => {
  if(message.content === "/close"){
    if(message.channel.parentID == "806793659554725908"){
      message.channel.send("Le problème à été réglé, le salon va être fermé dans 30s !")
      message.guild.channels.cache.get(message.channel.id).setName(`problème réglé`)
      setTimeout(() => {
        message.channel.delete()
      }, 30 *600)
    }
  }
}) //ticket


client.on('message', async message => {
    let args = message.content.substring(prefixe.length).split(" ")
  
    if(message.content.startsWith(`${prefixe}g`)) {
      if(message.author.bot)return
      if(!message.member.hasPermission('ADMINISTRATOR'))return
      let time = args[1]
      if(!time)return message.channel.send("Merci d'indiquer un temps")
  
      if(
        !args[1].endsWith("d") &&
        !args[1].endsWith("h") &&
        !args[1].endsWith("m") &&
        !args[1].endsWith("s")
      )
        return message.channel.send("Vous devez utilisez d (days), h (hours), m (minutes), s (secondes)")
  
        let gchannel = message.mentions.channels.first();
        if (!gchannel) return message.channel.send("Je n'arrive pas à trouver ce channel...")
        
        let prize = args.slice(3).join(" ")
        if (!prize) return message.channel.send("Il manque quelque chose ! Quel est le lot ?")
  
        message.delete()
        gchannel.send(":tada: **NEW GIVEAWAY** :tada:")
        let gembed = new Discord.MessageEmbed()
        .setTitle(":tada: Nouveau Giveaway !! :tada:")
        .setColor("RANDOM")
        .setDescription(`Lot : **${prize}**\nAppuyez sur :tada: pour participez !! \n Lancer par **${message.author}**\n Temps : **${time}**`)
        .setTimestamp(Date.now + ms(args[1]))
        .setFooter(`Ce finira dans ${time}`)
        let m = await gchannel.send(gembed)
        m.react("🎉")
        setTimeout(() => {
          if (m.reactions.cache.get("🎉").count <= 1) {
            return message.channel.send("Personne n'a participé :cry:")
          }
  
          let winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
          gchannel.send(`Bravo ${winner}, tu viens de remporter **${prize}**`
          );
        }, ms(args[1]));
    }
}); //giveaway

client.login(config.token)

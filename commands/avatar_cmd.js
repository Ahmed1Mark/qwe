module.exports = {
    name: 'avatar',
    execute(message, args, client, prefix, Discord) { // استخدام client و prefix و Discord الممررة
        if (message.content.toLowerCase().startsWith(`${prefix}avatar`)) {
            const user = message.mentions.users.first() || client.users.cache.get(args[1]) || message.author;

            if (args[1] !== "server") {
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor("#0099ff")
                            .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
                            .setDescription(`[**Avatar Link**](${user.displayAvatarURL()})`)
                            .setImage(user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
                    ]
                });
            } else if (args[1] === "server") {
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor("#0099ff")
                            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                            .setDescription(`[**Avatar Link**](${message.guild.iconURL({ dynamic: true })})`)
                            .setImage(message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
                    ]
                });
            }
        }
    },
};

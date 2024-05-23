// command/daily.js
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'daily',
    description: 'Displays daily gifts.',
    execute(message, args, prefix) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("**> 🎁 Daily Gifts**")
            .addFields(
                { name: '**Daily Probot**', value: '**__[Click Here](https://probot.io/daily)__**', inline: true },
                { name: '**Vote Probot**', value: '**__[Click Here](https://top.gg/bot/probot/vote)__**', inline: true }
            );

        message.reply({ embeds: [embed] });
    },
};

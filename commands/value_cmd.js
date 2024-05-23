const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 't-value',
    execute(message, args, client, prefix, Discord) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("> **🧮 Tax Value**")
            .setDescription(`1. ${prefix}Tax 1k (K) = 1000 (Thousand) \n2. ${prefix}Tax 1b (B) = 1000000000 (Billion) \n3. ${prefix}Tax 1t (T) = 1000000000000 (Trillion) \n4. ${prefix}Tax 1q (Q) = 1000000000000000 (Quadrillion)`);

        message.reply({ embeds: [embed] });
    }
};
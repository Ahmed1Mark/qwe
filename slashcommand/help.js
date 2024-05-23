const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'a list of all bot commands and their status',
    execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("> **The Bot Calculates The Credit Tax**")
            .setDescription(`  
🟢\`+ㅤㅤㅤㅤㅤㅤ \`❯ 1. prefix bot
🟢\`botㅤㅤㅤㅤㅤ \`❯ 2. Reply with bot
🟢\`taxㅤㅤㅤㅤㅤ \`❯ 3. Calculates credit tax with broker tax
🟢\`robㅤㅤㅤㅤㅤ \`❯ 4. Calculates robux tax with broker tax
🟢\`userㅤㅤㅤㅤㅤ\`❯ 5. Displays information about the person
🟢\`pingㅤㅤㅤㅤㅤ\`❯ 6. Ping bot displays
🟢\`dailyㅤㅤㅤㅤ \`❯ 7. Daily gift
🟢\`serverㅤㅤㅤㅤ\`❯ 8. View server information
🟢\`inviteㅤㅤㅤㅤ\`❯ 9. To add the bot to the server
🟢\`avatarㅤㅤㅤㅤ\`❯ 10. View profile picture
🟢\`set-roomtaxㅤ\`❯ 11. To activate the credit tax accounting room
🟢\`del-roomtaxㅤ\`❯ 12. To disable the credit tax accounting room
🔴\`set-roomrobㅤ\`❯ 13. To activate the credit robux accounting room
🔴\`del-roomrobㅤ\`❯ 14. To disable the credit robux accounting room
🟢\`server-avatar\`❯ 15. Server banner display
🟢\`server-banner\`❯ 16. Show server main image
           `)
            .addFields(
                { name: 'Website', value: '**┕[Click Here](https://pro-tax.netlify.app)**', inline: true },
                { name: 'Support Server', value: '**┕[Click Here](https://dsc.gg/clipper-tv)**', inline: true },
                { name: 'Developer Bot', value: '**┕@ahm.clipper**', inline: true }
            )
            .setFooter({ text: 'Click the "Info BOT" button for more information.' })

        const infoButton = new MessageButton()
            .setStyle('PRIMARY')
            .setLabel('Info BOT')
            .setCustomId('info_msg')
            .setEmoji('ℹ️');
          
        const row = new MessageActionRow().addComponents(infoButton);

        interaction.reply({ embeds: [embed], components: [row] });
    },
};

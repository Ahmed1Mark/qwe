const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'user',
    description: 'Display information about a user.',
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'The user you want to get information about.',
            required: false,
        },
    ],
    async execute(interaction) {
        const userOption = interaction.options.getUser('user');
        const user = userOption || interaction.user;
        const joinedDiscord = `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`;
        const joinedServer = `<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:R>`;

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('User Info')
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .addFields(
                { name: 'Joined Discord:', value: `\`\`\`${moment(user.createdAt).format('YYYY/M/D h:mm:ss')}\`\`\`\n**┕** **${joinedDiscord}**`, inline: true },
                { name: 'Joined Server:', value: `\`\`\`${moment(interaction.member.joinedAt).format('YYYY/M/D h:mm:ss')}\`\`\` \n**┕** **${joinedServer}**`, inline: true }
            );

        interaction.reply({ embeds: [embed] });
    },
};

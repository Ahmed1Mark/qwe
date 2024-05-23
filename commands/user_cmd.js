// command/user.js
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'user',
    description: 'Display information about a user.',
    execute(message, args, prefix) {
        const command = 'user'; // اسم الأمر

        // التحقق مباشرةً من الأمر
        if (command === 'user') {
            if (!message.guild) return;

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
            const user = member.user;
            const joinedDiscord = `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`;
            const joinedServer = `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`;

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('User Info')
                .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 })) // حجم الصورة: 4096x4096
                .addFields(
                    { name: 'Joined Discord:', value: `\`\`\`${moment(user.createdAt).format('YYYY/M/D h:mm:ss')}\`\`\`\n**┕** **${joinedDiscord}**`, inline: true },
                    { name: 'Joined Server:', value: `\`\`\`${moment(member.joinedAt).format('YYYY/M/D h:mm:ss')}\`\`\` \n**┕** **${joinedServer}**`, inline: true }
                );

            message.reply({ embeds: [embed] });
        }
    },
};
